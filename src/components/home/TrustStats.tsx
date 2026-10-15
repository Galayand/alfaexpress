import React, { useEffect, useState, useRef } from 'react';
import { Award, Building2, MapPin, ShieldCheck, Clock, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { CompanyConfig } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface TrustStatsProps {
  config: CompanyConfig;
}

export const TrustStats: React.FC<TrustStatsProps> = ({ config }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [expCount, setExpCount] = useState(0);
  const [branchCount, setBranchCount] = useState(0);
  const [priceCount, setPriceCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate Experience from 0 to 15
          let curExp = 0;
          const expInterval = setInterval(() => {
            curExp += 1;
            setExpCount(curExp);
            if (curExp >= config.yearsExperience) clearInterval(expInterval);
          }, 60);

          // Animate Branches from 0 to 8
          let curBranch = 0;
          const branchInterval = setInterval(() => {
            curBranch += 1;
            setBranchCount(curBranch);
            if (curBranch >= config.branchesCount) clearInterval(branchInterval);
          }, 100);

          // Animate Starting Price from 0 to 150
          let curPrice = 0;
          const priceInterval = setInterval(() => {
            curPrice += 10;
            setPriceCount(curPrice);
            if (curPrice >= config.startingPriceSar) clearInterval(priceInterval);
          }, 40);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, config]);

  const stats = [
    {
      icon: Award,
      value: `${hasAnimated ? expCount : config.yearsExperience}+`,
      label: 'سنة خبرة معتمدة',
      sublabel: 'في السوق السعودي وخدمات الشحن البري الدولي',
      color: 'text-amber-400',
      bgGlow: 'bg-amber-500/10',
    },
    {
      icon: Building2,
      value: `${hasAnimated ? branchCount : config.branchesCount}`,
      label: 'فروع ومحطات شحن',
      sublabel: '5 فروع بجدة • فرع بمكة • فرعان بالرياض',
      color: 'text-[#e30613]',
      bgGlow: 'bg-red-500/10',
    },
    {
      icon: MapPin,
      value: 'السعودية ← مصر',
      label: 'تغطية شاملة 100%',
      sublabel: 'شحن بري لباب البيت بجميع المحافظات والقرى',
      color: 'text-sky-400',
      bgGlow: 'bg-sky-500/10',
    },
    {
      icon: ShieldCheck,
      value: `${hasAnimated ? priceCount : config.startingPriceSar} ريال`,
      label: 'أسعار تبدأ من',
      sublabel: 'شحن بري اقتصادي وتنافسي مع أعلى معايير الأمان',
      color: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/10',
    },
  ];

  return (
    <section ref={sectionRef} className={`relative py-12 border-y transition-colors duration-200 ${isLight ? 'bg-white border-slate-200' : 'bg-[#070d1d] border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
                className={`relative rounded-2xl p-6 border flex flex-col items-start transition-all hover:border-[#e30613]/40 hover:shadow-lg hover:-translate-y-1 group ${
                  isLight ? 'bg-slate-50 border-slate-200 shadow-sm' : 'bg-slate-900/60 border-white/10 backdrop-blur-md'
                }`}
              >
                <div className={`p-3 rounded-xl ${stat.bgGlow} mb-4 transition-transform group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                
                <span className={`text-3xl sm:text-4xl font-black ${stat.color} mb-1 tracking-tight`}>
                  {stat.value}
                </span>

                <span className={`text-base font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {stat.label}
                </span>

                <span className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {stat.sublabel}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
