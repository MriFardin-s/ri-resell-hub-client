import { getUserSession } from '@/lib/core/session';
import React from 'react';
import WishlistTable from './WishlistTable';

const WishListPage = async () => {
    const user = await getUserSession();
    const currentUserMail = user?.email;
    const userId = user?.id; 

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors">
            {currentUserMail ? (
                <WishlistTable currentUserMail={currentUserMail} userId={userId} />
            ) : (
                <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                    <p className="text-red-500 font-semibold">Access Denied</p>
                    <p className="text-sm text-neutral-500 mt-1">Please log in to view your wishlist.</p>
                </div>
            )}
        </div>
    );
};

export default WishListPage;