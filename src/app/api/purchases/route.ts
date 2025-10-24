import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const MYFATOORAH_BASE_URL = process.env.MYFATOORAH_BASE_URL || 'https://apitest.myfatoorah.com'

// Helper to get MyFatoorah API key from DB or env
async function getMyFatoorahApiKey(): Promise<string> {
  try {
    const setting = await db.integrationSetting.findUnique({
      where: { key: 'MYFATOORAH_API_KEY' }
    })
    if (setting?.value) {
      return setting.value
    }
  } catch (error) {
    console.warn('Failed to fetch MyFatoorah API key from database:', error)
  }
  return process.env.MYFATOORAH_API_KEY || 'test-api-key'
}

const purchaseSchema = z.object({
  resourceId: z.string().min(1, 'Resource ID is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  paymentMethod: z.string().min(1, 'Payment method is required')
})

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    // Verify token
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = purchaseSchema.parse(body)

    // Get resource details
    const resource = await db.resource.findUnique({
      where: { id: validatedData.resourceId },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    if (!resource.isPublished) {
      return NextResponse.json(
        { error: 'Resource not available' },
        { status: 404 }
      )
    }

    if (resource.isFree) {
      return NextResponse.json(
        { error: 'Cannot purchase free resources' },
        { status: 400 }
      )
    }

    // Check if user already purchased this resource
    const existingPurchase = await db.purchase.findFirst({
      where: {
        userId: user.id,
        resourceId: resource.id,
        paymentStatus: 'COMPLETED'
      }
    })

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'You have already purchased this resource' },
        { status: 409 }
      )
    }

    // Validate amount matches resource price
    if (Math.abs(validatedData.amount - resource.price) > 0.01) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Create purchase record with PENDING status
    const purchase = await db.purchase.create({
      data: {
        amount: validatedData.amount,
        currency: 'SAR',
        paymentMethod: validatedData.paymentMethod,
        paymentStatus: 'PENDING',
        userId: user.id,
        resourceId: resource.id
      }
    })

    try {
      // Get MyFatoorah API key from DB or env
      const myfatoorahApiKey = await getMyFatoorahApiKey()
      
      // Initiate MyFatoorah payment
      const paymentResponse = await initiateMyFatoorahPayment({
        amount: validatedData.amount,
        currency: 'SAR',
        customerName: user.name || user.email,
        customerEmail: user.email,
        customerMobile: '', // Optional
        language: 'en',
        notificationOption: 'LINK',
        displayCurrencyIso: 'SAR',
        callBackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payments/callback`,
        errorUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payments/error`,
        orderItems: [
          {
            ItemName: resource.title,
            Quantity: 1,
            UnitPrice: validatedData.amount
          }
        ],
        // Custom data for callback
        customData: {
          purchaseId: purchase.id,
          userId: user.id,
          resourceId: resource.id
        }
      }, myfatoorahApiKey)

      if (paymentResponse.IsSuccess) {
        // Update purchase with payment ID
        await db.purchase.update({
          where: { id: purchase.id },
          data: {
            paymentId: paymentResponse.Data.InvoiceId.toString()
          }
        })

        return NextResponse.json({
          message: 'Payment initiated successfully',
          paymentUrl: paymentResponse.Data.PaymentURL,
          invoiceId: paymentResponse.Data.InvoiceId,
          purchaseId: purchase.id
        })
      } else {
        await db.purchase.update({
          where: { id: purchase.id },
          data: { paymentStatus: 'FAILED' }
        })
        return NextResponse.json(
          { error: 'Payment initiation failed' },
          { status: 502 }
        )
      }

    } catch (paymentError) {
      console.error('Payment initiation error:', paymentError)
      await db.purchase.update({ where: { id: purchase.id }, data: { paymentStatus: 'FAILED' } })
      return NextResponse.json(
        { error: 'Payment initiation error' },
        { status: 502 }
      )
    }

  } catch (error) {
    console.error('Purchase creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function initiateMyFatoorahPayment(paymentData: any, apiKey: string) {
  try {
    const response = await fetch(`${MYFATOORAH_BASE_URL}/v2/SendPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        PaymentMethodId: paymentData.paymentMethod === 'myfatoorah' ? 0 : 2, // 0 for all methods, 2 for card
        InvoiceValue: paymentData.amount,
        DisplayCurrencyIso: paymentData.displayCurrencyIso,
        CustomerName: paymentData.customerName,
        CustomerEmail: paymentData.customerEmail,
        CallBackUrl: paymentData.callBackUrl,
        ErrorUrl: paymentData.errorUrl,
        Language: paymentData.language,
        NotificationOption: paymentData.notificationOption,
        CustomerMobile: paymentData.customerMobile,
        CustomerReference: paymentData.customData.purchaseId,
        CustomerCivilId: paymentData.customData.userId,
        UserDefinedField: paymentData.customData.resourceId,
        InvoiceItems: paymentData.orderItems,
        SourceInfo: 'SourceKom Platform'
      })
    })

    if (!response.ok) {
      throw new Error(`MyFatoorah API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('MyFatoorah API call failed:', error)
    throw error
  }
}