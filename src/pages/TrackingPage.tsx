import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, CheckCircle2, Clock, Truck, MapPin, ExternalLink, ShieldCheck, MessageSquareText, Smartphone, ArrowLeft } from 'lucide-react';
import { CompanyConfig } from '../types';
import { useTheme } from '../context/ThemeContext';

interface TrackingPageProps {
  config: CompanyConfig;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({ config }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [trackingNumber, setTrackingNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const officialTrackingUrl = 'https://alfaexpress-ksa.com/track';

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      window.open(officialTrackingUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setHasSearched(true);
      // Also open official link
      window.open(`${officialTrackingUrl}?code=${encodeURIComponent(trackingNumber.trim())}`, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div className={`pt-28 pb-20 min-h-screen relative transition-colors ${
      isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#070d1d] text-slate-100'
    }`}>
      {/* Decorative Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className={`flex items-center gap-2 text-xs mb-8 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} aria-label="مسار التنقل">
          <Link to="/" className={`transition-colors ${isLight ? 'hover:text-slate-900' : 'hover:text-white'}`}>
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-[#e30613] font-bold">تتبع مسار الشحنة</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border ${
            isLight ? 'bg-red-50 border-red-200 text-red-700' : 'bg-red-500/10 border-red-500/20 text-[#e30613]'
          }`}>
            <Package className="w-4 h-4" />
            <span>بوابة الاستعلام والمتابعة المباشرة</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            تتبع شحنتك <span className="text-[#e30613]">بكل سهولة</span>
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            نحرص على إبقائك على اطلاع دائم بموقع وحالة شحنتك منذ استلامها وحتى وصولها إلى باب المستلم.
          </p>
        </div>

        {/* PROMINENT NOTIFICATION & SELF-TRACKING DUAL NOTICE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Card 1: We will send you SMS / WhatsApp updates */}
          <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden text-right ${
            isLight
              ? 'bg-white border-sky-200 shadow-sky-100/50'
              : 'bg-gradient-to-br from-[#0e1f3d] to-[#0a152b] border-sky-500/30'
          }`}>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 border ${
              isLight ? 'bg-sky-50 border-sky-200 text-sky-600' : 'bg-sky-500/20 border-sky-500/40 text-sky-400'
            }`}>
              <MessageSquareText className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <span>سنرسل لك رسالة بجميع التحديثات</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              يقوم نظامنا بإرسال رسائل نصية (SMS) وإشعارات تلقائية عبر الواتساب لإبلاغك فورياً بأي تحديث يطرأ على شحنتك أثناء النقل والتخليص الجمركي وحتى موعد التسليم.
            </p>
          </div>

          {/* Card 2: Or track it yourself directly via link */}
          <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden text-right flex flex-col justify-between ${
            isLight
              ? 'bg-white border-red-200 shadow-red-100/50'
              : 'bg-gradient-to-br from-[#1a0f1d] to-[#120a15] border-[#e30613]/30'
          }`}>
            <div>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 border ${
                isLight ? 'bg-red-50 border-red-200 text-[#e30613]' : 'bg-red-500/20 border-red-500/40 text-[#e30613]'
              }`}>
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                أو تتبعها بنفسك مباشرة
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                يمكنك أيضاً الدخول في أي وقت وتتبع خط سير شحنتك لحظة بلحظة بنفسك عبر بوابتنا المعتمدة:
              </p>
            </div>

            <a
              href={officialTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-red-950/40 group"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>رابط التتبع: alfaexpress-ksa.com/track</span>
              </span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Tracking Input Card */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl mb-12 ${
          isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-slate-900/90 border-white/15'
        }`}>
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <label className={`block text-xs font-bold text-right ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              أدخل رقم البوليصة أو كود الشحنة للتحويل الفوري لبوابة التتبع:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className={`w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isLight ? 'text-slate-400' : 'text-slate-400'
                }`} />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="مثال: ALF-89210 أو رقم الجوال"
                  dir="ltr"
                  className={`w-full pr-12 pl-4 py-4 rounded-2xl border font-mono text-sm focus:outline-none focus:border-[#e30613] ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                      : 'bg-slate-950 border-white/20 text-white placeholder-slate-500'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSimulating}
                className="px-8 py-4 rounded-2xl bg-[#e30613] hover:bg-red-700 text-white font-bold text-sm transition-all shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSimulating ? (
                  <Clock className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>تتبع الشحنة الآن</span>
                    <ExternalLink className="w-4 h-4 opacity-80" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Direct Link to Official Gateway */}
          <div className={`mt-6 pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isLight ? 'border-slate-100 text-slate-500' : 'border-white/10 text-slate-400'
          }`}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>رابط التتبع الرسمي المعتمد لشركة ألفا إكسبريس:</span>
            </div>
            <a
              href={officialTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e30613] hover:text-red-700 font-bold inline-flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>https://alfaexpress-ksa.com/track</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Simulated Results Display */}
        {hasSearched && (
          <div className={`rounded-3xl border p-6 sm:p-8 mb-12 shadow-2xl animate-fade-in ${
            isLight ? 'bg-white border-emerald-400/50 shadow-emerald-100/40' : 'bg-slate-900/90 border-emerald-500/40'
          }`}>
            <div className={`flex flex-wrap items-center justify-between gap-4 pb-6 border-b mb-6 ${
              isLight ? 'border-slate-100' : 'border-white/10'
            }`}>
              <div>
                <span className={`text-xs block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>رقم البوليصة المستعلم عنها:</span>
                <span className={`text-lg font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{trackingNumber ? trackingNumber.toUpperCase() : 'ALF-ONLINE'}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>تم فتح نافذة التتبع الرسمية</span>
              </div>
            </div>

            {/* Tracking Steps Timeline */}
            <div className={`space-y-6 relative before:absolute before:top-3 before:bottom-3 before:right-4 before:w-0.5 ${
              isLight ? 'before:bg-slate-200' : 'before:bg-white/10'
            }`}>
              <div className="relative pr-10">
                <div className="absolute right-2 top-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>تم استلام الشحنة والتغليف بمستودعات جدة</h4>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>تم الفحص الأمني والوزن وإصدار البوليصة الرسمية</p>
              </div>

              <div className="relative pr-10">
                <div className="absolute right-2 top-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>انطلاق الشاحنة باتجاه ميناء الشحن</h4>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>جاهزة لإنهاء إجراءات المغادرة البحرية / البرية</p>
              </div>

              <div className="relative pr-10">
                <div className="absolute right-2 top-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-md animate-pulse">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <h4 className={`text-sm font-bold ${isLight ? 'text-amber-700' : 'text-amber-300'}`}>في الطريق إلى ميناء السويس / سفاجا بمصر</h4>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>جاري تجهيز أوراق الإفراج الجمركي المسبق</p>
              </div>

              <div className="relative pr-10 opacity-50">
                <div className={`absolute right-2 top-1 w-5 h-5 rounded-full flex items-center justify-center ${
                  isLight ? 'bg-slate-300 text-slate-700' : 'bg-slate-700 text-slate-300'
                }`}>
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <h4 className={`text-sm font-bold ${isLight ? 'text-slate-700' : 'text-white'}`}>التسليم النهائي لباب المستلم بمصر</h4>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>الموعد التقريبي المتوقع: خلال 4 - 7 أيام عمل</p>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Support Callout */}
        <div className={`p-6 rounded-3xl border text-right flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isLight ? 'bg-white border-slate-200 text-slate-600 shadow-sm' : 'bg-slate-900/60 border-white/10 text-slate-300'
        }`}>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#e30613] shrink-0" />
            <span>هل تود الاستفسار المباشر أو تعديل رقم الهاتف المستلم للإشعارات؟</span>
          </div>
          <a
            href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أود المتابعة بخصوص تحديثات وإشعارات شحنتي لدى ألفا إكسبريس.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shrink-0"
          >
            تواصل مع خدمة العملاء
          </a>
        </div>
      </div>
    </div>
  );
};

