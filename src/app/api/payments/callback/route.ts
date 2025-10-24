import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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
  return process.env.MYFATOORAH_API_KEY || ''
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('MyFatoorah callback received:', body)

    // Get MyFatoorah API key from DB or env
    const myfatoorahApiKey = await getMyFatoorahApiKey()

    // Extract payment details from callback
    const { 
      InvoiceId, 
      InvoiceStatus, 
      InvoiceValue, 
      CustomerName, 
      CustomerEmail,
      UserDefinedField, // resourceId
      CustomerReference // purchaseId
    } = body

    // Always verify invoice status with MyFatoorah
    let verifiedStatus = InvoiceStatus
    try {
      if (myfatoorahApiKey && (InvoiceId || CustomerReference)) {
        const enquiryRes = await fetch(`${MYFATOORAH_BASE_URL}/v2/GetPaymentStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${myfatoorahApiKey}`
          },
          body: JSON.stringify({
            Key: InvoiceId?.toString() || CustomerReference,
            KeyType: 'InvoiceId'
          })
        })
        if (enquiryRes.ok) {
          const statusJson = await enquiryRes.json()
          verifiedStatus = statusJson?.Data?.InvoiceStatus || InvoiceStatus
        }
      }
    } catch (e) {
      console.warn('Payment status verification failed, using callback status')
    }

    if (verifiedStatus === 'Paid') {
      // Find the purchase record
      const purchase = await db.purchase.findFirst({
        where: {
          paymentId: InvoiceId?.toString() || CustomerReference
        }
      })

      if (purchase) {
        // Update purchase status to completed
        await db.purchase.update({
          where: { id: purchase.id },
          data: {
            paymentStatus: 'COMPLETED',
            downloadUrl: `/api/resources/${UserDefinedField}/download`,
            downloadExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
          }
        })

        console.log(`Purchase ${purchase.id} completed successfully`)
      }
    } else {
      // Handle failed or pending payments
      const purchase = await db.purchase.findFirst({
        where: {
          paymentId: InvoiceId?.toString() || CustomerReference
        }
      })

      if (purchase) {
        await db.purchase.update({
          where: { id: purchase.id },
          data: {
            paymentStatus: verifiedStatus === 'Failed' ? 'FAILED' : 'PENDING'
          }
        })
      }
    }

    // Return success response to MyFatoorah
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Payment callback error:', error)
    return NextResponse.json(
      { error: 'Callback processing failed' },
      { status: 500 }
    )
  }
}