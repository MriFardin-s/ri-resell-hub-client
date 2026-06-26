'use client';

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from 'recharts';
import { useEffect, useState } from 'react';
import { CircleDashed } from '@gravity-ui/icons';
import { getAnalytics } from '@/lib/api/admin/getAnalytics';

const COLORS = ['#6366f1', '#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function AdminAnalyticsClient() {
    const [analytics, setAnalytics] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await getAnalytics();
                setAnalytics(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAnalytics();
    }, []);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(
                document.documentElement.classList.contains("dark")
            );
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    if (!analytics) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
                <div className="relative">
                    <CircleDashed className="w-10 h-10 text-amber-500 dark:text-amber-500 animate-spin" />
                    <div className="absolute inset-0 bg-indigo-600/20 dark:bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 animate-pulse tracking-wide">
                    Loading Analytics...
                </p>
            </div>
        );
    }

    const {
        overview = {},
        userGrowth = [],
        monthlyOrders = [],
        categoryPerformance = [],
    } = analytics;

    const formatData = (dataArray) => {
        return Array.isArray(dataArray) ? dataArray.map((item) => {
            const monthIndex = item._id?.month !== undefined ? (item._id.month - 1 >= 0 ? item._id.month - 1 : item._id.month) : 0;
            return {
                ...item,
                monthName: MONTHS[monthIndex] || 'Jan',
                count: item.count || item.totalSales || 0,
                products: item.products || 0
            };
        }) : [];
    };

    const monthlyOrdersData = formatData(monthlyOrders);
    const userGrowthData = formatData(userGrowth);
    const safeCategoryPerformance = Array.isArray(categoryPerformance) ? categoryPerformance : [];

    const gridColor = isDarkMode ? '#1f1f1f' : '#f0f0f0';
    const tickColor = isDarkMode ? '#a3a3a3' : '#737373';
    const tooltipBg = isDarkMode ? '#171717' : '#ffffff';
    const tooltipBorder = isDarkMode ? '#262626' : '#e5e5e5';

    return (
        <div className="p-6 space-y-8 bg-neutral-50/50 dark:bg-neutral-950 min-h-screen transition-colors duration-300">
            <div>
                <h1 className="text-3xl font-black text-neutral-950 dark:text-neutral-50 tracking-tight">
                    Platform Analytics
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                    Overall business insights and system performance
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                    <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Total Users</h4>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                        {overview.totalUsers || 0}
                    </p>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                    <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Total Products</h4>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                        {overview.totalProducts || 0}
                    </p>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                    <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Total Orders</h4>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                        {overview.totalOrders || 0}
                    </p>
                </div>


                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                    <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Total Revenue</h4>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-500 mt-2">
                        ${(overview.totalRevenue || 0).toLocaleString()}
                    </p>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300 col-span-2 md:col-span-1">
                    <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Wishlist</h4>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                        {overview.totalWishlist || 0}
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-lg">
                        Category Distribution
                    </h3>
                    <div className="h-[320px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={safeCategoryPerformance}
                                    dataKey="products"
                                    nameKey="_id"
                                    outerRadius={100}
                                    innerRadius={65}
                                    paddingAngle={4}
                                    label={{ fill: tickColor, fontSize: 12 }}
                                >
                                    {safeCategoryPerformance.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            stroke={isDarkMode ? '#171717' : '#fff'}
                                            strokeWidth={2}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', color: tickColor }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-lg">
                        User Growth Trend
                    </h3>
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowthData} margin={{ left: -20, right: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis dataKey="monthName" tick={{ fill: tickColor, fontSize: 12 }} stroke={gridColor} />
                                <YAxis tick={{ fill: tickColor, fontSize: 12 }} stroke={gridColor} />
                                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }} />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2, fill: isDarkMode ? '#171717' : '#fff' }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-6 shadow-sm md:col-span-2">
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-lg">
                        Monthly Orders Overview
                    </h3>
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyOrdersData} margin={{ left: -20, right: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis dataKey="monthName" tick={{ fill: tickColor, fontSize: 12 }} stroke={gridColor} />
                                <YAxis tick={{ fill: tickColor, fontSize: 12 }} stroke={gridColor} />
                                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }} />
                                <Bar
                                    dataKey="count"
                                    fill="#3b82f6"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={45}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}