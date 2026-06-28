import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { auth } from '@/lib/auth'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')


    const userSession = await auth.api.getSession({
      headers: await headers()
    })
    const user = userSession?.user;


    const formData = await request.formData()
    
    const productId = formData.get('productId')
    const productTitle = formData.get('productTitle')
    const productPrice = formData.get('productPrice')
    const productImage = formData.get('productImage')
    const sellerId = formData.get('sellerId')

    const buyerId = formData.get('buyerId')
    const buyerName = formData.get('buyerName')
    const buyerEmail = formData.get('buyerEmail')
    const buyerPhone = formData.get('buyerPhone')
    const buyerAddress = formData.get('buyerAddress')

    const amountInCents = Math.round(Number(productPrice) * 100);

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || buyerEmail, 
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amountInCents,
            product_data: {
              name: productTitle,
              images: productImage ? [productImage] : [], 
            }
          },
          quantity: 1,
        },
      ],

      metadata: {
        productId: productId || '',
        productTitle: productTitle || '',
        productPrice: Number(productPrice) || 0,
        productImage: productImage || '',
        sellerId: sellerId || '',
        
        buyerId: buyerId || user?.id || '',
        buyerName: buyerName || user?.name || '',
        buyerEmail: buyerEmail || user?.email || '',
        buyerPhone: buyerPhone || 'Not Provided',
        buyerAddress: buyerAddress || 'Not Provided'
      },
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${productId}`, 
    });

  
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    console.error("Stripe Session Error: ", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}