import React, { useState, useMemo } from 'react';
import { HelpCircle, Search, ChevronDown, PhoneCall, MessageCircle, ArrowLeft, ShieldCheck, Sparkles, MapPin, Calculator, Truck, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { verifiedFAQs } from '../data/companyData';
import { CompanyConfig, FAQItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface FaqPageProps {
  config: CompanyConfig;
  onOpenTrack: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ config, onOpenTrack }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    verifiedFAQs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return ['all', ...Array.from(set)];
  }, []);

  // Filtered FAQs
  const filteredFAQs = useMemo(() => {
    return verifiedFAQs.filter((faq) => {
      const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // Structured Data Schema for FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filteredFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className={`pt-28 pb-20 min-h-screen relative transition-colors ${
      isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#070d1d] text-slate-100'
    }`}>
      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className={`flex items-center gap-2 text-xs mb-8 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} aria-label="مسار التنقل">
          <Link to="/" className={`transition-colors ${isLight ? 'hover:text-slate-900' : 'hover:text-white'}`}>
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-[#e30613] font-bold">الأسئلة الشائعة</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border ${
            isLight ? 'bg-red-50 border-red-200 text-red-700' : 'bg-red-500/10 border-red-500/20 text-[#e30613]'
          }`}>
            <HelpCircle className="w-4 h-4" />
            <span>دليل الأسئلة الشائعة والمعلومات الخدمية الرسمية</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            دليل الأسئلة الشائعة <span className="text-[#e30613]">لشحن البضائع والعفش</span>
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            الإجابات الرسمية والمعتمدة من شركة الفاء السريع حول مدة التوصيل، التغليف، حماية السوائل، التعويض الجمركي، التوصيل للباب، وعدم احتساب الوزن الزائد.
          </p>
        </div>

        {/* Real-Time Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className={`w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
            isLight ? 'text-slate-400' : 'text-slate-400'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن سؤالك (مثال: مدة الشحن، جمارك، تغليف الشاشات، الصعيد)..."
            className={`w-full pr-12 pl-4 py-3.5 rounded-2xl border text-sm transition-all shadow-xl focus:outline-none focus:border-[#e30613] ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-slate-200/50'
                : 'bg-slate-900/90 border-white/15 text-white placeholder-slate-400'
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-white'
              }`}
            >
              مسح
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/50 scale-105'
                  : isLight
                    ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    : 'bg-slate-900/80 text-slate-300 border border-white/10 hover:border-white/20'
              }`}
            >
              {cat === 'all' ? 'جميع الأسئلة' : cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion List */}
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4 mb-16">
            {filteredFAQs.map((faq: FAQItem, idx: number) => {
              const isOpen = openFaqId === (faq.id || `faq-${idx}`);
              const questionNumber = idx + 1;

              return (
                <motion.div
                  key={faq.id || idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? isLight
                        ? 'bg-white border-[#e30613]/60 shadow-xl shadow-red-100'
                        : 'bg-slate-900/90 border-[#e30613]/50 shadow-2xl shadow-red-950/20'
                      : isLight
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id || `faq-${idx}`)}
                    className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 select-none group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-all ${
                        isOpen
                          ? 'bg-[#e30613] text-white shadow-md shadow-red-950/40'
                          : isLight
                            ? 'bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-slate-300'
                            : 'bg-slate-800 text-slate-300 border border-white/10 group-hover:border-white/25'
                      }`}>
                        {questionNumber}
                      </span>
                      <span className={`text-base sm:text-lg font-bold leading-snug transition-colors ${
                        isLight
                          ? isOpen ? 'text-[#e30613]' : 'text-slate-900 group-hover:text-[#e30613]'
                          : 'text-white group-hover:text-red-100'
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`p-2 rounded-xl shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#e30613] text-white rotate-180'
                          : isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/5 text-slate-400'
                      }`}
                    >
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
                        <div className={`px-5 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base leading-relaxed border-t pt-4 ${
                          isLight ? 'border-slate-100 text-slate-700' : 'border-white/5 text-slate-200'
                        }`}>
                          <div className="space-y-2 mb-4">
                            {faq.answer.includes('\n') ? (
                              faq.answer.split('\n').map((line, lIdx) => (
                                <p key={lIdx} className="leading-relaxed">
                                  {line}
                                </p>
                              ))
                            ) : (
                              <p className="leading-relaxed">{faq.answer}</p>
                            )}
                          </div>
                          
                          <div className={`flex flex-wrap items-center gap-2 pt-2 border-t ${
                            isLight ? 'border-slate-100' : 'border-white/5'
                          }`}>
                            {faq.category && (
                              <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border ${
                                isLight
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : 'bg-red-500/10 text-red-300 border-red-500/20'
                              }`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#e30613]" />
                                القسم: {faq.category}
                              </span>
                            )}
                            <span className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              معتمد رسمياً في دليل خدمة ألفا إكسبريس
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className={`text-center py-16 px-4 rounded-3xl border mb-16 ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/40 border-white/10'
          }`}>
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className={`text-lg font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>لم نجد نتائج مطابقة لبحثك</h3>
            <p className={`text-xs mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              جرّب البحث بكلمات أخرى أو تواصل مباشرة مع فريق خدمة العملاء على مدار 24 ساعة.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              عرض جميع الأسئلة
            </button>
          </div>
        )}

        {/* Attachments & Quick Navigation Cards */}
        <div className={`mb-14 p-6 sm:p-8 rounded-3xl border ${
          isLight ? 'bg-white border-slate-200 shadow-xl shadow-slate-200/50' : 'bg-slate-900/70 border-white/10'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#e30613] block mb-1">مرفقات الدليل والخدمات اللوجستية</span>
              <h3 className={`text-lg sm:text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                روابط سريعة لأدوات الشحن وخرائط الفروع
              </h3>
            </div>
            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>تحديثات فورية ومباشرة</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Tracking Tool */}
            <button
              type="button"
              onClick={onOpenTrack}
              className={`p-5 rounded-2xl border text-right transition-all group flex flex-col justify-between cursor-pointer ${
                isLight
                  ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-sky-500/50'
                  : 'bg-[#0b1429] hover:bg-[#111f3d] border-white/10 hover:border-sky-500/50'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Truck className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-sm mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>بوابة تتبع الشحنات المباشرة</h4>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  تابع موقع شحنتك لحظة بلحظة برقم البوليصة من المستودع حتى باب البيت بمصر.
                </p>
              </div>
              <span className="text-xs text-sky-600 dark:text-sky-400 font-bold mt-4 inline-flex items-center gap-1">
                <span>تتبع شحنتك الآن</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* CBM Calculator */}
            <Link
              to="/quote"
              className={`p-5 rounded-2xl border text-right transition-all group flex flex-col justify-between ${
                isLight
                  ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-red-500/50'
                  : 'bg-[#0b1429] hover:bg-[#111f3d] border-white/10 hover:border-red-500/50'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#e30613] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-sm mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>حاسبة الحجم والمتر المكعب (CBM)</h4>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  احسب تكلفة الشحن البري بدقة بالأبعاد مع وزن مفتوح وخصومات الكميات.
                </p>
              </div>
              <span className="text-xs text-[#e30613] font-bold mt-4 inline-flex items-center gap-1">
                <span>احسب تكلفة الشحنة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Branches & Maps */}
            <Link
              to="/branches"
              className={`p-5 rounded-2xl border text-right transition-all group flex flex-col justify-between ${
                isLight
                  ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-emerald-500/50'
                  : 'bg-[#0b1429] hover:bg-[#111f3d] border-white/10 hover:border-emerald-500/50'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-sm mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>خريطة الفروع الـ 8 بالمملكة</h4>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  فروعنا المعتمدة بجدة، الرياض، ومكة المكرمة مع روابط خرائط جوجل وأرقام التواصل.
                </p>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-4 inline-flex items-center gap-1">
                <span>استعرض الفروع والخرائط</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Contact & Help Banner */}
        <div className={`p-8 sm:p-10 rounded-3xl border text-right flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${
          isLight
            ? 'bg-white border-slate-200 shadow-slate-200/60'
            : 'bg-gradient-to-r from-red-950/50 via-slate-900 to-slate-900 border-red-500/30'
        }`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>متاحون للرد السريع 24/7</span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-black mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              هل لديك استفسار إضافي أو شحنة خاصة؟
            </h3>
            <p className={`text-xs sm:text-sm max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              فريق مستشاري الشحن اللوجستي في شركة الفاء السريع مستعد للإجابة على كافة تفاصيل شحنتك وتقديم عرض سعر فوري.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، لدي استفسار بخصوص شحن أغراض من السعودية إلى مصر.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>محادثة واتساب فورية</span>
            </a>

            <a
              href={`tel:${config.mainPhone}`}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl border font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-slate-800 hover:bg-slate-700 border-white/15 text-white'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-[#e30613]" />
              <span dir="ltr">{config.mainPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
