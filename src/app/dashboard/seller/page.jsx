'use client';
import StatsGrid from '@/components/dashboard/StatsGrid';
import PendingOverlay from '@/components/PendingOverlay';

import { useSession } from '@/lib/auth-client';
import { Box, Clock, CrownDiamond, ShoppingBag } from '@gravity-ui/icons';
import React from 'react';

const SellerHomePage = () => {
  const sellerStats = [
    {
      title: 'Total Products',
      value: '124',
      icon: Box,
      change: '12 newly added this month'
    },
    {
      title: 'Total Sales',
      value: '48',
      icon: ShoppingBag,
      change: '+8% increase from last week'
    },
    {
      title: 'Total Revenue',
      value: '$45,200',
      icon: CrownDiamond,
      change: 'Completed earnings'
    },
    {
      title: 'Pending Orders',
      value: '5',
      icon: Clock,
      change: 'Needs immediate action'
    },
  ];

  const { data: session, isPending } = useSession();

  const user = session?.user;

  return (
    <div className="min-h-screen text-gray-800 p-6 lg:p-10 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.08),transparent_60%)] pointer-events-none" />

      <div className="space-y-2 relative z-10">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
          Welcome, <span className="text-yellow-600">{user?.name}</span>!
        </h1>
        <p className="text-xs lg:text-sm text-gray-500 font-semibold tracking-wide uppercase">
          Resell Hub Smart Dashboard Overview
        </p>
      </div>

      <div className="relative z-10">
        <StatsGrid statsData={sellerStats} />
      </div>
    </div>
  );
};

export default SellerHomePage;