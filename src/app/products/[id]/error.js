'use client';

import React from 'react';
import { ArrowLeft, CircleExclamation } from '@gravity-ui/icons';

const ErrorPage = ({ error, reset }) => {
    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 bg-transparent">
            <div className="relative">
                <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full animate-pulse scale-150" />
                
                <div className="relative flex items-center justify-center w-24 h-24 mx-auto rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-red-500 dark:text-red-400 shadow-xl">
                    <CircleExclamation className="w-12 h-12" />
                </div>
            </div>

            <div className="mt-6 space-y-3 relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">
                    Something Went Wrong!
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                    {error?.message || "An unexpected error occurred while processing your request. Please try again or return to the previous page."}
                </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center relative z-10">
                {reset && (
                    <button
                        onClick={() => reset()}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-neutral-950 font-bold text-sm shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:scale-[1.02] active:scale-[0.98] transition duration-200"
                    >
                        Try Again
                    </button>
                )}
                
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

export default ErrorPage;