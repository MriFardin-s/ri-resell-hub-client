'use client';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Heart, LockFill, ShoppingBag } from '@gravity-ui/icons';

export default function ProductActions({ product, user }) {
    
    const [isWishlisted, setIsWishlisted] = useState(false);

    
    const handleOrderNow = () => {
        if (!user || !user?.id) {
            toast.error('Please login first to place an order!', {
                icon: <LockFill className="w-5 h-5 text-red-500" />, 
                style: {
                    borderRadius: '12px',
                    background: '#fff',
                    color: '#1f2937',
                    border: '1px solid #fef3c7'
                }
            });
            return;
        }
        toast.success(`Processing order for ${product.title}!`, { icon: '📦' });
    };


    const handleWishlist = () => {
        if (!user || !user?.id) {
            toast.error('Please login first to manage wishlist!', { 
                icon: <LockFill className="w-5 h-5 text-red-500" />, 
                style: {
                    borderRadius: '12px',
                    background: '#fff',
                    color: '#1f2937',
                    border: '1px solid #fef3c7'
                }
            });
            return;
        }
        
        setIsWishlisted(!isWishlisted);
        if (!isWishlisted) {
            toast.success('Added to wishlist!', { icon: '❤️' });
        } else {
            toast('Removed from wishlist', { icon: '🗑️' });
        }
    };

    return (
        <div className="flex items-center gap-4 pt-4">
            {/* Order Button */}
            <button
                type="button"
                onClick={handleOrderNow}
                className="flex-1 h-14 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all duration-200"
            >
                <ShoppingBag className="w-5 h-5" />
                Order Now
            </button>

            {/* Wishlist Button */}
            <button
                type="button"
                onClick={handleWishlist}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center active:scale-[0.98] transition-all duration-200 shadow-sm ${
                    isWishlisted
                        ? 'bg-red-50 border-red-200 text-red-500'
                        : 'bg-white border-amber-200 text-gray-400 hover:text-red-500 hover:bg-red-50/50'
                }`}
            >
                <Heart className="w-6 h-6" />
            </button>
        </div>
    );
}