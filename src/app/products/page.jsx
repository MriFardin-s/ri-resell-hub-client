import { getAllProducts } from '@/lib/api/products';
import React from 'react';

import ProductExploreSection from '@/components/products/ProductExploreSection';

const AllProductsPage = async () => {
    
    const products = await getAllProducts();
    
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore All Products</h1>
                <p className="text-gray-500">Find the best deals from trusted sellers</p>
            </header>

          
            <ProductExploreSection initialProducts={products} />
        </div>
    );
};

export default AllProductsPage;