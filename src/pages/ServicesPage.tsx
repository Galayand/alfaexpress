import React from 'react';
import { Link } from 'react-router-dom';
import { PackageCheck, Box, Truck, ShieldCheck, FileCheck2, Zap, ArrowLeft, PhoneCall, MessageCircle } from 'lucide-react';
import { verifiedServices } from '../data/companyData';
import { CompanyConfig, ServiceItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ServicesPageProps {
  config: CompanyConfig;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ config, onSelectServiceForQuote }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'furniture': return <Truck className="w-6 h-6" />;
      case 'personal': return <Box className="w-6 h-6" />;
      case 'commercial': return <PackageCheck className="w-6 h-6" />;
      case 'electronics': return <ShieldCheck className="w-6 h-6" />;
      case 'express-land': return <Zap className="w-6 h-6" />;
      case 'customs': return <FileCheck2 className="w-6 h-6" />;
      default: return <Truck className="w-6 h-6" />;
    }
  };

  return (
    <div className={`pt-24 sm:pt-28 pb-20 min-h-screen relative transition-colors ${
      isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#070d1d] text-slate-100'
    }`}>
      {/* Decorative Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className={`flex items-center gap-2 text-xs mb-6 sm:mb-8 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} aria-label="مسار التنقل">
          <Link to="/" className={`transition-colors ${isLight ? 'hover:text-slate-900' : 'hover:text-white'}`}>
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-[#e30613] font-bold">خدمات الشحن البري الدولي</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[#e30613] text-xs font-bold mb-4">
            <Truck className="w-4 h-4" />
            <span>أسطول الشحن البري المتكامل</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            خدمات الشحن البري <span className="text-[#e30613]">من السعودية إلى مصر</span>
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            حلول شحن بري متخصصة لنقل الأثاث والعفش المنزلي، الأغراض الشخصية، البضائع التجارية، والأجهزة الكهربائية بأعلى درجات الأمان والالتزام بالمواعيد من الباب للباب.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {verifiedServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className={`rounded-3xl border p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-[#e30613]/50 shadow-slate-200/50'
                  : 'bg-slate-900/80 border-white/10 hover:border-[#e30613]/50 shadow-black/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-red-600 to-[#b8000b] text-white shadow-lg shadow-red-950/50 group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.id)}
                  </div>

                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                    isLight
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'bg-white/5 border-white/10 text-amber-300'
                  }`}>
                    {service.badge}
                  </span>
                </div>

                <h2 className={`text-xl font-black group-hover:text-[#e30613] transition-colors mb-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {service.title}
                </h2>
                <span className="text-xs text-[#e30613] font-semibold block mb-4">
                  {service.subtitle}
                </span>

                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {service.description}
                </p>

                {/* Highlights */}
                <div className={`space-y-2 mb-6 pt-4 border-t ${
                  isLight ? 'border-slate-100' : 'border-white/5'
                }`}>
                  {service.highlights.map((h, i) => (
                    <div key={i} className={`flex items-center gap-2 text-xs ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-4 border-t flex gap-2 ${
                isLight ? 'border-slate-100' : 'border-white/5'
              }`}>
                <button
                  type="button"
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>طلب تسعيرة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار عن خدمة (${service.title}) للشحن البري إلى مصر`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
                    isLight
                      ? 'bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border-emerald-200'
                      : 'bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border-emerald-500/30'
                  }`}
                  title="استفسار واتساب"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Contact Card */}
        <div className={`rounded-3xl border p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right ${
          isLight
            ? 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
            : 'bg-gradient-to-r from-[#0e1d3d] via-[#11244d] to-[#0e1d3d] border-white/10'
        }`}>
          <div>
            <h3 className={`text-xl sm:text-2xl font-black mb-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              هل لديك استفسار خاص عن شحنتك البرية؟
            </h3>
            <p className={`text-xs sm:text-sm max-w-xl ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              فريقنا اللوجستي جاهز للرد على كافة استفساراتكم المتعلقة بحجم الشاحنات، أساليب التغليف، وتفاصيل التخليص الجمركي على مدار الساعة.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${config.mainPhone}`}
              className={`py-3 px-5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-[#e30613]" />
              <span dir="ltr">{config.mainPhone}</span>
            </a>

            <a
              href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أود استشارة لوجستية للشحن البري من السعودية إلى مصر')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب مباشر</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
