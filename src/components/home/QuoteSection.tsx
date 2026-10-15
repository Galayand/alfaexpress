/**
 * @file QuoteSection.tsx
 * @project Alfa Express Logistics Platform
 * @author Jenova Media (https://jenova.media)
 * @description Interactive Land Freight CBM (Cubic Meter) Calculator component.
 * Features 3 volume input modes (physical dimensions, direct CBM entry, cargo presets),
 * live price estimation, delivery time projection, and pre-formatted WhatsApp quote dispatch.
 */

import React, { useState, useRef, useMemo } from 'react';
import { Calculator, Send, CheckCircle2, Shield, Phone, MessageSquare, AlertCircle, Truck, Package, Layers, Box, Maximize2, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CompanyConfig } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface QuoteSectionProps {
  config: CompanyConfig;
  defaultService?: string;
}

type VolumeMode = 'dimensions' | 'cbm' | 'presets';

interface PresetItem {
  id: string;
  name: string;
  icon: string;
  cbm: number;
  description: string;
}

const COMMON_PRESETS: PresetItem[] = [
  { id: 'carton-med', name: 'كرتونة وسط', icon: '📦', cbm: 0.08, description: '50×40×40 سم (ملابس ومستلزمات)' },
  { id: 'carton-large', name: 'كرتونة كبيرة', icon: '📦', cbm: 0.15, description: '60×50×50 سم (أغراض ومفارش)' },
  { id: 'suitcase', name: 'حقيبة سفر كبيرة', icon: '🧳', cbm: 0.12, description: 'شنطة سفر 32 كجم' },
  { id: 'appliance', name: 'جهاز كهربائي / شاشة', icon: '📺', cbm: 0.40, description: 'شاشة / غسالة / فرن' },
  { id: 'fridge', name: 'ثلاجة كبيرة / ديب فريزر', icon: '🧊', cbm: 0.85, description: 'تغليف خاص مبطن' },
  { id: 'bedroom', name: 'غرفة نوم كاملة', icon: '🛏️', cbm: 4.50, description: 'دولاب + سرير + تسريحة مفككة' },
  { id: 'living', name: 'طقم كنب / صالون', icon: '🛋️', cbm: 3.20, description: 'كنب ومجالس مغلفة' },
  { id: 'apartment', name: 'عفش شقة كاملة', icon: '🏠', cbm: 14.00, description: 'شاحنة مبطنة مخصصة أو جزء تريلا' },
];

