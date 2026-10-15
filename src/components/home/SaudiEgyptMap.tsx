/**
 * @file SaudiEgyptMap.tsx
 * @project Alfa Express Logistics Platform
 * @author Jenova Media (https://jenova.media)
 * @description Interactive overland route visualizer representing the cross-border
 * corridor from Saudi Arabia loading hubs (Jeddah, Riyadh, Makkah) through northern
 * ports to Egyptian delivery destinations (Cairo, Alexandria, Delta, Upper Egypt).
 */

import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Truck, Plane, Ship, ArrowLeft, Radio, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface SaudiEgyptMapProps {
  onOpenQuote: () => void;
}

type CityKey = 'jeddah' | 'riyadh' | 'makkah' | 'cairo' | 'alexandria';

interface CityInfo {
  name: string;
  nameEn: string;
  country: string;
  type: string;
  branches: string;
  transitLand: string;
  transitExpress: string;
  address: string;
  phone: string;
  color: string;
  glowColor: string;
  badgeBg: string;
  coords: { x: number; y: number };
  tag: string;
  lightDescription: string;
}

export const SaudiEgyptMap: React.FC<SaudiEgyptMapProps> = ({ onOpenQuote }) => {
  const [activeCity, setActiveCity] = useState<CityKey>('jeddah');
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const cityDetails: Record<CityKey, CityInfo> = {
    jeddah: {
      name: 'جدة (المقر الرئيسي)',
      nameEn: 'Jeddah Hub',
      country: 'المملكة العربية السعودية',
      type: 'المركز الرئيسي لانطلاق قوافل الشحن البري والتريلات',
      branches: '5 فروع (الفيصلية، البوادي، السلامة، الشرفية، الربوة)',
      transitLand: '7 - 10 أيام (شحن بري عادي بالتريلات)',
      transitExpress: '5 - 7 أيام (شاحنة مبطنة خاصة مباشرة)',
      address: '4275 الروضة - حي الفيصلية - جدة',
      phone: '0501653999',
      color: '#e30613',
      glowColor: 'rgba(227, 6, 19, 0.45)',
      badgeBg: 'bg-red-500/20 text-red-400 border-red-500/40',
      coords: { x: 462, y: 432 },
      tag: 'المحطة الرئيسية لتحميل الشاحنات',
      lightDescription: 'منارة حمراء مشعة: انطلاق شاحنات وتريلات الشحن البري عبر شريان البحر الأحمر السريع',
    },
    riyadh: {
      name: 'الرياض (المنطقة الوسطى)',
      nameEn: 'Riyadh Central Hub',
      country: 'المملكة العربية السعودية',
      type: 'محطة الشحن البري والفرز الرئيسية للمنطقة الوسطى',
      branches: 'فرعان (العزيزية، الملز)',
      transitLand: '8 - 12 يوماً (شحن بري عادي)',
      transitExpress: '6 - 8 أيام (شحن بري سريع)',
      address: 'حي العزيزية وحي الملز - الرياض',
      phone: '0539595799',
      color: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.45)',
      badgeBg: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
      coords: { x: 660, y: 350 },
      tag: 'مركز التجميع والشحن البري',
      lightDescription: 'إضاءة زرقاء سماوية: شريان النقل البري السريع من الرياض إلى المنافذ البرية',
    },
    makkah: {
      name: 'مكة المكرمة',
      nameEn: 'Makkah Station',
      country: 'المملكة العربية السعودية',
      type: 'فرع العاصمة المقدسة لخدمة الأهالي والوافدين والمعتمرين',
      branches: 'فرع الشوقية / الرصيفة',
      transitLand: '7 - 10 أيام (شحن بري من الباب للباب)',
      transitExpress: '5 - 7 أيام (شحن بري خاص)',
      address: 'مكة المكرمة - مخطط الشوقية',
      phone: '0567133390',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      badgeBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      coords: { x: 494, y: 440 },
      tag: 'محطة الشحن البري بالعاصمة المقدسة',
      lightDescription: 'إضاءة ذهبية دافئة: الربط المباشر مع أسطول شاحنات التجميع والنقل البري الدولي',
    },
    cairo: {
      name: 'القاهرة الكبرى والجيزة',
      nameEn: 'Cairo & Giza Hub',
      country: 'جمهورية مصر العربية',
      type: 'بوابة الوصول الكبرى ومحور التوزيع البري لكافة المحافظات',
      branches: 'توصيل شاحنات وسيارات مبطنة حتى باب المنزل بكافة الأحياء والقرى',
      transitLand: 'تسليم مباشر لباب البيت خلال 7 - 10 أيام',
      transitExpress: 'تسليم عاجل خلال 5 - 7 أيام',
      address: 'تغطية شاملة للقاهرة، الجيزة، القليوبية، الدلتا ومحافظات الصعيد',
      phone: 'متابعة عبر خدمة العملاء الموحدة',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.45)',
      badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      coords: { x: 238, y: 192 },
      tag: 'محور التوزيع والتسليم البري',
      lightDescription: 'إضاءة خضراء زمردية: استقبال الشاحنات البرية والتوزيع المباشر لكافة محافظات وقرى مصر',
    },
    alexandria: {
      name: 'الإسكندرية ومحافظات الدلتا',
      nameEn: 'Alexandria & Delta Hub',
      country: 'جمهورية مصر العربية',
      type: 'محطة التوزيع للشحن البري لمحافظات الدلتا والساحل الشمالي',
      branches: 'توزيع لجميع مراكز الإسكندرية، البحيرة، الغربية، والدقهلية',
      transitLand: 'تسليم لباب المنزل خلال 8 - 12 يوماً',
      transitExpress: 'تسليم سريع خلال 6 - 8 أيام',
      address: 'تغطية لعروس البحر المتوسط وكافة المدن والمراكز المجاورة',
      phone: 'متابعة عبر خدمة العملاء الموحدة',
      color: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.45)',
      badgeBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
      coords: { x: 204, y: 140 },
      tag: 'محطة التوزيع بالوجه البحري',
      lightDescription: 'إضاءة فيروزية: شريان الشحن البري والتوزيع لمدن ومراكز الوجه البحري والساحل',
    },
  };

  const current = cityDetails[activeCity];

  // Dynamic border and shadow lighting for map container based on selected city
  const containerShadowMap: Record<CityKey, string> = {
    jeddah: 'shadow-[0_0_50px_-10px_rgba(227,6,19,0.35)] border-red-500/30',
    riyadh: 'shadow-[0_0_50px_-10px_rgba(56,189,248,0.35)] border-sky-500/30',
    makkah: 'shadow-[0_0_50px_-10px_rgba(245,158,11,0.35)] border-amber-500/30',
    cairo: 'shadow-[0_0_50px_-10px_rgba(16,185,129,0.35)] border-emerald-500/30',
    alexandria: 'shadow-[0_0_50px_-10px_rgba(6,182,212,0.35)] border-cyan-500/30',
  };

  return (
    <section id="map-route" className={`relative py-24 overflow-hidden transition-colors duration-200 ${isLight ? 'bg-slate-50' : 'bg-[#070d1d]'}`}>
      <div id="map" className="absolute -top-24" />
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e30613_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-md border ${
            isLight ? 'bg-white/80 border-slate-200 text-slate-700 shadow-sm' : 'bg-white/5 border-white/10 text-slate-300'
          }`}>
            <Navigation className="w-3.5 h-3.5 text-[#e30613]" />
            <span className="text-xs font-bold">الربط اللوجستي الجغرافي المباشر</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            خريطة المسار التفاعلي: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">السعودية ⟵ مصر</span>
          </h2>

          <p className={`text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            خريطة جغرافية حقيقية توضح تضاريس البحر الأحمر ونهر النيل ومسارات الشحن المعتمدة. اختر أي مدينة لتسليط أضواء الملاحة ومسارات الشحن الخاصة بها.
          </p>
        </div>

        {/* Interactive Map Visual & Information Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* MAP VISUAL CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`lg:col-span-7 relative rounded-3xl border p-5 sm:p-7 transition-all duration-500 overflow-hidden ${
              isLight ? 'bg-white border-slate-200 shadow-xl' : `bg-[#0b162e]/95 border-white/10 ${containerShadowMap[activeCity]}`
            }`}
          >
            {/* Top HUD Bar: Active Light Indicator */}
            <div className={`flex items-center justify-between gap-3 mb-3 px-3 py-2 rounded-2xl border text-xs ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-black/40 border-white/10 backdrop-blur-md'
            }`}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: current.color }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5"
                    style={{ backgroundColor: current.color }}
                  />
                </span>
                <span className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <Radio className="w-3.5 h-3.5" style={{ color: current.color }} />
                  <span>المحطة المضاءة:</span>
                  <span style={{ color: current.color }}>{current.name}</span>
                </span>
              </div>

              <div className={`hidden sm:flex items-center gap-2 text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>إضاءة ديناميكية متغيرة للمسار</span>
              </div>
            </div>

            {/* GEOGRAPHIC SVG MAP */}
            <div className={`relative w-full aspect-[4/3] flex items-center justify-center rounded-2xl overflow-hidden border ${
              isLight ? 'bg-sky-50/50 border-slate-200' : 'bg-[#081024] border-white/5'
            }`}>
              <svg
                viewBox="0 0 880 620"
                className="w-full h-full select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Dynamic City Glow Filters */}
                  <filter id="activeCityGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <filter id="routeGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Regional Fills */}
                  <linearGradient id="egyptFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isLight ? '#ffffff' : '#1e293b'} />
                    <stop offset="60%" stopColor={isLight ? '#f8fafc' : '#172236'} />
                    <stop offset="100%" stopColor={isLight ? '#f1f5f9' : '#0f172a'} />
                  </linearGradient>

                  <linearGradient id="sinaiFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isLight ? '#ffffff' : '#1e293b'} />
                    <stop offset="100%" stopColor={isLight ? '#e2e8f0' : '#141d2e'} />
                  </linearGradient>

                  <linearGradient id="ksaFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isLight ? '#ffffff' : '#1e293b'} />
                    <stop offset="60%" stopColor={isLight ? '#f8fafc' : '#172236'} />
                    <stop offset="100%" stopColor={isLight ? '#f1f5f9' : '#0f172a'} />
                  </linearGradient>

                  <linearGradient id="redSeaFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isLight ? '#38bdf8' : '#032b5f'} stopOpacity={isLight ? 0.3 : 0.4} />
                    <stop offset="50%" stopColor={isLight ? '#0284c7' : '#0284c7'} stopOpacity={isLight ? 0.2 : 0.25} />
                    <stop offset="100%" stopColor={isLight ? '#38bdf8' : '#032b5f'} stopOpacity={isLight ? 0.3 : 0.35} />
                  </linearGradient>

                  {/* Sea Route Gradient */}
                  <linearGradient id="seaRouteGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e30613" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>

                {/* 1. SEAS & WATERWAYS */}
                {/* Mediterranean Sea (Top) */}
                <path
                  d="M 60 40 L 400 40 L 400 130 Q 340 140 280 135 Q 240 120 200 130 Q 150 140 60 145 Z"
                  fill="#0369a1"
                  fillOpacity="0.18"
                />
                <text x="180" y="80" fill="#0284c7" fontSize="13" fontWeight="bold" opacity="0.5" letterSpacing="2">
                  البحر الأبيض المتوسط
                </text>

                {/* The Red Sea Channel (Geographically accurate diagonal from Gulf of Suez/Aqaba to Bab-el-Mandeb) */}
                <path
                  d="M 270 190 Q 285 240 310 270 L 335 220 L 348 225 Q 365 270 395 330 Q 425 385 458 430 Q 490 480 535 550 L 470 560 Q 420 500 375 425 Q 340 355 315 285 L 270 190 Z"
                  fill="url(#redSeaFill)"
                  stroke="#0284c7"
                  strokeWidth="0.75"
                  strokeOpacity="0.3"
                />
                <text
                  x="385"
                  y="380"
                  fill="#38bdf8"
                  fontSize="14"
                  fontWeight="bold"
                  opacity="0.55"
                  transform="rotate(50, 385, 380)"
                  letterSpacing="3"
                >
                  البحر الأحمر
                </text>

                {/* Gulf of Suez & Gulf of Aqaba Labels */}
                <text x="270" y="240" fill="#38bdf8" fontSize="9" opacity="0.5" transform="rotate(65, 270, 240)">
                  خليج السويس
                </text>
                <text x="335" y="245" fill="#38bdf8" fontSize="9" opacity="0.5" transform="rotate(70, 335, 245)">
                  خليج العقبة
                </text>

                {/* Arabian Gulf (Eastern Edge) */}
                <path
                  d="M 730 240 Q 755 285 770 330 Q 780 390 775 430 L 830 430 L 830 240 Z"
                  fill="#0369a1"
                  fillOpacity="0.15"
                />
                <text x="770" y="270" fill="#0284c7" fontSize="11" fontWeight="bold" opacity="0.5">
                  الخليج العربي
                </text>

                {/* 2. EGYPT MAINLAND (Western border, Mediterranean coast, Nile, Eastern Desert) */}
                <path
                  d="M 70 145 Q 130 140 190 135 L 204 140 Q 235 155 245 185 L 268 188 Q 285 240 310 270 Q 330 330 365 400 Q 395 460 425 520 L 70 520 Z"
                  fill="url(#egyptFill)"
                  stroke={isLight ? '#cbd5e1' : '#334155'}
                  strokeWidth="1.5"
                />

                {/* SINAI PENINSULA (V-shape between Gulf of Suez & Gulf of Aqaba) */}
                <path
                  d="M 270 188 L 335 150 L 345 205 L 335 220 L 310 270 Q 290 230 270 188 Z"
                  fill="url(#sinaiFill)"
                  stroke={isLight ? '#cbd5e1' : '#475569'}
                  strokeWidth="1.2"
                />
                <text x="312" y="210" fill={isLight ? '#475569' : '#94a3b8'} fontSize="11" fontWeight="bold" textAnchor="middle">
                  سيناء
                </text>

                {/* NILE DELTA (Fertile triangular apex north of Cairo) */}
                <path
                  d="M 204 140 Q 240 125 275 145 L 268 188 L 238 192 Z"
                  fill={isLight ? '#059669' : '#064e3b'}
                  fillOpacity={isLight ? 0.2 : 0.45}
                  stroke="#10b981"
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                />

                {/* NILE RIVER (Flowing south from Aswan through Luxor, Qena bend, Asyut to Cairo & Delta) */}
                <path
                  d="M 330 520 Q 320 480 310 440 Q 315 410 295 380 Q 275 350 260 310 Q 250 260 245 220 L 238 192"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeOpacity="0.75"
                  fill="none"
                />
                {/* Nile Delta Branches: Rosetta to Alexandria & Damietta */}
                <path
                  d="M 238 192 Q 220 165 204 140 M 238 192 Q 260 165 275 145"
                  stroke="#0284c7"
                  strokeWidth="1.8"
                  strokeOpacity="0.75"
                  fill="none"
                />
                <text x="285" y="360" fill={isLight ? '#0284c7' : '#38bdf8'} fontSize="10" opacity={isLight ? 0.8 : 0.6} transform="rotate(-70, 285, 360)">
                  نهر النيل
                </text>
                <text x="140" y="340" fill={isLight ? '#475569' : '#94a3b8'} fontSize="22" fontWeight="900" opacity={isLight ? 0.6 : 0.4} textAnchor="middle">
                  مـصـر
                </text>

                {/* 3. SAUDI ARABIA (Arabian Peninsula with coastlines, Nejd, Hijaz, Eastern Province) */}
                <path
                  d="M 345 205 Q 365 245 385 295 Q 415 350 435 390 L 462 432 Q 490 480 535 550 L 730 540 L 775 430 Q 770 350 760 300 Q 740 250 680 200 L 520 180 L 410 185 L 345 205 Z"
                  fill="url(#ksaFill)"
                  stroke={isLight ? '#cbd5e1' : '#334155'}
                  strokeWidth="1.5"
                />
                <text x="610" y="270" fill={isLight ? '#475569' : '#94a3b8'} fontSize="22" fontWeight="900" opacity={isLight ? 0.6 : 0.4} textAnchor="middle">
                  المملكة العربية السعودية
                </text>
                <text x="445" y="345" fill={isLight ? '#475569' : '#64748b'} fontSize="10" opacity={isLight ? 0.7 : 0.5} transform="rotate(50, 445, 345)">
                  ساحل الحجاز
                </text>
                <text x="660" y="385" fill={isLight ? '#475569' : '#64748b'} fontSize="11" opacity={isLight ? 0.7 : 0.5} textAnchor="middle">
                  هضبة نجد
                </text>

                {/* 4. LOGISTICS CORRIDORS WITH DYNAMIC LIGHTING */}

                {/* CORRIDOR 1: MARITIME SEA ROUTE (Jeddah Port -> Red Sea -> Suez Canal -> Alexandria) */}
                {/* Active when 'jeddah' or 'alexandria' is active */}
                <path
                  d="M 462 432 Q 380 350 310 270 Q 285 220 270 188 Q 235 155 204 140"
                  stroke="url(#seaRouteGrad)"
                  strokeWidth={activeCity === 'jeddah' || activeCity === 'alexandria' ? '4.5' : '2'}
                  strokeDasharray={activeCity === 'jeddah' || activeCity === 'alexandria' ? '8 4' : '4 4'}
                  strokeOpacity={activeCity === 'jeddah' || activeCity === 'alexandria' ? '1' : '0.25'}
                  filter={activeCity === 'jeddah' || activeCity === 'alexandria' ? 'url(#routeGlow)' : undefined}
                  className={activeCity === 'jeddah' || activeCity === 'alexandria' ? 'animate-pulse' : ''}
                />

                {/* CORRIDOR 2: DIRECT AIR BRIDGE (Jeddah / Riyadh -> Cairo Airport) */}
                {/* Active when 'jeddah', 'riyadh', or 'cairo' is active */}
                <path
                  d="M 462 432 Q 350 280 238 192"
                  stroke={activeCity === 'cairo' ? '#10b981' : activeCity === 'jeddah' ? '#e30613' : '#38bdf8'}
                  strokeWidth={activeCity === 'jeddah' || activeCity === 'cairo' ? '4' : '1.8'}
                  strokeDasharray={activeCity === 'jeddah' || activeCity === 'cairo' ? '10 5' : '4 4'}
                  strokeOpacity={activeCity === 'jeddah' || activeCity === 'cairo' ? '1' : '0.25'}
                  filter={activeCity === 'jeddah' || activeCity === 'cairo' ? 'url(#routeGlow)' : undefined}
                />

                {/* CORRIDOR 3: SAUDI CENTRAL EXPRESSWAY (Riyadh -> Makkah & Jeddah) */}
                {/* Active when 'riyadh', 'makkah', or 'jeddah' is active */}
                <path
                  d="M 660 350 Q 560 390 494 440 L 462 432"
                  stroke={activeCity === 'riyadh' ? '#38bdf8' : activeCity === 'makkah' ? '#f59e0b' : '#e30613'}
                  strokeWidth={activeCity === 'riyadh' || activeCity === 'makkah' ? '4' : '2'}
                  strokeDasharray={activeCity === 'riyadh' || activeCity === 'makkah' ? '8 4' : '5 4'}
                  strokeOpacity={activeCity === 'riyadh' || activeCity === 'makkah' || activeCity === 'jeddah' ? '0.95' : '0.25'}
                  filter={activeCity === 'riyadh' || activeCity === 'makkah' ? 'url(#routeGlow)' : undefined}
                />

                {/* CORRIDOR 4: RIYADH TO CAIRO DIRECT AIR CORRIDOR */}
                {activeCity === 'riyadh' && (
                  <path
                    d="M 660 350 Q 450 220 238 192"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                    strokeOpacity="0.9"
                    filter="url(#routeGlow)"
                    className="animate-pulse"
                  />
                )}

                {/* CORRIDOR 5: EGYPT INLAND DELTA HIGHWAY (Cairo -> Alexandria) */}
                <path
                  d="M 238 192 Q 220 165 204 140"
                  stroke={activeCity === 'cairo' ? '#10b981' : activeCity === 'alexandria' ? '#06b6d4' : '#64748b'}
                  strokeWidth={activeCity === 'cairo' || activeCity === 'alexandria' ? '3.5' : '1.5'}
                  strokeDasharray="4 3"
                  strokeOpacity={activeCity === 'cairo' || activeCity === 'alexandria' ? '1' : '0.3'}
                />

                {/* 5. TRANSPORT ICONS ON ACTIVE PATHWAYS */}
                {/* Cargo Ship Icon on Red Sea */}
                <g transform="translate(360, 310)">
                  <circle
                    cx="0"
                    cy="0"
                    r="13"
                    fill="#070d1d"
                    stroke={activeCity === 'jeddah' || activeCity === 'alexandria' ? '#e30613' : '#334155'}
                    strokeWidth="2"
                  />
                  <text x="0" y="4" fill="#ffffff" fontSize="10" textAnchor="middle">
                    🚢
                  </text>
                </g>

                {/* Cargo Plane Icon on Air Bridge */}
                <g transform="translate(330, 260)">
                  <circle
                    cx="0"
                    cy="0"
                    r="13"
                    fill="#070d1d"
                    stroke={activeCity === 'cairo' || activeCity === 'jeddah' || activeCity === 'riyadh' ? '#38bdf8' : '#334155'}
                    strokeWidth="2"
                  />
                  <text x="0" y="4" fill="#ffffff" fontSize="10" textAnchor="middle">
                    ✈️
                  </text>
                </g>

                {/* Cargo Truck Icon on Saudi Highway */}
                <g transform="translate(565, 395)">
                  <circle
                    cx="0"
                    cy="0"
                    r="13"
                    fill="#070d1d"
                    stroke={activeCity === 'riyadh' || activeCity === 'makkah' ? '#f59e0b' : '#334155'}
                    strokeWidth="2"
                  />
                  <text x="0" y="4" fill="#ffffff" fontSize="10" textAnchor="middle">
                    🚚
                  </text>
                </g>

                {/* 6. DYNAMIC CITY NODES WITH ILLUMINATED LIGHTS */}
                {(['alexandria', 'cairo', 'makkah', 'jeddah', 'riyadh'] as const).map((key) => {
                  const city = cityDetails[key];
                  const isSelected = activeCity === key;
                  const { x, y } = city.coords;

                  return (
                    <g
                      key={key}
                      className="cursor-pointer transition-transform hover:scale-105"
                      onClick={() => setActiveCity(key)}
                    >
                      {/* Ambient Halo & Pulse for Selected City */}
                      {isSelected && (
                        <>
                          {/* Pulsing Light Waves */}
                          <circle
                            cx={x}
                            cy={y}
                            r="28"
                            fill={city.color}
                            fillOpacity="0.22"
                            className="animate-ping"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="20"
                            fill={city.color}
                            fillOpacity="0.3"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="15"
                            stroke={city.color}
                            strokeWidth="2"
                            strokeDasharray="4 2"
                            className="animate-spin"
                            style={{ transformOrigin: `${x}px ${y}px`, animationDuration: '6s' }}
                          />
                          {/* Vertical Beacon Pointer Beam */}
                          <line
                            x1={x}
                            y1={y}
                            x2={x}
                            y2={y - 28}
                            stroke={city.color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            filter="url(#activeCityGlow)"
                          />
                          <circle
                            cx={x}
                            cy={y - 28}
                            r="3"
                            fill="#ffffff"
                          />
                        </>
                      )}

                      {/* City Core Light Dot */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? '9' : '5.5'}
                        fill={isSelected ? city.color : '#475569'}
                        stroke="#ffffff"
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        filter={isSelected ? 'url(#activeCityGlow)' : undefined}
                      />

                      {/* White Center Specular Dot */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? '3.5' : '2'}
                        fill="#ffffff"
                      />

                      {/* City Name Badge / Label */}
                      <g transform={`translate(${x}, ${y + (key === 'cairo' || key === 'jeddah' ? 24 : -16)})`}>
                        <rect
                          x={key === 'jeddah' ? -65 : -55}
                          y="-11"
                          width={key === 'jeddah' ? 130 : 110}
                          height="20"
                          rx="10"
                          fill={isSelected ? city.color : '#0f172a'}
                          fillOpacity={isSelected ? 0.95 : 0.8}
                          stroke={isSelected ? '#ffffff' : '#334155'}
                          strokeWidth={isSelected ? 1.5 : 0.8}
                        />
                        <text
                          x="0"
                          y="3"
                          fill="#ffffff"
                          fontSize={isSelected ? '11.5' : '10'}
                          fontWeight={isSelected ? '900' : '600'}
                          textAnchor="middle"
                        >
                          {key === 'jeddah'
                            ? 'جدة (المقر الرئيسي)'
                            : key === 'riyadh'
                            ? 'الرياض (فرعان)'
                            : key === 'cairo'
                            ? 'القاهرة والجيزة'
                            : key === 'alexandria'
                            ? 'الإسكندرية (الميناء)'
                            : 'مكة المكرمة'}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Bottom In-Map Legend */}
              <div className="absolute bottom-2.5 right-3 left-3 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-[10px] text-slate-300 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>مصر والدلتا</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span>البحر الأحمر</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#e30613]" />
                    <span>المملكة العربية السعودية</span>
                  </span>
                </div>
                <div className="hidden sm:block text-slate-400 font-medium">
                  {current.lightDescription}
                </div>
              </div>
            </div>

            {/* City Selection Buttons Filter (Changes the lights instantly) */}
            <div className={`flex flex-wrap gap-2 mt-4 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
              {(['jeddah', 'riyadh', 'makkah', 'cairo', 'alexandria'] as const).map((key) => {
                const item = cityDetails[key];
                const isSelected = activeCity === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveCity(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'text-white shadow-lg ring-1 ring-white/30'
                        : isLight
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: isSelected ? item.color : undefined,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isSelected ? '#ffffff' : item.color }}
                    />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ACTIVE CITY INFORMATION CARD */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div className={`rounded-3xl border p-6 sm:p-8 relative ${
              isLight ? 'bg-white border-slate-200 shadow-xl' : 'bg-[#0b162e] border-white/15 shadow-2xl'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${current.badgeBg}`}>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{current.country}</span>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-md font-semibold border ${
                  isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-white/5 text-slate-300 border-white/10'
                }`}>
                  {current.tag}
                </span>
              </div>

              <h3 className={`text-2xl font-black mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {current.name}
              </h3>

              <p className={`text-xs leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {current.type}
              </p>

              {/* Lighting Status Highlight Box */}
              <div
                className="p-3.5 rounded-2xl mb-5 border text-xs leading-relaxed flex items-start gap-2.5"
                style={{
                  backgroundColor: `${current.color}15`,
                  borderColor: `${current.color}40`,
                  color: isLight ? '#0f172a' : '#f8fafc',
                }}
              >
                <Radio className="w-4 h-4 shrink-0 mt-0.5" style={{ color: current.color }} />
                <div>
                  <span className="block font-bold mb-0.5" style={{ color: current.color }}>
                    حالة الإضاءة الملاحية النشطة:
                  </span>
                  <span>{current.lightDescription}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-white/10'
                }`}>
                  <Truck className="w-4 h-4 text-[#e30613] shrink-0 mt-0.5" />
                  <div>
                    <span className={`block text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>مدة الشحن البري العادي (تريلات مجهزة):</span>
                    <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>{current.transitLand}</span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-white/10'
                }`}>
                  <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className={`block text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>مدة الشحن البري السريع (شاحنة مبطنة خاصة):</span>
                    <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>{current.transitExpress}</span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-white/10'
                }`}>
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className={`block text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>الفروع والتغطية والتسليم:</span>
                    <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>{current.branches}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenQuote}
                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-[#e30613] to-[#b8000b] hover:from-[#c4000b] hover:to-[#990008] text-white font-bold text-sm shadow-lg shadow-red-900/30 transition-all flex items-center justify-center gap-2"
              >
                <span>احسب تكلفة شحنتك من أو إلى {current.name.split(' ')[0]}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
