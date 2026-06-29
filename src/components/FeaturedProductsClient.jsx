'use client'

import Link from "next/link";
import { Card } from "@heroui/react";
import { Eye } from "@gravity-ui/icons";
import { motion } from 'framer-motion';

export default function FeaturedProductsClient({ products }) {
   
    const safeProducts = products?.products && Array.isArray(products.products) 
        ? products.products 
        : (Array.isArray(products) ? products : []);

 
    const CONDITION_STYLES = {
        new: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
        used: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
        "like-new": "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-gray-100 dark:border-neutral-800 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full"
        >
            <section className="max-w-7xl mx-auto py-16 px-4">
                {/* Header - Dark mode text colors fixed */}
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-black text-neutral-900 dark:text-white">
                        Featured Products
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                        Latest products added to our marketplace
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    
                    {safeProducts.slice(0, 6).map((product) => (
                        <Card
                            key={product._id}
                            className="overflow-hidden rounded-3xl border border-amber-100 dark:border-neutral-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-neutral-900"
                        >
                            {/* Header */}
                            <Card.Header className="relative h-40 p-0 overflow-hidden">
                                <img
                                    src={product.images?.[0]}
                                    alt={product.title}
                                    className="h-64 w-full object-cover"
                                />

                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                                        {product.stock} LEFT
                                    </span>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                            CONDITION_STYLES[product.condition?.toLowerCase()] ||
                                            "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20"
                                        }`}
                                    >
                                        {product.condition}
                                    </span>
                                </div>
                            </Card.Header>

                            {/* Content - Dark mode text colors fixed */}
                            <Card.Content className="space-y-4 p-5">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">
                                        {product.category}
                                    </p>

                                    <h3 className="mt-1 line-clamp-1 text-xl font-extrabold text-neutral-900 dark:text-white">
                                        {product.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex items-end justify-between border-t border-neutral-100 dark:border-neutral-800 pt-4">
                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                                            Seller
                                        </p>
                                        <p className="font-semibold text-neutral-700 dark:text-neutral-300">
                                            {product.sellerInfo?.name}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                                            Price
                                        </p>
                                        <p className="text-3xl font-black text-neutral-900 dark:text-white">
                                            ${product.price}
                                        </p>
                                    </div>
                                </div>
                            </Card.Content>

                            {/* Footer */}
                            <Card.Footer className="p-5 pt-0">
                                <Link
                                    href={`/products/${product._id}`}
                                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 py-3 font-bold text-black transition hover:bg-yellow-500"
                                >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                </Link>
                            </Card.Footer>
                        </Card>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}