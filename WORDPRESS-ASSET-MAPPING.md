# دليل توحيد مسارات وملفات الأصول وقالب ووردبريس المستقل
# Standardized WordPress Theme Asset Mapping & Resolution Guide

هذا الدليل يوضح المعايير القياسية لربط وتوزيع جميع الأصول الثابتة (الصور، المتجهات SVG، مجسمات Three.js ثلاثية الأبعاد، والخطوط) من بيئة التطوير (`/public`) إلى هيكل قالب ووردبريس المستقل (`alfa-express-theme`) لضمان حل جميع المسارات بنسبة 100% عند التثبيت كقالب مستقل (Standalone Theme).

---

## 1. جدول تخطيط ومطابقة الأصول (Asset Mapping Matrix)

| فئة الأصل (Category) | المسار في بيئة التطوير (Source in React / Public) | المسار في قالب ووردبريس (Destination in Theme) | طريقة استدعاء المسار في القالب (Resolution Method) | الاستخدام (Usage) |
| :--- | :--- | :--- | :--- | :--- |
| **شعار الشركة الرسمي** | `/public/assets/brand/alfa-logo.webp` | `alfa-express-theme/assets/images/alfa-logo.webp` | `get_template_directory_uri() . '/assets/images/alfa-logo.webp'` | الهيدر، الفوتر، بطاقات الضمان، النوافذ المنبثقة |
| **سيارة الشحن اللوجستية** | `/public/assets/brand/alfa-car.png` | `alfa-express-theme/assets/images/alfa-car.png` | `get_template_directory_uri() . '/assets/images/alfa-car.png'` | قسم من نحن، بطاقة الأسطول، صورة الإرجاع الاحتياطية |
| **أفاتار تقييم 1** | `/public/assets/reviews/review-1.jpeg` | `alfa-express-theme/assets/images/review-1.jpeg` | `get_template_directory_uri() . '/assets/images/review-1.jpeg'` | آراء العملاء (شحن الرياض -> القاهرة) |
| **أفاتار تقييم 2** | `/public/assets/reviews/review-2.jpeg` | `alfa-express-theme/assets/images/review-2.jpeg` | `get_template_directory_uri() . '/assets/images/review-2.jpeg'` | آراء العملاء (شحن جدة -> الإسكندرية) |
| **أفاتار تقييم 3** | `/public/assets/reviews/review-3.jpeg` | `alfa-express-theme/assets/images/review-3.jpeg` | `get_template_directory_uri() . '/assets/images/review-3.jpeg'` | آراء العملاء (شحن مكة -> طنطا) |
| **أفاتار تقييم 4** | `/public/assets/reviews/review-4.jpeg` | `alfa-express-theme/assets/images/review-4.jpeg` | `get_template_directory_uri() . '/assets/images/review-4.jpeg'` | آراء العملاء (شحن الدمام -> المنصورة) |
| **أفاتار تقييم 5** | `/public/assets/reviews/review-5.jpeg` | `alfa-express-theme/assets/images/review-5.jpeg` | `get_template_directory_uri() . '/assets/images/review-5.jpeg'` | آراء العملاء (شحن المدينة -> أسيوط) |
| **أفاتار تقييم 6** | `/public/assets/reviews/review-6.jpeg` | `alfa-express-theme/assets/images/review-6.jpeg` | `get_template_directory_uri() . '/assets/images/review-6.jpeg'` | آراء العملاء (شحن جدة -> الجيزة) |
| **محرك Three.js ثلاثي الأبعاد** | `CDN / local bundle` | `alfa-express-theme/assets/js/three.min.js` | `wp_enqueue_script('threejs', get_template_directory_uri() . '/assets/js/three.min.js')` | محرك التصيير والرسوميات ثلاثية الأبعاد |
| **مشهد الشاحنة التفاعلي (3D Hero)**| `/src/components/3d/...` | `alfa-express-theme/assets/js/alfa-3d-hero.js` | `wp_enqueue_script('alfa-3d-hero', ...)` | لعبة محاكاة الشحن التفاعلية بالهيرو |
| **حزمة الجافاسكريبت الموحدة** | `/src/components/...` | `alfa-express-theme/assets/js/alfa-theme.js` | `wp_enqueue_script('alfa-custom-js', ...)` | الحاسبة، الفروع، المراحل الـ 8، التتبع |
| **ملف التنسيقات المخصص (CSS)** | `/src/index.css` | `alfa-express-theme/assets/css/alfa-theme.css` | `wp_enqueue_style('alfa-custom-css', ...)` | نظام الألوان، تأثيرات الزجاج، الأزرار |
| **صورة معاينة القالب** | `/public/assets/brand/alfa-logo.webp` | `alfa-express-theme/screenshot.png` | ووردبريس يقرؤه تلقائياً من المجلد الرئيسي | معاينة القالب في لوحة تحكم ووردبريس (Appearance -> Themes) |

---

## 2. القواعد القياسية لحل المسارات البرمجية (Path Resolution Standards)

### أ. في قوالب PHP (Templates)
يتم استخدام الدالة الرسمية `get_template_directory_uri()` مع إضافة شرطة مائلة وربط المسار النسبي، مع التغليف بـ `esc_url()`:

```php
<!-- مثال قياسي لاستدعاء صورة الشعار -->
<img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/alfa-logo.webp'); ?>" 
     alt="<?php echo esc_attr(get_bloginfo('name')); ?>" 
     class="alfa-logo-img">

<!-- مثال قياسي لاستدعاء صورة مع معالج بديل (Fallback) -->
<img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/alfa-car.png'); ?>" 
     alt="أسطول ألفا إكسبريس" 
     onerror="this.onerror=null; this.src='<?php echo esc_url(get_template_directory_uri() . '/assets/images/alfa-logo.webp'); ?>';">
```

