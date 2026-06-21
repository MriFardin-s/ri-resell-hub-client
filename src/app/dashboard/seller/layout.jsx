import { requireRole } from '@/lib/core/session';
import React from 'react';

const SellerLayout = async ({children}) => {
    await requireRole('seller')
    return  children
    
    ;
};

export default SellerLayout;