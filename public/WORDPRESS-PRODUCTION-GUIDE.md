# Alfa Express WordPress Production & Deployment Guide
# شركة الفاء السريع للخدمات اللوجستية (alfaexpressco.com)

## 1. WordPress Environment Compatibility
- **CMS**: WordPress 6.x+ (Fully compatible with Elementor, Beaver Builder, Divi, Block Editor / Gutenberg).
- **PHP Compatibility**: PHP 7.4, 8.0, 8.1, 8.2, 8.3+.
- **Database**: MySQL 5.7+ / MariaDB 10.3+.
- **RTL & Localization**: Full native RTL layout with Cairo & Tajawal Arabic font typography.
- **Tracking URL**: Synced directly with official gateway: `https://alfaexpress-ksa.com/track`.

---

## 2. Ready-to-Install ZIP Packages
All packages are pre-compiled and available in `/public/`:

1. **`alfa-theme-final-v2.zip`** (2.23 MB) - **[RECOMMENDED / المستحسن]**
   - The complete standalone WordPress theme (Version 3.2.0 - Final v2).
   - Includes all latest updates:
     - **حاسبة الشحن بالحجم والمتر المكعب (CBM)**: حساب فوري للمتر المكعب بناءً على أبعاد الشحنة بالسنتيمتر مع تسعيرة الشحن البري وتوليد رسالة واتساب ديناميكية.
     - **إدارة صور وتقييمات العملاء من مخصص القالب (Customizer)**: إمكانية تغيير واختيار صور العملاء والآراء من لوحة تحكم ووردبريس أو ودجت إليمنتور `Alfa_Reviews_Widget`.
     - **التركيز الحصري على الشحن البري**: إزالة الشحن الجوي والبحري وحصر كافة المراحل والخدمات في الشحن البري المباشر بالسطحات والشاحنات المغلقة من الباب للباب.
     - **المستورد التلقائي بنقرة واحدة (1-Click Importer)**: ينشئ الصفحات الـ 7، يستورد الوسائط، ويضبط القوائم تلقائياً.

2. **`alfa-express-final.zip`** (2.23 MB) & **`alfa-express-theme.zip`** (2.23 MB)
   - حزم بديلة متطابقة بصيغ تسمية معيارية للتحميل السريع.

---

## 3. How to Import All Assets to WordPress (One-Click)

### Step 1: Install the Plugin
1. In your WordPress Admin Dashboard, navigate to **Plugins (إضافات) > Add New Plugin (أضف إضافة جديدة)**.
2. Click **Upload Plugin (رفع إضافة)** and select `alfa-express-core.zip`.
3. Click **Install Now** and then **Activate Plugin (تفعيل الإضافة)**.

### Step 2: Run the One-Click Asset Importer
1. Click the new menu item in the left sidebar: **ألفا إكسبريس (Alfa Express)**.
2. Under the section **"استيراد جميع الأصول والوسائط إلى ووردبريس"**, click the red button:
   **"استيراد جميع الأصول إلى ووردبريس الآن (بنقرة واحدة)"**.
3. The plugin will automatically:
   - Copy and register `Alfa-Logo.webp` into the WordPress Media Library (`wp-content/uploads/`) with Arabic alt text.
   - Set the company logo as the active WordPress site logo (`custom_logo`).
   - Import the logistics fleet photo (`alfa-car.png`).
   - Import all 6 verified Google Review customer screenshots.
   - Inject the 8 verified branch locations and default options into `wp_options`.

---

## 4. Shortcode Usage in Elementor / Gutenberg
- `[alfa_3d_hero]`: Embeds the interactive 3D hero scene with mouse parallax and floating container cargo.
- `[alfa_branches_grid]`: Renders a responsive grid of the 8 Saudi branches with one-tap phone and WhatsApp buttons.

---

## 5. SEO & Structured Data (Production Ready)
- Complete `LogisticsService`, `LocalBusiness`, and `FAQPage` JSON-LD schema injected in `wp_head`.
- Production `robots.txt` in `/public/robots.txt` allowing search crawlers while safeguarding `/wp-admin/`.
- OpenGraph meta tags configured for high-CTR social previews on WhatsApp, Twitter, and Facebook.