### ب. في كود JavaScript ومشاهد Three.js (Dynamic JS Resolution)
يتم تمرير عنوان القالب ومساراته عبر دالة `wp_localize_script()` في ملف `functions.php`:

```php
// في functions.php
wp_localize_script('alfa-custom-js', 'alfaThemeConfig', array(
    'ajaxurl'   => admin_url('admin-ajax.php'),
    'phone'     => get_option('alfa_main_phone', '0501653999'),
    'whatsapp'  => get_option('alfa_whatsapp', '966501653999'),
    'homeUrl'   => home_url('/'),
    'themeUrl'  => get_template_directory_uri(),
));
```

ثم قراءته في ملفات الجافاسكريبت مع قيمة احتياطية آمنة:
```javascript
// في alfa-theme.js أو alfa-3d-hero.js
const themeBaseUrl = (window.alfaThemeConfig && window.alfaThemeConfig.themeUrl) 
    ? window.alfaThemeConfig.themeUrl 
    : '';

const logoPath = themeBaseUrl ? themeBaseUrl + '/assets/images/alfa-logo.webp' : '/assets/images/alfa-logo.webp';
```

### ج. في ملفات CSS التنسيقية
تُكتب المسارات نسبةً لمجلد `assets/css/` باستخدام `../images/`:
```css
/* في assets/css/alfa-theme.css */
.alfa-hero-bg-pattern {
    background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0);
    background-size: 24px 24px;
}
```

### د. استراتيجية رسوميات SVG وخريطة المسار
- **الرسوميات التفاعلية المعقدة (خريطة المسار، أيقونات التتبع، النبضات الحية)**: تم تضمينها كـ **Inline SVG** مباشرة داخل القوالب لتمكين التفاعل الديناميكي وتغيير الألوان عبر الـ CSS والـ JavaScript والتكيف التام مع اتجاه RTL دون الحاجة لتحميل ملفات خارجية إضافية أو التعرض لقيود CORS.
- **الشعارات والوسائط الثابتة**: تم توفيرها في مجلد `assets/images/` وتضمينها عبر وسوم `<img>` المعيارية.

---

## 3. أمر البناء والمزامنة الآلية (Automated Build Command)

تم إنشاء أداة بناء معيارية فائقة السرعة لفحص ونقل وتغليف ملفات القالب:

```bash
# تشغيل أداة البناء والمزامنة وتوليد الحزم المضغوطة
npm run build:theme
```

### ماذا تفعل أداة البناء (`scripts/build-wordpress-theme.js`)؟
1. **التحقق من المجلدات**: تتأكد من وجود هيكل المجلدات المستهدف (`assets/images`, `assets/js`, `assets/css`).
2. **المزامنة والتطابق**: تنسخ كافة الصور والأيقونات من `/public/assets/...` إلى داخل مجلد القالب.
3. **التدقيق الهيكلي**: تفحص ملفات القالب الـ 17 الأساسية (`style.css`, `functions.php`, `front-page.php`, قوالب الصفحات الـ 7، قوالب Elementor، ملف المستورد الآلي).
4. **الحزم المعيارية النظيفة**: تنشئ ملفات الأرشيف المضغوطة (`alfa-express-final.zip` و `alfa-express-theme.zip`) مع ضمان أن جذر الأرشيف يبدأ مباشرة بمجلد `alfa-express-theme/` لتفادي خطأ "المجلد المتداخل" الشائع في ووردبريس.

---

## 4. التوافق مع Elementor (Elementor Compatibility)

القالب مجهز بالكامل للعمل بالتزامن مع Elementor من خلال قالبين رئيسيين:
1. `template-elementor-canvas.php`: يعطي صفحة فارغة بالكامل (Full Canvas) خالية من الهيدر والفوتر لتصميم هبوط خاص.
2. `template-elementor-fullwidth.php`: يحتفظ بهيدر وفوتر ألفا إكسبريس الرسمي مع إتاحة كامل مساحة الصفحة لمحرر Elementor.

---

## 5. مصفوفة حل المشكلات (Troubleshooting)

| المشكلة | السبب المحتمل | الحل |
| :--- | :--- | :--- |
| **"The package could not be installed. The theme is missing the style.css stylesheet."** | ضغط المجلدات بشكل متداخل (Nested Folder Zip) | استخدم دائماً حزمة `alfa-express-final.zip` التي يولدها `npm run build:theme` لأنها تبدأ من `alfa-express-theme/style.css` مباشرة. |
| **عدم ظهور الصور بعد نقل الموقع** | استخدام روابط ثابتة `http://localhost/...` | القالب يستخدم `get_template_directory_uri()` بالكامل، مما يجعل كل الصور تعمل تلقائياً على أي نطاق أو مجلد فرعي. |
| **عدم ظهور مجسم 3D Hero في الهيدر** | المتصفح لا يدعم WebGL أو تم حظر الـ Canvas | القالب مزود بنظام Fallback فوري يعرض صورة الأسطول بدقة عالية دون أي توقف للصفحة. |
| **إعادة تعيين القوائم والصفحات بعد التثبيت** | عدم تفعيل الصفحات الـ 7 | افتح لوحة تحكم ووردبريس -> **ألفا إكسبريس** -> اضغط **"استيراد الصفحات والبيانات التجريبية بنقرة واحدة"**. |

---
**جاهز للنشر الفوري كقالب مستقل ووردبريس 100% متكامل وبدون أي متطلبات برمجية خارجية.**
