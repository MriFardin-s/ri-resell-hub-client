import React from 'react';

export const metadata = {
    title: 'About Us | Marketplace',
    description: 'Learn more about our platform, vision, and team.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-16 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl text-neutral-900 dark:text-white">
                        About Our Marketplace
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-base">
                        Connecting trusted buyers and passionate sellers in a seamless, secure, and modern digital platform.
                    </p>
                </div>

                {/* Our Mission & Vision */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl mb-4">
                            🎯
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Our Mission</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                            To empower local sellers and provide buyers with the highest quality products through an easy-to-use filtering, scaling, and dynamic marketplace system.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/80 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-2xl mb-4">
                            ⚡
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Our Core Value</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                            Transparency and performance. From advanced server-side data fetching to instant feedback, we prioritize a blazing fast user experience.
                        </p>
                    </div>
                </div>

                {/* Stats / Overview Section */}
                <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-amber-500/10 dark:border-amber-500/20 shadow-sm">
                    <div className="grid grid-cols-3 gap-4 text-center divide-x divide-neutral-200 dark:divide-neutral-800">
                        <div>
                            <p className="text-3xl font-black text-amber-600 dark:text-amber-400">10k+</p>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">Products</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-blue-600 dark:text-blue-400">5k+</p>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">Happy Buyers</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">99.9%</p>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">Uptime</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}