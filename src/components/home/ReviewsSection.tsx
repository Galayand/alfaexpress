import React, { useState } from 'react';
import { MessageCircle, CheckCircle, ZoomIn, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { verifiedReviews } from '../../data/companyData';
import { CustomerReview } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const ReviewsSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id="reviews"
      className={`relative py-20 sm:py-24 overflow-hidden transition-colors duration-200 ${
        isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#0b1429] text-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">آراء وتقييمات العملاء الموثقة</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            تجارب حقيقية <span className="text-[#e30613]">لعملائنا الكرام</span>
          </h2>

          <p className={`text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            لقطات موثقة من رسائل ومحادثات العملاء عبر واتساب بعد استلام شحناتهم بأمان في مختلف محافظات مصر.
          </p>
        </div>

        {/* Reviews Screenshot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedReviews.map((rev: CustomerReview, idx: number) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              onClick={() => setSelectedImage(rev.image)}
              className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1 ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-[#e30613]/50 shadow-slate-200/50'
                  : 'bg-slate-900/80 border-white/10 hover:border-[#e30613]/50 shadow-black/30'
              }`}
            >
              {/* Image with zoom overlay */}
              <div className="relative aspect-[4/5] bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={rev.image}
                  alt={rev.caption}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-white/20 text-xs font-bold text-white flex items-center gap-2 shadow-2xl">
                    <ZoomIn className="w-4 h-4 text-[#e30613]" />
                    <span>انقر لتكبير المحادثة</span>
                  </div>
                </div>
              </div>

              {/* Caption Footer */}
              <div className={`p-4 border-t ${
                isLight ? 'bg-white border-slate-100' : 'bg-[#070d1d] border-white/10'
              }`}>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold mb-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{rev.verifiedBadge}</span>
                </div>
                <p className={`text-xs line-clamp-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {rev.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 left-0 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={selectedImage}
              alt="تقييم موثق"
              className="w-auto max-h-[80vh] rounded-2xl shadow-2xl border border-white/20 object-contain bg-slate-900"
            />

            <div className="mt-4 px-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-300">
              تقييم عميل موثق من محادثات واتساب الرسمية لشركة ألفا إكسبريس
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
