'use client';

import { useEffect, useState } from 'react';
import { CircleDashed } from '@gravity-ui/icons';
import { getOrderByAdmin } from '@/lib/api/admin/getOrderByAdmin';
import { updateOrderStatus } from '@/lib/actions/admin/updateOrderStatus';

export default function AdminOrdersClient() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

  
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");


    const fetchOrders = async (filters = {}) => {
        setLoading(true);
        try {
            const data = await getOrderByAdmin(filters);
            setOrders(data || []);
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

            fetchOrders(queryObj);
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, statusFilter]);

    const updateStatus = async (id, status) => {
        try {
            const result = await updateOrderStatus(id, status);

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
            case 'shipped':
                return <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-blue-500/20">Shipped</span>;
            case 'processing':
                return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-500/20">Processing</span>;
            case 'pending':
                return <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-blue-500/20">Pending</span>;
            case 'cancelled':
                return <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-red-500/20">Cancelled</span>;
            case 'delivered':
                return <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-500/20">Delivered</span>;
            default:
                return <span className="bg-neutral-100 dark:bg-neutral-800 text-xs px-2.5 py-1 rounded-lg text-neutral-600 dark:text-neutral-300 capitalize">{status}</span>;
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
        <div className="ml-5 mt-6 space-y-6 pr-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-neutral-900 dark:text-white">
                    Manage Orders
                </h1>
                <p className="text-gray-500 dark:text-neutral-400 mt-2">
                    Monitor all orders across the platform
                </p>
            </div>

      
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-neutral-900 p-4 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl shadow-sm mx-6">
         
                <div className="relative w-full sm:max-w-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Search by buyer name, email or title..."
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
                        <option value="accepted">🤝 Accepted</option>
                        <option value="processing">⚙️ Processing</option>
                        <option value="shipped">🚀 Shipped</option>
                        <option value="delivered">📦 Delivered</option>
                        <option value="cancelled">❌ Cancelled</option>
                    </select>
                </div>
            </div>

           
            <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-2xl mx-6 bg-white dark:bg-neutral-900 shadow-sm">
                <table className="w-full text-neutral-900 dark:text-neutral-100">
                    <thead className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
                        <tr>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Product</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Buyer</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Seller</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Payment</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Order Status</th>
                            <th className="p-4 text-right text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-950/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={order.productDetails?.images?.[0] || '/placeholder.png'}
                                            alt={order.productDetails?.title}
                                            className="w-12 h-12 rounded-xl object-cover border border-neutral-200/60 dark:border-neutral-800"
                                        />
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm truncate max-w-[160px]">
                                                {order.productDetails?.title || 'Product Deleted'}
                                            </p>
                                            <p className="text-xs text-gray-400 capitalize">
                                                {order.productDetails?.category}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="p-4 text-sm">
                                    <div>
                                        <p className="font-semibold">
                                            {order.buyerInfo?.name || order.buyer?.name || "N/A"}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate max-w-[150px]">
                                            {order.buyerInfo?.email || order.buyer?.email}
                                        </p>
                                    </div>
                                </td>

                                <td className="p-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                    {order.sellerInfo?.name || "Unknown"}
                                </td>

                                <td className="p-4">
                                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 capitalize border border-green-200/30">
                                        {order.paymentStatus}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {getStatusBadge(order.orderStatus)}
                                </td>

                                <td className="p-4">
                                    <div className="flex justify-end gap-2">
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 rounded-xl px-3 py-2 text-xs font-semibold cursor-pointer outline-none focus:border-yellow-400 dark:focus:border-yellow-500 transition duration-200"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {orders.length === 0 && (
                    <div className="text-center py-16 text-gray-500 dark:text-neutral-400">
                        <span className="text-3xl block mb-2">📋</span>
                        No orders found matching the criteria.
                    </div>
                )}
            </div>
        </div>
    );
}