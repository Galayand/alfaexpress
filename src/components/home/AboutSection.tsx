import React from 'react';
import { ShieldCheck, Truck, Package, CheckCircle2, Award, ArrowLeft, Wrench, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { CompanyConfig } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface AboutSectionProps {
  config: CompanyConfig;
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config, onOpenQuote }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const floatingCards = [
    { text: 'استلام بشاحنات مبطنة من الباب', icon: Truck, delay: '0s', pos: '-top-4 -right-4' },
    { text: 'تغليف هندسي ثلاثي', icon: Package, delay: '0.4s', pos: 'top-1/3 -left-6' },
    { text: 'شاحنات وتريلات مبطنة', icon: Award, delay: '0.8s', pos: 'bottom-16 -right-6' },
    { text: 'تخليص بالمنافذ البرية', icon: ShieldCheck, delay: '1.2s', pos: '-bottom-4 left-1/4' },
  ];

  return (
    <section id="about" className={`relative py-20 sm:py-24 overflow-hidden transition-colors duration-200 ${isLight ? 'bg-white' : 'bg-[#0b1429]'}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* RIGHT COLUMN: TEXT CONTENT (RTL First) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col items-start text-right"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e30613]/10 border border-[#e30613]/25 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#e30613]" />
              <span className="text-xs font-bold text-[#e30613]">عن شركة ألفا إكسبريس للشحن البري</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              ألفا إكسبريس … <span className="text-[#e30613]">شحن بري ذكي</span> بأعلى معايير الأمان
            </h2>

            <p className={`text-base sm:text-lg font-medium leading-relaxed mb-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              شركة رائدة ومتخصصة في خدمات الشحن البري الدولي، بخبرة تزيد عن 15 عاماً في السوق السعودي، نقدم خدمات نقل العفش والأثاث، البضائع والطرود، والأجهزة الحساسة من جميع مناطق المملكة إلى كافة محافظات مصر.
            </p>

            <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              نعتمد على أسطول ضخم من الشاحنات المبطنة والتريلات المغلقة والمجهزة، مع فريق محترف من النجارين وفنيي التغليف لفك ورص وتركيب الأثاث المنزلي وتوفير حماية كاملة ضد اهتزازات الطرق مع تخليص جمركي معتمد بالمنافذ البرية.
            </p>

            {/* Core Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-8">
              <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/70 border-white/10'
              }`}>
                <Truck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>أسطول بري حديث</h3>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    تريلات وشاحنات مبطنة مغلقة ومجهزة لنقل الحمولات الكبيرة والجزئية بأمان فائق.
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/70 border-white/10'
              }`}>
                <Wrench className="w-5 h-5 text-[#e30613] shrink-0 mt-0.5" />
                <div>
                  <h3 className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>فك وتغليف وتركيب</h3>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    طاقم فني لفك غرف النوم والمطابخ وتغليفها بطبقات ثلاثية وإعادة تركيبها بمصر.
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/70 border-white/10'
              }`}>
                <MapPin className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>توصيل للقرى والمراكز</h3>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    شبكة توزيع بري تصل لباب منزلك في محافظات الصعيد والدلتا والقاهرة والإسكندرية.
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/70 border-white/10'
              }`}>
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>تخليص جمركي فوري</h3>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    فريق مخلصين متواجد بالمنافذ البرية لإنهاء الإجراءات والإعفاءات بدون تأخير.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenQuote}
              className="px-6 py-3.5 rounded-xl bg-[#e30613] hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-900/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <span>طلب تسعيرة شحن بري لشحنتك</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </motion.div>

          {/* LEFT COLUMN: BRAND IMAGE & FLOATING CARDS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* Background circular glowing pedestal */}
            <div className={`relative w-full max-w-lg aspect-square rounded-full flex items-center justify-center p-8 border ${
              isLight
                ? 'bg-gradient-to-tr from-red-600/10 via-sky-600/5 to-amber-500/10 border-slate-200'
                : 'bg-gradient-to-tr from-red-600/20 via-sky-600/10 to-amber-500/15 border-white/10'
            }`}>
              
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img
                  src="/assets/brand/alfa-car.png"
                  alt="أسطول شاحنات وسيارات الشحن البري ألفا إكسبريس"
                  className="w-full max-h-80 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] filter brightness-105"
                />
              </div>

              {/* Floating Pill Badges */}
              {floatingCards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ y: 0 }}
                    animate={{ y: [-4, 4, -4] }}
                    transition={{
                      duration: 3 + idx * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.3,
                    }}
                    className={`absolute ${card.pos} px-3.5 py-2 rounded-2xl border backdrop-blur-xl shadow-xl flex items-center gap-2 z-20 ${
                      isLight ? 'bg-white/95 border-slate-200' : 'bg-slate-900/90 border-white/15'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-[#e30613]/15 text-[#e30613]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-bold whitespace-nowrap ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {card.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
