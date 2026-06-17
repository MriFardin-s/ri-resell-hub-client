'use client';

import { useState } from 'react';
import { Bars, Xmark } from '@gravity-ui/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 
import { useSession, authClient } from '@/lib/auth-client';
import Image from 'next/image';


export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const pathname = usePathname();
    const router = useRouter(); 

    const { data: session, isPending } = useSession();
    const user = session?.user;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Categories', href: '/categories' },
        { name: 'Dashboard', href: '/dashboard' },
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

    if (isPending || isLoggingOut) {
        return (
            <nav className="bg-white shadow-md border-b-2 border-yellow-400 sticky top-0 z-50 h-16 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-2xl font-black tracking-wider text-neutral-800">
                    RESELL<span className="text-yellow-500 bg-neutral-800 text-white px-2 py-1 rounded ml-1">HUB</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Signing out...</span>
                    <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-white shadow-md border-b-2 border-yellow-400 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-yellow-600 hover:bg-gray-100 focus:outline-none transition"
                        >
                            {isMobileMenuOpen ? <Xmark width="24" height="24" /> : <Bars width="24" height="24" />}
                        </button>
                    </div>

                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-black tracking-wider text-neutral-800">
                            RESELL<span className="text-yellow-500 bg-neutral-800 text-white px-2 py-1 rounded ml-1">HUB</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 font-medium">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`transition-all duration-200 pb-1 ${
                                        isActive
                                            ? 'text-gray-900 font-semibold border-b-2 border-yellow-500'
                                            : 'text-gray-600 hover:text-yellow-600'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center">
                        {user ? (
                            <div className="relative flex items-center space-x-3">
                                <span className="hidden sm:inline text-sm font-medium text-neutral-700">Hi, {user.name}!</span>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition"
                                >
                                    <div className="relative w-10 h-10">
                                        <Image
                                            width={300}
                                            height={300}
                                            className="w-full h-full rounded-full border-2 border-yellow-400 object-cover"
                                            src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"}
                                            alt={user.name || "User Profile"}
                                        />
                                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                                    </div>
                                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-50 animate-fade-in">
                                        <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition">My Profile</Link>
                                        <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition">Settings</Link>
                                        <Link href="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition">Orders</Link>
                                        <hr className="my-1 border-gray-100" />
                                        <button
                                            onClick={handleSignOut}
                                            disabled={isLoggingOut}
                                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition text-left disabled:opacity-50"
                                        >
                                          Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center space-x-3">
                                <Link
                                    href="/auth/signin"
                                    className={`px-6 py-2.5 rounded-md shadow-sm text-sm transition-colors duration-200 ${
                                        pathname === '/auth/signin' ? 'btn-theme-yellow' : 'bg-neutral-100 text-black hover:bg-neutral-200'
                                    }`}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className={`px-6 py-2.5 rounded-md shadow-sm text-sm transition-colors duration-200 ${
                                        pathname === '/auth/signup' ? 'btn-theme-yellow' : 'bg-neutral-100 text-black hover:bg-neutral-200'
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
                <div className="md:hidden bg-gray-50 border-t border-gray-200 px-4 pt-2 pb-4 space-y-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                                    isActive ? 'bg-yellow-100 text-yellow-800' : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-600'
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2 sm:hidden">
                        {user ? (
                            <div className="flex flex-col space-y-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-yellow-50"
                                >
                                    My Profile
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/auth/signin"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-6 py-2.5 rounded-md shadow-sm text-sm text-center transition-colors duration-200 ${
                                        pathname === '/auth/signin' ? 'btn-theme-yellow' : 'bg-neutral-100 text-black'
                                    }`}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-6 py-2.5 rounded-md shadow-sm text-sm text-center transition-colors duration-200 ${
                                        pathname === '/auth/signup' ? 'btn-theme-yellow' : 'bg-neutral-100 text-black'
                                    }`}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}