import React, { useState } from 'react';
import { Building2, Phone, MessageCircle, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { verifiedBranches } from '../../data/companyData';
import { Branch } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const BranchesSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeCityTab, setActiveCityTab] = useState<'الكل' | 'جدة' | 'مكة المكرمة' | 'الرياض'>('الكل');

  const filteredBranches = activeCityTab === 'الكل'
    ? verifiedBranches
    : verifiedBranches.filter((b) => b.city === activeCityTab);

  return (
    <section id="branches" className={`relative py-20 sm:py-24 overflow-hidden transition-colors duration-200 ${isLight ? 'bg-white' : 'bg-[#070d1d]'}`}>
      {/* Glow Effects */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 ${
            isLight ? 'bg-slate-100 border border-slate-200' : 'bg-white/5 border border-white/10'
          }`}>
            <Building2 className="w-3.5 h-3.5 text-[#e30613]" />
            <span className={`text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>محطات التحميل وفروع المملكة</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            فروعنا في <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">جدة، مكة، والرياض</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            8 فروع ومحطات شحن بري معتمدة لاستقبال الشحنات، بالإضافة لشاحنات مبطنة مخصصة للاستلام المباشر من باب بيتك في أي حي.
          </p>

          {/* City Tabs Selector (Scrollable horizontally on mobile) */}
          <div className="flex items-center justify-start sm:justify-center gap-2 mt-6 sm:mt-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {(['الكل', 'جدة', 'مكة المكرمة', 'الرياض'] as const).map((tab) => {
              const count = tab === 'الكل'
                ? verifiedBranches.length
                : verifiedBranches.filter((b) => b.city === tab).length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveCityTab(tab)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    activeCityTab === tab
                      ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/30 scale-105'
                      : isLight
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-white/10'
                  }`}
                >
                  <span>{tab}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                    activeCityTab === tab
                      ? 'bg-white/20 text-white'
                      : isLight
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-white/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredBranches.map((branch: Branch, idx: number) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: 'easeOut' }}
              className={`relative rounded-3xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 ${
                branch.isMain
                  ? isLight
                    ? 'bg-white border-amber-400 shadow-md shadow-amber-500/10'
                    : 'bg-gradient-to-b from-[#0e1b38] to-[#081022] border-amber-500/50 shadow-xl shadow-amber-950/20'
                  : isLight
                  ? 'bg-slate-50 border-slate-200 hover:border-[#e30613]/40 shadow-sm hover:shadow-md'
                  : 'bg-gradient-to-b from-[#0e1b38] to-[#081022] border-white/10 hover:border-[#e30613]/40'
              }`}
            >
              {branch.isMain && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>الفرع الرئيسي</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                    isLight ? 'bg-white text-slate-700 border-slate-200' : 'bg-white/5 text-slate-300 border-white/10'
                  }`}>
                    {branch.city}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="الفرع متاح ومستعد للاستلام" />
                </div>

                <h3 className={`text-base font-black mb-2 transition-colors group-hover:text-[#e30613] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {branch.name}
                </h3>

                <div className={`flex items-start gap-2 text-xs mb-6 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  <MapPin className="w-4 h-4 text-[#e30613] shrink-0 mt-0.5" />
                  <span className="leading-relaxed line-clamp-2">{branch.address}</span>
                </div>
              </div>

              {/* Branch Direct Actions */}
              <div className={`pt-4 border-t space-y-2 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <a
                  href={`tel:${branch.phone}`}
                  className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                    isLight
                      ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-[#e30613]" />
                  <span dir="ltr">{branch.phone}</span>
                </a>

                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${branch.whatsapp || '966501653999'}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار عن الشحن البري لدى فرع (${branch.name})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>واتساب</span>
                  </a>

                  {(branch.mapUrl || branch.googleMapsUrl) && (
                    <a
                      href={branch.mapUrl || branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-xl border transition-colors ${
                        isLight
                          ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-white'
                      }`}
                      title="الموقع على خرائط جوجل"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
