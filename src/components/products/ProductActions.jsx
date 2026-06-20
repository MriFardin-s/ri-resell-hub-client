'use client';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Heart, LockFill, ShoppingBag } from '@gravity-ui/icons';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProductActions({ product, user }) {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [isWishlisted, setIsWishlisted] = useState(false);

    const isUserLoggedIn = user && user?.id;
    const isNotBuyer = isUserLoggedIn && user?.role !== 'buyer';

    const toastConfig = {
        className: "border border-amber-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-100 rounded-xl shadow-md"
    };

    const handleOrderNow = () => {
        if (!isUserLoggedIn) {
            toast.error('Please signin first to place an order!', {
                icon: <LockFill className="w-5 h-5 text-red-500 dark:text-red-400" />,
                ...toastConfig
            });
            
            const currentPath = `/products/${id}`;
            router.push(`/auth/signin?callbackUrl=${encodeURIComponent(currentPath)}`);
            return;
        }

        if (isNotBuyer) {
            toast.error(`Only buyers can place orders!`, {
                icon: <LockFill className="w-5 h-5 text-red-500 dark:text-red-400" />,
                ...toastConfig
            });
            return;
        }

        toast.success(`Processing order for ${product.title}!`, { 
            icon: '📦',
            ...toastConfig
        });
    };

    const handleWishlist = async () => {
        if (!isUserLoggedIn) {
            toast.error('Please login first to manage wishlist!', {
                icon: <LockFill className="w-5 h-5 text-red-500 dark:text-red-400" />,
                ...toastConfig
            });
            return;
        }

        if (isNotBuyer) {
            toast.error(`Only buyers can add items to wishlist!`, {
                icon: <LockFill className="w-5 h-5 text-red-500 dark:text-red-400" />,
                ...toastConfig
            });
            return;
        }

        try {
            const endpoint = isWishlisted 
                ? `/api/wishlist/remove` 
                : `/api/wishlist/add`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    productId: product._id || id,
                }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            setIsWishlisted(!isWishlisted);
            if (!isWishlisted) {
                toast.success('Added to wishlist!', { 
                    icon: '❤️',
                    ...toastConfig
                });
            } else {
                toast('Removed from wishlist', { 
                    icon: '🗑️',
                    ...toastConfig
                });
            }
        } catch (error) {
            toast.error('Failed to update wishlist. Try again!', {
                ...toastConfig
            });
        }
    };

    return (
        <div className="flex items-center gap-4 pt-4">
            <Link
                type="button"
                onClick={handleOrderNow}
                disabled={isNotBuyer}
                className={`flex-1 h-14 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 
                    ${isNotBuyer 
                        ? 'bg-gray-200 dark:bg-neutral-800 text-gray-400 dark:text-neutral-600 cursor-not-allowed shadow-none' 
                        : 'bg-theme-yellow-primary hover:bg-theme-yellow-hover text-gray-900 shadow-lg shadow-theme-yellow-primary/20 active:scale-[0.98]'
                    }`}
            >
                <ShoppingBag className="w-5 h-5" />
                {isNotBuyer ? 'Only Buyers Can Buy' : 'Order Now'}
            </Link>

            <button
                type="button"
                onClick={handleWishlist}
                disabled={isNotBuyer}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center active:scale-[0.98] transition-all duration-200 shadow-sm 
                    ${isNotBuyer 
                        ? 'bg-gray-50 dark:bg-neutral-900/50 border-gray-200 dark:border-neutral-800 text-gray-300 dark:text-neutral-700 cursor-not-allowed' 
                        : isWishlisted
                            ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-500 dark:text-red-400'
                            : 'bg-white dark:bg-neutral-900 border-amber-200 dark:border-neutral-800 text-gray-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20'
                    }`}
            >
                <Heart className="w-6 h-6" />
            </button>
        </div>
    );
}