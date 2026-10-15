import React, { useState } from 'react';
import { Search, ExternalLink, ShieldCheck, ArrowLeft, PackageCheck, MessageSquareText } from 'lucide-react';
import { motion } from 'motion/react';
import { CompanyConfig } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface TrackingTeaserProps {
  config: CompanyConfig;
}

export const TrackingTeaser: React.FC<TrackingTeaserProps> = ({ config }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [trackingNumber, setTrackingNumber] = useState('');
  const officialTrackingUrl = 'https://alfaexpress-ksa.com/track';

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      window.open(`${officialTrackingUrl}?code=${encodeURIComponent(trackingNumber.trim())}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(officialTrackingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="track" className={`relative py-16 border-y overflow-hidden transition-colors duration-200 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070d1d] border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`rounded-3xl border p-8 sm:p-12 shadow-2xl transition-all ${
            isLight
              ? 'bg-white border-slate-200 shadow-slate-200/50'
              : 'bg-gradient-to-r from-[#0e1d3d] via-[#11244d] to-[#0e1d3d] border-white/15'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 text-right">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold mb-3 ${
                isLight
                  ? 'bg-sky-50 border-sky-200 text-sky-700'
                  : 'bg-sky-500/10 border-sky-500/20 text-sky-400'
              }`}>
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>إشعارات المتابعة والتتبع اللحظي</span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-black mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                سنرسل لك رسالة بجميع التحديثات
              </h3>

              <p className={`text-sm leading-relaxed max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                يقوم نظامنا بإرسال رسائل دورية وإشعارات فورية بكل تحرك لشحنتك، أو يمكنك تتبعها بنفسك في أي وقت عبر رابط البوابة الرسمية المباشرة.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="أدخل رقم البوليصة أو الجوال (مثال: ALF-89241)"
                    dir="ltr"
                    className={`w-full px-5 py-4 rounded-2xl text-sm focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#e30613] focus:bg-white'
                        : 'bg-slate-900/90 border border-white/20 text-white placeholder-slate-400 focus:border-sky-400 shadow-inner'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 rounded-2xl bg-[#e30613] hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-950/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>تتبع الشحنة بنفسك</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </button>
              </form>

              <div className={`flex flex-wrap items-center justify-between gap-2 mt-3 text-[11px] ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                <div className={`flex items-center gap-1.5 ${isLight ? 'text-emerald-600 font-semibold' : 'text-emerald-400'}`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>رابط التتبع الرسمي:</span>
                </div>
                <a
                  href={officialTrackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline underline-offset-2 font-mono ${
                    isLight ? 'text-sky-600 hover:text-sky-800' : 'text-sky-300 hover:text-white'
                  }`}
                >
                  alfaexpress-ksa.com/track
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

