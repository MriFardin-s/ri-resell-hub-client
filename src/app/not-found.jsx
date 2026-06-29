"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, House } from '@gravity-ui/icons';

const NotFound = () => {
    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 bg-transparent">
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full animate-pulse scale-150" />
                
                <h1 className="relative text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-400 dark:from-white dark:to-neutral-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] select-none">
                    404
                </h1>
            </div>

            <div className="mt-6 space-y-3 relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">
                    Oops! Page Not Found
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center relative z-10">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-neutral-950 font-bold text-sm shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:scale-[1.02] active:scale-[0.98] transition duration-200"
                >
                    <House className="w-4 h-4" />
                    Back to Home
                </Link>
                
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 font-bold text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800/80 transition duration-200"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;