
import SellerProductsTable from '@/components/dashboard/seller/SellerProductsTable';
import { getLoggedInSeller } from '@/lib/api/getLoggedInSeller';
import { getProducts } from '@/lib/api/products';
import { getUserSession } from '@/lib/core/session';
import React from 'react';


const SellerProducts = async () => {


    

    const allProducts = await getLoggedInSeller() || [];
    // console.log('Fetched Products:', allProducts);
    
   
   

    return (
        <div className="w-full p-6 text-neutral-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-gray-700 tracking-wide">MY PRODUCTS</h1>
                        <p className="text-sm text-neutral-400">Manage all products created by you.</p>
                    </div>
                </div>
                

                <SellerProductsTable initialProducts={allProducts} />
            </div>
        </div>
    );
};

export default SellerProducts;