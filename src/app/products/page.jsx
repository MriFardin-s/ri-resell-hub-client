import { ProductCard } from '@/components/products/ProductCard';
import { getLoggedInSeller } from '@/lib/api/getLoggedInSeller';
import { getAllProducts } from '@/lib/api/products';

import React from 'react';

const AllProductsPage = async () => {
    const products = await getAllProducts()
    // console.log('p', products)
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore All Products</h1>
                <p className="text-gray-500">Find the best deals from trusted sellers</p>
            </header>

            {products.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    No products available at the moment.
                </div>
            ) : (
               
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => {
                        const productId = product._id?.$oid || product._id;
                        
                        return (
                            
                            <ProductCard key={productId} product={product} />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AllProductsPage;