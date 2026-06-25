'use client';

import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
    BarChart,
    Bar,
} from 'recharts';

import { useEffect, useState } from 'react';
import { CircleDashed } from '@gravity-ui/icons';

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function SellerAnalyticsClient({ user }) {
    const [salesData, setSalesData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

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
                const salesArray = Array.isArray(sales) ? sales : [];
                const productsArray = Array.isArray(products) ? products : [];

                const formatted = salesArray.map((item) => {
                    const monthIndex = item._id?.month !== undefined ? (item._id.month - 1 >= 0 ? item._id.month - 1 : item._id.month) : 0;
                    return {
                        month: MONTHS[monthIndex] || 'Jan',
                        revenue: item.totalRevenue || item.revenue || 0,
                        sales: item.totalSales || item.sales || 0,
                    };
                });

                setSalesData(formatted);
                setTopProducts(productsArray);
            })
            .catch(console.error)
            .finally(() => setLoading(false));

        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };

        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, [user?.id]);

    const gridColor = isDarkMode ? '#1f1f1f' : '#f0f0f0';
    const tickColor = isDarkMode ? '#a3a3a3' : '#737373';
    const tooltipBg = isDarkMode ? '#171717' : '#ffffff';
    const tooltipBorder = isDarkMode ? '#262626' : '#e5e5e5';

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
                <div className="relative">
                    <CircleDashed className="w-10 h-10 text-amber-500 animate-spin" />
                    <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 animate-pulse tracking-wide">
                    Loading Analytics...
                </p>
            </div>
        );
    }

    const totalRevenueSum = salesData.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalSalesSum = salesData.reduce((acc, curr) => acc + curr.sales, 0);

    return (
        <div className="space-y-8 p-6 bg-neutral-50/50 dark:bg-neutral-950 min-h-screen transition-colors duration-300">
            <div>
                <h1 className="text-3xl font-black text-neutral-950 dark:text-neutral-50 tracking-tight">
                    Sales Analytics
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                    Visual representation of seller performance and metrics
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                    <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Total Earnings</h4>
                    <p className="text-3xl font-bold text-amber-500 dark:text-amber-400 mt-2">
                        ${totalRevenueSum.toLocaleString()}
                    </p>
                </div>
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                    <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Total Products Sold</h4>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                        {totalSalesSum.toLocaleString()} <span className="text-sm font-normal text-neutral-400">Items</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-lg tracking-tight">
                        Monthly Revenue Trend
                    </h3>
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData} margin={{ left: -20, right: 10 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#eab308" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} stroke={gridColor} />
                                <YAxis tick={{ fill: tickColor, fontSize: 12 }} stroke={gridColor} />
                                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', color: tickColor }} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#eab308"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-lg tracking-tight">
                        Monthly Sales Volume
                    </h3>
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData} margin={{ left: -20, right: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} stroke={gridColor} />
                                <YAxis tick={{ fill: tickColor, fontSize: 12 }} stroke={gridColor} />
                                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }} />
                                <Bar
                                    dataKey="sales"
                                    fill="#facc15"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-lg tracking-tight">
                    Top Selling Products
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topProducts.length === 0 ? (
                        <div className="col-span-full text-center py-10 border border-dashed rounded-xl border-neutral-200 dark:border-neutral-800">
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm">No top products data found</p>
                        </div>
                    ) : (
                        topProducts.map((product, index) => (
                            <div
                                key={product._id || index}
                                className="flex items-center justify-between border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-950/40 rounded-xl p-4 hover:border-amber-500/40 dark:hover:border-amber-500/30 transition duration-300"
                            >
                                <div className="space-y-1 pr-4 truncate">
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold px-2 py-0.5 rounded-md">
                                            #{index + 1}
                                        </span>
                                        <p className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                                            {product.title || product.productTitle || product.productDetails?.title || "Premium Product"}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="font-bold text-neutral-900 dark:text-neutral-100">
                                        {product.sales || product.totalSales || 0} Sales
                                    </p>
                                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-500 mt-0.5">
                                        ${(product.revenue || product.totalRevenue || 0).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}