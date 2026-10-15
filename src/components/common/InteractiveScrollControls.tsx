import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InteractiveScrollControls: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed left-5 bottom-24 sm:bottom-8 z-40"
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="العودة لأعلى الصفحة"
            className="group relative flex items-center justify-center w-11 h-11 rounded-2xl bg-[#091326]/90 hover:bg-[#e30613] text-slate-300 hover:text-white border border-white/15 hover:border-red-500 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="sr-only">أعلى الصفحة</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
