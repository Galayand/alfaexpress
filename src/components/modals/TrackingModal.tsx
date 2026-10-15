import React, { useState } from 'react';
import { Search, X, ExternalLink, ShieldCheck, Phone, MessageSquareText, Smartphone } from 'lucide-react';
import { CompanyConfig } from '../../types';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose, config }) => {
  const [trackingCode, setTrackingCode] = useState('');
  const officialTrackingUrl = 'https://alfaexpress-ksa.com/track';

  if (!isOpen) return null;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      window.open(`${officialTrackingUrl}?code=${encodeURIComponent(trackingCode.trim())}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(officialTrackingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#0b162e] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-right animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
          <Search className="w-6 h-6" />
        </div>

        <h3 className="text-2xl font-black text-white mb-2">
          تتبع شحنتك المباشر
        </h3>

        {/* UPDATED NOTIFICATION NOTICE */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-900/80 border border-sky-500/30 text-xs text-slate-200 leading-relaxed mb-4 flex items-start gap-2.5">
          <MessageSquareText className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-white block mb-0.5">سنرسل لك رسالة بجميع التحديثات:</strong>
            يصلك إشعار تلقائي فور تحرك الشحنة وتخليصها جمركياً. كما يمكنك تتبعها بنفسك مباشرة عبر بوابتنا الرسمية.
          </span>
        </div>

        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              رقم البوليصة / الشحنة (Waybill No.)
            </label>
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="مثال: ALF-2026-98124 أو رقم الجوال"
              dir="ltr"
              autoFocus
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-400 shadow-inner"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>البوابة الرسمية للتتبع الذاتي:</span>
            </div>
            <a
              href={officialTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-white font-mono flex items-center gap-1 underline underline-offset-2"
            >
              <span>{officialTrackingUrl}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#e30613] hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-950/50 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>الانتقال لبوابة التتبع الرسمية</span>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>لم تجد رقم البوليصة؟</span>
          <a
            href={`tel:${config.mainPhone}`}
            className="text-[#e30613] hover:text-red-400 font-bold flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>اتصل بخدمة العملاء: {config.mainPhone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

