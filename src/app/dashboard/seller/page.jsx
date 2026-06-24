'use client';

import React, { useEffect, useState } from 'react';
import StatsGrid from '@/components/dashboard/StatsGrid';
import { useSession } from '@/lib/auth-client';
import { Box, Clock, CrownDiamond, ShoppingBag } from '@gravity-ui/icons';
import { getSellerStats } from '@/lib/api/seller/sellerStats';

const SellerHomePage = () => {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerStats = async () => {
      try {
        if (!user?.id) return;

        const data = await getSellerStats(user.id)

     

        setStats({
          totalProducts: data.totalProducts || 0,
          totalSales: data.totalSales || 0,
          totalRevenue: data.totalRevenue || 0,
          pendingOrders: data.pendingOrders || 0,
        });
      } catch (error) {
        console.error('Failed to fetch seller stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerStats();
  }, [user?.id]);

  const sellerStats = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Box,
      change: 'Listed products',
    },
    {
      title: 'Total Sales',
      value: stats.totalSales,
      icon: ShoppingBag,
      change: 'Completed sales',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: CrownDiamond,
      change: 'Total earnings',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      change: 'Needs attention',
    },
  ];

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100 p-6 lg:p-10 space-y-8 relative overflow-hidden transition-colors">
      {/* Background */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.08),transparent_60%)] pointer-events-none" />

      {/* Header */}
      <div className="space-y-2 relative z-10">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
          Welcome,{' '}
          <span className="text-yellow-600 dark:text-yellow-400">
            {user?.name}
          </span>
          !
        </h1>

        <p className="text-xs lg:text-sm text-neutral-500 dark:text-neutral-400 font-semibold tracking-wide uppercase">
          Resell Hub Smart Dashboard Overview
        </p>
      </div>

      {/* Stats */}
      <div className="relative z-10">
        <StatsGrid statsData={sellerStats} />
      </div>
    </div>
  );
};

export default SellerHomePage;