export const QuoteSection: React.FC<QuoteSectionProps> = ({ config, defaultService = '' }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [originCity, setOriginCity] = useState('جدة');
  const [destinationGov, setDestinationGov] = useState('القاهرة');
  const [shipmentType, setShipmentType] = useState(defaultService || 'عفش وأثاث منزلي');
  
  // Volumetric Calculation States (Volume by CBM / Dimensions / Presets)
  const [volumeMode, setVolumeMode] = useState<VolumeMode>('dimensions');
  
  // Mode 1: Dimensions in cm
  const [dimLength, setDimLength] = useState<number>(100);
  const [dimWidth, setDimWidth] = useState<number>(80);
  const [dimHeight, setDimHeight] = useState<number>(60);
  const [dimQuantity, setDimQuantity] = useState<number>(1);
  
  // Mode 2: Direct CBM
  const [directCbm, setDirectCbm] = useState<number>(1.5);

  // Mode 3: Presets quantities
  const [presetQuantities, setPresetQuantities] = useState<Record<string, number>>({
    'carton-large': 2,
    'appliance': 1,
  });

  const [truckType, setTruckType] = useState<'تريلا مشتركة (LTL)' | 'شاحنة مبطنة سريعة خاصة' | 'شاحنة كاملة (FTL)'>('تريلا مشتركة (LTL)');
  const [packagingService, setPackagingService] = useState(true);
  const [disassemblyService, setDisassemblyService] = useState(false);
  const [woodenCrate, setWoodenCrate] = useState(false);
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam trap

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  // Parallax Scroll References
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [15, -15]);

  // Calculated Total CBM
  const totalCbm = useMemo(() => {
    if (volumeMode === 'dimensions') {
      const singleItemCbm = (dimLength * dimWidth * dimHeight) / 1000000;
      return Math.max(0.01, parseFloat((singleItemCbm * dimQuantity).toFixed(2)));
    }
    if (volumeMode === 'cbm') {
      return Math.max(0.1, parseFloat(directCbm.toFixed(2)));
    }
    if (volumeMode === 'presets') {
      let sum = 0;
      COMMON_PRESETS.forEach(p => {
        const qty = presetQuantities[p.id] || 0;
        sum += qty * p.cbm;
      });
      return Math.max(0.05, parseFloat(sum.toFixed(2)));
    }
    return 1.0;
  }, [volumeMode, dimLength, dimWidth, dimHeight, dimQuantity, directCbm, presetQuantities]);

  // Volume description helper
  const volumeDescription = useMemo(() => {
    if (totalCbm < 0.5) return 'طرد / كراتين صغيرة الحجم (شحن بري مجدول)';
    if (totalCbm < 2.0) return 'حجم متوسط (شحنة مشتركة في تريلا برية مبطنة)';
    if (totalCbm < 6.0) return 'حجم كبير / أثاث متعدد (مساحة مخصصة في تريلا برية)';
    if (totalCbm < 16.0) return 'حجم شاحنة مبطنة كاملة (شاحنة مغلقة ومبطنة مخصصة)';
    return 'حمولة شاحنة تريلا كبرى كاملة (FTL Direct)';
  }, [totalCbm]);

  const handlePresetChange = (id: string, delta: number) => {
    setPresetQuantities(prev => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('يرجى كتابة الاسم ورقم الجوال للتواصل.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
    
    let volumeDetailsText = '';
    if (volumeMode === 'dimensions') {
      volumeDetailsText = `${dimLength} سم (طول) × ${dimWidth} سم (عرض) × ${dimHeight} سم (ارتفاع) | عدد القطع: ${dimQuantity} | الحجم الإجمالي: ${totalCbm} م³ (CBM)`;
    } else if (volumeMode === 'cbm') {
      volumeDetailsText = `${totalCbm} متر مكعب (CBM) مباشر`;
    } else {
      const selectedList = COMMON_PRESETS
        .filter(p => (presetQuantities[p.id] || 0) > 0)
        .map(p => `${p.name} (عدد ${presetQuantities[p.id]})`)
        .join(' + ');
      volumeDetailsText = `${selectedList || 'أغراض متنوعة'} | الحجم المقدر: ${totalCbm} م³ (CBM)`;
    }

    const additionalServices: string[] = [];
    if (packagingService) additionalServices.push('تغليف بري احترافي');
    if (disassemblyService) additionalServices.push('فك وتركيب نجارين');
    if (woodenCrate) additionalServices.push('صندوق خشبي واقٍ');

    const textMsg = `*طلب تسعيرة شحن بري بالحجم (CBM) - ألفا إكسبريس*:
*الاسم الكريم*: ${name.trim()}
*رقم الجوال*: ${phone.trim()}
*مدينة الاستلام (السعودية)*: ${originCity}
*محافظة التسليم (مصر)*: ${destinationGov}
*نوع الشحنة*: ${shipmentType}
*حجم الشحنة بالمتر المكعب*: ${totalCbm} م³ (CBM)
*تفاصيل الأبعاد / القطع*: ${volumeDetailsText}
*نوع الشاحنة والخدمة*: ${truckType}
*الخدمات الإضافية*: ${additionalServices.length > 0 ? additionalServices.join('، ') : 'شحن بري قياسي'}
*ملاحظات إضافية*: ${notes.trim() || 'لا توجد'}`;

    const waUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(textMsg)}`;
    setLastWhatsAppUrl(waUrl);
    window.open(waUrl, '_blank');
  };

  return (
    <section ref={sectionRef} id="quote" className={`relative py-20 sm:py-24 overflow-hidden transition-colors ${
      isLight ? 'bg-slate-100/90' : 'bg-[#0b1429]'
    }`}>
      <div id="calculator" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* RIGHT COLUMN: HEADLINE & VALUE PROPOSITION */}
          <motion.div
            style={{ y: yParallaxSlow }}
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-start text-right"
          >
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 border ${
              isLight ? 'bg-red-50 border-red-200' : 'bg-[#e30613]/10 border-[#e30613]/25'
            }`}>
              <Box className="w-3.5 h-3.5 text-[#e30613]" />
              <span className={`text-xs font-bold ${isLight ? 'text-red-700' : 'text-red-400'}`}>حاسبة الشحن البري بالحجم (CBM)</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              احسب حجم شحنتك <span className="text-[#e30613]">بالمتر المكعب والأبعاد</span>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              في الشحن البري الدولي، يتم احتساب المساحة المشغولة داخل الشاحنة بالحجم (<span className={`font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>CBM</span>) لضمان أدق تسعيرة وأعلى درجات الأمان لمنقولاتك وأثاثك بدون رسوم إضافية.
            </p>

            {/* Live Volume Summary Card */}
            <div className={`w-full p-4 sm:p-5 rounded-2xl border mb-6 shadow-xl relative overflow-hidden ${
              isLight
                ? 'bg-white border-slate-200 text-slate-800'
                : 'bg-gradient-to-br from-slate-900 to-[#070d1d] border-red-500/20'
            }`}>
              <div className="absolute top-0 left-0 w-2 h-full bg-[#e30613]" />
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>الحجم الإجمالي المقدر للشحنة:</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                  حساب حجم دقيق
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[#e30613]">
                  {totalCbm}
                </span>
                <span className={`text-sm font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>متر مكعب (CBM)</span>
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {volumeDescription}
              </p>
            </div>

            <div className="space-y-3 text-xs w-full">
              <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                isLight ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-slate-900/60 border-white/10 text-slate-300'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>تسعير بري شفاف يعتمد على الأبعاد والحجم الفعلي المشغول</span>
              </div>
              <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                isLight ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-slate-900/60 border-white/10 text-slate-300'
              }`}>
                <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>شاحنات وتريلات مبطنة ومخصصة لمنع احتكاك المنقولات أثناء السفر</span>
              </div>
              <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                isLight ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-slate-900/60 border-white/10 text-slate-300'
              }`}>
                <Shield className="w-4 h-4 text-sky-500 shrink-0" />
                <span>إصدار بوليصة شحن برية رسمية وتأمين شامل على البضائع والأثاث</span>
              </div>
            </div>
          </motion.div>

          {/* LEFT COLUMN: THE FORM */}
          <motion.div
            style={{ y: yParallaxFast }}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className={`rounded-3xl border p-5 sm:p-7 md:p-8 shadow-2xl relative ${
              isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#070d1d] border-white/15 text-white'
            }`}>
              
              {submitted ? (
                <div className="text-center py-8 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className={`text-2xl font-black mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    تم تجهيز وإرسال تفاصيل الشحنة بنجاح!
                  </h3>
                  <p className={`text-sm max-w-md mx-auto mb-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    شكراً لتواصلك مع ألفا إكسبريس للشحن البري. تم تحويل بيانات شحنتك بحجم (<span className={`font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{totalCbm} م³</span>) إلى واتساب خدمة العملاء للتواصل معك على الرقم (<span dir="ltr" className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{phone}</span>).
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mb-6 font-semibold">
                    سيقوم مسؤول الشحن بتأكيد عرض السعر وحجز موعد المعاينة والاستلام من باب منزلك.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    {lastWhatsAppUrl && (
                      <a
                        href={lastWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>فتح محادثة واتساب الآن</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setPhone('');
                      }}
                      className={`w-full sm:w-auto px-5 py-3.5 rounded-xl border text-xs font-semibold ${
                        isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                      }`}
                    >
                      طلب تسعيرة لشحنة أخرى
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Anti-spam Honeypot Field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_contact_check"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/30 text-xs text-red-600 dark:text-red-300 flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* SECTION 1: SENDER INFO */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        الاسم الكريم <span className="text-[#e30613]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="مثال: أحمد محمود"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#e30613] transition-colors ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                            : 'bg-slate-900 border-white/15 text-white placeholder-slate-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        رقم الجوال (واتساب) <span className="text-[#e30613]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05xxxxxxxx"
                        dir="ltr"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-right focus:outline-none focus:border-[#e30613] transition-colors ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                            : 'bg-slate-900 border-white/15 text-white placeholder-slate-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* SECTION 2: ORIGIN & DESTINATION */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        مدينة الاستلام (السعودية)
                      </label>
                      <select
                        value={originCity}
                        onChange={(e) => setOriginCity(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#e30613] ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                            : 'bg-slate-900 border-white/15 text-white'
                        }`}
                      >
                        <option value="جدة">جدة (المقر والفروع الرئيسية 5)</option>
                        <option value="الرياض">الرياض (العزيزية والملز)</option>
                        <option value="مكة المكرمة">مكة المكرمة (الشوقية/الرصيفة)</option>
                        <option value="المدينة المنورة">المدينة المنورة</option>
                        <option value="الطائف">الطائف</option>
                        <option value="الدمام / الخبر">الدمام والخبر (الشرقية)</option>
                        <option value="تبوك / ينبع">تبوك وينبع</option>
                        <option value="أبها / خميس مشيط">أبها وخميس مشيط (الجنوب)</option>
                        <option value="مدينة أخرى بالمملكة">مدينة أخرى بالمملكة (استلام منزلي)</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        محافظة التسليم (مصر)
                      </label>
                      <select
                        value={destinationGov}
                        onChange={(e) => setDestinationGov(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#e30613] ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                            : 'bg-slate-900 border-white/15 text-white'
                        }`}
                      >
                        <option value="القاهرة">القاهرة</option>
                        <option value="الجيزة">الجيزة</option>
                        <option value="الإسكندرية">الإسكندرية</option>
                        <option value="الدقهلية / المنصورة">الدقهلية (المنصورة)</option>
                        <option value="الغربية / طنطا">الغربية (طنطا والمحلة)</option>
                        <option value="الشرقية / الزقازيق">الشرقية (الزقازيق والعاشر)</option>
                        <option value="المنوفية">المنوفية (شبين الكوم ومنوف)</option>
                        <option value="القليوبية">القليوبية (بنها وشبرا)</option>
                        <option value="البحيرة">البحيرة (دمنهور وكفر الدوار)</option>
                        <option value="كفر الشيخ">كفر الشيخ</option>
                        <option value="دمياط">دمياط</option>
                        <option value="بورسعيد / الإسماعيلية / السويس">محافظات القناة</option>
                        <option value="الفيوم / بني سويف">الفيوم وبني سويف</option>
                        <option value="المنيا">المنيا</option>
                        <option value="أسيوط">أسيوط</option>
                        <option value="سوهاج">سوهاج</option>
                        <option value="قنا">قنا</option>
                        <option value="الأقصر / أسوان">الأقصر وأسوان</option>
                        <option value="محافظة أخرى">محافظة أو قرية أخرى</option>
                      </select>
                    </div>
                  </div>

                  {/* SECTION 3: VOLUMETRIC CALCULATOR BOX */}
                  <div className={`p-4 sm:p-5 rounded-2xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/90 border-white/10'
                  }`}>
                    
                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b ${
                      isLight ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <div>
                        <span className={`text-xs font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          طريقة احتساب الحجم البري (الحجم بالمتر المكعب CBM)
                        </span>
                        <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          اختر الطريقة الأنسب لك لتحديد حجم وأبعاد منقولاتك
                        </span>
                      </div>

                      {/* Mode Switcher Tabs */}
                      <div className={`flex items-center gap-1 p-1 rounded-xl border ${
                        isLight ? 'bg-slate-200/70 border-slate-300' : 'bg-black/40 border-white/10'
                      }`}>
                        <button
                          type="button"
                          onClick={() => setVolumeMode('dimensions')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            volumeMode === 'dimensions'
                              ? 'bg-[#e30613] text-white shadow'
                              : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          الأبعاد (سم)
                        </button>
                        <button
                          type="button"
                          onClick={() => setVolumeMode('presets')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            volumeMode === 'presets'
                              ? 'bg-[#e30613] text-white shadow'
                              : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          القطع والكراتين
                        </button>
                        <button
                          type="button"
                          onClick={() => setVolumeMode('cbm')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            volumeMode === 'cbm'
                              ? 'bg-[#e30613] text-white shadow'
                              : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          مباشر (م³)
                        </button>
                      </div>
                    </div>

                    {/* MODE 1: DIMENSIONS */}
                    {volumeMode === 'dimensions' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          <div>
                            <label className={`block text-[11px] font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                              الطول (سم)
                            </label>
                            <input
                              type="number"
                              min={10}
                              max={1200}
                              value={dimLength}
                              onChange={(e) => setDimLength(Math.max(1, Number(e.target.value)))}
                              className={`w-full px-3 py-2 rounded-xl border text-center font-mono text-sm focus:outline-none focus:border-[#e30613] ${
                                isLight ? 'bg-white border-slate-300 text-slate-900 font-bold' : 'bg-black/50 border-white/15 text-white'
                              }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-[11px] font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                              العرض (سم)
                            </label>
                            <input
                              type="number"
                              min={10}
                              max={300}
                              value={dimWidth}
                              onChange={(e) => setDimWidth(Math.max(1, Number(e.target.value)))}
                              className={`w-full px-3 py-2 rounded-xl border text-center font-mono text-sm focus:outline-none focus:border-[#e30613] ${
                                isLight ? 'bg-white border-slate-300 text-slate-900 font-bold' : 'bg-black/50 border-white/15 text-white'
                              }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-[11px] font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                              الارتفاع (سم)
                            </label>
                            <input
                              type="number"
                              min={10}
                              max={300}
                              value={dimHeight}
                              onChange={(e) => setDimHeight(Math.max(1, Number(e.target.value)))}
                              className={`w-full px-3 py-2 rounded-xl border text-center font-mono text-sm focus:outline-none focus:border-[#e30613] ${
                                isLight ? 'bg-white border-slate-300 text-slate-900 font-bold' : 'bg-black/50 border-white/15 text-white'
                              }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-[11px] font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                              عدد القطع
                            </label>
                            <input
                              type="number"
                              min={1}
                              max={500}
                              value={dimQuantity}
                              onChange={(e) => setDimQuantity(Math.max(1, Number(e.target.value)))}
                              className={`w-full px-3 py-2 rounded-xl border text-center font-mono text-sm focus:outline-none focus:border-[#e30613] ${
                                isLight ? 'bg-white border-slate-300 text-slate-900 font-bold' : 'bg-black/50 border-white/15 text-white'
                              }`}
                            />
                          </div>
                        </div>

                        <div className={`flex items-center justify-between p-2.5 rounded-xl text-xs ${
                          isLight ? 'bg-slate-200/60 text-slate-700 font-medium' : 'bg-white/5 text-slate-300'
                        }`}>
                          <span>معادلة الحجم: الطول × العرض × الارتفاع ÷ 1,000,000 × العدد</span>
                          <span className="font-bold font-mono text-amber-600 dark:text-amber-400">{totalCbm} CBM</span>
                        </div>
                      </div>
                    )}

                    {/* MODE 2: PRESETS */}
                    {volumeMode === 'presets' && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                          {COMMON_PRESETS.map((item) => {
                            const count = presetQuantities[item.id] || 0;
                            return (
                              <div
                                key={item.id}
                                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                                  count > 0
                                    ? isLight ? 'bg-red-50 border-red-300' : 'bg-[#e30613]/10 border-red-500/40'
                                    : isLight ? 'bg-white border-slate-200' : 'bg-black/30 border-white/10'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{item.icon}</span>
                                  <div>
                                    <div className={`text-xs font-bold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.name}</div>
                                    <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{item.cbm} م³ للقطعة</div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handlePresetChange(item.id, -1)}
                                    className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center ${
                                      isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-white/10 hover:bg-white/20 text-white'
                                    }`}
                                  >
                                    -
                                  </button>
                                  <span className={`w-6 text-center font-mono font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                    {count}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handlePresetChange(item.id, 1)}
                                    className="w-6 h-6 rounded-lg bg-[#e30613] hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* MODE 3: DIRECT CBM SLIDER */}
                    {volumeMode === 'cbm' && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className={`text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                            الحجم المطلوب بالمتر المكعب (م³ / CBM)
                          </label>
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                            {directCbm.toFixed(1)} م³
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0.2}
                          max={25}
                          step={0.1}
                          value={directCbm}
                          onChange={(e) => setDirectCbm(Number(e.target.value))}
                          className="w-full accent-[#e30613] cursor-pointer"
                        />
                        <div className={`flex justify-between text-[10px] mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          <span>0.2 م³ (طرد)</span>
                          <span>5 م³ (أثاث غرف)</span>
                          <span>15 م³ (شاحنة مبطنة كاملة)</span>
                          <span>25+ م³ (تريلا)</span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* SECTION 4: TRUCK SERVICE & SPECIAL OPTIONS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        نوع الشحنة البرية
                      </label>
                      <select
                        value={shipmentType}
                        onChange={(e) => setShipmentType(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#e30613] ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                            : 'bg-slate-900 border-white/15 text-white'
                        }`}
                      >
                        <option value="عفش وأثاث منزلي">نقل عفش وأثاث منزلي كامل</option>
                        <option value="أغراض شخصية وشنط">أغراض وشنط وكراتين شخصية</option>
                        <option value="أجهزة كهربائية وشاشات">أجهزة كهربائية وشاشات ومكيفات</option>
                        <option value="بضائع ومعدات تجارية">بضائع تجارية ومعدات مصانع</option>
                        <option value="طرود وهدايا">طرود وهدايا خفيفة</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        نوع الشاحنة والخدمة
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {(['تريلا مشتركة (LTL)', 'شاحنة مبطنة سريعة خاصة', 'شاحنة كاملة (FTL)'] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTruckType(t)}
                            className={`py-2 px-1 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all border text-center ${
                              truckType === t
                                ? 'bg-[#e30613] text-white border-transparent shadow-md'
                                : isLight
                                  ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                  : 'bg-slate-900 text-slate-300 border-white/10 hover:border-white/20'
                            }`}
                          >
                            {t.split(' ')[0]} {t.split(' ')[1]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Value Added Services */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
                    }`}>
                      <input
                        type="checkbox"
                        checked={packagingService}
                        onChange={(e) => setPackagingService(e.target.checked)}
                        className="rounded accent-[#e30613] w-4 h-4"
                      />
                      <span>تغليف بري احترافي</span>
                    </label>

                    <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
                    }`}>
                      <input
                        type="checkbox"
                        checked={disassemblyService}
                        onChange={(e) => setDisassemblyService(e.target.checked)}
                        className="rounded accent-[#e30613] w-4 h-4"
                      />
                      <span>فك وتركيب نجارين</span>
                    </label>

                    <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
                    }`}>
                      <input
                        type="checkbox"
                        checked={woodenCrate}
                        onChange={(e) => setWoodenCrate(e.target.checked)}
                        className="rounded accent-[#e30613] w-4 h-4"
                      />
                      <span>صندوق خشبي للشاشات</span>
                    </label>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      ملاحظات أو تفاصيل المنقولات (اختياري)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="اذكر تفاصيل الغرف المراد نقلها، الأدوار ووجود مصعد، أو موعد الاستلام المفضل..."
                      className={`w-full px-4 py-2 rounded-xl border text-sm focus:outline-none focus:border-[#e30613] transition-colors ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                          : 'bg-slate-900 border-white/15 text-white placeholder-slate-500'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#e30613] to-[#b8000b] hover:from-[#c4000b] hover:to-[#990008] text-white font-bold text-sm sm:text-base shadow-xl shadow-red-950/50 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال تفاصيل الحجم ({totalCbm} م³) إلى واتساب ألفا إكسبريس</span>
                  </button>

                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

