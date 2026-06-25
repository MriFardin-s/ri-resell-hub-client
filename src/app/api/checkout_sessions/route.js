import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  try {
    const body = await req.json()
    const { product, buyer } = body

    const headersList = await headers()
    const origin = headersList.get('origin')

    
    const unitAmount = Math.round(Number(product.price) * 100);

    const session = await stripe.checkout.sessions.create({
      customer_email: buyer?.email || undefined, 
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title || 'Product',
              images: product.image && product.image.startsWith('http') ? [product.image] : [],
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      
      
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${product.id || ''}`,
     
      metadata: {
        buyerId: buyer?.id || '',
        buyerName: buyer?.name || '',
        buyerPhone: buyer?.phone || 'Not Provided',
        buyerMail: buyer?.email || '',
        buyerAddress: buyer?.address || 'Not Provided',

        productId: product?.id || '',
        productTitle: product?.title || '', 
        productImage: product?.image || '', 

        sellerId: product?.sellerInfo?.userId || product?.sellerId || '',
        sellerName: product?.sellerInfo?.name || product?.sellerName || 'Unknown Seller',
        sellerEmail: product?.sellerInfo?.email || product?.sellerEmail || '',
        sellerPhone: product?.sellerInfo?.phone || product?.sellerPhone || 'Not Provided'
      }
    });

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("Stripe Checkout Session Error:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}