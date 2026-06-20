'use client';
import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { TextField, Label, InputGroup } from '@heroui/react';
import { Magnifier,  CircleArrowLeft } from '@gravity-ui/icons';

export default function ProductExploreSection({ initialProducts }) {
    const [displayedProducts, setDisplayedProducts] = useState(initialProducts);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [condition, setCondition] = useState('all');

    const categories = ['all', ...new Set(initialProducts.map(p => p.category?.toLowerCase()).filter(Boolean))];

    useEffect(() => {
        let filtered = [...initialProducts];

        if (search.trim() !== '') {
            filtered = filtered.filter(p =>
                p.title?.toLowerCase().includes(search.toLowerCase()) ||
                p.description?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category !== 'all') {
            filtered = filtered.filter(p => p.category?.toLowerCase() === category);
        }

        if (condition !== 'all') {
            filtered = filtered.filter(p => p.condition?.toLowerCase() === condition);
        }

        setDisplayedProducts(filtered);
    }, [search, category, condition, initialProducts]);

    const handleReset = () => {
        setSearch('');
        setCategory('all');
        setCondition('all');
    };

    return (
        <>
            <div className="bg-white border border-amber-100 rounded-3xl shadow-sm p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
                    
                    <div>
                        <TextField>
                            <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">Search Product</Label>
                            <InputGroup className="bg-gray-50 border border-gray-200 rounded-xl h-11 flex items-center overflow-hidden focus-within:border-amber-400 transition-all">
                                <InputGroup.Prefix className="pl-3 text-gray-400 flex items-center">
                                    <Magnifier className="w-4 h-4" />
                                </InputGroup.Prefix>
                                <InputGroup.Input 
                                    placeholder="Type to search..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full h-full px-3 text-sm bg-transparent outline-none text-gray-800"
                                />
                            </InputGroup>
                        </TextField>
                    </div>

                    <div>
                        <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">Category</Label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:bg-white capitalize text-gray-800 transition-all cursor-pointer"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">Condition</Label>
                        <select
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:bg-white capitalize text-gray-800 transition-all cursor-pointer"
                        >
                            <option value="all">All Conditions</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                            <option value="refurbished">Refurbished</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="w-full h-11 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <CircleArrowLeft className="w-4 h-4" />
                            Clear Filters
                        </button>
                    </div>

                </div>
            </div>

            {displayedProducts.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-3xl border border-dashed border-gray-200">
                    No products available matching your criteria.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayedProducts.map((product) => {
                        const productId = product._id?.$oid || product._id;
                        return (
                            <ProductCard key={productId} product={product} />
                        );
                    })}
                </div>
            )}
        </>
    );
}