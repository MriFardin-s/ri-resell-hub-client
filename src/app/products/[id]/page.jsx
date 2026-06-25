import { getAllProductsById } from '@/lib/api/products';
import React from 'react';

import { Heart, ShoppingBag, Shield, Truck, ArrowUturnCcwLeft, CheckShape } from '@gravity-ui/icons';
import ProductActions from '@/components/products/ProductActions';
import { getUserSession } from '@/lib/core/session';
import Image from 'next/image';

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params;
    const product = await getAllProductsById(id);
    const user = await getUserSession();

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 transition-colors">
                <p className="text-gray-500 dark:text-neutral-400 font-medium">Product not found!</p>
            </div>
        );
    }

    

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-950 py-8 lg:py-16 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Card */}
                <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-amber-100 dark:border-neutral-800 shadow-sm p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                    {/* Left: Image Gallery Container */}
                    <div className="flex flex-col gap-4">
                        <div className="aspect-square w-full rounded-2xl overflow-hidden border border-amber-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 shadow-inner">
                            <Image
                                src={
                                    product?.images && product.images.length > 0 && typeof product.images[0] === 'string'
                                        ? product.images[0]
                                        : 'https://placehold.co/600x600?text=No+Image'
                                }
                                width={300}
                                height={300}
                                loading="eager"
                                unoptimized
                                referrerPolicy="no-referrer"
                                alt={product?.title || "Product Image"}
                                className="w-full h-full object-contain bg-gray-50/50 dark:bg-neutral-950 transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Right: Product Details Info */}
                    <div className="flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60 rounded-lg">
                                    {product.category}
                                </span>
                                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg ${
                                    product.condition === 'new'
                                        ? 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/60'
                                        : 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-900/60'
                                }`}>
                                    {product.condition}
                                </span>
                            </div>

                            {/* Title & Price */}
                            <h1 className="text-2xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-baseline gap-2 pt-2">
                                <span className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-neutral-100">
                                    ${product.price?.toLocaleString()}
                                </span>
                            </div>

                            {/* Stock & Seller Info */}
                            <div className="pt-4 border-t border-gray-100 dark:border-neutral-800 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400">
                                    <span className="font-semibold text-gray-800 dark:text-neutral-200">Stock Available:</span>
                                    <span className="font-mono bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-xs font-bold text-gray-800 dark:text-neutral-200">
                                        {product.stock} items
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400">
                                    <span className="font-semibold text-gray-800 dark:text-neutral-200">Seller:</span>
                                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                                        {product.sellerInfo?.name || 'Verified Reseller'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Actions Component */}
                        <ProductActions product={product} user={user} />

                        {/* Bottom Feature Grid */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-neutral-800 text-center">
                            <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-neutral-950 rounded-xl border border-gray-100 dark:border-neutral-800">
                                <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                <span className="text-[11px] font-bold text-gray-700 dark:text-neutral-300 mt-1">Secure Payment</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-neutral-950 rounded-xl border border-gray-100 dark:border-neutral-800">
                                <CheckShape className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                <span className="text-[11px] font-bold text-gray-700 dark:text-neutral-300 mt-1">Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-neutral-950 rounded-xl border border-gray-100 dark:border-neutral-800">
                                <ArrowUturnCcwLeft className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                <span className="text-[11px] font-bold text-gray-700 dark:text-neutral-300 mt-1">Easy Return</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;