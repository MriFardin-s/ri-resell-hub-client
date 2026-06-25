'use client';

import { CircleDashed } from '@gravity-ui/icons';
import { useEffect, useState } from 'react';

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  accepted: 'bg-blue-100 text-blue-700 border border-blue-200',
  processing: 'bg-purple-100 text-purple-700 border border-purple-200',
  shipped: 'bg-green-100 text-green-700 border border-green-200',
  delivered: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  cancelled: 'bg-red-100 text-red-700 border border-red-200',
};

export default function SellerOrdersClient({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/seller/orders/${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.id]);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${orderId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json();

      if (result.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, orderStatus: status } : order
          )
        );
      }
    } catch (error) {
      console.error(error);
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

  if (!orders.length) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold text-gray-700">No Orders Found</h3>
        <p className="text-gray-500 mt-2">You do not have any incoming orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mx-5">
      <div>
        <h1 className="text-3xl font-black text-gray-900 mt-6">Manage Orders</h1>
        <p className="text-gray-500 mt-1">Handle incoming customer orders</p>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {order.productTitle}
                    </h2>
                    <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900">Buyer Information</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Name:</span> {order.buyerInfo?.name || 'Unknown'}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> {order.buyerInfo?.email}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {order.buyerInfo?.phone}
                        </p>
                        <p>
                          <span className="font-medium">Address:</span> {order.buyerInfo?.address}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900">Order Information</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Amount:</span> ${order.price}
                        </p>
                        <p>
                          <span className="font-medium">Payment:</span> {order.paymentStatus}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 min-w-[220px]">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold text-center ${
                      STATUS_STYLES[order.orderStatus?.toLowerCase()] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {order.orderStatus === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(order._id, 'accepted')}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatus(order._id, 'cancelled')}
                          className="px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {order.orderStatus === 'accepted' && (
                      <button
                        onClick={() => updateStatus(order._id, 'processing')}
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
                      >
                        Processing
                      </button>
                    )}

                    {order.orderStatus === 'processing' && (
                      <button
                        onClick={() => updateStatus(order._id, 'shipped')}
                        className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
                      >
                        Ship Order
                      </button>
                    )}

                    {order.orderStatus === 'shipped' && (
                      <button
                        onClick={() => updateStatus(order._id, 'delivered')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}