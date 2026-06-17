'use client';

import { motion } from 'framer-motion';

export default function SustainabilityImpact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const impacts = [
    {
      metric: '15.2 kg',
      title: 'CO2 Emissions Saved',
      description: 'On average, buying a used item instead of a new one prevents significant carbon emissions produced during manufacturing.',
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    },
    {
      metric: '10k+ Liters',
      title: 'Water Conserved',
      description: 'Extending the lifecycle of textiled and tech products saves thousands of liters of water required for raw material processing.',
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      metric: '75% Less',
      title: 'Landfill Waste Reduced',
      description: 'By passing your unwanted goods to someone else, you directly keep electronics, furniture, and clothing out of local landfills.',
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-neutral-900 text-white py-16 lg:py-24 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.05),transparent_40%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-block bg-neutral-800 text-yellow-400 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-neutral-700">
              Our Planet Mission
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Every Second-Hand Purchase <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Heals The Earth</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              When you buy or sell on Resell Hub, you are not just saving or making money. You are actively reducing industrial waste, cutting carbon footprints, and promoting a sustainable circular economy.
            </p>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {impacts.map((item, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 hover:border-yellow-500/30 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-yellow-400/10 rounded-xl group-hover:bg-yellow-400 group-transition duration-300">
                  <div className="group-hover:scale-110 transition-transform duration-300 group-hover:text-neutral-900">
                    {item.icon}
                  </div>
                </div>
                <span className="text-3xl font-black text-yellow-400 tracking-tight">
                  {item.metric}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-8 lg:p-12 text-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-2xl font-black tracking-tight">Ready to make an environmental impact?</h4>
            <p className="font-medium text-neutral-800 text-sm sm:text-base">List your first unused item today and join the green revolution.</p>
          </div>
          <button className="bg-neutral-900 text-white hover:bg-neutral-800 font-bold px-8 py-4 rounded-xl transition-all shadow-md shrink-0">
            List An Item Now
          </button>
        </div>

      </div>
    </section>
  );
}