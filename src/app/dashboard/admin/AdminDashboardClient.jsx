'use client';

import { useEffect, useState } from 'react';
import { CircleDashed } from '@gravity-ui/icons';
export default function AdminDashboardClient() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/dashboard-stats`
        )
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
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
        <div className=" ml-5 mt-6 space-y-8">
            <div>
                <h1 className="text-3xl font-black">
                    Admin Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Platform overview and statistics
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mx-8">

                <div className="border rounded-2xl p-6">
                    <h3 className="text-gray-500 text-sm">
                        Total Users
                    </h3>

                    <p className="text-4xl font-black mt-2">
                        {stats.totalUsers}
                    </p>
                </div>

                <div className="border rounded-2xl p-6">
                    <h3 className="text-gray-500 text-sm">
                        Total Products
                    </h3>

                    <p className="text-4xl font-black mt-2">
                        {stats.totalProducts}
                    </p>
                </div>

                <div className="border rounded-2xl p-6">
                    <h3 className="text-gray-500 text-sm">
                        Total Orders
                    </h3>

                    <p className="text-4xl font-black mt-2">
                        {stats.totalOrders}
                    </p>
                </div>

            </div>
        </div>
    );
}