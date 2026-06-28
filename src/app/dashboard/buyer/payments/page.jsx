import React from 'react';
import { Card } from "@heroui/react";
import { getUserSession } from '@/lib/core/session';
import { getPaymentHistory } from '@/lib/api/getPaymentHistory';
import { redirect } from 'next/navigation';

export default async function PaymentHistoryPage() {
  const user = await getUserSession();

  if (!user?.email) {
    redirect('/login');
  }

  const payments = await getPaymentHistory(user?.email) || [];
  // console.log("Session User =", user);
  // console.log("Email =", user?.email);

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          Payment History
        </h1>
        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">
          Displays all your completed and recorded transaction history.
        </p>
      </div>

      <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm rounded-2xl overflow-hidden">
        {payments.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-base font-bold text-gray-900 dark:text-white">No transactions found</p>
            <p className="text-sm text-gray-400">You have not made any payments yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-neutral-800/50 border-b border-gray-100 dark:border-neutral-800 text-xs font-bold uppercase tracking-wider text-gray-400">
                  <th className="p-4">Product Info</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-sm">
                {payments.map((payment) => {
                  const paymentId = payment._id?.$oid || payment._id;
                  const paymentDate = payment.createdAt?.$date || payment.createdAt;

                  return (
                    <tr key={paymentId} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/20 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-900 dark:text-white">
                          {payment.productDetails?.title || "Premium Item"}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Seller: {payment.sellerInfo?.name || "Unknown"}
                        </div>
                      </td>

                      <td className="p-4 font-mono text-xs text-gray-500 dark:text-neutral-400 max-w-[200px] break-all whitespace-normal">
                        { payment.transactionId || "N/A"}
                      </td>

                      <td className="p-4 text-gray-600 dark:text-neutral-300">
                        {paymentDate ? new Date(paymentDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : "N/A"}
                      </td>

                      <td className="p-4 font-black text-gray-900 dark:text-white">
                        ${payment.amount ? payment.amount.toFixed(2) : "0.00"}
                      </td>

                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${payment.paymentStatus === 'paid'
                            ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                            : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${payment.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          {payment.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}