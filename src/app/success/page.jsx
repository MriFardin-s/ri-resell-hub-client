'use client';

import {  Suspense } from 'react';
import { SuccessContent } from './SuccessContent';




export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
                <p className="text-sm font-medium animate-pulse">Loading receipt page...</p>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}