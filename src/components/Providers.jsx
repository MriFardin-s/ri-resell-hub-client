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
                    style: {
                        background: '#ffffff',
                        color: 'var(--theme-text-dark)',
                        border: '1px solid #f3f4f6',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: '__Inter_aaf875, __Inter_Fallback_aaf875, sans-serif',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
                        padding: '12px 20px',
                    },
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