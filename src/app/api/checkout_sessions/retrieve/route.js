import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      email: session.customer_email || session.metadata?.buyerMail || session.customer_details?.email,
      paymentStatus: session.payment_status,
      amount: session.amount_total / 100, 
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}