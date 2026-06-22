'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const ProductCard = ({ product }) => {
    const productId = product._id?.$oid || product._id;
    const isOutOfStock = product?.stock === 0 || product?.status === "sold";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-gray-100 dark:border-neutral-800 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full"
        >
            <figure className="relative h-48 w-full bg-gray-50 dark:bg-neutral-800/40 overflow-hidden">
                <div className="aspect-square w-full bg-gray-50 dark:bg-transparent flex items-center justify-center overflow-hidden rounded-t-2xl p-2">
                    <img
                        src={product.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                        alt={product.title}
                        className="object-contain h-full w-full hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>

               
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    
                  
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm ${
                        isOutOfStock
                            ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40'
                            : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40'
                    }`}>
                        {isOutOfStock ? 'Stock Out' : `${product.stock} Left`}
                    </span>

                    
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm ${
                        product.condition === 'new'
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40'
                            : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40'
                    }`}>
                        {product.condition}
                    </span>
                </div>
            </figure>

            <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-1">
                    <div className="text-[11px] text-amber-600 dark:text-theme-yellow-primary font-bold uppercase tracking-widest">
                        {product.category}
                    </div>
                    <h2 className="text-base font-bold text-gray-800 dark:text-neutral-100 line-clamp-1">
                        {product.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-neutral-400 line-clamp-2">
                        {product.description}
                    </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-neutral-800">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-neutral-500 font-medium">Seller</p>
                            <p className="text-xs font-semibold text-gray-700 dark:text-neutral-300 truncate max-w-[120px]">
                                {product.sellerInfo?.name || "Unknown"}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-neutral-500 font-medium">Price</p>
                            <p className="text-lg font-extrabold text-gray-900 dark:text-neutral-100">
                                ${product.price?.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {isOutOfStock ? (
                        <button
                            disabled
                            className="w-full py-2.5 rounded-xl bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 font-bold text-center text-sm block cursor-not-allowed"
                        >
                            Sold Out
                        </button>
                    ) : (
                        <Link
                            href={`/products/${productId}`}
                            className="w-full py-2.5 rounded-xl btn-theme-yellow text-center text-sm font-bold block"
                        >
                            View Details
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
};