
import Link from 'next/link';
import { stripe } from '@/lib/stripe';

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("please provide a valid session_id");
  }


  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, metadata } = session;


  const buyerName = metadata?.buyerName || "Customer";
  const buyerEmail = metadata?.buyerEmail || session?.customer_details?.email || "Not Provided";
  const buyerPhone = metadata?.buyerPhone || "Not Provided";
  const buyerAddress = metadata?.buyerAddress || "Not Provided";
  const productTitle = metadata?.productTitle || "Product";

  if (status === 'complete') {

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BASE_URL
      console.log("Backend URL:", backendUrl);

      const response = await fetch(`${backendUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: session_id }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        console.error(orderData.message);
      } else {
        console.log(orderData);
      }
    } catch (apiError) {
      console.error("Failed to trigger order API:", apiError);
    }


    return (
      <section id="success" className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 shadow-2xl p-8 rounded-3xl text-center text-neutral-900 dark:text-white transition-colors">

          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 text-green-500 rounded-full flex items-center justify-center text-3xl shadow-md">
              🎉
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-tight mb-2">Payment Successful!</h1>
          <p className="text-sm text-neutral-500 dark:text-gray-400 mb-6">
            Thank you for your purchase, <span className="font-semibold text-neutral-800 dark:text-neutral-200">{buyerName}</span>! Your order for <strong>{productTitle}</strong> has been processed.
          </p>


          <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-700 p-5 rounded-2xl mb-8 text-left space-y-3 text-sm">
            <h3 className="font-bold border-b border-neutral-200 dark:border-neutral-700 pb-2 text-xs uppercase tracking-wider text-neutral-400">
              Buyer Details
            </h3>
            <div>
              <span className="text-xs text-neutral-400 block">Name</span>
              <span className="font-medium">{buyerName}</span>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block">Email Address</span>
              <span className="font-medium truncate block">{buyerEmail}</span>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block">Phone</span>
              <span className="font-medium">{buyerPhone}</span>
            </div>
            <div>
              <span className="text-xs text-neutral-400 block">Shipping Address</span>
              <span className="font-medium text-xs block text-neutral-600 dark:text-neutral-300">
                {buyerAddress}
              </span>
            </div>
          </div>


          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="/"
              className="flex-1 h-11 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold rounded-xl flex items-center justify-center transition text-sm active:scale-[0.98]"
            >
              Go to Home
            </Link>

            <Link
              href="/products"
              className="flex-1 h-11 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-gray-200 font-semibold rounded-xl flex items-center justify-center transition text-sm bg-white dark:bg-transparent active:scale-[0.98]"
            >
              Shop More
            </Link>
          </div>

        </div>
      </section>
    );
  }


  return <div className="p-4 text-center">Processing payment, please wait...</div>;
}