'use client';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Heart, LockFill, ShoppingBag } from '@gravity-ui/icons';
import { useRouter, useParams } from 'next/navigation';

export default function ProductActions({ product, user }) {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const isUserLoggedIn = user && user?.id;
    const isNotBuyer = isUserLoggedIn && user?.role !== 'buyer';


    const isOutOfStock = product?.stock === undefined || product?.stock <= 0;

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

        if (isOutOfStock) {
            toast.error(`This product is currently out of stock!`, { ...toastConfig });
            return;
        }

        setShowModal(true);
    };

    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();

        if (!user?.address?.trim() || user?.address === 'Not Provided') {
            toast.error('Please update your profile with a valid delivery address first!', { ...toastConfig });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: {
                        id: product._id || id,
                        title: product.title,
                        price: product.price,
                        image: product.images?.[0] || product.image,
                        sellerInfo: product.sellerInfo
                    },
                    buyer: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone || 'Not Provided',
                        address: user.address
                    }
                })
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Checkout failed');
            }
        } catch (err) {
            toast.error(err.message, { ...toastConfig });
            setLoading(false);
        }
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


    const getButtonText = () => {
        if (isOutOfStock) return 'Out of Stock';
        if (isNotBuyer) return 'Only Buyers Can Buy';
        return 'Order Now';
    };

    const isButtonDisabled = isNotBuyer || isOutOfStock;

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-4 pt-4">
                <button
                    type="button"
                    onClick={handleOrderNow}
                    disabled={isButtonDisabled}
                    className={`flex-1 h-14 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 
                        ${isButtonDisabled
                            ? 'bg-gray-200 dark:bg-neutral-800 text-gray-400 dark:text-neutral-600 cursor-not-allowed shadow-none'
                            : 'bg-theme-yellow-primary hover:bg-theme-yellow-hover text-gray-900 shadow-lg shadow-theme-yellow-primary/20 active:scale-[0.98]'
                        }`}
                >
                    <ShoppingBag className="w-5 h-5" />
                    {getButtonText()}
                </button>

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

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-100 dark:border-neutral-800 text-gray-900 dark:text-white">
                        <h3 className="text-xl font-bold mb-4">Confirm Order Details</h3>

                        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase">Buyer Name</label>
                                <input type="text" value={user?.name || ''} disabled className="w-full mt-1 p-3 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 cursor-not-allowed text-gray-400" />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase">Email Address</label>
                                <input type="email" value={user?.email || ''} disabled className="w-full mt-1 p-3 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 cursor-not-allowed text-gray-400" />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase">Phone Number</label>
                                <input type="text" value={user?.phone || 'Not Provided'} disabled className="w-full mt-1 p-3 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 cursor-not-allowed text-gray-400" />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase">Delivery Address</label>
                                <input type="text" value={user?.address || 'Not Provided'} disabled className="w-full mt-1 p-3 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 cursor-not-allowed text-gray-400" />
                            </div>

                            <div className="p-4 bg-amber-50 dark:bg-neutral-800/40 rounded-2xl border border-amber-100 dark:border-neutral-800">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">{product.title}</span>
                                    <span className="font-bold">${product.price}</span>
                                </div>
                                <div className="flex justify-between border-t border-amber-200/40 dark:border-neutral-700 mt-2 pt-2 text-base font-extrabold">
                                    <span>Total Invoice:</span>
                                    <span className="text-amber-600 dark:text-theme-yellow-primary">${product.price}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 h-12 border border-gray-300 dark:border-neutral-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading} className="flex-1 h-12 bg-theme-yellow-primary hover:bg-theme-yellow-hover text-gray-900 font-bold rounded-xl transition flex items-center justify-center">
                                    {loading ? 'Connecting...' : 'Proceed to Stripe'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}