
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const SellerProfilePage = async () => {
    const user = await getUserSession();

    return (
        <div>
            <h1>{user?.name }</h1>
            
            seller profile page
        </div>
    );
};

export default SellerProfilePage;