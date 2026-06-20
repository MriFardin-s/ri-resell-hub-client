import { getAllProducts } from '@/lib/api/products';
import React from 'react';

import ProductExploreSection from '@/components/products/ProductExploreSection';

const AllProductsPage = async () => {
    
    const products = await getAllProducts();
    
    return (
        <div className="container mx-auto px-4 py-8 text-neutral-900 dark:text-neutral-100 transition-colors">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-white mb-2">
                    Explore All Products
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400">
                    Find the best deals from trusted sellers
                </p>
            </header>

            <ProductExploreSection initialProducts={products} />
        </div>
    );
};

export default AllProductsPage;