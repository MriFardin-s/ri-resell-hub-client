'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { TextField, Label, InputGroup } from '@heroui/react';
import { Pagination } from "@heroui/react";
import { Magnifier, CircleXmarkFill } from '@gravity-ui/icons';
import { useRouter } from 'next/navigation';

export default function ProductExploreSection({ products, filters, total }) {
    const [search, setSearch] = useState(filters.search || "");
    const [category, setCategory] = useState(filters.category || "all");
    const [condition, setCondition] = useState(filters.condition || "all");
    const [sort, setSort] = useState(filters.sort || "default");
    const [page, setPage] = useState(filters.page || 1);

    const categories = [
        "all",
        ...new Set(
            (products || [])
                .map((p) => p.category?.toLowerCase())
                .filter(Boolean)
        ),
    ];

    const router = useRouter();

    const totalItems = total;
    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];

        pages.push(1);

        if (page > 3) pages.push("ellipsis");

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < totalPages - 2) {
            pages.push("ellipsis");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    useEffect(() => {
        const sp = new URLSearchParams();

        if (search) {
            sp.set("search", search);
        }

        if (category !== "all") {
            sp.set("category", category);
        }

        if (condition !== "all") {
            sp.set("condition", condition);
        }

        if (sort !== "default") {
            sp.set("sort", sort);
        }

        if (page > 1) {
            sp.set("page", page);
        }

        router.push(`/products?${sp.toString()}`);
    }, [search, category, condition, sort, page, router]);

    useEffect(() => {
        setPage(1);
    }, [search, category, condition, sort]);

    const handleReset = () => {
        setSearch("");
        setCategory("all");
        setCondition("all");
        setSort("default");
        setPage(1);
    };

    return (
        <>
            <div className="bg-white dark:bg-neutral-900 border border-amber-100 dark:border-neutral-800 rounded-3xl shadow-sm p-6 mb-8 transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-end">

                    <div>
                        <TextField>
                            <Label className="text-xs font-bold text-gray-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">Search Product</Label>
                            <InputGroup className="bg-gray-50 dark:bg-neutral-800/40 border border-gray-200 dark:border-neutral-800 rounded-xl h-11 flex items-center overflow-hidden focus-within:border-theme-yellow-primary transition-all">
                                <InputGroup.Prefix className="pl-3 text-gray-400 dark:text-neutral-500 flex items-center">
                                    <Magnifier className="w-4 h-4" />
                                </InputGroup.Prefix>
                                <InputGroup.Input
                                    placeholder="Type to search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full h-full px-3 text-sm bg-transparent outline-none text-gray-800 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500"
                                />
                            </InputGroup>
                        </TextField>
                    </div>

                    <div>
                        <Label className="text-xs font-bold text-gray-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">Category</Label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full h-11 px-3 bg-gray-50 dark:bg-neutral-800/40 border border-gray-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-theme-yellow-primary focus:bg-white dark:focus:bg-neutral-900 capitalize text-gray-800 dark:text-neutral-100 transition-all cursor-pointer"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat} className="dark:bg-neutral-900">{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Label className="text-xs font-bold text-gray-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">Condition</Label>
                        <select
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="w-full h-11 px-3 bg-gray-50 dark:bg-neutral-800/40 border border-gray-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-theme-yellow-primary focus:bg-white dark:focus:bg-neutral-900 capitalize text-gray-800 dark:text-neutral-100 transition-all cursor-pointer"
                        >
                            <option value="all" className="dark:bg-neutral-900">All Conditions</option>
                            <option value="new" className="dark:bg-neutral-900">New</option>
                            <option value="used" className="dark:bg-neutral-900">Used</option>
                            <option value="refurbished" className="dark:bg-neutral-900">Refurbished</option>
                        </select>
                    </div>

                    <div>
                        <Label className="text-xs font-bold text-gray-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">Sort By Price</Label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full h-11 px-3 bg-gray-50 dark:bg-neutral-800/40 border border-gray-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-theme-yellow-primary focus:bg-white dark:focus:bg-neutral-900 text-gray-800 dark:text-neutral-100 transition-all cursor-pointer"
                        >
                            <option value="default" className="dark:bg-neutral-900">Default Sorting</option>
                            <option value="price_asc" className="dark:bg-neutral-900">Price Low to High</option>
                            <option value="price_desc" className="dark:bg-neutral-900">Price High to Low</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="w-full h-11 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-200 font-semibold rounded-xl text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <CircleXmarkFill className="w-4 h-4" />
                            Clear Filters
                        </button>
                    </div>

                </div>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 rounded-3xl border border-dashed border-gray-200 dark:border-neutral-800 transition-colors duration-300">
                    No products available matching your criteria.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id?.$oid || product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-10">
                    <Pagination className="w-full">
                        <Pagination.Summary>
                            Showing {startItem}-{endItem} of {totalItems} products
                        </Pagination.Summary>

                        <Pagination.Content>
                            <Pagination.Item>
                                <Pagination.Previous
                                    isDisabled={page === 1}
                                    onPress={() => setPage((p) => p - 1)}
                                >
                                    <Pagination.PreviousIcon />
                                    <span>Previous</span>
                                </Pagination.Previous>
                            </Pagination.Item>

                            {getPageNumbers().map((p, i) =>
                                p === "ellipsis" ? (
                                    <Pagination.Item key={i}>
                                        <Pagination.Ellipsis />
                                    </Pagination.Item>
                                ) : (
                                    <Pagination.Item key={p}>
                                        <Pagination.Link
                                            isActive={page === p}
                                            onPress={() => setPage(p)}
                                        >
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                )
                            )}

                            <Pagination.Item>
                                <Pagination.Next
                                    isDisabled={page === totalPages}
                                    onPress={() => setPage((p) => p + 1)}
                                >
                                    <span>Next</span>
                                    <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                    </Pagination>
                </div>
            )}
        </>
    );
}