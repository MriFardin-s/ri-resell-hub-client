'use client';

import { motion } from 'framer-motion';

export default function SuccessStories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const stories = [
    {
      name: 'Rahat Chowdhury',
      role: 'Verified Seller',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      story: 'I sold my old gaming laptop within just 48 hours on Resell Hub! The process was incredibly smooth, and the communication with the buyer was completely secure. Highly recommended platform for selling used electronics.',
      badge: 'Sold Laptop'
    },
    {
      name: 'Anika Rahman',
      role: 'Happy Buyer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      story: 'Found an authentic designer handbag at 60% off its original price. The verification system gave me the confidence to purchase without any hesitation. Resell Hub is now my go-to place for smart shopping.',
      badge: 'Bought Luxury Bag'
    },
    {
      name: 'Tanvir Ahmed',
      role: 'Store Owner / Seller',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      story: 'As a small business owner dealing in refurbished smartphones, Resell Hub provided me with a massive customer base. My monthly sales have increased by 40% since I joined this amazing marketplace.',
      badge: '40% Sales Boost'
    }
  ];

  return (
    <section className="bg-slate-50 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
            Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Loved by Thousands of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Buyers & Sellers</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Discover how our community members are successfully trading pre-owned items and saving money every day.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stories.map((item, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex flex-col justify-between relative hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="absolute top-0 right-0 bg-yellow-400 text-neutral-900 text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl shadow-sm">
                {item.badge}
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed italic">
                  {item.story}
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400 flex-shrink-0 bg-neutral-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">{item.name}</h4>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}