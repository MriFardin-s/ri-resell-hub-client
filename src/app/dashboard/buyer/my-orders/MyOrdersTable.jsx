'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, TrashBin, ArrowRotateRight, CircleDashed } from '@gravity-ui/icons';
import Image from 'next/image';
import { getMyOrders } from '@/lib/api/orders';
import { toast } from 'react-hot-toast';
import CancelOrderDialog from './CancelOrderDialog'; 

export default function MyOrdersTable({ currentUserMail }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const fetchMyOrders = async (isRefresh = false) => {
    if (!currentUserMail) return;
    try {
      setLoading(true);
      const res = await getMyOrders(currentUserMail);
      
      if (res && res.ok) {
        const data = await res.json();
        setOrders(data);
        if (isRefresh) toast.success("Orders updated successfully!");
      } else if (Array.isArray(res)) {
        setOrders(res);
        if (isRefresh) toast.success("Orders updated successfully!");
      } else {
        toast.error("Failed to fetch latest orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserMail) {
      fetchMyOrders();
    }
  }, [currentUserMail]);

  const handleCancelOrder = async (orderId) => {
    try {
      setActionLoading(orderId);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${orderId}/cancel`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      if (res.ok) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, orderStatus: 'cancelled' } : order
          )
        );
        toast.success(data.message || "Order cancelled successfully!");
        return true; 
      } else {
        toast.error(data.message || "Failed to cancel order");
        return false;
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Something went wrong while cancelling the order!");
      return false;
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-green-500/20">Accepted</span>;
      case 'processing':
        return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-500/20">Processing</span>;
      case 'pending':
        return <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-blue-500/20">Pending</span>;
      case 'cancelled':
        return <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-red-500/20">Cancelled</span>;
      default:
        return <span className="bg-neutral-100 dark:bg-neutral-800 text-xs px-2.5 py-1 rounded-lg">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2">
        <CircleDashed className="w-8 h-8 text-yellow-500 animate-spin" />
        <p className="text-sm font-medium text-neutral-500 animate-pulse">Loading your orders...</p>
      </div>
    );
  }

  if (!currentUserMail) {
    return (
      <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
        <p className="text-red-500 font-semibold">Access Denied</p>
        <p className="text-sm text-neutral-500 mt-1">Please log in to view your orders.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-theme-yellow-primary" />
            My Orders
          </h1>
          <p className="text-sm text-neutral-500 dark:text-gray-400 mt-1">
            Manage and track all your purchased items in one place.
          </p>
        </div>
        <button 
          onClick={() => fetchMyOrders(true)}
          className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 text-xs font-medium bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition hover:bg-neutral-50 dark:hover:bg-neutral-700/50 gap-2 self-start sm:self-center"
        >
          <ArrowRotateRight className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700/60 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-base font-bold text-neutral-700 dark:text-neutral-300">No orders found</p>
          <p className="text-xs text-neutral-400 mt-1">You have not bought any products yet!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700/60 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-900/60 text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                  <th className="p-4 font-semibold text-sm">Product Info</th>
                  <th className="p-4 font-semibold text-sm">Seller</th>
                  <th className="p-4 font-semibold text-sm">Price</th>
                  <th className="p-4 font-semibold text-sm">Order Status</th>
                  <th className="p-4 font-semibold text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700/50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 dark:border-neutral-700 shrink-0">
                          <Image 
                            src={order.productImage} 
                            alt={order.productTitle} 
                            fill 
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="max-w-[200px] md:max-w-[300px]">
                          <p className="font-bold text-sm text-neutral-800 dark:text-neutral-100 truncate">{order.productTitle}</p>
                          <p className="text-[11px] text-neutral-400 font-mono mt-0.5 truncate">ID: {order.productId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{order.sellerInfo?.name}</p>
                      <p className="text-xs text-neutral-400">{order.sellerInfo?.email}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                        ${order.productPrice?.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(order.orderStatus)}
                    </td>
                    <td className="p-4 text-right">
                      {(order.orderStatus === 'pending' || order.orderStatus === 'processing') ? (
                        <button
                          onClick={() => {
                            setOrderToCancel(order._id);
                            setIsAlertOpen(true);
                          }}
                          className="inline-flex h-8 items-center justify-center text-xs font-semibold px-3 rounded-xl border border-red-200 dark:border-red-900/50 text-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 transition gap-1.5"
                        >
                          <TrashBin className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-neutral-400 italic">No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CancelOrderDialog 
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        isCancelling={actionLoading === orderToCancel}
        onConfirm={async () => {
          const success = await handleCancelOrder(orderToCancel);
          if (success) {
            setIsAlertOpen(false); 
          }
        }}
      />
    </>
  );
}