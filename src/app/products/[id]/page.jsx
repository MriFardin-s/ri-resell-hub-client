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
    // console.log("user:", user);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 font-medium">Product not found!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl border border-amber-100 shadow-sm p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                    <div className="flex flex-col gap-4">
                        <div className="aspect-square w-full rounded-2xl overflow-hidden border border-amber-100 bg-gray-50 shadow-inner">
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
                                className="w-full h-full object-contain bg-gray-50/50 transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">
                                    {product.category}
                                </span>
                                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg ${product.condition === 'new'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-orange-50 text-orange-700 border border-orange-200'
                                    }`}>
                                    {product.condition}
                                </span>
                            </div>

                            <h1 className="text-2xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-baseline gap-2 pt-2">
                                <span className="text-3xl lg:text-4xl font-black text-gray-900">
                                    ${product.price?.toLocaleString()}
                                </span>
                            </div>

                            <div className="pt-4 border-t border-gray-100 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-semibold text-gray-800">Stock Available:</span>
                                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs font-bold">
                                        {product.stock} items
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-semibold text-gray-800">Seller:</span>
                                    <span className="text-amber-600 font-medium">
                                        {product.sellerInfo?.name || 'Verified Reseller'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <ProductActions product={product} user={user} />

                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-center">
                            <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <Shield className="w-5 h-5 text-amber-600" />
                                <span className="text-[11px] font-bold text-gray-700 mt-1">Secure Payment</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <CheckShape className="w-5 h-5 text-amber-600" />
                                <span className="text-[11px] font-bold text-gray-700 mt-1">Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <ArrowUturnCcwLeft className="w-5 h-5 text-amber-600" />
                                <span className="text-[11px] font-bold text-gray-700 mt-1">Easy Return</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;