import React from 'react';
import Link from 'next/link';

export const ProductCard = ({ product }) => {
    const productId = product._id?.$oid || product._id;

    return (
        <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full">
            <figure className="relative h-48 w-full bg-gray-50 overflow-hidden">
                <div className="aspect-square w-full bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-2xl p-2">
                    <img
                        src={product.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
                        alt={product.title}
                        className="object-contain h-full w-full hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>
                <span className={`absolute top-3 right-3 text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm ${product.condition === 'new'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                    {product.condition}
                </span>
            </figure>

            <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-1">
                    <div className="text-[11px] text-amber-600 font-bold uppercase tracking-widest">
                        {product.category}
                    </div>
                    <h2 className="text-base font-bold text-gray-800 line-clamp-1">
                        {product.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2">
                        {product.description}
                    </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Seller</p>
                            <p className="text-xs font-semibold text-gray-700 truncate max-w-[120px]">
                                {product.sellerInfo?.name || "Unknown"}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Price</p>
                            <p className="text-lg font-extrabold text-gray-900">
                                ${product.price?.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <Link
                        href={`/products/${productId}`}
                        className="w-full py-2.5 rounded-xl btn-theme-yellow text-center text-sm font-bold block"
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
        </div>
    );
};