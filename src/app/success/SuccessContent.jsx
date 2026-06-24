'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CircleCheck, House, ShoppingBag, Envelope, TriangleExclamation } from '@gravity-ui/icons';
import Link from 'next/link';

import { authClient } from '@/lib/auth-client';


export function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');


    const { data: sessionData, isPending } = authClient.useSession();
    const currentUser = sessionData?.user;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        if (!sessionId) {
            router.push('/');
            return;
        }

        const processOrderAndFetchDetails = async () => {
            try {

                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Failed to process order details.');
                }


                setOrderData(data.order || data.data || data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };


        if (!isPending) {
            processOrderAndFetchDetails();
        }
    }, [sessionId, router, isPending]);


    if (loading || isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
                <div className="text-center space-y-3">
                    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-medium text-neutral-500 dark:text-gray-400 animate-pulse">
                        Verifying your payment and updating stock, please wait...
                    </p>
                </div>
            </div>
        );
    }


    const buyerEmail = orderData?.buyerInfo?.email || orderData?.email;

    // const buyerEmail = orderData?.buyerInfo?.email || orderData?.email || currentUser?.email;



    if (!currentUser || (orderData && buyerEmail && buyerEmail !== currentUser.email)) {
        return (
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white dark:bg-neutral-800 border border-red-200 dark:border-red-900/50 p-6 rounded-2xl text-center shadow-xl">
                    <TriangleExclamation className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Access Denied</h2>
                    <p className="text-sm text-neutral-500 dark:text-gray-400 mb-6">
                        You do not have permission to view this receipt or you are not logged in.
                    </p>
                    <Link href="/auth/signin" className="inline-flex h-11 items-center justify-center bg-theme-yellow-primary text-gray-900 font-bold px-6 rounded-xl text-sm transition hover:opacity-90">
                        Sign in First
                    </Link>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white dark:bg-neutral-800 border border-red-200 dark:border-red-900/50 p-6 rounded-2xl text-center shadow-xl">
                    <TriangleExclamation className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Something went wrong</h2>
                    <p className="text-sm text-neutral-500 dark:text-gray-400 mb-6">{error}</p>
                    <Link href="/" className="inline-flex h-11 items-center justify-center bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium px-6 rounded-xl text-sm transition hover:opacity-90">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4 relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.04),transparent_50%)]" />

            <div className="w-full max-w-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 shadow-2xl p-8 rounded-3xl relative z-10 text-center text-neutral-900 dark:text-white transition-colors">

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-950/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/10">
                        <CircleCheck className="w-10 h-10 animate-scale-up" />
                    </div>
                </div>

                <h1 className="text-2xl font-black tracking-tight mb-2">
                    Payment Successful!
                </h1>
                <p className="text-sm text-neutral-500 dark:text-gray-400 mb-6">
                    Thank you for your purchase. Your order has been confirmed successfully.
                </p>



                <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-700 p-5 rounded-2xl mb-8 text-left space-y-4">

                    <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-400 font-medium">Payment Status</span>
                        <span className="bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-0.5 rounded-lg font-bold uppercase text-[10px] tracking-wider border border-green-500/20">
                            {orderData?.paymentStatus || 'Paid'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-neutral-200 dark:border-neutral-700/60 pt-4">
                        <div>
                            <span className="text-[10px] text-neutral-400 font-medium block uppercase">Amount Paid</span>
                            <span className="text-sm font-bold text-neutral-900 dark:text-white">${orderData?.amount || '0.00'}</span>
                        </div>
                        <div>
                            <span className="text-[10px] text-neutral-400 font-medium block uppercase">Date</span>
                            <span className="text-sm font-bold text-neutral-900 dark:text-white">
                                {orderData?.createdAt ? new Date(orderData.createdAt).toLocaleDateString() : 'N/A'}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-neutral-200 dark:border-neutral-700/60 pt-4">
                        <span className="text-[10px] text-neutral-400 font-medium block mb-1.5 uppercase">Transaction ID</span>
                        <div className="bg-white dark:bg-neutral-900 p-2 rounded-lg border border-neutral-200/50 dark:border-neutral-800 text-[10px] font-mono text-neutral-500 truncate">
                            {orderData?.transactionId || orderData?.sessionId || 'N/A'}
                        </div>
                    </div>

                    <div className="border-t border-neutral-200 dark:border-neutral-700/60 pt-4">
                        <span className="text-[10px] text-neutral-400 font-medium block mb-1.5 uppercase">Receipt Sent To</span>
                        <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 p-3 rounded-xl border border-neutral-200/50 dark:border-neutral-800">
                            <Envelope className="w-4 h-4 text-neutral-400 shrink-0" />
                            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 truncate">
                                {buyerEmail}
                            </span>
                        </div>
                    </div>
                </div>



                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Link
                        href="/"
                        className="flex-1 h-12 bg-theme-yellow-primary hover:bg-theme-yellow-hover text-gray-900 font-bold rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] text-sm shadow-md shadow-theme-yellow-primary/10"
                    >
                        <House className="w-4 h-4" />
                        <span>Go to Home</span>
                    </Link>

                    <Link
                        href="/products"
                        className="flex-1 h-12 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-gray-200 font-semibold rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] text-sm bg-white dark:bg-transparent"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Shop More</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}