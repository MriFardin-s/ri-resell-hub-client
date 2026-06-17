'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '120K+', label: 'Products Sold' },
    { value: '4.8★', label: 'Trust Rating' }
  ];

  return (
    <section className="relative bg-white overflow-hidden border-b border-gray-100">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-yellow-50 to-transparent hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            className="lg:col-span-7 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
              <span>The Smartest Way to Resell</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-tight">
              Turn Your Used Items Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Quick Cash</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Join thousands of smart shoppers buying and selling quality pre-owned products. Safe transactions, verified users, and unbeatable deals right at your fingertips.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-theme-yellow px-8 py-4 rounded-lg shadow-lg shadow-yellow-400/20 text-center font-bold text-base transition-all hover:scale-105">
                Explore Products
              </Link>
              <Link href="/dashboard" className="bg-neutral-900 text-white hover:bg-neutral-800 px-8 py-4 rounded-lg text-center font-bold text-base transition-all hover:scale-105 shadow-md">
                Start Selling
              </Link>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="pt-8 border-t border-gray-100 grid grid-cols-3 gap-4 sm:gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <span className="block text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="block text-xs sm:text-sm text-gray-500 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:col-span-5 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-300/30 rounded-full blur-3xl -z-10" />
            <div className="relative border-4 border-yellow-400 rounded-2xl overflow-hidden shadow-2xl bg-neutral-100 max-w-md w-full aspect-[4/3] lg:aspect-square flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80" 
                alt="Marketplace Platform" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}