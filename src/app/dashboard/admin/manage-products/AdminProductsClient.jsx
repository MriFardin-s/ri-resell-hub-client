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
    const [deleteId, setDeleteId] =
        useState(null);

    const [isOpen, setIsOpen] =
        useState(false);



    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);



    const handleStatus = async (id, action) => {
        try {
            const result = await updateProductStatus(id, action);

            if (result.success) {
                setProducts((prev) =>
                    prev.map((product) =>
                        product._id === id
                            ? {
                                ...product,
                                status:
                                    action === "approve"
                                        ? "available"
                                        : "rejected",
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
                setProducts((prev) =>
                    prev.filter(
                        (product) => product._id !== deleteId
                    )
                );
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
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Approved
                    </span>
                );

            case 'rejected':
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        Rejected
                    </span>
                );

            default:
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        Pending
                    </span>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="relative">

                    <CircleDashed className="w-10 h-10 text-yellow-500 animate-spin" />


                    <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
                </div>

                <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 animate-pulse tracking-wide">
                    Loading Products...
                </p>
            </div>
        );
    }


    return (
        <div className="ml-5 mt-6 space-y-6">

            <div>
                <h1 className="text-3xl font-black">
                    Manage Products
                </h1>

                <p className="text-gray-500 mt-2">
                    Review and moderate all product listings
                </p>
            </div>

            {products.length === 0 ? (
                <div className="border rounded-2xl p-10 text-center text-gray-500 ">
                    No products found
                </div>
            ) : (
                <div className="overflow-x-auto border rounded-2xl mx-6">

                    <table className="w-full">

                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-left">Product</th>
                                <th className="p-4 text-left">Seller</th>
                                <th className="p-4 text-left">Price</th>
                                <th className="p-4 text-left">Stock</th>

                                <th className="p-4 text-left">
                                    Status
                                </th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (

                                <tr
                                    key={product._id}
                                    className="border-t"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">

                                            <img
                                                src={
                                                    product.images?.[0] ||
                                                    '/placeholder.png'
                                                }
                                                alt={product.title}
                                                className="w-14 h-14 rounded-lg object-cover"
                                            />

                                            <div>
                                                <p className="font-semibold">
                                                    {product.title}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    {product.category}
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    <td className="p-4">
                                        {product.sellerInfo?.name}
                                    </td>

                                    <td className="p-4">
                                        ${product.price}
                                    </td>

                                    <td className="p-4">
                                        {product.stock}
                                    </td>

                                    <td className="p-4">
                                        {getStatusBadge(product.status)}
                                    </td>

                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">

                                            {product.status !== 'available' && (
                                                <button
                                                    onClick={() =>
                                                        handleStatus(
                                                            product._id,
                                                            'approve'
                                                        )
                                                    }
                                                    className="px-3 py-2 rounded-lg bg-green-600 text-white"
                                                >
                                                    Approve
                                                </button>
                                            )}

                                            {product.status !== 'rejected' && (
                                                <button
                                                    onClick={() =>
                                                        handleStatus(
                                                            product._id,
                                                            'reject'
                                                        )
                                                    }
                                                    className="px-3 py-2 rounded-lg bg-yellow-500 text-white"
                                                >
                                                    Reject
                                                </button>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setDeleteId(product._id);
                                                    setIsOpen(true);
                                                }}
                                                className="px-3 py-2 rounded-lg bg-red-600 text-white"
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
            <AlertDialog
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            >
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog>

                            <AlertDialog.Header>
                                <AlertDialog.Heading>
                                    Delete Product
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                Are you sure you want to
                                permanently delete this
                                product? This action
                                cannot be undone.
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    variant="bordered"
                                    onPress={() =>
                                        setIsOpen(false)
                                    }
                                >
                                    Cancel
                                </Button>

                                <Button
                                    className="bg-red-500 hover:bg-red-600 text-white font-medium"
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