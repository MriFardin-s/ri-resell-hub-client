'use client'

import Link from "next/link";
import { Card } from "@heroui/react";
import { Eye } from "@gravity-ui/icons";

import { motion } from 'framer-motion';



export default function FeaturedProductsClient({products}) {



    const CONDITION_STYLES = {
    new: "bg-green-50 text-green-700 border border-green-200",
    used: "bg-orange-50 text-orange-700 border border-orange-200",
    "like-new": "bg-blue-50 text-blue-700 border border-blue-200",
};
    

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-gray-100 dark:border-neutral-800 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full"
        >
        <section className="max-w-7xl mx-auto py-16 px-4">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-black text-neutral-900">
                    Featured Products
                </h2>
                <p className="text-neutral-500 mt-2">
                    Latest products added to our marketplace
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.slice(0, 6).map((product) => (
                    <Card
                        key={product._id}
                        className="overflow-hidden rounded-3xl border border-amber-100 dark:border-neutral-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-neutral-900">
                   
                        {/* Header */}
                        <Card.Header className="relative h-40 p-0 overflow-hidden ">
                            <img
                                src={product.images?.[0]}
                                alt={product.title}
                                className="h-64 w-full object-cover"
                            />

                            <div className="absolute top-4 right-4 flex gap-2">
                                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                    {product.stock} LEFT
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${CONDITION_STYLES[product.condition] ||
                                        "bg-gray-100 text-gray-700 border border-gray-200"
                                        }`}
                                >
                                    {product.condition}
                                </span>
                            </div>
                        </Card.Header>

                        {/* Content */}
                        <Card.Content className="space-y-4 p-5">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-yellow-600">
                                    {product.category}
                                </p>

                                <h3 className="mt-1 line-clamp-1 text-xl font-extrabold text-neutral-900">
                                    {product.title}
                                </h3>

                                <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex items-end justify-between border-t border-neutral-100 pt-4">
                                <div>
                                    <p className="text-[11px] uppercase tracking-widest text-neutral-400">
                                        Seller
                                    </p>
                                    <p className="font-semibold text-neutral-700">
                                        {product.sellerInfo?.name}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-[11px] uppercase tracking-widest text-neutral-400">
                                        Price
                                    </p>
                                    <p className="text-3xl font-black text-neutral-900">
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