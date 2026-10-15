import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import { QuoteSection } from '../components/home/QuoteSection';
import { CompanyConfig } from '../types';

interface QuotePageProps {
  config: CompanyConfig;
  selectedQuoteService: string;
}

export const QuotePage: React.FC<QuotePageProps> = ({ config, selectedQuoteService }) => {
  return (
    <div className="pt-28 pb-20 bg-[#070d1d] min-h-screen text-slate-100 relative">
      {/* Decorative Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8" aria-label="مسار التنقل">
          <Link to="/" className="hover:text-white transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-[#e30613] font-bold">طلب تسعيرة شحن بري</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[#e30613] text-xs font-bold mb-4">
            <Calculator className="w-4 h-4" />
            <span>تسعير شحن بري فوري ومباشر</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            طلب تسعيرة شحن بري <span className="text-[#e30613]">من السعودية إلى مصر</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            اختر نوع الشحنة والمحافظة وتفاصيل المنقولات والأثاث لإرسال طلب التسعيرة مباشرة لمسؤول الشحن البري بألفا إكسبريس عبر واتساب وحجز موعد الاستلام.
          </p>
        </div>

        {/* Embedded Calculator */}
        <QuoteSection config={config} defaultService={selectedQuoteService} />
      </div>
    </div>
  );
};
