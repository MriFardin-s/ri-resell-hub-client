'use client';

import { useEffect, useState } from 'react';
import {
    AlertDialog,
    Button,
} from '@heroui/react';
import { CircleDashed } from '@gravity-ui/icons';
import { getAllProducts } from '@/lib/api/admin/getAllProducts';
import { updateProductStatus } from '@/lib/actions/admin/updateProductStatus';
import { deleteProduct } from '@/lib/actions/admin/deleteProduct';

export default function AdminProductsClient() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);


    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchProducts = async (filters = {}) => {
        setLoading(true);
        try {
        
            const data = await getAllProducts(filters);

         
            const targetProducts = data?.products && Array.isArray(data.products) ? data.products : (Array.isArray(data) ? data : []);
            setProducts(targetProducts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const queryObj = {};

            if (searchQuery && searchQuery.trim() !== "") {
                queryObj.search = searchQuery;
            }

            if (statusFilter && statusFilter !== "all") {
                queryObj.status = statusFilter;
            }

            fetchProducts(queryObj);
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, statusFilter]);

    const handleStatus = async (id, action) => {
        try {
            const result = await updateProductStatus(id, action);

            if (result.success) {
                setProducts((prev) =>
                    prev.map((product) =>
                        product._id === id
                            ? {
                                ...product,
                                status: action === "approve" ? "available" : "rejected",
                            }
                            : product
                    )
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const result = await deleteProduct(deleteId);

            if (result.success) {
                setProducts((prev) => prev.filter((product) => product._id !== deleteId));
            }

            setIsOpen(false);
            setDeleteId(null);
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'available':
                return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400">Approved</span>;
            case 'rejected':
                return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400">Rejected</span>;
            default:
                return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400">Pending</span>;
        }
    };

    return (
        <div className="ml-5 mt-6 space-y-6 pr-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-neutral-900 dark:text-white">
                    Manage Products
                </h1>
                <p className="text-gray-500 dark:text-neutral-400 mt-2">
                    Review and moderate all product listings
                </p>
            </div>

          
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-neutral-900 p-4 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl shadow-sm">
           
                <div className="relative w-full sm:max-w-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Search by title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-yellow-400 dark:focus:border-yellow-500 outline-none transition duration-200 text-neutral-900 dark:text-white"
                    />
                </div>

                <div className="w-full sm:w-48">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:border-yellow-400 dark:focus:border-yellow-500 outline-none transition duration-200 text-neutral-900 dark:text-white font-medium cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">⏳ Pending</option>
                        <option value="available">✅ Approved</option>
                        <option value="rejected">❌ Rejected</option>
                    </select>
                </div>
            </div>

      
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <div className="relative">
                        <CircleDashed className="w-10 h-10 text-yellow-500 animate-spin" />
                        <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
                    </div>
                    <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 animate-pulse tracking-wide">
                        Loading Products...
                    </p>
                </div>
            ) : products.length === 0 ? (
                <div className="border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl p-16 text-center text-gray-500 dark:text-neutral-400 bg-white dark:bg-neutral-900">
                    <span className="text-3xl block mb-2">📦</span>
                    No products found matching the criteria.
                </div>
            ) : (
                <div className="overflow-x-auto border border-neutral-200/60 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm">
                    <table className="w-full text-neutral-900 dark:text-neutral-100">
                        <thead className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
                            <tr>
                                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Product</th>
                                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Seller</th>
                                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Price</th>
                                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Stock</th>
                                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Status</th>
                                <th className="p-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-950/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.images?.[0] || '/placeholder.png'}
                                                alt={product.title}
                                                className="w-12 h-12 rounded-xl object-cover border border-neutral-200/60 dark:border-neutral-800"
                                            />
                                            <div className="min-w-0">
                                                <p className="font-semibold text-sm truncate max-w-[180px]">
                                                    {product.title}
                                                </p>
                                                <p className="text-xs text-gray-400 capitalize">
                                                    {product.category}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        {product.sellerInfo?.name || "Unknown"}
                                    </td>
                                    <td className="p-4 text-sm font-bold text-neutral-900 dark:text-white">
                                        ${product.price}
                                    </td>
                                    <td className="p-4 text-sm text-neutral-600 dark:text-neutral-400">
                                        {product.stock}
                                    </td>
                                    <td className="p-4">
                                        {getStatusBadge(product.status)}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            {product.status !== 'available' && (
                                                <button
                                                    onClick={() => handleStatus(product._id, 'approve')}
                                                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-green-500 hover:bg-green-600 text-white transition-all shadow-sm"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {product.status !== 'rejected' && (
                                                <button
                                                    onClick={() => handleStatus(product._id, 'reject')}
                                                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-sm"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setDeleteId(product._id);
                                                    setIsOpen(true);
                                                }}
                                                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog>
                            <AlertDialog.Header>
                                <AlertDialog.Heading>Delete Product</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                Are you sure you want to permanently delete this product? This action cannot be undone.
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button variant="bordered" onPress={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl"
                                    onPress={handleDelete}
                                >
                                    Delete
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
}