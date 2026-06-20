'use client';
import React, { useState } from 'react';
import { Table } from '@heroui/react';
import { toast } from 'react-hot-toast';
import { Eye, Pencil, TrashBin } from '@gravity-ui/icons';

export default function SellerProductsTable({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts || []);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                setProducts(prev => prev.filter(p => (p._id?.$oid || p._id) !== id));
                toast.success("Product deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    const handleEdit = (product) => {
        toast(`Redirecting to edit page for: ${product.title}`, { icon: '📝' });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 bg-amber-50/40 p-4 border border-amber-100 rounded-xl">
                <input
                    type="text"
                    placeholder="Search by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 h-10 rounded-xl bg-white border border-amber-200 text-gray-800 text-sm outline-none focus:border-yellow-500/50 transition-all shadow-sm placeholder:text-gray-400"
                />
                <span className="text-xs font-semibold text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm">
                    Total: {filteredProducts.length} items
                </span>
            </div>

            <div className="border border-amber-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Seller products management table" className="w-full bg-white text-neutral-900">
                            <Table.Header>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500">Image</Table.Column>
                                <Table.Column isRowHeader className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500">Product Name</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500">Category</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500">Condition</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500">Price</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500">Stock</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500">Status</Table.Column>
                                <Table.Column className="p-4 text-xs font-bold text-center uppercase tracking-wider text-gray-500">Actions</Table.Column>
                            </Table.Header>
                            <Table.Body emptyContent="No products found.">
                                {filteredProducts.map((product) => {
                                    const id = product._id?.$oid || product._id;
                                    return (
                                        <Table.Row key={id} className="border-b border-amber-50 bg-white hover:bg-yellow-50/30 transition-colors">
                                            <Table.Cell className="p-4 text-center">
                                                <img 
                                                    src={product.images?.[0] || 'https://placehold.co/50'} 
                                                    alt={product.title} 
                                                    className="w-12 h-12 object-cover rounded-xl border border-neutral-200 shadow-sm mx-auto"
                                                />
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center max-w-[200px] truncate">
                                                <div className="font-bold text-gray-900 text-sm tracking-tight">{product.title}</div>
                                                <div className="text-[11px] text-gray-400 font-mono mt-0.5">{id}</div>
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center text-sm font-semibold text-gray-600 capitalize">
                                                {product.category}
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center text-sm">
                                                <span className={`px-2.5 py-1 text-xs rounded-lg font-bold tracking-wide inline-block ${
                                                    product.condition === 'new' 
                                                        ? 'bg-green-50 text-green-700 border border-green-200' 
                                                        : 'bg-orange-50 text-orange-700 border border-orange-200'
                                                }`}>
                                                    {product.condition}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center text-sm font-extrabold text-gray-900">
                                                ${product.price?.toLocaleString()}
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center text-sm font-bold text-gray-700 font-mono">
                                                {product.stock}
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center text-sm">
                                                <span className="text-xs font-bold text-yellow-700 bg-yellow-50 px-2.5 py-1 border border-yellow-200 rounded-full inline-block">
                                                    {product.status}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button 
                                                        type="button"
                                                        className="px-3 py-1.5 text-xs font-bold bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-700 transition-all"
                                                    >
                                                        <Eye/> 
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleEdit(product)}
                                                        className="px-3 py-1.5 text-xs font-bold bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-700 transition-all"
                                                    >
                                                        <Pencil/> 
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => handleDelete(id)}
                                                        className="px-3 py-1.5 text-xs font-bold bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 text-red-600 transition-all"
                                                    >
                                                        <TrashBin/> 
                                                    </button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
}