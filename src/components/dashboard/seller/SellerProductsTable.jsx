'use client';
import React, { useState } from 'react';
import { Table } from '@heroui/react';
import { toast } from 'react-hot-toast';
import { Eye, Pencil, TrashBin } from '@gravity-ui/icons';
import Link from 'next/link';
import { deleteProduct } from '@/lib/actions/seller/deleteProduct';
import DeleteConfirmDialog from './DeleteConfirmDialog';


export default function SellerProductsTable({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts || []);
    const [searchTerm, setSearchTerm] = useState('');


    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const filteredProducts = products.filter(product =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const CONDITION_STYLES = {
        new: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
        used: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
        draft: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20",
    };

    const STATUS_STYLES = {
        pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
        available: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
        sold: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
        rejected: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20",
        draft: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20",

    };


    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;
        try {
            setIsDeleting(true);
            const result = await deleteProduct(productToDelete);

            if (result.success) {
                setProducts((prev) =>
                    prev.filter(
                        (p) => (p._id?.$oid || p._id) !== productToDelete
                    )
                );
                toast.success("Product deleted successfully");
                setIsAlertOpen(false);
            } else {
                toast.error(result.message || "Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete");
        } finally {
            setIsDeleting(false);
            setProductToDelete(null);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 bg-amber-50/40 dark:bg-neutral-900/40 p-4 border border-amber-100 dark:border-neutral-800 rounded-xl transition-colors">
                <input
                    type="text"
                    placeholder="Search by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-amber-200 dark:border-neutral-700 text-gray-800 dark:text-neutral-100 text-sm outline-none focus:border-theme-yellow-primary/50 transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-neutral-500"
                />
                <span className="text-xs font-semibold text-gray-600 dark:text-neutral-300 bg-white dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-neutral-700 shadow-sm transition-colors">
                    Total: {filteredProducts.length} items
                </span>
            </div>

            <div className="border border-amber-100 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm transition-colors">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Seller products management table" className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
                            <Table.Header>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500 dark:text-neutral-400">Image</Table.Column>
                                <Table.Column isRowHeader className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500 dark:text-neutral-400">Product Name</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500 dark:text-neutral-400">Category</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500 dark:text-neutral-400">Condition</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500 dark:text-neutral-400">Price</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500 dark:text-neutral-400">Stock</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500 dark:text-neutral-400">Status</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500 dark:text-neutral-400">Actions</Table.Column>
                            </Table.Header>
                            <Table.Body emptyContent="No products found.">
                                {filteredProducts.map((product) => {
                                    const id = product._id?.$oid || product._id;
                                    return (
                                        <Table.Row key={id} className="border-b border-amber-5 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-yellow-50/30 dark:hover:bg-neutral-800/50 transition-colors">
                                            <Table.Cell className="p-4 text-center">
                                                <img
                                                    src={product.images?.[0] || 'https://placehold.co/50'}
                                                    alt={product.title}
                                                    className="w-12 h-12 object-cover rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm mx-auto"
                                                />
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center max-w-[200px] truncate">
                                                <div className="font-bold text-gray-900 dark:text-neutral-100 text-sm tracking-tight">{product.title}</div>
                                                <div className="text-[11px] text-gray-400 dark:text-neutral-500 font-mono mt-0.5">{id}</div>
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-neutral-300 capitalize">
                                                {product.category}
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center text-sm">
                                                <span className={`px-2.5 py-1 text-xs rounded-lg font-bold tracking-wide inline-block ${CONDITION_STYLES[product.condition?.toLowerCase()] || CONDITION_STYLES.draft}`}>
                                                    {product.condition}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center text-sm font-extrabold text-gray-900 dark:text-neutral-100">
                                                ${product.price?.toLocaleString()}
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center text-sm font-bold text-gray-700 dark:text-neutral-300 font-mono">
                                                {product.stock}
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center text-sm">
                                                <span className={`px-2.5 py-1 text-xs rounded-full font-bold tracking-wide inline-block ${STATUS_STYLES[product.status?.toLowerCase()] || STATUS_STYLES.draft}`}>
                                                    {product.status}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={`/products/${product._id}`}
                                                        className="px-3 py-1.5 text-xs font-bold bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-300 transition-all"
                                                    >
                                                        <Eye />
                                                    </Link>
                                                    <Link
                                                        href={`/dashboard/seller/products/edit/${id}`}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                                                    >
                                                        <Pencil />
                                                    </Link>


                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setProductToDelete(id);
                                                            setIsAlertOpen(true);
                                                        }}
                                                        className="px-3 py-1.5 text-xs font-bold bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-all"
                                                    >
                                                        <TrashBin />
                                                    </button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>


            <DeleteConfirmDialog
                isOpen={isAlertOpen}
                onOpenChange={setIsAlertOpen}
                onConfirm={handleDeleteConfirm}
                isCancelling={isDeleting}
            />
        </div>
    );
}