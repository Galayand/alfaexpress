import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Truck, Navigation, Plane, Ship } from 'lucide-react';

export const ScrollProgressTracker: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSegment, setActiveSegment] = useState<'saudi' | 'transit' | 'egypt'>('saudi');

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const pct = Math.round(latest * 100);
      setScrollPercent(pct);
      if (pct < 35) {
        setActiveSegment('saudi');
      } else if (pct < 70) {
        setActiveSegment('transit');
      } else {
        setActiveSegment('egypt');
      }
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* 1. TOP GLOBAL RUNNING GLOW BAR */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-900/60 backdrop-blur-md z-[100] pointer-events-none">
        {/* Animated Fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#e30613] via-amber-400 to-[#38bdf8] origin-left shadow-[0_0_12px_rgba(227,6,19,0.8)]"
          style={{ scaleX }}
        />

        {/* Moving Delivery Van Beacon on the progress bar */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-75 flex items-center justify-center pointer-events-none"
          style={{ left: `${scrollPercent}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-5 h-5 rounded-full bg-[#070d1d] border border-red-500 flex items-center justify-center shadow-lg shadow-red-500/50">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute" />
            <Truck className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
      </div>

      {/* 2. FLOATING DESKTOP SCROLL MINI-TRACKER (Vertical Route Progress) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 p-2.5 rounded-2xl bg-[#091326]/80 border border-white/10 backdrop-blur-md shadow-2xl pointer-events-auto">
        <div className="flex flex-col items-center gap-1 text-[10px] font-bold text-slate-300">
          <Navigation className="w-3.5 h-3.5 text-[#e30613]" />
          <span>المسار</span>
        </div>

        {/* Vertical Track Rail */}
        <div className="relative w-1.5 h-36 rounded-full bg-slate-800 overflow-hidden my-1">
          <motion.div
            className="w-full bg-gradient-to-b from-[#e30613] via-amber-400 to-[#38bdf8] origin-top rounded-full"
            style={{ scaleY: scaleX, height: '100%' }}
          />
        </div>

        {/* Milestone Node 1: Saudi */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
            activeSegment === 'saudi'
              ? 'bg-[#e30613] text-white ring-2 ring-red-400/50 shadow-lg'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
          title="المملكة العربية السعودية"
        >
          🇸🇦
        </button>

        {/* Milestone Node 2: Route Map / Transit */}
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('map-route');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
            activeSegment === 'transit'
              ? 'bg-amber-500 text-white ring-2 ring-amber-400/50 shadow-lg'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
          title="معبر البحر الأحمر والشحن الدولي"
        >
          🚢
        </button>

        {/* Milestone Node 3: Egypt */}
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('quote');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
            activeSegment === 'egypt'
              ? 'bg-emerald-500 text-white ring-2 ring-emerald-400/50 shadow-lg'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
          title="جمهورية مصر العربية والتسليم"
        >
          🇪🇬
        </button>

        <span className="text-[9px] font-mono font-bold text-slate-400 mt-1">{scrollPercent}%</span>
      </div>
    </>
  );
};
