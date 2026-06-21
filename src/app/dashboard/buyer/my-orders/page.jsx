import { getUserSession } from '@/lib/core/session';
import React from 'react';

const MyOrdersPage = async () => {
    const user = await getUserSession();
    const currentUserMail = user ?.email
    
    return (
        <div>
           
        </div>
    );
};

export default MyOrdersPage;