'use client';

import { useState } from 'react';
import { Bars, Xmark } from '@gravity-ui/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { useTheme } from '@/components/theme-provider';

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const { theme, setTheme } = useTheme();
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const dashboardLink = {
        buyer: '/dashboard/buyer',
        seller: '/dashboard/seller',
        admin: '/dashboard/admin'
    };

    const userRole = user?.userRole?.toLowerCase() || 'buyer';

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Categories', href: '/categories' },
        ...(user?.email && dashboardLink[userRole]
            ? [{ name: 'Dashboard', href: dashboardLink[userRole] }]
            : [])
    ];

    const handleSignOut = async () => {
        try {
            setIsLoggingOut(true);
            setIsDropdownOpen(false);
            setIsMobileMenuOpen(false);

            await authClient.signOut({
                callbackURL: "/auth/signin"
            });

            window.location.href = "/auth/signin";

        } catch (error) {
            console.error("Sign out failed:", error);
            setIsLoggingOut(false);
        }
    };


    if (isLoggingOut) {
        return (
            <nav className="bg-white dark:bg-neutral-950 shadow-md border-b-2 border-theme-yellow-primary sticky top-0 z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="text-2xl font-black tracking-wider text-neutral-800 dark:text-neutral-100">
                            RESELL<span className="text-neutral-900 bg-theme-yellow-primary px-2 py-1 rounded ml-1">HUB</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-500 dark:text-neutral-400">Signing out...</span>
                            <div className="w-5 h-5 border-2 border-theme-yellow-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-white dark:bg-neutral-950 shadow-md border-b-2 border-theme-yellow-primary sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 dark:text-neutral-300 hover:text-theme-yellow-hover hover:bg-gray-100 dark:hover:bg-neutral-900 focus:outline-none transition"
                        >
                            {isMobileMenuOpen ? <Xmark width="24" height="24" /> : <Bars width="24" height="24" />}
                        </button>
                    </div>


                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-black tracking-wider text-neutral-800 dark:text-neutral-100">
                            RESELL<span className="text-neutral-900 bg-theme-yellow-primary px-2 py-1 rounded ml-1">HUB</span>
                        </Link>
                    </div>


                    <div className="hidden md:flex space-x-8 font-medium">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`transition-all duration-200 pb-1 border-b-2 ${isActive
                                        ? 'text-neutral-900 dark:text-neutral-100 font-bold border-theme-yellow-primary'
                                        : 'text-gray-600 dark:text-neutral-400 border-transparent hover:text-theme-yellow-hover'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>


                    <div className="flex items-center space-x-4">

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-xl text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-900 transition focus:outline-none"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.036a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>


                        {user ? (
                            <div className="relative flex items-center space-x-3">
                                <span className="hidden sm:inline text-sm font-medium text-neutral-700 dark:text-neutral-300">Hi, {user.name}!</span>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition"
                                >
                                    <div className="relative w-10 h-10">
                                        <Image
                                            width={100}
                                            height={100}
                                            className="w-full h-full rounded-full border-2 border-theme-yellow-primary object-cover"
                                            src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"}
                                            alt={user.name || "User Profile"}
                                        />
                                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-neutral-950"></span>
                                    </div>
                                    <svg className={`w-4 h-4 text-gray-500 dark:text-neutral-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-12 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-xl py-2 border border-gray-100 dark:border-neutral-800 z-50 animate-fade-in">
                                        <button
                                            onClick={handleSignOut}
                                            disabled={isLoggingOut}
                                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition text-left disabled:opacity-50 font-medium"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (

                            <div className="hidden sm:flex items-center space-x-3">
                                <Link
                                    href="/auth/signin"
                                    className={`px-5 py-2 rounded-xl shadow-sm text-sm font-semibold transition-all duration-200 ${pathname === '/auth/signin' ? 'btn-theme-yellow' : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                                        }`}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className={`px-5 py-2 rounded-xl shadow-sm text-sm font-semibold transition-all duration-200 ${pathname === '/auth/signup' ? 'btn-theme-yellow' : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                                        }`}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 px-4 pt-2 pb-4 space-y-1 transition-colors duration-300">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-neutral-800 mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">Switch Theme</span>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-xl bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 transition"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.036a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-xl text-base font-medium transition ${isActive
                                    ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                                    : 'text-gray-700 dark:text-neutral-300 hover:bg-amber-50 dark:hover:bg-neutral-800/50 hover:text-theme-yellow-hover'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    <div className="pt-4 border-t border-gray-200 dark:border-neutral-800 flex flex-col space-y-2">
                        {user ? (
                            <div className="flex flex-col space-y-1">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 dark:text-neutral-300 hover:bg-amber-50 dark:hover:bg-neutral-800/50"
                                >
                                    My Profile
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="w-full text-left px-3 py-2 rounded-xl text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-50"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2 pt-2 sm:hidden">
                                <Link
                                    href="/auth/signin"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-6 py-2.5 rounded-xl shadow-sm text-sm text-center font-semibold transition-colors duration-200 ${pathname === '/auth/signin' ? 'btn-theme-yellow' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                                        }`}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-6 py-2.5 rounded-xl shadow-sm text-sm text-center font-semibold transition-colors duration-200 ${pathname === '/auth/signup' ? 'btn-theme-yellow' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                                        }`}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}