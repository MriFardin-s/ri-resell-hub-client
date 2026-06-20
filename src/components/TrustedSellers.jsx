'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TrustedSellers() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const sellers = [
    {
      name: 'Asif Ur Rahman',
      specialty: 'Refurbished Electronics',
      rating: '4.9',
      reviews: '142',
      sales: '320+',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
      badge: 'Top Elite'
    },
    {
      name: 'Nusrat Jahan',
      specialty: 'Vintage Fashion & Bags',
      rating: '4.8',
      reviews: '98',
      sales: '190+',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      badge: 'Super Seller'
    },
    {
      name: 'Zayan Ahmed',
      specialty: 'Books & Collectibles',
      rating: '5.0',
      reviews: '64',
      sales: '115+',
      image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=face',
      badge: 'Rising Star'
    },
    {
      name: 'Mariya Sultana',
      specialty: 'Home Decor & Furniture',
      rating: '4.7',
      reviews: '112',
      sales: '240+',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      badge: 'Verified Pro'
    }
  ];

  return (
    <section className="bg-white dark:bg-neutral-950 py-16 lg:py-24 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-block bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
              Verified Profiles
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 dark:from-theme-yellow-primary dark:to-amber-500">Top-Rated Sellers</span>
            </h2>
            <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base">
              Shop with absolute peace of mind. These individual sellers and stores have consistently maintained exceptional ratings, fast shipping, and great communication.
            </p>
          </div>
          <Link href="/sellers" className="text-sm font-bold text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 hover:bg-theme-yellow-hover dark:hover:bg-theme-yellow-primary dark:hover:text-neutral-950 px-5 py-3 rounded-xl transition-all duration-300 shrink-0 border border-gray-200 dark:border-neutral-800">
            View All Sellers
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {sellers.map((seller, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800/60 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl dark:hover:shadow-neutral-950/50 hover:border-theme-yellow-primary/50 transition-all duration-300 relative flex flex-col justify-between group"
            >
              <span className="absolute top-4 right-4 bg-neutral-900 dark:bg-neutral-800 text-theme-yellow-primary text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                {seller.badge}
              </span>

              <div className="flex flex-col items-center mt-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-theme-yellow-primary p-0.5 shadow-md mb-4 bg-gray-50 dark:bg-neutral-800 shrink-0 relative">
                  <img 
                    src={seller.image} 
                    alt={seller.name} 
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-0 right-1 block h-3.5 w-3.5 rounded-full bg-blue-500 ring-2 ring-white dark:ring-neutral-900 flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708.523.5.5 0 01-.107.204l-1.07 1.07a.75.75 0 000 1.061l1.07 1.07a.5.5 0 01.107.204.75.75 0 00.708.523h1.465a.5.5 0 01.353.146l1.07 1.07a.75.75 0 001.06 0l1.07-1.07a.5.5 0 01.354-.146h1.465a.75.75 0 00.708-.523.5.5 0 01.107-.204l1.07-1.07a.75.75 0 000-1.061l-1.07-1.07a.5.5 0 01-.107-.204.75.75 0 00-.708-.523h-1.465a.5.5 0 01-.353-.146l-1.07-1.07a.75.75 0 00-1.06 0l-1.07 1.07a.5.5 0 01-.354.146H6.267zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>

                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-lg group-hover:text-theme-yellow-hover dark:group-hover:text-theme-yellow-primary transition-colors">
                  {seller.name}
                </h3>
                <p className="text-xs font-medium text-gray-500 dark:text-neutral-400 mt-1 min-h-[16px]">
                  {seller.specialty}
                </p>

                <div className="flex items-center space-x-1 bg-amber-50/60 dark:bg-amber-950/20 px-2.5 py-1 rounded-lg mt-3 border border-amber-100/70 dark:border-amber-900/30">
                  <svg className="w-4 h-4 fill-current text-theme-yellow-primary" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-black text-neutral-800 dark:text-neutral-200">{seller.rating}</span>
                  <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-medium">({seller.reviews} reviews)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-neutral-50 dark:bg-neutral-950 rounded-xl p-3 mt-5 border border-gray-100 dark:border-neutral-800/60">
                <div className="text-left pl-2">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-neutral-500">Total Sales</span>
                  <span className="block text-sm font-black text-neutral-900 dark:text-neutral-100">{seller.sales}</span>
                </div>
                <div className="text-right pr-2 border-l border-gray-200 dark:border-neutral-800">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-neutral-500">Status</span>
                  <span className="block text-xs font-bold text-green-600 dark:text-green-400 mt-0.5">Active Now</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}