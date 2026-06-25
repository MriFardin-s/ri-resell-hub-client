import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ success: false, message: 'Session ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    
    const orderData = {
      sessionId: session.id,
      transactionId: session.payment_intent || session.id,
      amount: session.amount_total / 100,
      paymentStatus: session.payment_status === 'paid' ? 'paid' : session.payment_status,
      createdAt: new Date().toISOString(), 
      buyerInfo: {
        email: session.metadata?.buyerMail || session.customer_details?.email || session.customer_email
      }
    };

    return NextResponse.json({
      success: true,
      order: orderData
    });

  } catch (err) {
    console.error("Session retrieve error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}