/**
 * @file Navbar.tsx
 * @project Alfa Express Logistics Platform
 * @author Jenova Media (https://jenova.media)
 * @description Primary navigation bar component featuring brand identity,
 * desktop navigation links, dark/light mode toggle, telephone direct dial,
 * quote calculator triggers, and responsive mobile overlay menu.
 */

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Search, Menu, X, Truck, MessageCircle, Sliders, MapPin, Calculator, BookOpen, HelpCircle, ShieldCheck, Clock, Sun, Moon } from 'lucide-react';
import { CompanyConfig } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  config: CompanyConfig;
  onOpenTrack: () => void;
  onOpenQuote: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenTrack, onOpenQuote, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler for in-page smooth scroll or navigation
  const handleSectionClick = (sectionId: string, fallbackPath: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(fallbackPath);
  };

  const navSections = [
    { label: 'الرئيسية', sectionId: 'hero', path: '/', icon: Truck },
    { label: 'عن ألفا', sectionId: 'about', path: '/#about', icon: ShieldCheck },
    { label: 'خدماتنا', sectionId: 'services', path: '/services', icon: Truck },
    { label: 'مراحل الشحن', sectionId: 'journey', path: '/#journey', icon: Clock },
    { label: 'حاسبة CBM', sectionId: 'calculator', path: '/quote', icon: Calculator },
    { label: 'فروعنا (8)', sectionId: 'branches', path: '/branches', icon: MapPin },
    { label: 'الأسئلة الشائعة', sectionId: 'faq', path: '/faq', icon: HelpCircle },
    { label: 'تتبع الشحنة', sectionId: 'tracking', path: '/tracking', icon: Search },
    { label: 'المدونة', sectionId: 'blog', path: '/blog', icon: BookOpen },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-250 ${
        isLight
          ? isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md py-1.5 sm:py-2.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-1.5 sm:py-3'
          : isScrolled
            ? 'bg-[#070d1d]/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40 py-1.5 sm:py-2.5'
            : 'bg-[#070d1d]/90 backdrop-blur-md border-b border-white/5 py-1.5 sm:py-3'
      } pt-[env(safe-area-inset-top,0px)]`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          {/* LOGO & BRAND */}
          <Link
            to="/"
            onClick={() => handleSectionClick('hero', '/')}
            className="flex items-center gap-1.5 sm:gap-3 group shrink min-w-0"
          >
            <div className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl p-0.5 sm:p-1 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shrink-0 shadow-sm border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
            }`}>
              <img
                src="/assets/brand/alfa-logo.webp"
                alt="شعار ألفا إكسبريس"
                className="w-full h-full object-contain"
                width="40"
                height="40"
              />
            </div>
            <div className="flex flex-col text-right truncate">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className={`text-xs sm:text-base lg:text-lg font-black tracking-tight leading-tight whitespace-nowrap ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  ألفا إكسبريس
                </span>
                <span className="text-[7.5px] sm:text-[9px] px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded bg-[#e30613] text-white font-black tracking-normal uppercase whitespace-nowrap">
                  شحن بري
                </span>
              </div>
              <span className={`text-[8.5px] sm:text-[10px] font-medium truncate leading-none mt-0.5 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                من السعودية إلى كافة محافظات مصر
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION LINKS (WEBSITE SECTIONS) */}
          <nav aria-label="أقسام الموقع" className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navSections.map((item) => {
              const isCurrent =
                location.pathname === item.path ||
                (item.path.startsWith('/#') && location.pathname === '/');
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSectionClick(item.sectionId, item.path)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs xl:text-[13px] font-bold transition-all whitespace-nowrap ${
                    isLight
                      ? isCurrent
                        ? 'text-[#e30613] bg-red-50'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                      : isCurrent
                        ? 'text-white bg-white/10 hover:bg-white/15'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* HEADER CTAS (DESKTOP) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Direct Phone Call */}
            <a
              href={`tel:${config.mainPhone}`}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-800'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
              }`}
              title="اتصل بالرقم الموحد"
            >
              <Phone className="w-3.5 h-3.5 text-[#e30613]" />
              <span dir="ltr">{config.mainPhone}</span>
            </a>

            {/* Track Shipment CTA */}
            <button
              type="button"
              onClick={onOpenTrack}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap ${
                isLight
                  ? 'bg-sky-50 hover:bg-sky-100/80 border-sky-200 text-sky-900'
                  : 'bg-slate-800/90 hover:bg-slate-700 border-white/15 text-white hover:border-sky-500/50'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <span>تتبع سريع</span>
            </button>

            {/* Request Quote CTA */}
            <button
              type="button"
              onClick={onOpenQuote}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#e30613] to-[#b8000b] hover:from-[#c4000b] hover:to-[#990008] text-xs font-bold text-white shadow-md shadow-red-900/30 hover:shadow-red-900/50 transition-all flex items-center gap-1 whitespace-nowrap"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>طلب تسعيرة</span>
            </button>

            {/* Light / Dark Theme Switcher (Desktop) */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-1.5 rounded-lg border transition-colors flex items-center justify-center ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-amber-400'
              }`}
              title={theme === 'dark' ? 'التحويل للوضع النهاري (Light Mode)' : 'التحويل للوضع الليلي (Dark Mode)'}
              aria-label="تبديل المظهر النهاري والليلي"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in fade-in" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 animate-in fade-in" />
              )}
            </button>

            {/* WordPress Admin Settings Trigger */}
            <button
              type="button"
              onClick={onOpenAdmin}
              className={`p-1.5 rounded-lg border transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600 hover:text-[#e30613]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-amber-400'
              }`}
              title="إعدادات ووردبريس (CMS Customizer & Export)"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          {/* MOBILE HEADER ACTION BUTTONS (COMPACT & TOUCH-OPTIMIZED FOR IPHONES & ANDROID) */}
          <div className="flex items-center gap-1 sm:hidden shrink-0">
            <button
              type="button"
              onClick={onOpenQuote}
              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#e30613] to-[#b8000b] text-white text-[11px] font-bold shadow-sm whitespace-nowrap active:scale-95 transition-transform"
            >
              طلب تسعيرة
            </button>

            {/* Theme Toggle Button (Mobile Top Bar) */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center active:scale-95 transition-transform ${
                isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-white/10 text-slate-200 border-white/15'
              }`}
              title={theme === 'dark' ? 'التحويل للوضع النهاري' : 'التحويل للوضع الليلي'}
              aria-label="تبديل المظهر النهاري والليلي"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-700" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center active:scale-95 transition-transform ${
                isLight ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-white/10 text-white border-white/15'
              }`}
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER (WEBSITE SECTIONS GRID) */}
        {mobileMenuOpen && (
          <div className={`lg:hidden pt-3 pb-3 mt-2 space-y-2.5 backdrop-blur-2xl rounded-xl p-3 shadow-2xl border animate-in fade-in slide-in-from-top-2 duration-150 ${
            isLight
              ? 'bg-white/98 border-slate-200 text-slate-800 shadow-slate-300/50'
              : 'bg-[#070d1d]/98 border-white/10 text-white'
          }`}>
            <div className={`text-[11px] font-bold px-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>أقسام ومحتويات الموقع:</div>
            <div className="grid grid-cols-2 gap-1.5">
              {navSections.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleSectionClick(item.sectionId, item.path)}
                    className={`px-2.5 py-2 rounded-lg text-xs font-bold text-right transition-colors flex items-center justify-between border ${
                      isLight
                        ? 'text-slate-800 bg-slate-50 hover:bg-slate-100 border-slate-200/70 active:bg-[#e30613] active:text-white'
                        : 'text-slate-200 bg-white/5 hover:bg-white/10 border-transparent active:bg-[#e30613] active:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <IconComponent className={`w-3.5 h-3.5 ${isLight ? 'text-slate-400' : 'text-slate-400 opacity-80'}`} />
                  </button>
                );
              })}
            </div>

            {/* Mobile Theme Switcher Row */}
            <div className={`pt-2 border-t flex items-center justify-between px-1 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {theme === 'dark' ? <Moon className="w-4 h-4 text-sky-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span>المظهر: {theme === 'dark' ? 'الوضع الليلي' : 'الوضع النهاري'}</span>
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3 py-1 rounded-md text-xs font-bold bg-[#e30613]/15 text-[#e30613] hover:bg-[#e30613] hover:text-white transition-colors border border-[#e30613]/30"
              >
                {theme === 'dark' ? 'تفعيل النهاري ☀️' : 'تفعيل الليلي 🌙'}
              </button>
            </div>

            <div className={`pt-2 border-t space-y-2 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
              <a
                href={`tel:${config.mainPhone}`}
                className={`w-full py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-between ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-slate-900 border-white/10 text-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#e30613]" />
                  <span>الاتصال المباشر:</span>
                </span>
                <span dir="ltr">{config.mainPhone}</span>
              </a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#e30613] to-[#b8000b] text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <Calculator className="w-4 h-4" />
                  <span>احسب تكلفة شحنتك فورا</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className={`p-2.5 rounded-lg border ${
                    isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-white/10 text-amber-300 border-white/10'
                  }`}
                  title="إعدادات ووردبريس"
                >
                  <Sliders className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
