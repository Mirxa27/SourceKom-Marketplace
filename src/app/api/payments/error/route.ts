import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('MyFatoorah error callback received:', body)

    // Extract payment details from error callback
    const { 
      InvoiceId, 
      InvoiceStatus, 
      Error,
      CustomerReference // purchaseId
    } = body

    // Find and update the purchase record
    const purchase = await db.purchase.findFirst({
      where: {
        paymentId: InvoiceId?.toString() || CustomerReference
      }
    })

    if (purchase) {
      await db.purchase.update({
        where: { id: purchase.id },
        data: {
          paymentStatus: 'FAILED',
          refundReason: Error || 'Payment failed'
        }
      })

      console.log(`Purchase ${purchase.id} failed: ${Error}`)
    }

    // Return success response to MyFatoorah
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Payment error callback error:', error)
    return NextResponse.json(
      { error: 'Error callback processing failed' },
      { status: 500 }
    )
  }
}