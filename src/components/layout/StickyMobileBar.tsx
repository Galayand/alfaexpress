import React from 'react';
import { Phone, MessageCircle, Search, Calculator } from 'lucide-react';
import { CompanyConfig } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface StickyMobileBarProps {
  config: CompanyConfig;
  onOpenTrack: () => void;
  onOpenQuote: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ config, onOpenTrack, onOpenQuote }) => {
  const { theme } = useTheme();

  return (
    <>
      {/* MOBILE BOTTOM FLOATING CONVERSION DOCK (Visible exclusively on mobile screens) */}
      <nav
        aria-label="شريط الوصول السريع للجوال"
        className={`sm:hidden fixed bottom-0 inset-x-0 z-40 backdrop-blur-2xl border-t px-2 py-1.5 shadow-2xl pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-colors duration-200 ${
          theme === 'light'
            ? 'bg-white/95 border-slate-200 text-slate-800'
            : 'bg-[#070d1d]/95 border-white/10 text-white'
        }`}
      >
        <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
          {/* Quick Call */}
          <a
            href={`tel:${config.mainPhone}`}
            className={`min-h-[44px] py-1.5 px-1 rounded-xl font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 border active:scale-95 transition-all ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                : 'bg-slate-900/90 hover:bg-slate-800 text-white border-white/10'
            }`}
          >
            <Phone className="w-4 h-4 text-[#e30613]" />
            <span className="truncate">اتصال</span>
          </a>

          {/* Direct WhatsApp */}
          <a
            href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن تفاصيل وأسعار الشحن البري بالشاحنات المبطنة من السعودية إلى مصر')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] py-1.5 px-1 rounded-xl bg-emerald-600/95 hover:bg-emerald-500 text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 shadow-md shadow-emerald-950/40 active:scale-95 transition-all border border-emerald-400/30"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="truncate">واتساب</span>
          </a>

          {/* Quick Track */}
          <button
            type="button"
            onClick={onOpenTrack}
            className={`min-h-[44px] py-1.5 px-1 rounded-xl font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 border active:scale-95 transition-all ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 text-sky-600 border-slate-200'
                : 'bg-slate-900/90 hover:bg-slate-800 text-sky-400 border-white/10'
            }`}
          >
            <Search className="w-4 h-4" />
            <span className={theme === 'light' ? 'text-slate-800 truncate' : 'text-white truncate'}>تتبع</span>
          </button>

          {/* Quick Quote */}
          <button
            type="button"
            onClick={onOpenQuote}
            className="min-h-[44px] py-1.5 px-1 rounded-xl bg-gradient-to-r from-[#e30613] to-[#b8000b] text-white font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 shadow-md shadow-red-950/50 active:scale-95 transition-all"
          >
            <Calculator className="w-4 h-4" />
            <span className="truncate">طلب تسعيرة</span>
          </button>
        </div>
      </nav>

      {/* DESKTOP FLOATING WHATSAPP CTA (Bottom Left) */}
      <div className="hidden sm:flex fixed bottom-6 left-6 z-40 flex-col gap-3">
        <a
          href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن تفاصيل وأسعار الشحن البري من السعودية إلى مصر')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl shadow-emerald-950/60 transition-all hover:scale-105 border border-emerald-400/30"
          title="محادثة واتساب مباشرة للشحن البري"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold">
            تسعيرة واستفسار واتساب
          </span>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </a>
      </div>
    </>
  );
};
