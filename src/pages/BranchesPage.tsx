import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, ExternalLink, Building2, CheckCircle, Navigation } from 'lucide-react';
import { verifiedBranches } from '../data/companyData';
import { CompanyConfig, Branch } from '../types';
import { useTheme } from '../context/ThemeContext';

interface BranchesPageProps {
  config: CompanyConfig;
}

export const BranchesPage: React.FC<BranchesPageProps> = ({ config }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedCity, setSelectedCity] = useState<'all' | 'جدة' | 'مكة المكرمة' | 'الرياض'>('all');

  const filteredBranches = verifiedBranches.filter(
    (b) => selectedCity === 'all' || b.city === selectedCity
  );

  return (
    <div className={`pt-28 pb-20 min-h-screen relative transition-colors ${
      isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#070d1d] text-slate-100'
    }`}>
      {/* Decorative Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className={`flex items-center gap-2 text-xs mb-8 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} aria-label="مسار التنقل">
          <Link to="/" className={`transition-colors ${isLight ? 'hover:text-slate-900' : 'hover:text-white'}`}>
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-[#e30613] font-bold">فروع ألفا إكسبريس في المملكة</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[#e30613] text-xs font-bold mb-4">
            <MapPin className="w-4 h-4" />
            <span>شبكة الفروع المعتمدة (8 فروع)</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            فروعنا في <span className="text-[#e30613]">جدة ومكة المكرمة والرياض</span>
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            فروعنا المجهزة لاستقبال شحناتكم، مع أسطول سيارات مخصص للاستلام المباشر من باب منزلك في كافة الأحياء.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
          <button
            type="button"
            onClick={() => setSelectedCity('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCity === 'all'
                ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/40'
                : isLight
                  ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            جميع الفروع (8 فروع)
          </button>

          <button
            type="button"
            onClick={() => setSelectedCity('جدة')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCity === 'جدة'
                ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/40'
                : isLight
                  ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            جدة (5 فروع)
          </button>

          <button
            type="button"
            onClick={() => setSelectedCity('مكة المكرمة')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCity === 'مكة المكرمة'
                ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/40'
                : isLight
                  ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            مكة المكرمة (فرع الشوقية)
          </button>

          <button
            type="button"
            onClick={() => setSelectedCity('الرياض')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCity === 'الرياض'
                ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/40'
                : isLight
                  ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-slate-900 border border-white/10 text-slate-300 hover:border-white/20'
            }`}
          >
            الرياض (فرعان)
          </button>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredBranches.map((branch: Branch) => (
            <div
              key={branch.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border ${
                branch.isMain
                  ? isLight
                    ? 'bg-white border-[#e30613] shadow-xl shadow-red-100 ring-2 ring-[#e30613]/30'
                    : 'bg-slate-900/90 border-[#e30613] shadow-2xl shadow-red-950/30 ring-1 ring-[#e30613]/50'
                  : isLight
                    ? 'bg-white border-slate-200 shadow-md hover:border-slate-300 hover:-translate-y-1'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20 hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                    isLight
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'bg-white/5 border-white/10 text-amber-400'
                  }`}>
                    {branch.city}
                  </span>
                  {branch.isMain && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e30613] text-white">
                      الفرع الرئيسي
                    </span>
                  )}
                </div>

                <h3 className={`text-base font-bold mb-2 leading-snug ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {branch.name}
                </h3>

                <p className={`text-xs mb-6 flex items-start gap-1.5 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  <Navigation className="w-3.5 h-3.5 text-[#e30613] shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </p>
              </div>

              <div className={`space-y-2 pt-4 border-t ${
                isLight ? 'border-slate-100' : 'border-white/10'
              }`}>
                <a
                  href={`tel:${branch.phone}`}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#e30613]" />
                    <span>اتصال بالفرع</span>
                  </span>
                  <span dir="ltr" className={`font-mono text-[11px] ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>{branch.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(`السلام عليكم، أتواصل مع ${branch.name} للاستفسار عن الشحن.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isLight
                      ? 'bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border-emerald-200'
                      : 'bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border-emerald-500/30'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>محادثة واتساب سريعة</span>
                </a>

                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2 px-3 rounded-xl text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    isLight
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>موقع الفرع على خرائط Google</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Home Pickup Callout */}
        <div className={`p-8 rounded-3xl border text-right flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${
          isLight
            ? 'bg-white border-red-200 shadow-slate-200/60'
            : 'bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border-red-500/30'
        }`}>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1 block">خدمة استلام مجانية</span>
            <h3 className={`text-xl sm:text-2xl font-black mb-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              لا ترغب في الذهاب للفرع؟ نصلك حتى باب بيتك
            </h3>
            <p className={`text-xs sm:text-sm max-w-xl ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              مندوبنا وسياراتنا المجهزة تصل إلى أي حي في جدة ومكة والرياض لاستلام الشحنة وتغليفها ووزنها أمامك مع إصدار البوليصة فوراً.
            </p>
          </div>

          <a
            href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أود حجز موعد لاستلام شحنة من باب بيتي.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-2xl bg-[#e30613] hover:bg-red-700 text-white text-xs font-bold transition-all shadow-lg shadow-red-950/50 flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>طلب مندوب استلام من المنزل</span>
          </a>
        </div>
      </div>
    </div>
  );
};
