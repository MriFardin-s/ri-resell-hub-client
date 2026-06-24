'use client';

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

import { useEffect, useState } from 'react';
import { CircleDashed } from '@gravity-ui/icons';

const MONTHS = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export default function SellerAnalyticsClient({ user }) {
    const [salesData, setSalesData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        Promise.all([
            fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/seller/analytics/${user.id}`
            ).then((res) => res.json()),

            fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/seller/top-products/${user.id}`
            ).then((res) => res.json()),
        ])
            .then(([sales, products]) => {
                const formatted = sales.map((item) => ({
                    month: MONTHS[item._id.month],
                    revenue: item.totalRevenue,
                    sales: item.totalSales,
                }));

                setSalesData(formatted);
                setTopProducts(products);
            })
            .finally(() => setLoading(false));
    }, [user?.id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="relative">

                    <CircleDashed className="w-10 h-10 text-yellow-500 animate-spin" />


                    <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
                </div>

                <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 animate-pulse tracking-wide">
                    Loading Analytics...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black">
                    Sales Analytics
                </h1>

                <p className="text-gray-500">
                    Visual representation of seller performance
                </p>
            </div>

            {/* Monthly Revenue Chart */}
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
                <h2 className="font-bold text-lg mb-5">
                    Monthly Sales Trend
                </h2>

                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#eab308"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Sales Chart */}
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
                <h2 className="font-bold text-lg mb-5">
                    Sales Chart
                </h2>

                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="sales"
                                fill="#facc15"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
                <h2 className="font-bold text-lg mb-5">
                    Top Selling Products
                </h2>

                <div className="space-y-4">
                    {topProducts.map((product, index) => (
                        <div
                            key={product._id}
                            className="flex items-center justify-between border rounded-xl p-4"
                        >
                            <div>
                                <p className="font-semibold">
                                    #{index + 1} {product.title}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-bold">
                                    {product.sales} Sales
                                </p>

                                <p className="text-sm text-gray-500">
                                    ${product.revenue.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}