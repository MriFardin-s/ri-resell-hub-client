'use client';

import { useEffect, useState } from 'react';
import { CircleDashed } from '@gravity-ui/icons';
import { getOrderByAdmin } from '@/lib/api/admin/getOrderByAdmin';
import { updateOrderStatus } from '@/lib/actions/admin/updateOrderStatus';

export default function AdminOrdersClient() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const data = await getOrderByAdmin();

            setOrders(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const result = await updateOrderStatus (id, status);

            if (result.success) {
                setOrders((prev) =>
                    prev.map((order) =>
                        order._id === id
                            ? { ...order, orderStatus: status }
                            : order
                    )
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        Pending
                    </span>
                );

            case 'accepted':
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Accepted
                    </span>
                );

            case 'processing':
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        Processing
                    </span>
                );

            case 'shipped':
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700">
                        Shipped
                    </span>
                );

            case 'delivered':
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Delivered
                    </span>
                );

            case 'cancelled':
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        Cancelled
                    </span>
                );

            default:
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        Unknown
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
                    Loading Orders...
                </p>
            </div>
        );
    }


    return (
        <div className=" ml-5 mt-6 space-y-6">

            <div>
                <h1 className="text-3xl font-black">
                    Manage Orders
                </h1>

                <p className="text-gray-500 mt-2">
                    Monitor all orders across the platform
                </p>
            </div>

            <div className="overflow-x-auto border rounded-2xl mx-6 ">
                <table className="w-full">

                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-left">
                                Product
                            </th>

                            <th className="p-4 text-left">
                                Buyer
                            </th>

                            <th className="p-4 text-left">
                                Seller
                            </th>

                            <th className="p-4 text-left">
                                Payment
                            </th>

                            <th className="p-4 text-left">
                                Order Status
                            </th>

                            <th className="p-4 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-t"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={order.productDetails?.images?.[0]}
                                            alt={order.productDetails?.title}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />

                                        <div>
                                            <p className="font-medium">
                                                {order.productDetails?.title ||
                                                    'Product Deleted'}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {order.productDetails?.category}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="p-4">
                                    <div>
                                        <p className="font-medium">
                                            {order.buyerInfo?.name ||
                                                order.buyer?.name}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {order.buyerInfo?.email ||
                                                order.buyer?.email}
                                        </p>
                                    </div>
                                </td>

                                <td className="p-4">
                                    {order.sellerInfo?.name}
                                </td>

                                <td className="p-4">
                                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                        {order.paymentStatus}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {getStatusBadge(
                                        order.orderStatus
                                    )}
                                </td>

                                <td className="p-4">
                                    <div className="flex justify-end gap-2">

                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) =>
                                                updateStatus(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-lg px-3 py-2 text-sm"
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>

                                            <option value="accepted">
                                                Accepted
                                            </option>

                                            <option value="processing">
                                                Processing
                                            </option>

                                            <option value="shipped">
                                                Shipped
                                            </option>

                                            <option value="delivered">
                                                Delivered
                                            </option>

                                            <option value="cancelled">
                                                Cancelled
                                            </option>
                                        </select>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                {orders.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No orders found
                    </div>
                )}
            </div>
        </div>
    );
}