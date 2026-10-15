/**
 * @file Footer.tsx
 * @project Alfa Express Logistics Platform
 * @author Jenova Media (https://jenova.media)
 * @description Application footer providing company credentials, official branches,
 * land freight service links, emergency telephone numbers, and copyright metadata.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Search, MessageCircle, ArrowUp, ShieldCheck, Truck, Calculator } from 'lucide-react';
import { CompanyConfig } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface FooterProps {
  config: CompanyConfig;
  onOpenTrack: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenTrack, onOpenQuote }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative pt-16 pb-28 sm:pb-20 border-t overflow-hidden transition-colors duration-200 ${
      isLight ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-[#050a17] text-slate-300 border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Footer Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}>
          
          {/* COL 1: BRAND & MISSION (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start text-right">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className={`w-12 h-12 rounded-xl p-1 flex items-center justify-center shrink-0 border ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'
              }`}>
                <img
                  src="/assets/brand/alfa-logo.webp"
                  alt="ألفا إكسبريس"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className={`text-xl font-black block ${isLight ? 'text-slate-900' : 'text-white'}`}>ألفا إكسبريس</span>
                <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{config.legalName}</span>
              </div>
            </Link>

            <p className={`text-xs leading-relaxed mb-6 max-w-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              شركة متخصصة في خدمات الشحن البري الدولي من المملكة العربية السعودية إلى كافة محافظات وقرى جمهورية مصر العربية، بأسطول شاحنات وتريلات مجهزة وخبرة تمتد لأكثر من 15 عاماً.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onOpenQuote}
                className="px-4 py-2.5 rounded-xl bg-[#e30613] hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>طلب تسعيرة شحن بري</span>
              </button>

              <button
                type="button"
                onClick={onOpenTrack}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-sky-500" />
                <span>تتبع الشحنة</span>
              </button>
            </div>
          </div>

          {/* COL 2: IMPORTANT LINKS (2 cols) */}
          <div className="lg:col-span-2 text-right">
            <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e30613]" />
              <span>صفحات الموقع</span>
            </h4>
            <ul className={`space-y-2 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <li><Link to="/" className="hover:text-[#e30613] transition-colors">الرئيسية</Link></li>
              <li><Link to="/services" className="hover:text-[#e30613] transition-colors">خدمات الشحن البري</Link></li>
              <li><Link to="/branches" className="hover:text-[#e30613] transition-colors">فروعنا بالمملكة (8)</Link></li>
              <li><Link to="/quote" className="hover:text-[#e30613] transition-colors">حاسبة وطلب السعر</Link></li>
              <li><Link to="/tracking" className="hover:text-[#e30613] transition-colors">تتبع مسار الشحنة</Link></li>
              <li><Link to="/faq" className="hover:text-[#e30613] transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link to="/blog" className="hover:text-[#e30613] transition-colors">المدونة اللوجستية</Link></li>
            </ul>
          </div>

          {/* COL 3: LAND FREIGHT SERVICES (3 cols) */}
          <div className="lg:col-span-3 text-right">
            <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e30613]" />
              <span>خدمات الشحن البري</span>
            </h4>
            <ul className={`space-y-2 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <li><Link to="/services" className="hover:text-[#e30613] transition-colors">نقل العفش والأثاث المنزلي براً</Link></li>
              <li><Link to="/services" className="hover:text-[#e30613] transition-colors">شحن الأغراض والطرود الشخصية</Link></li>
              <li><Link to="/services" className="hover:text-[#e30613] transition-colors">شحن البضائع والمعدات التجارية</Link></li>
              <li><Link to="/services" className="hover:text-[#e30613] transition-colors">شحن الأجهزة الكهربائية والشاشات</Link></li>
              <li><Link to="/services" className="hover:text-[#e30613] transition-colors">شحن بري سريع بالشاحنات المبطنة</Link></li>
              <li><Link to="/services" className="hover:text-[#e30613] transition-colors">التخليص الجمركي بالمنافذ البرية</Link></li>
              <li><Link to="/services" className="hover:text-[#e30613] transition-colors">التوصيل من الباب إلى الباب بمصر</Link></li>
            </ul>
          </div>

          {/* COL 4: CONTACT & BRANCHES (3 cols) */}
          <div className="lg:col-span-3 text-right">
            <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e30613]" />
              <span>التواصل ومحطات التحميل</span>
            </h4>
            <div className={`space-y-3 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e30613] shrink-0 mt-0.5" />
                <span>{config.mainAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${config.mainPhone}`} className="hover:text-[#e30613]" dir="ltr">{config.mainPhone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن الشحن البري من السعودية إلى مصر')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}
                >
                  خدمة عملاء واتساب الفورية
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-slate-500 block">ساعات العمل الرسمية:</span>
                <span className={`text-xs font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>السبت - الخميس: 9:00 ص - 10:00 م</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isLight ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <div className="flex items-center gap-2 text-center sm:text-right">
            <span>© {new Date().getFullYear()} {config.name} - {config.legalName}. تطوير <a href="https://jenova.media" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 font-bold transition-colors">Jenova Media</a>.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className={`font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>متخصصون في الشحن البري الدولي</span>
            <button
              type="button"
              onClick={scrollToTop}
              className={`p-2 rounded-xl border transition-colors ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
              }`}
              title="العودة للأعلى"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
