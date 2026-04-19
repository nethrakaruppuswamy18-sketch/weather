import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CloudSun } from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

export default function LandingView({ onStart }: LandingViewProps) {
  return (
    <div className="min-h-screen bg-editorial-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Editorial Style Background */}
      <div className="atmosphere bg-neutral" />
      
      <div className="relative z-10 max-w-4xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="w-20 h-20 bg-editorial-accent/20 rounded-3xl flex items-center justify-center mb-6 mx-auto backdrop-blur-xl border border-editorial-accent/20">
            <CloudSun className="w-10 h-10 text-editorial-accent shadow-[0_0_20px_#818cf8]" />
          </div>
          
          <div className="text-[12px] font-bold uppercase tracking-[0.4em] text-editorial-accent mb-6">
            Atmosphere Reimagined
          </div>
          
          <h1 className="text-7xl md:text-9xl font-extralight tracking-tight leading-[0.85] text-editorial-primary mb-12 select-none">
            Sky<br />
            <span className="font-medium">Cast</span>
          </h1>

          <motion.button
            onClick={onStart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-4 bg-editorial-primary text-editorial-bg px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:bg-white overflow-hidden mx-auto mb-12"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <p className="text-lg md:text-xl text-editorial-secondary max-w-lg mx-auto font-light leading-relaxed">
            Experience weather monitoring through a refined, editorial lens. 
            Real-time atmospheric data delivered with absolute precision.
          </p>
        </motion.div>

        {/* Floating Accents */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-editorial-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-12 flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-editorial-secondary/30">
        <div className="flex items-center">
          <span className="dot opacity-30" />
          Editorial Edition
        </div>
        <div className="hidden md:block">v2026.4.19</div>
        <div>Atmosphere Index</div>
      </div>
    </div>
  );
}
