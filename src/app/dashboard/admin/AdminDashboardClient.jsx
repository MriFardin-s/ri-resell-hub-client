'use client';

import { useEffect, useState } from 'react';
import { CircleDashed, LifeRing, Persons, ShoppingBag } from '@gravity-ui/icons';
import { Card } from "@heroui/react";
import { getDashboardStats } from '@/lib/api/admin/getDashboardStats';

export default function AdminDashboardClient() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3 min-h-[60vh]">
                <div className="relative">
                    <CircleDashed className="w-10 h-10 text-yellow-500 animate-spin" />
                    <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 animate-pulse tracking-wide">
                    Loading Dashboard...
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
                    Platform overview and statistics
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Total Users Card */}
                <Card className="border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950 shadow-sm transition-all duration-300 hover:border-yellow-500/40">
                    <Card.Header className="flex flex-row items-center justify-between pb-2 px-6 pt-6 w-full">
                        <div className="flex flex-col gap-1">
                            <Card.Title className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Total Users
                            </Card.Title>
                            <Card.Description className="hidden" />
                        </div>
                        <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                            <Persons className="w-5 h-5" />
                        </div>
                    </Card.Header>
                    <Card.Content className="px-6 pb-6 pt-0">
                        <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                            {stats.totalUsers.toLocaleString()}
                        </p>
                    </Card.Content>
                </Card>

                {/* Total Products Card */}
                <Card className="border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950 shadow-sm transition-all duration-300 hover:border-yellow-500/40">
                    <Card.Header className="flex flex-row items-center justify-between pb-2 px-6 pt-6 w-full">
                        <div className="flex flex-col gap-1">
                            <Card.Title className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Total Products
                            </Card.Title>
                            <Card.Description className="hidden" />
                        </div>
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                    </Card.Header>
                    <Card.Content className="px-6 pb-6 pt-0">
                        <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                            {stats.totalProducts.toLocaleString()}
                        </p>
                    </Card.Content>
                </Card>

                {/* Total Orders Card */}
                <Card className="border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950 shadow-sm transition-all duration-300 hover:border-yellow-500/40">
                    <Card.Header className="flex flex-row items-center justify-between pb-2 px-6 pt-6 w-full">
                        <div className="flex flex-col gap-1">
                            <Card.Title className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Total Orders
                            </Card.Title>
                            <Card.Description className="hidden" />
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <LifeRing className="w-5 h-5" />
                        </div>
                    </Card.Header>
                    <Card.Content className="px-6 pb-6 pt-0">
                        <p className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                            {stats.totalOrders.toLocaleString()}
                        </p>
                    </Card.Content>
                </Card>

            </div>
        </div>
    );
}