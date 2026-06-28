import SellerProductsTable from '@/components/dashboard/seller/SellerProductsTable';
import { getLoggedInSeller } from '@/lib/api/getLoggedInSeller';

import React from 'react';

const SellerProducts = async () => {
    const allProducts = await getLoggedInSeller() || [];
    console.log(
  allProducts.map((p) => ({
    title: p.title,
    status: p.status,
  }))
);
    // console.log(allProducts);

    return (
        <div className="w-full p-6 text-neutral-900 dark:text-neutral-100 transition-colors">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-neutral-800 dark:text-white tracking-wide uppercase">
                            My Products
                        </h1>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Manage all products created by you.
                        </p>
                    </div>
                </div>

               
                <SellerProductsTable initialProducts={allProducts} />
            </div>
        </div>
    );
};

export default SellerProducts;