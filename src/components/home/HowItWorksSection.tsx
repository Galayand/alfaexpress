import React, { useState } from 'react';
import {
  PhoneCall,
  Layers,
  Boxes,
  FileText,
  Truck,
  MapPin,
  HeartHandshake,
  Sparkles,
  ArrowLeft,
  Check,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { verifiedProcessSteps } from '../../data/companyData';
import { ProcessStep } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface HowItWorksSectionProps {
  onOpenQuote: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenQuote }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'PhoneCall': return PhoneCall;
      case 'Layers': return Layers;
      case 'Boxes': return Boxes;
      case 'FileText': return FileText;
      case 'Truck': return Truck;
      case 'MapPin': return MapPin;
      case 'HeartHandshake': return HeartHandshake;
      case 'Sparkles': return Sparkles;
      case 'ShieldCheck': return ShieldCheck;
      case 'PackageCheck': return PackageCheck;
      default: return Truck;
    }
  };

  const currentStepData = verifiedProcessSteps.find((s) => s.step === activeStep) || verifiedProcessSteps[0];
  const CurrentIcon = getStepIcon(currentStepData.iconName);

  return (
    <section id="journey" className={`relative py-20 sm:py-24 overflow-hidden transition-colors duration-200 ${isLight ? 'bg-white' : 'bg-[#0b1429]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e30613]/10 border border-[#e30613]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#e30613]" />
            <span className="text-xs font-bold text-[#e30613]">خطوات الشحن البري المنظمة</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            كيف نعمل؟ <span className="text-[#e30613]">رحلة شحنتك البرية خطوة بخطوة</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            من أول طلب واستلام بالشاحنات المبطنة من باب بيتك بالسعودية وحتى تفريغ الشاحنة والتسليم لباب بيتك في مصر.
          </p>
        </div>

        {/* STEP PROGRESSION BAR (Interactive Carousel/Tabs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-10 overflow-x-auto pb-2"
        >
          {verifiedProcessSteps.map((stepItem: ProcessStep) => {
            const isCurrent = stepItem.step === activeStep;
            const isCompleted = stepItem.step < activeStep;

            return (
              <button
                key={stepItem.step}
                type="button"
                onClick={() => setActiveStep(stepItem.step)}
                className={`flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border transition-all text-center group min-w-[72px] sm:min-w-0 ${
                  isCurrent
                    ? 'bg-[#e30613] border-red-500 text-white shadow-lg shadow-red-950/30 scale-105 z-10'
                    : isCompleted
                    ? isLight
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-slate-900/90 border-emerald-500/40 text-emerald-400'
                    : isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-black mb-1.5 ${
                  isCurrent
                    ? 'bg-white text-[#e30613]'
                    : isCompleted
                    ? isLight
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-emerald-500/20 text-emerald-300'
                    : isLight
                    ? 'bg-white text-slate-700 shadow-sm'
                    : 'bg-white/5 text-slate-300'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : stepItem.step}
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold line-clamp-1">
                  {stepItem.title}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ACTIVE STEP CARD DISPLAY */}
        <div className={`max-w-4xl mx-auto rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/90 border-white/15'
        }`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#e30613]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-red-600 to-[#b8000b] text-white flex items-center justify-center shrink-0 shadow-xl shadow-red-950/30">
              <CurrentIcon className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="flex-1 text-center md:text-right">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isLight ? 'bg-amber-100 text-amber-800' : 'bg-white/10 text-amber-300'
                }`}>
                  المرحلة {currentStepData.step} من 8
                </span>
                <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {currentStepData.duration}
                </span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-black mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {currentStepData.title}
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {currentStepData.description}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                {activeStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveStep(activeStep - 1)}
                    className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                    }`}
                  >
                    الخطوة السابقة
                  </button>
                )}

                {activeStep < 8 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="px-5 py-2 rounded-xl bg-[#e30613] hover:bg-red-700 text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <span>الخطوة التالية</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenQuote}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e30613] to-[#b8000b] text-xs font-bold text-white shadow-lg flex items-center gap-1.5"
                  >
                    <span>ابدأ شحن أغراضك الآن</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
