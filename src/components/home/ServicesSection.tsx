import React, { useState } from 'react';
import {
  PackageCheck,
  Truck,
  Box,
  ShieldCheck,
  Zap,
  FileCheck2,
  Sparkles,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { verifiedServices } from '../../data/companyData';
import { ServiceItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Truck': return Truck;
      case 'Box': return Box;
      case 'PackageCheck': return PackageCheck;
      case 'ShieldCheck': return ShieldCheck;
      case 'Zap': return Zap;
      case 'FileCheck2': return FileCheck2;
      default: return Truck;
    }
  };

  return (
    <section id="services" className={`relative py-20 sm:py-24 overflow-hidden transition-colors duration-200 ${isLight ? 'bg-slate-50' : 'bg-[#070d1d]'}`}>
      {/* Glow Effects */}
      <div className="absolute top-10 right-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 ${
            isLight ? 'bg-white border border-slate-200 shadow-sm' : 'bg-white/5 border border-white/10'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-[#e30613]" />
            <span className={`text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>حلول الشحن البري المتكاملة</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            خدمات الشحن البري <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">من السعودية إلى مصر</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            أسطول شاحنات مبطنة وتريلات مجهزة لنقل العفش، الأغراض، البضائع، والأجهزة بأعلى معايير الحماية والتسليم لباب البيت في كافة المحافظات.
          </p>
        </div>

        {/* 3D Depth Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedServices.map((service: ServiceItem, idx: number) => {
            const IconComponent = getIcon(service.iconName);
            const isHovered = activeCard === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                onMouseEnter={() => setActiveCard(service.id)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => setActiveCard(isHovered ? null : service.id)}
                className={`relative rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between cursor-pointer group select-none ${
                  isLight
                    ? isHovered
                      ? 'bg-white border-[#e30613]/50 shadow-2xl shadow-red-950/15 -translate-y-2'
                      : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                    : isHovered
                      ? 'bg-gradient-to-b from-[#0e1b38] to-[#081022] border-[#e30613]/50 shadow-2xl shadow-red-950/40 -translate-y-2'
                      : 'bg-gradient-to-b from-[#0e1b38] to-[#081022] border-white/10 hover:border-white/20'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:bg-[#e30613] group-hover:text-white ${
                      isLight
                        ? 'bg-red-50 text-[#e30613] border border-red-100'
                        : 'bg-white/5 border border-white/10 text-[#e30613]'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                      isLight
                        ? 'bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-slate-800 text-slate-300 border border-white/10'
                    }`}>
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`text-lg sm:text-xl font-black group-hover:text-[#e30613] transition-colors mb-1.5 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {service.title}
                  </h3>
                  <span className="text-xs text-[#e30613] font-semibold block mb-4">
                    {service.subtitle}
                  </span>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {service.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className={`space-y-2.5 mb-6 pt-4 border-t ${
                    isLight ? 'border-slate-100' : 'border-white/5'
                  }`}>
                    {service.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className={`flex items-center gap-2 text-xs ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Trigger */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectServiceForQuote(service.title);
                  }}
                  className={`w-full py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border shadow-sm group-hover:bg-[#e30613] group-hover:text-white group-hover:border-[#e30613] ${
                    isLight
                      ? 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
                      : 'bg-white/5 text-white border-white/10'
                  }`}
                >
                  <span>طلب تسعيرة لهذه الخدمة</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
