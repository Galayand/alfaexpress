import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { verifiedFAQs } from '../../data/companyData';
import { FAQItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const FaqSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const previewFAQs = verifiedFAQs.slice(0, 6);

  // Structured Data Schema for FAQ (JSON-LD)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: previewFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className={`relative py-20 sm:py-24 overflow-hidden transition-colors duration-200 ${
        isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#070d1d] text-slate-100'
      }`}
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 border ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm text-slate-700'
              : 'bg-white/5 border-white/10 text-slate-300'
          }`}>
            <HelpCircle className="w-3.5 h-3.5 text-[#e30613]" />
            <span className="text-xs font-bold">إجابات واضحة وشفافة</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            الأسئلة <span className="text-[#e30613]">الشائعة</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            أهم التساؤلات حول مواعيد الشحن، التغليف، شحن الأثاث، وإجراءات المتابعة والتتبع من السعودية إلى مصر.
          </p>
        </div>

        {/* Interactive Accordion */}
        <div className="space-y-4 mb-10">
          {previewFAQs.map((faq: FAQItem, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isLight
                    ? isOpen
                      ? 'bg-white border-red-300 shadow-md ring-1 ring-red-100'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    : isOpen
                      ? 'bg-slate-900/90 border-[#e30613]/40 shadow-xl'
                      : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 select-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                      isOpen
                        ? 'bg-[#e30613] text-white'
                        : isLight
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-slate-800 text-slate-300 border border-white/10'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={`text-base sm:text-lg font-bold transition-colors ${
                      isLight
                        ? isOpen ? 'text-[#e30613]' : 'text-slate-900 group-hover:text-[#e30613]'
                        : isOpen ? 'text-white' : 'text-white group-hover:text-red-100'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  <div className={`p-1.5 rounded-lg shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? 'bg-[#e30613] text-white rotate-180'
                      : isLight
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-white/5 text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-6 sm:px-6 sm:pb-6 text-sm leading-relaxed border-t pt-4 ${
                        isLight ? 'text-slate-700 border-slate-100 bg-slate-50/50' : 'text-slate-300 border-white/5'
                      }`}>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* View All FAQs CTA */}
        <div className="text-center">
          <Link
            to="/faq"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold text-xs transition-all hover:scale-105 shadow-md group ${
              isLight
                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                : 'bg-white/5 hover:bg-white/10 border-white/15 text-white'
            }`}
          >
            <span>عرض جميع الأسئلة الشائعة ومركز المساعدة</span>
            <ArrowLeft className="w-4 h-4 text-[#e30613] group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
