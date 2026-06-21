import React from 'react';
import Link from 'next/link';
import { ShieldKeyhole, House } from '@gravity-ui/icons';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-neutral-100 px-4 transition-colors duration-300">
      
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800">
        
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center w-24 h-24 bg-yellow-50 dark:bg-yellow-950/30 text-theme-yellow-primary rounded-full animate-pulse">
            <ShieldKeyhole width={48} height={48} className="text-amber-500" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-neutral-800" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Access Denied
          </h1>
          <p className="text-xs font-mono tracking-widest text-red-500 uppercase font-bold">
            Error 401: Unauthorized
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 px-2 pt-2">
            Sorry, you do not have the required permissions or role to access this page. Please log in with the correct account.
          </p>
        </div>

        <div className="border-t border-gray-100 dark:border-neutral-700/50 my-2" />

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            href="/"
            className="w-full sm:flex-1 py-2.5 rounded-xl btn-theme-yellow text-center text-sm font-bold flex items-center justify-center gap-2 transition"
          >
            <House width={16} height={16} />
            Back to Home
          </Link>

          <Link
            href="/login"
            className="w-full sm:flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-neutral-700 text-center text-sm font-bold block hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
          >
            Login Again
          </Link>
        </div>

      </div>
      
    </div>
  );
}