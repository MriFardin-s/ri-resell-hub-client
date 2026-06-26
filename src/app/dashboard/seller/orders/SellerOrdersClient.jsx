'use client';

import { Card } from "@heroui/react";
import { updateSellerStatus } from '@/lib/actions/seller/updateSellerOrderStatus';
import { getSellerOrder } from '@/lib/api/seller/sellerManageOrder';
import { CircleDashed } from '@gravity-ui/icons';
import { useEffect, useState } from 'react';

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  accepted: "bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400",
  processing: "bg-[#F3E8FF] text-[#9333EA] dark:bg-purple-950/40 dark:text-purple-400", 
  shipped: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  delivered: "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
};

export default function SellerOrdersClient({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchOrders = async () => {
      try {
        const data = await getSellerOrder(user.id);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const updateStatus = async (orderId, status) => {
    try {
      const result = await updateSellerStatus(orderId, status);

      if (result.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: status }
              : order
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 min-h-[50vh]">
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
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">No Orders Found</h3>
        <p className="text-neutral-500 mt-2">You do not have any incoming orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-neutral-900 dark:text-white">Manage Orders</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">Handle incoming customer orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card
            key={order._id}
            className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 rounded-[22px] shadow-sm dark:shadow-none transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
             
              <div className="lg:col-span-9 space-y-5">
               
                <div>
                  <Card.Header className="p-0 flex flex-col items-start gap-0.5">
                    <Card.Title className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                      {order.productTitle}
                    </Card.Title>
                    <Card.Description className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                      Order ID: {order._id}
                    </Card.Description>
                  </Card.Header>
                </div>

            
                <Card.Content className="p-0 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-2.5">
                      Buyer Information
                    </h3>
                    <div className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                      <p><span className="text-neutral-400 dark:text-neutral-500">Name:</span> {order.buyerInfo?.name || "Unknown"}</p>
                      <p><span className="text-neutral-400 dark:text-neutral-500">Email:</span> {order.buyerInfo?.email}</p>
                      <p><span className="text-neutral-400 dark:text-neutral-500">Phone:</span> {order.buyerInfo?.phone}</p>
                      <p><span className="text-neutral-400 dark:text-neutral-500">Address:</span> {order.buyerInfo?.address}</p>
                    </div>
                  </div>

                
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-2.5">
                      Order Information
                    </h3>
                    <div className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                      <p><span className="text-neutral-400 dark:text-neutral-500">Amount:</span> ${order.price}</p>
                      <p><span className="text-neutral-400 dark:text-neutral-500">Payment:</span> {order.paymentStatus}</p>
                      <p>
                        <span className="text-neutral-400 dark:text-neutral-500">Date:</span>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card.Content>
              </div>

             
              <Card.Footer className="p-0 lg:col-span-3 flex flex-col items-stretch lg:items-end gap-3 self-center w-full lg:w-auto">
                
                <span
                  className={`w-full lg:w-40 text-center py-2 rounded-full text-xs font-semibold tracking-wide border-none ${
                    STATUS_STYLES[order.orderStatus?.toLowerCase()] || "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {order.orderStatus?.toLowerCase()}
                </span>

                <div className="w-full lg:w-40 flex flex-col gap-2">
                  {order.orderStatus === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(order._id, "accepted")}
                        className="w-full py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm transition-colors shadow-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(order._id, "cancelled")}
                        className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {order.orderStatus === "accepted" && (
                    <button
                      onClick={() => updateStatus(order._id, "processing")}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm"
                    >
                      Processing
                    </button>
                  )}

                  {order.orderStatus === "processing" && (
                    <button
                      onClick={() => updateStatus(order._id, "shipped")}
                      className="w-full py-2.5 rounded-xl bg-[#00B048] hover:bg-[#00963D] text-white font-bold text-sm transition-colors shadow-sm" 
                    >
                      Ship Order
                    </button>
                  )}

                  {order.orderStatus === "shipped" && (
                    <button
                      onClick={() => updateStatus(order._id, "delivered")}
                      className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-colors shadow-sm"
                    >
                      Mark Delivered
                    </button>
                  )}
                </div>
              </Card.Footer>

            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}