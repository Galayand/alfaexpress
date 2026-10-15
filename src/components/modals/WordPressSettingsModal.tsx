import React, { useState } from 'react';
import {
  Sliders,
  X,
  Save,
  RefreshCw,
  Check,
  Code2,
  Database,
  Shield,
  UploadCloud,
  FolderDown,
  Download,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  Layers,
  FileCode,
} from 'lucide-react';
import { CompanyConfig } from '../../types';

interface WordPressSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  onUpdateConfig: (newConfig: CompanyConfig) => void;
}

export const WordPressSettingsModal: React.FC<WordPressSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [formData, setFormData] = useState<CompanyConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<'standalone' | 'testimonials' | 'importer' | 'settings' | 'architecture' | 'theme_code'>('standalone');
  const [savedNotice, setSavedNotice] = useState(false);

  // Simulation state for asset importer
  const [isSimulatingImport, setIsSimulatingImport] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simCompleted, setSimCompleted] = useState(false);

  const runImportSimulation = () => {
    setIsSimulatingImport(true);
    setSimCompleted(false);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 600);
    setTimeout(() => setSimStep(3), 1200);
    setTimeout(() => setSimStep(4), 1800);
    setTimeout(() => setSimStep(5), 2400);
    setTimeout(() => {
      setIsSimulatingImport(false);
      setSimCompleted(true);
    }, 3000);
  };

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#070d1d] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-right overflow-y-auto max-h-[90vh]"
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

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-red-500/20 text-[#e30613] border border-red-500/30">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              قالب ووردبريس المستقل والمستورد الشامل (Standalone Theme & 1-Time Importer)
            </h3>
            <span className="text-xs text-slate-400">
              قالب ووردبريس متكامل ومستقل تماماً بدون أي تبعيات لقوالب أخرى + مستورد بضغطة واحدة لكافة الصفحات والوسائط
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 mb-6 border-b border-white/10 pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('standalone')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'standalone'
                ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/40'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <FolderDown className="w-3.5 h-3.5 text-amber-300" />
            <span>القالب المستقل (Standalone Theme)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              جديد v3.0
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'testimonials'
                ? 'bg-[#e30613] text-white shadow-lg shadow-red-950/40'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>تخصيص آراء العملاء والصور (Alfa Testimonials)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
              محدث
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('importer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'importer'
                ? 'bg-[#e30613] text-white'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5 text-sky-400" />
            <span>مستورد الموقع الشامل (1-Click)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('theme_code')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'theme_code'
                ? 'bg-[#e30613] text-white'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-amber-300" />
            <span>هيكلية ملفات القالب (7 قوالب صفحات)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#e30613] text-white'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>بيانات الشركة</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-[#e30613] text-white'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>تقرير التدقيق</span>
          </button>
        </div>

        {/* TAB 1: STANDALONE THEME */}
        {activeTab === 'standalone' && (
          <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
            {/* Download Main Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-white/15 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FolderDown className="w-4 h-4 text-emerald-400" />
                    <span>تحميل قالب ألفا إكسبريس المستقل (Full Standalone Theme)</span>
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    قالب ووردبريس كامل 100% غير معتمد على Hello Elementor أو أي قوالب أخرى، مدمج مع كافة الصفحات والوسائط والمستورد التلقائي.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Standalone Theme - alfaExpressV5.8.zip */}
                <a
                  href="/alfaExpressV5.8.zip"
                  download="alfaExpressV5.8.zip"
                  className="p-4 rounded-xl bg-[#0b1429] hover:bg-[#111f3d] border-2 border-[#e30613] text-right transition-all flex flex-col justify-between group shadow-lg shadow-red-950/30 ring-2 ring-red-500/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2.5 rounded-lg bg-red-500/20 text-[#e30613] group-hover:scale-110 transition-transform">
                      <Download className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                      الإصدار الجديد المعتمد (alfaExpressV5.8)
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm mb-1">قالب ألفا إكسبريس (alfaExpressV5.8)</h5>
                    <p className="text-[11px] text-slate-400 font-mono">alfaExpressV5.8.zip</p>
                    <span className="text-[11px] text-amber-300 mt-2 block font-semibold">
                      ⚡ يشمل الإصلاح النهائي لخطأ صفحة طلب عرض السعر (Quote) والتمرير الذكي لحاسبة CBM، وضبط هيدر وشريط التنقل ومنع أي تشوه في العرض على كافة الشاشات.
                    </span>
                  </div>
                </a>

                {/* Direct Zip Alternative */}
                <a
                  href="/wordpress-package/alfaExpressV5.8.zip"
                  download="alfaExpressV5.8.zip"
                  className="p-4 rounded-xl bg-[#0b1429] hover:bg-[#111f3d] border border-white/15 hover:border-sky-400 text-right transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2.5 rounded-lg bg-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
                      <Download className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-bold">
                      رابط بديل مباشر (Direct Package)
                    </span>
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs mb-1">حزمة ووردبريس المستقلة (alfaExpressV5.8)</h5>
                    <p className="text-[11px] text-slate-400 font-mono">/wordpress-package/alfaExpressV5.8.zip</p>
                    <span className="text-[10px] text-slate-400 mt-2 block">
                      جاهز للتثبيت الفوري عبر لوحة تحكم ووردبريس (مظهر &gt; قوالب &gt; رفع قالب)
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick 3-Step Setup Instructions */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>طريقة التثبيت في ووردبريس خلال دقيقة واحدة:</span>
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300 pr-1 text-xs">
                <li>
                  في لوحة تحكم ووردبريس، اذهب إلى <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">مظهر &gt; قوالب &gt; أضف جديد &gt; رفع قالب</code>.
                </li>
                <li>
                  اختر ملف <strong>alfaExpressV5.8.zip</strong> واضغط <strong>تثبيت ثم تفعيل (Activate)</strong>.
                </li>
                <li>
                  ستظهر لك رسالة ترحيبية أعلى لوحة التحكم أو في القائمة الجانبية <strong>"ألفا إكسبريس"</strong>، اضغط على <strong>"تشغيل مستورد الموقع الشامل (1-Click Import)"</strong>.
                </li>
                <li>
                  يقوم القالب تلقائياً بإنشاء جميع الصفحات، واستيراد كافة الصور والوسائط، وإعداد القوائم، وتعيين الصفحة الرئيسية!
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* TAB: TESTIMONIALS & CUSTOMIZER PHOTOS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
            {/* Customizer Instructions Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0c1836] border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>تغيير صور وبيانات آراء العملاء (Theme Customizer & Elementor)</span>
                </h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                  طريقتان سهلتان
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                تم دمج تحكم كامل في صور آراء العملاء الـ 6 الموثقة بحيث يمكنك استبدال الصور ورفع صور جديدة مباشرة من لوحة تحكم ووردبريس:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {/* Method 1: Theme Customizer */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <Sliders className="w-4 h-4" />
                    <span>الطريقة 1: عبر مخصص القالب (Theme Customizer)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    اذهب في ووردبريس إلى:
                  </p>
                  <code className="block p-2 rounded bg-slate-900 border border-white/10 text-amber-200 text-[11px] font-mono leading-relaxed">
                    المظهر &gt; تخصيص &gt; إعدادات ألفا إكسبريس &gt; آراء وتجارب العملاء (Testimonials Photos & Content)
                  </code>
                  <p className="text-[11px] text-slate-400">
                    ستجد حقول اختيار ورفع الصور (WP_Customize_Image_Control) لجميع الآراء الـ 6، بالإضافة لتعديل اسم العميل، مسار الشحن، ونصوص التقييم مع المعاينة الحية فورياً!
                  </p>
                </div>

                {/* Method 2: Elementor Widget */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                    <Layers className="w-4 h-4" />
                    <span>الطريقة 2: عبر ودجت Elementor (Alfa Testimonials)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    عند تحرير أي صفحة بواسطة Elementor:
                  </p>
                  <code className="block p-2 rounded bg-slate-900 border border-white/10 text-sky-200 text-[11px] font-mono leading-relaxed">
                    ودجت Alfa Testimonials &gt; مصدر التقييمات &gt; اختيار Customizer أو تخصيص يدوي
                  </code>
                  <p className="text-[11px] text-slate-400">
                    يمكنك اختيار استخدام صور المخصص الافتراضية تلقائياً، أو إضافة عناصر Repeater مخصصة مع رفع الصور من مكتبة وسائط ووردبريس مباشرة.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Preview of the 6 Reviews & Photos */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>الصور والتقييمات الـ 6 المضمنة في القالب والمخصصة للربط المباشر:</span>
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 1, name: 'م. إبراهيم عبد العزيز', route: 'الرياض -> القاهرة', file: 'review-1.jpeg', desc: 'شحن غرفة نوم وشاشات 65 بوصة' },
                  { id: 2, name: 'د. سارة محمود', route: 'جدة -> الإسكندرية', file: 'review-2.jpeg', desc: 'أغراض شخصية وكتب طبية' },
                  { id: 3, name: 'أ. طارق عبد العليم', route: 'جدة -> المنصورة (الدلتا)', file: 'review-3.jpeg', desc: 'شاشات ذكية وأجهزة في صناديق خشبية' },
                  { id: 4, name: 'أ. حسام الدين عبد الرحمن', route: 'مكة المكرمة -> أسيوط', file: 'review-4.jpeg', desc: 'عفش وأثاث منزلي متكامل' },
                  { id: 5, name: 'م. وائل النجار', route: 'الرياض -> الجيزة (أكتوبر)', file: 'review-5.jpeg', desc: 'شحن جوي مستعجل لوثائق وبضائع' },
                  { id: 6, name: 'أ. محمد فهمي', route: 'جدة -> السويس والقناة', file: 'review-6.jpeg', desc: 'أجهزة مطبخ وشاشات' },
                ].map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="font-bold text-white">رأي رقم {item.id}</span>
                        <span className="text-[10px] text-sky-400 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-500/20">{item.route}</span>
                      </div>
                      <div className="h-28 rounded-lg overflow-hidden border border-white/10 bg-slate-900 mb-2">
                        <img
                          src={`/wordpress-package/alfa-express-theme/assets/images/${item.file}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <strong className="text-white text-xs block">{item.name}</strong>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{item.desc}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 text-[10px] text-amber-300/90 font-mono">
                      مفتاح التخصيص: alfa_review_photo_{item.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 1-CLICK IMPORTER */}
        {activeTab === 'importer' && (
          <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
            {/* Live Interactive Simulator */}
            <div className="p-5 rounded-2xl bg-[#091024] border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <RefreshCw className={`w-4 h-4 text-amber-400 ${isSimulatingImport ? 'animate-spin' : ''}`} />
                    <span>محاكي مستورد الموقع الشامل (1-Time Importer Simulator)</span>
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    شاهد كيف يقوم مستورد القالب بإنشاء الموقع بالكامل وتوليد الصفحات والأصول دفعة واحدة:
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isSimulatingImport}
                  onClick={runImportSimulation}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xs transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-red-950/40"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSimulatingImport ? 'جاري الاستيراد...' : 'بدء محاكاة الاستيراد الشامل'}</span>
                </button>
              </div>

              {/* Simulation Progress & Steps */}
              {(isSimulatingImport || simCompleted) && (
                <div className="space-y-2 pt-2 border-t border-white/10 font-mono text-[11px]">
                  <div className={`p-2.5 rounded-xl border flex items-center justify-between ${simStep >= 1 ? 'bg-slate-900 text-emerald-300 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-white/5'}`}>
                    <span>1. استيراد كافة الصور والوسائط (الشعار، الشاحنات، والمراجعات الـ 6) إلى Media Library</span>
                    {simStep >= 1 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className={`p-2.5 rounded-xl border flex items-center justify-between ${simStep >= 2 ? 'bg-slate-900 text-emerald-300 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-white/5'}`}>
                    <span>2. إنشاء الصفحات الـ 7 (الرئيسية، الخدمات، الفروع 8، FAQ، المدونة، التتبع، حاسبة الأسعار)</span>
                    {simStep >= 2 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className={`p-2.5 rounded-xl border flex items-center justify-between ${simStep >= 3 ? 'bg-slate-900 text-emerald-300 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-white/5'}`}>
                    <span>3. نشر 4 مقالات لوجستية إرشادية وتعيين التصنيفات والصور البارزة</span>
                    {simStep >= 3 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className={`p-2.5 rounded-xl border flex items-center justify-between ${simStep >= 4 ? 'bg-slate-900 text-emerald-300 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-white/5'}`}>
                    <span>4. بناء القائمة الرئيسية (Primary Menu) تلقائياً وتعيينها للهيدر</span>
                    {simStep >= 4 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className={`p-2.5 rounded-xl border flex items-center justify-between ${simStep >= 5 ? 'bg-slate-900 text-emerald-300 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-white/5'}`}>
                    <span>5. تعيين الصفحة الرئيسية الثابتة وضبط الروابط الدائمة Permalinks على /%postname%/</span>
                    {simStep >= 5 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>

                  {simCompleted && (
                    <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 mt-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>اكتمل استيراد وتهيئة موقع ألفا إكسبريس بالكامل بنجاح 100%!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: THEME TEMPLATES STRUCTURE */}
        {activeTab === 'theme_code' && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-300">
              هيكلية القوالب المضمنة داخل <code className="text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded">/wp-content/themes/alfa-express-theme/</code>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                <strong className="text-white block mb-1">front-page.php</strong>
                <span className="text-[11px] text-slate-400">الصفحة الرئيسية الشاملة (3D Hero، الإحصائيات، الخدمات، الفروع 8، حاسبة الأسعار، FAQ)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                <strong className="text-white block mb-1">page-services.php</strong>
                <span className="text-[11px] text-slate-400">صفحة خدمات الشحن المتخصصة مع تفاصيل المزايا وطلب التسعيرة</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                <strong className="text-white block mb-1">page-branches.php</strong>
                <span className="text-[11px] text-slate-400">دليل الفروع الـ 8 في جدة ومكة والرياض مع أرقام الهاتف وروابط خرائط جوجل والواتساب</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                <strong className="text-white block mb-1">page-faq.php</strong>
                <span className="text-[11px] text-slate-400">صفحة الأسئلة الشائعة مع محرك البحث المباشر وSchema.org JSON-LD</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                <strong className="text-white block mb-1">page-blog.php & single.php</strong>
                <span className="text-[11px] text-slate-400">المدونة اللوجستية وعرض المقالات الفردية مع وقت القراءة وتصنيفات الجمارك والتغليف</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                <strong className="text-white block mb-1">page-tracking.php & page-quote.php</strong>
                <span className="text-[11px] text-slate-400">بوابة تتبع الشحنات المباشرة وحاسبة أسعار الشحن المتصلة بواتساب الفروع</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LIVE EDITABLE SETTINGS & CUSTOMIZER */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSave} className="space-y-6">
            {savedNotice && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>تم حفظ التعديلات وتحديث واجهة الموقع فورياً بنجاح!</span>
              </div>
            )}

            {/* Typography & Sizing Controls (WordPress Customizer simulation) */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>إعدادات الخطوط وحجم العناصر (Typography & Sizing Controls)</span>
              </h4>
              <p className="text-slate-400 text-xs">
                يمكنك التحكم المباشر في أحجام العناوين والنصوص هنا، وتنعكس فورياً على الموقع وداخل مخصص ووردبريس (WordPress Customizer).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    حجم عنوان الهيد لاين الرئيسي (Hero Heading Size)
                  </label>
                  <select
                    value={formData.heroHeadingSize || 'large'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        heroHeadingSize: e.target.value as 'normal' | 'large' | 'huge',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs cursor-pointer"
                  >
                    <option value="normal">عادي متوازن (text-4xl)</option>
                    <option value="large">افتراضي مميز (text-5xl - text-6xl)</option>
                    <option value="huge">عملاق بارز (text-6xl - text-7xl)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    حجم النصوص والفقرات (Body Font Size)
                  </label>
                  <select
                    value={formData.bodyFontSize || 'base'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bodyFontSize: e.target.value as 'sm' | 'base' | 'lg',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs cursor-pointer"
                  >
                    <option value="sm">مضغوط صغير (Small 14px)</option>
                    <option value="base">افتراضي قياسي (Medium 16px)</option>
                    <option value="lg">كبير ومقروء للمسنين (Large 18px)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content Customizer */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-sky-400" />
                <span>تخصيص نصوص وأزرار واجهة الموقع (Content Customizer)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">العنوان الرئيسي للهيرو (Hero Headline)</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">الوصف التوضيحي للهيرو (Sub-Tagline)</label>
                  <textarea
                    rows={2}
                    value={formData.subTagline}
                    onChange={(e) => setFormData({ ...formData, subTagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">نص زر الإجراء في الهيرو (Hero CTA Text)</label>
                  <input
                    type="text"
                    value={formData.heroCtaText || 'طلب تسعيرة شحن بري'}
                    onChange={(e) => setFormData({ ...formData, heroCtaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">سعر الشحن المبدئي (ريال)</label>
                  <input
                    type="number"
                    value={formData.startingPriceSar}
                    onChange={(e) => setFormData({ ...formData, startingPriceSar: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>بيانات الاتصال والفروع الرسمية</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">اسم الشركة التجاري</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الاسم القانوني للشركة</label>
                  <input
                    type="text"
                    value={formData.legalName}
                    onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">رقم الهاتف الموحد</label>
                  <input
                    type="text"
                    value={formData.mainPhone}
                    onChange={(e) => setFormData({ ...formData, mainPhone: e.target.value })}
                    dir="ltr"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">رقم واتساب المعتمد</label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    dir="ltr"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs text-right"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-950/40 flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>حفظ الإعدادات وتحديث الموقع فورياً</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 5: AUDIT REPORT */}
        {activeTab === 'architecture' && (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>تقرير المعمارية المستقلة لموقع ألفا إكسبريس:</span>
              </h4>
              <p>• <strong>القالب:</strong> Standalone WordPress Theme (بدون أي تبعيات لقوالب أخرى مثل Hello أو Astra).</p>
              <p>• <strong>المستورد المدمج:</strong> معالج تهيئة متكامل بنقرة واحدة (One-Time Importer) يستورد الوسائط، ينشئ الصفحات، وينظم القوائم فور تفعيل القالب.</p>
              <p>• <strong>الصفحات المهيأة:</strong> 7 صفحات مخصصة (الرئيسية، الخدمات، الفروع الـ 8، الأسئلة الشائعة FAQ، المدونة، التتبع، حاسبة الأسعار).</p>
              <p>• <strong>الفروع الثمانية:</strong> 5 فروع في جدة (الفيصلية، البوادي، السلامة، الشرفية، الربوة)، فرع في مكة المكرمة، وفرعان في الرياض (العزيزية، الملز).</p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
