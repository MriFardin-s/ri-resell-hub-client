'use client';

import { Toaster } from 'react-hot-toast';

export default function Providers({ children }) {
    return (
        <>
            {children}
            <Toaster 
                position="top-center" 
                reverseOrder={false} 
                toastOptions={{
                   
                    className: 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border border-gray-100 dark:border-neutral-800 rounded-xl text-sm font-semibold shadow-xl px-5 py-3 font-sans transition-colors duration-300',
                    
                    success: {
                        iconTheme: {
                          
                            primary: 'var(--theme-yellow-hover)',
                            secondary: '#ffffff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#ffffff',
                        },
                    },
                }}
            />
        </>
    );
}