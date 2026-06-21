'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from "@heroui/react";
import { ShoppingBag, Heart, ArrowRight, Clock } from '@gravity-ui/icons';

export default function BuyerDashboardHome() {
  const stats = {
    totalOrders: 5,
    wishlistCount: 3,
  };

  const recentPurchases = [
    {
      _id: "order001",
      productName: "Used Dell Inspiron 15 Laptop",
      price: 35000,
      date: "2026-06-15",
      orderStatus: "processing" 
    },
    {
      _id: "order002",
      productName: "Nike Air Max 90",
      price: 4500,
      date: "2026-06-10",
      orderStatus: "delivered"
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-neutral-400';
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Buyer!</h1>
        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">Here is a summary of your recent marketplace activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm rounded-2xl">
          <Card.Header className="p-6 pb-0">
            <Card.Title className="text-sm font-medium text-gray-500 dark:text-neutral-400">
              Total Orders
            </Card.Title>
          </Card.Header>
          <Card.Content className="p-6 pt-2 flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalOrders}
            </span>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-600 dark:text-blue-400">
              <ShoppingBag width={28} height={28} />
            </div>
          </Card.Content>
        </Card>

        <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm rounded-2xl">
          <Card.Header className="p-6 pb-0">
            <Card.Title className="text-sm font-medium text-gray-500 dark:text-neutral-400">
              Wishlist Count
            </Card.Title>
          </Card.Header>
          <Card.Content className="p-6 pt-2 flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.wishlistCount}
            </span>
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-rose-600 dark:text-rose-400">
              <Heart width={28} height={28} />
            </div>
          </Card.Content>
        </Card>
      </div>

      <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm rounded-2xl overflow-hidden">
        <Card.Header className="p-6 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between flex-row space-y-0">
          <Card.Title className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
            <Clock width={20} height={20} className="text-gray-500" />
            Recent Purchases
          </Card.Title>
          <Card.Description>
            <Link 
              href="/dashboard/buyer/orders" 
              className="text-sm font-semibold text-theme-yellow-primary hover:underline flex items-center gap-1 transition"
            >
              View All Orders <ArrowRight width={16} height={16} />
            </Link>
          </Card.Description>
        </Card.Header>
        <Card.Content className="p-0">
          {recentPurchases.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-neutral-400">
              You have not purchased anything yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-neutral-800/50 text-gray-600 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider border-b border-gray-100 dark:border-neutral-800">
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Purchase Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-sm">
                  {recentPurchases.map((purchase) => (
                    <tr key={purchase._id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/30 transition">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white max-w-xs truncate">
                        {purchase.productName}
                      </td>
                      <td className="p-4 text-gray-700 dark:text-neutral-300 font-medium">
                        ${purchase.price.toLocaleString()}
                      </td>
                      <td className="p-4 text-gray-500 dark:text-neutral-400">
                        {purchase.date}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${getStatusClass(purchase.orderStatus)}`}>
                          {purchase.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}