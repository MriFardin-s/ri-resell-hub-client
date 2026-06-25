'use client';

import { useEffect, useState } from 'react';
import { Heart, TrashBin, ArrowRotateRight, ArrowRight, CircleDashed } from '@gravity-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { getWishlist } from '@/lib/api/CountWishlist';
import { removeWishlist } from '@/lib/api/removeWishlist';



export default function WishlistTable({ currentUserMail, userId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchWishlist = async () => {
    if (!currentUserMail) return;
    try {
      setLoading(true);

      const data = await getWishlist(currentUserMail);
      if (data && Array.isArray(data)) {
        setItems(data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error('Failed to load wishlist items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserMail) {
      fetchWishlist();
    }
  }, [currentUserMail]);

  const handleRemoveItem = async (productId) => {
    try {
      setActionLoading(productId);

      const data = await removeWishlist(userId, productId);


      if (data?.success) {
        setItems(prevItems => prevItems.filter(item => item.productId !== productId));
        toast.error('Removed from wishlist');
      } else {
        toast.error(data?.message || 'Failed to remove item');
      }
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      toast.error('Something went wrong!');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="relative">

          <CircleDashed className="w-10 h-10 text-yellow-500 animate-spin" />


          <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
        </div>

        <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 animate-pulse tracking-wide">
          Loading Wishlist...
        </p>
      </div>
    );
  }


  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            My Wishlist
          </h1>
          <p className="text-sm text-neutral-500 dark:text-gray-400 mt-1">
            View and manage all the amazing products you saved for later.
          </p>
        </div>
        <button
          onClick={fetchWishlist}
          className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 text-xs font-medium bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition hover:bg-neutral-50 dark:hover:bg-neutral-700/50 gap-2 self-start sm:self-center"
        >
          <ArrowRotateRight className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700/60 shadow-sm">
          <Heart className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-base font-bold text-neutral-700 dark:text-neutral-300">Your wishlist is empty</p>
          <p className="text-xs text-neutral-400 mt-1">Explore items and tap heart icon to save them!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700/60 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-900/60 text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                  <th className="p-4 font-semibold text-sm">Product Info</th>
                  <th className="p-4 font-semibold text-sm">Price</th>
                  <th className="p-4 font-semibold text-sm">Stock Status</th>
                  <th className="p-4 font-semibold text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700/50">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 dark:border-neutral-700 shrink-0">
                          <Image
                            src={item.productImage}
                            alt={item.productTitle}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-neutral-800 dark:text-neutral-100 truncate max-w-[200px] md:max-w-[300px]">
                            {item.productTitle}
                          </p>
                          <p className="text-[11px] text-neutral-400 font-mono mt-0.5">ID: {item.productId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                        ${item.productPrice?.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      {item.stock > 0 ? (
                        <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-green-500/20">
                          In Stock ({item.stock})
                        </span>
                      ) : (
                        <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-red-500/20">
                          Out Of Stock
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${item.productId}`}
                          className="inline-flex h-8 items-center justify-center text-xs font-semibold px-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-theme-yellow-primary hover:text-gray-900 dark:hover:bg-theme-yellow-primary transition gap-1"
                        >
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          disabled={actionLoading === item.productId}
                          onClick={() => handleRemoveItem(item.productId)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 dark:border-red-900/50 text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-50 shrink-0"
                        >
                          {actionLoading === item.productId ? (
                            <CircleDashed className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <TrashBin className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}