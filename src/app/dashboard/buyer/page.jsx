'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from "@heroui/react";
import { ShoppingBag, Heart, ArrowRight, Clock, CircleDashed } from '@gravity-ui/icons';
import { toast } from 'react-hot-toast';
import { getBuyerDashboard } from '@/lib/api/getBuyerDashboard';
import { useSession } from '@/lib/auth-client';

export default function BuyerDashboardHome() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const currentUserMail = user?.email;

  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    wishlistCount: 0,
    recentPurchases: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (isPending || !currentUserMail) return;

    const fetchDashboardSummary = async () => {
      try {
        setLoading(true);
        const res = await getBuyerDashboard(currentUserMail);

        if (res && res.success) {
          setDashboardData({
            totalOrders: res.totalOrders || 0,
            wishlistCount: res.wishlistCount || 0,
            recentPurchases: res.recentPurchases || [],
          });
        } else {
          toast.error("Failed to load dashboard activities");
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast.error("Connection error! Could not retrieve summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, [currentUserMail, isPending]);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
      case 'processing':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
      case 'delivered':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20';
      default:
        return 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20';
    }
  };


  if (isPending || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <CircleDashed className="w-8 h-8 text-yellow-500 animate-spin" />
        <p className="text-sm font-medium text-neutral-500 animate-pulse">Loading dashboard activities...</p>
      </div>
    );
  }


  if (!currentUserMail) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center py-12 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <p className="text-red-500 font-semibold">Access Denied</p>
        <p className="text-sm text-neutral-500 mt-1">Please log in to view your dashboard analytics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          Hi {user?.name}!
        </h1>
        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">
          Here is a summary of your recent marketplace activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm rounded-2xl">
          <Card.Header className="p-6 pb-0">
            <Card.Title className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-neutral-500">
              Total Orders
            </Card.Title>
          </Card.Header>
          <Card.Content className="p-6 pt-2 flex items-center justify-between">
            <span className="text-3xl font-black text-gray-900 dark:text-white">
              {dashboardData.totalOrders}
            </span>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-600 dark:text-blue-400">
              <ShoppingBag width={28} height={28} />
            </div>
          </Card.Content>
        </Card>

        <Card className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm rounded-2xl">
          <Card.Header className="p-6 pb-0">
            <Card.Title className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-neutral-500">
              Wishlist Count
            </Card.Title>
          </Card.Header>
          <Card.Content className="p-6 pt-2 flex items-center justify-between">
            <span className="text-3xl font-black text-gray-900 dark:text-white">
              {dashboardData.wishlistCount}
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
              href="/dashboard/buyer/my-orders"
              className="text-sm font-bold text-theme-yellow-primary hover:underline flex items-center gap-1 transition"
            >
              View All Orders <ArrowRight width={16} height={16} />
            </Link>
          </Card.Description>
        </Card.Header>
        <Card.Content className="p-0">
          {dashboardData.recentPurchases.length === 0 ? (
            <div className="p-12 text-center text-sm font-medium text-gray-500 dark:text-neutral-400">
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
                  {dashboardData.recentPurchases.map((purchase) => (
                    <tr key={purchase._id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/30 transition">
                      <td className="p-4 font-bold text-gray-800 dark:text-neutral-100 max-w-xs truncate">
                        {purchase.productName}
                      </td>
                      <td className="p-4 text-gray-900 dark:text-neutral-200 font-extrabold">
                        ${purchase.price?.toLocaleString()}
                      </td>
                      <td className="p-4 text-gray-500 dark:text-neutral-400 font-medium">
                        {purchase.date ? new Date(purchase.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'N/A'}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${getStatusClass(purchase.orderStatus)}`}>
                          {purchase.orderStatus || 'Pending'}
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