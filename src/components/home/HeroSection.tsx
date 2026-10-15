import React, { useRef } from 'react';
import { ArrowLeft, Search, Truck, ShieldCheck, MapPin, Calculator, Sparkles, MessageCircle } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'motion/react';
import { Alfa3DHeroScene } from '../3d/Alfa3DHeroScene';
import { CompanyConfig } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface HeroSectionProps {
  config: CompanyConfig;
  onOpenTrack: () => void;
  onOpenQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onOpenTrack, onOpenQuote }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Mouse tracking motion values for subtle depth-based parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle 3D perspective rotations and translations
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4.5, -4.5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5.5, 5.5]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Typography sizing based on customizer configuration
  const headingSizeClass =
    config.heroHeadingSize === 'huge'
      ? 'text-4xl sm:text-6xl xl:text-7xl'
      : config.heroHeadingSize === 'normal'
      ? 'text-2xl sm:text-4xl xl:text-5xl'
      : 'text-3xl sm:text-5xl xl:text-6xl';

  const bodySizeClass =
    config.bodyFontSize === 'lg'
      ? 'text-base sm:text-lg md:text-xl'
      : config.bodyFontSize === 'sm'
      ? 'text-xs sm:text-sm md:text-base'
      : 'text-sm sm:text-base md:text-lg';

  return (
    <section
      id="hero"
      className={`relative min-h-[90vh] pt-20 pb-14 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 overflow-hidden flex items-center transition-colors duration-200 ${
        isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#070d1d] text-slate-100'
      }`}
    >
      {/* Background ambient logistics glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#e30613]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* RIGHT COLUMN: TEXT CONTENT & CTAS (RTL primary) */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start text-right"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Top Verified Experience Tag */}
            <motion.div
              variants={itemVariants}
              className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full backdrop-blur-md mb-4 sm:mb-6 shadow-sm border ${
                isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-white/5 border-white/10 text-slate-200'
              }`}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e30613] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e30613]"></span>
              </span>
              <span className={`text-[11px] sm:text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                الشحن البري الدولي المتخصص • خبرة {config.yearsExperience} عاماً
              </span>
              <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold border ${
                isLight
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-[#e30613]/20 text-red-400 border-[#e30613]/30'
              }`}>
                من {config.startingPriceSar || 150} ريال
              </span>
            </motion.div>

            {/* Main Primary Headline */}
            <motion.h1
              variants={itemVariants}
              className={`${headingSizeClass} font-black tracking-tight leading-[1.2] mb-3 sm:mb-4 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {config.tagline}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 mt-1 sm:mt-2">
                من السعودية إلى كافة محافظات مصر
              </span>
            </motion.h1>

            {/* Subtitle & Value Proposition */}
            <motion.p
              variants={itemVariants}
              className={`${bodySizeClass} font-normal leading-relaxed mb-5 sm:mb-6 max-w-xl ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {config.subTagline ||
                'أسطول شاحنات مبطنة وتريلات مجهزة لنقل العفش المنزلي، الأغراض والطرود، الأجهزة الكهربائية، والبضائع التجارية مع الفك والتغليف والتخليص الجمركي والتسليم لباب بيتك.'}
            </motion.p>

            {/* Land Transport Badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-2 w-full max-w-lg mb-6 sm:mb-8"
            >
              <div className={`flex flex-col items-center justify-center text-center p-2.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-white/10'
              }`}>
                <Truck className="w-4 h-4 text-amber-500 mb-1" />
                <span className={`text-[11px] sm:text-xs font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>شاحنات وتريلات مجهزة</span>
              </div>
              <div className={`flex flex-col items-center justify-center text-center p-2.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-white/10'
              }`}>
                <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
                <span className={`text-[11px] sm:text-xs font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>تغليف مضاد للصدمات</span>
              </div>
              <div className={`flex flex-col items-center justify-center text-center p-2.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-white/10'
              }`}>
                <MapPin className="w-4 h-4 text-sky-500 mb-1" />
                <span className={`text-[11px] sm:text-xs font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>من الباب للباب</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6 sm:mb-8"
            >
              <button
                type="button"
                onClick={onOpenQuote}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#e30613] to-[#b8000b] hover:from-[#c4000b] hover:to-[#990008] text-white font-black text-sm sm:text-base shadow-xl shadow-red-900/40 hover:shadow-red-900/60 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{config.heroCtaText || 'طلب تسعيرة شحن بري'}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenTrack}
                className={`px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl border font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 hover:border-sky-500 shadow-sm'
                    : 'bg-slate-800/90 hover:bg-slate-700/90 border-white/15 text-white hover:border-sky-400/50'
                }`}
              >
                <Search className="w-4 h-4 text-sky-500" />
                <span>تتبع الشحنة البرية</span>
              </button>
            </motion.div>

            {/* Quick Metrics Strip */}
            <motion.div
              variants={itemVariants}
              className={`grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t w-full ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-lg sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {config.yearsExperience}+ عاماً
                </span>
                <span className={`text-[10px] sm:text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>خبرة شحن بري موثقة</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-black text-[#e30613]">
                  {config.branchesCount} فروع
                </span>
                <span className={`text-[10px] sm:text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>محطات تحميل بالمملكة</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-black text-emerald-500">100%</span>
                <span className={`text-[10px] sm:text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>تغطية لكافة محافظات مصر</span>
              </div>
            </motion.div>

          </motion.div>

          {/* LEFT COLUMN: INTERACTIVE 3D HERO CANVAS */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative [perspective:1200px]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full transition-shadow duration-300"
            >
              <Alfa3DHeroScene />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
