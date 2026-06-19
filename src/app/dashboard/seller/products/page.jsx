
import SellerProductsTable from '@/components/dashboard/seller/SellerProductsTable';
import { getProducts } from '@/lib/api/products';
import { getUserSession } from '@/lib/core/session';
import React from 'react';


const SellerProducts = async () => {

    const user = await getUserSession();

    const currentSellerId = user?._id || user?.id;
    

    const allProducts = await getProducts(currentSellerId) || [];
    // console.log('Fetched Products:', allProducts);
    
   
   

    return (
        <div className="p-6 bg-neutral-950 min-h-screen text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-wide">MY PRODUCTS</h1>
                        <p className="text-sm text-neutral-400">Manage all products created by you.</p>
                    </div>
                </div>
                

                <SellerProductsTable initialProducts={allProducts} />
            </div>
        </div>
    );
};

export default SellerProducts;