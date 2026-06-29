import Link from 'next/link';
import { stripe } from '@/lib/stripe';
import { postSuccess } from '@/lib/actions/buyer/success';

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

 
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status } = session;
  let orderDetails = null;

  if (status === 'complete') {
    try {

      const orderData = await postSuccess(session_id);


      if (orderData?.success && orderData?.order) {
        orderDetails = orderData.order;
      } else if (orderData?.order) {
        orderDetails = orderData.order;
      }
    } catch (apiError) {
      console.error("Failed to trigger order API:", apiError);
    }


    const dbBuyer = orderDetails?.buyerInfo;
    const dbProduct = orderDetails?.productDetails;

    const buyerName = dbBuyer?.name || session?.metadata?.buyerName || "Customer";
    const productTitle = dbProduct?.title || session?.metadata?.productTitle || "Product";
    const productImage = dbProduct?.image || null;
    const transactionId = orderDetails?.transactionId || session?.payment_intent?.id || "N/A";
    const amount = orderDetails?.amount || (session?.amount_total ? session.amount_total / 100 : 0);
    const currency = orderDetails?.currency?.toUpperCase() || session?.currency?.toUpperCase() || "USD";
    
    const paymentDate = orderDetails?.createdAt 
      ? new Date(orderDetails.createdAt).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        })
      : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <section id="success" className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80 shadow-2xl p-6 sm:p-10 rounded-3xl text-neutral-900 dark:text-white transition-colors">
          
          {/* Success Message Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-3xl shadow-sm">
                🎉
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
              Payment Successful!
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              Thank you for your purchase, <span className="font-bold text-neutral-800 dark:text-neutral-200">{buyerName}</span>! Your order has been placed successfully.
            </p>
          </div>

          {/* Order Summary & Product Info */}
          <div className="bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/60 dark:border-neutral-800 p-5 rounded-2xl mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200/60 dark:border-neutral-800 pb-2 mb-4">
              Order Summary
            </h3>
            
            <div className="flex items-center gap-4">
              {productImage && (
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white flex-shrink-0">
                  <img src={productImage} alt={productTitle} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base text-neutral-900 dark:text-white truncate">
                  {productTitle}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Qty: 1
                </p>
              </div>
              <div className="text-right">
                <p className="font-black text-lg text-neutral-900 dark:text-white">
                  {currency === 'USD' ? '$' : ''}{amount}
                </p>
              </div>
            </div>
          </div>

          {/* Payment & Transaction Details */}
          <div className="border border-neutral-200/60 dark:border-neutral-800 p-5 rounded-2xl mb-8 space-y-3.5 text-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200/60 dark:border-neutral-800 pb-2 mb-2">
              Payment Information
            </h3>
            
            <div className="flex justify-between items-start gap-4">
              <span className="text-xs text-neutral-400">Transaction ID</span>
              <span className="font-mono text-xs text-neutral-700 dark:text-neutral-300 break-all text-right">
                {transactionId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400">Payment Date</span>
              <span className="font-semibold text-xs text-neutral-700 dark:text-neutral-300">
                {paymentDate}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400">Payment Status</span>
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/20 uppercase tracking-wide">
                {orderDetails?.paymentStatus || "paid"}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800">
              <span className="text-sm font-bold text-neutral-900 dark:text-white">Total Amount</span>
              <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                {currency === 'USD' ? '$' : ''}{amount} {currency}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <div className="gap-3">
             

              <Link
                href="/dashboard/buyer/my-orders"
                className="h-11 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 font-bold rounded-xl flex items-center justify-center transition text-sm shadow-sm active:scale-[0.98]"
              >
                Go to My Orders
              </Link>
            </div>

            <Link
              href="/products"
              className="h-11 bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-black rounded-xl flex items-center justify-center transition text-sm shadow-md active:scale-[0.98] w-full"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center text-neutral-500">
      <div className="text-center space-y-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
        <p className="text-sm font-semibold">Processing payment, please wait...</p>
      </div>
    </div>
  );
}