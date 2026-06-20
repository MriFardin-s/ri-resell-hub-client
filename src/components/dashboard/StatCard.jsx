'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon: Icon, change }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-4 my-2"
    >
      <div className="bg-white dark:bg-neutral-900 border border-amber-100 dark:border-neutral-800 hover:border-theme-yellow-primary/60 dark:hover:border-theme-yellow-primary/60 shadow-md hover:shadow-xl p-6 rounded-2xl relative overflow-hidden transition-all duration-300 group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-yellow-400/[0.08] dark:bg-theme-yellow-primary/10 rounded-full blur-3xl group-hover:bg-yellow-400/[0.15] dark:group-hover:bg-theme-yellow-primary/20 transition-all duration-300" />
        
        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest block">
              {title}
            </span>
            <h3 className="text-3xl font-black text-gray-800 dark:text-neutral-100 group-hover:text-theme-yellow-primary transition-colors duration-300 tracking-tight">
              {value}
            </h3>
          </div>

          <div className="p-3.5 rounded-xl bg-yellow-50 dark:bg-neutral-800 border border-amber-100 dark:border-neutral-700 group-hover:border-theme-yellow-primary/50 text-yellow-600 dark:text-theme-yellow-primary group-hover:scale-105 transition-all duration-300 shadow-sm">
            {Icon && <Icon className="w-5 h-5" />}
          </div>
        </div>

        {change && (
          <div className="mt-4 pt-3 border-t border-amber-100 dark:border-neutral-800 flex items-center text-[11px] text-gray-500 dark:text-neutral-400 font-medium relative z-10">
            {change}
          </div>
        )}
      </div>
    </motion.div>
  );
}