import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  try {
    const body = await req.json()
    const { product, buyer } = body

    const headersList = await headers()
    const origin = headersList.get('origin')

    const session = await stripe.checkout.sessions.create({
      customer_email: buyer.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              images: product.image ? [product.image] : [],
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${product.id}`,
      metadata: {
        buyerId: buyer.id,
        buyerPhone: buyer.phone,
        buyerMail: buyer.email,
        buyerAddress: buyer.address,
        productId: product.id
      }
    });

    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}