import { getUserSession } from '@/lib/core/session';
import React from 'react';
import MyOrdersTable from './MyOrdersTable'; 

const MyOrdersPage = async () => {
    const user = await getUserSession();
    const currentUserMail = user?.email;
    
    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors">
            
            <MyOrdersTable currentUserMail={currentUserMail} />
        </div>
    );
};

export default MyOrdersPage;