# Alfa Express Logistics - Technical Reference & System Documentation

> **Lead Architecture & Engineering:** Jenova Media ([jenova.media](https://jenova.media))  
> **Documentation Version:** 5.8.0  
> **Last Updated:** October 2026  
> **Target Audience:** Frontend Engineers, WordPress Developers, System Administrators

---

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Dual-Delivery Model](#2-dual-delivery-model)
3. [React Frontend Specification](#3-react-frontend-specification)
   - [State Management & Contexts](#31-state-management--contexts)
   - [Component Hierarchy](#32-component-hierarchy)
   - [Volumetric CBM Calculator Formula](#33-volumetric-cbm-calculator-formula)
4. [WordPress Standalone Theme Specification (`alfaExpressV5.8`)](#4-wordpress-standalone-theme-specification)
   - [File & Template Structure](#41-file--template-structure)
   - [Theme Customizer Schema & wp_options](#42-theme-customizer-schema--wp_options)
   - [Fallback Routing Mechanism](#43-fallback-routing-mechanism)
   - [Elementor Compatibility & Custom Widgets](#44-elementor-compatibility--custom-widgets)
   - [RTL & Dark/Light Theme Switching Engine](#45-rtl--darklight-theme-switching-engine)
5. [Logistics Business Logic & Data Schemas](#5-logistics-business-logic--data-schemas)
   - [Branch Model](#51-branch-model)
   - [Services Model](#52-services-model)
   - [Tracking Gateway Integration](#53-tracking-gateway-integration)
6. [Build, Packaging & CI Pipeline](#6-build-packaging--ci-pipeline)
7. [Security & Performance Checklist](#7-security--performance-checklist)

---

## 1. Architecture Overview

Alfa Express Logistics is designed by **Jenova Media** to provide dual storefront capabilities:
- **Interactive Web Application (React SPA)** for high-conversion web experiences, real-time calculation, and dynamic user interfaces.
- **Production WordPress Theme (`alfaExpressV5.8`)** allowing non-technical merchants and content editors to manage pages, customize branding, configure branches, and publish articles through the WordPress Customizer and Elementor page builder.

```
+---------------------------------------------------------------------------------+
|                                 JENOVA MEDIA                                    |
|                       Enterprise Logistics Solution                             |
+---------------------------------------------------------------------------------+
          |                                                               |
          v                                                               v
+------------------------------------+          +------------------------------------+
|             REACT SPA              |          |       WORDPRESS STANDALONE THEME   |
| (Vite + TypeScript + Tailwind CSS) |          |      (alfaExpressV5.8 + Elementor)  |
+------------------------------------+          +------------------------------------+
| - Instant CBM Volumetric Calculator|          | - Zero 3rd-party Theme Dependency  |
| - Interactive Saudi-Egypt Route Map|          | - 7 Dedicated Native Templates     |
| - Real-time Dark/Light Mode Engine |          | - Customizer Color & Content API   |
| - Interactive 3D Hero Container    |          | - 1-Click Page Generator           |
| - WhatsApp Quote Dispatcher        |          | - Intelligent URL Fallback Engine  |
+------------------------------------+          +------------------------------------+
```

---

## 2. Dual-Delivery Model

To guarantee maximum versatility for the client:
1. **The React SPA** serves as a modern web portal that can be hosted on edge CDNs (Vercel, Netlify, Cloudflare Pages, AWS CloudFront, or Google Cloud Run).
2. **The WordPress Package** (`public/alfaExpressV5.8.zip`) contains a 100% self-sufficient WordPress theme that mirrors the React SPA pixel-for-pixel, complete with native PHP templates, localized strings, and Elementor widget bindings.

---

## 3. React Frontend Specification

### 3.1 State Management & Contexts

The application utilizes React Context and localized component hooks for predictable state flow:

- **`ThemeContext` (`src/context/ThemeContext.tsx`)**:
  - Manages `'dark' | 'light'` theme state.
  - Synchronizes with `document.documentElement` class list (`light` / `dark`) and attribute `data-theme`.
  - Persists preference in `localStorage.getItem('alfa_theme')`.
  - Emits custom event `alfa_theme_change` for third-party scripts or embedded canvas elements.

- **Active Navigation & Modals (`src/App.tsx`)**:
  - Controls modal states for `isQuoteOpen`, `isTrackingOpen`, `isSettingsOpen`, `isCallModalOpen`.
  - Tracks navigation path (`currentRoute`: `'home' | 'quote' | 'tracking' | 'services' | 'branches' | 'faq' | 'blog'`).

### 3.2 Component Hierarchy

```
<App>
  ├── <Navbar>                     # Sticky navigation, logo, desktop links, theme toggle, CTAs
  ├── <MobileDrawer>               # Responsive overlay menu with quick touch targets
  ├── <Routes / Page Switcher>
  │     ├── <HomePage>
  │     │     ├── <HeroSection>             # Primary heading, CTA buttons, trust badges
  │     │     │     └── <Hero3DContainer>   # 3D interactive container & particle effects
  │     │     ├── <TrustStats>              # Key metrics (15+ years, 50,000+ tons, 99.4% rate)
  │     │     ├── <AboutSection>            # Company heritage & Saudi-Egypt specialization
  │     │     ├── <SaudiEgyptMap>           # Interactive SVG Overland route with city popups
  │     │     ├── <ServicesSection>         # 6 core land freight services
  │     │     ├── <HowItWorksSection>       # 8-step shipping workflow
  │     │     ├── <TrackingTeaser>          # Direct tracking input card
  │     │     ├── <ReviewsSection>          # Verified Google customer review screenshot cards
  │     │     ├── <BranchesSection>         # 8 Saudi branches with telephone and WhatsApp links
  │     │     ├── <QuoteSection>            # Volumetric CBM calculator with live formula
  │     │     ├── <FaqSection>              # 12 logistical FAQs with accordion tabs
  │     │     └── <BlogSection>             # Recent shipping guides & custom clearance articles
  │     ├── <QuotePage>                     # Standalone quote page
  │     ├── <TrackingPage>                  # Standalone tracking gateway page
  │     ├── <ServicesPage>                  # Full services catalog
  │     ├── <BranchesPage>                  # Detailed branch directory
  │     ├── <FaqPage>                       # Searchable FAQ archive
  │     └── <BlogPage>                      # Blog articles archive
  ├── <Footer>                     # Legal notice, contact information, credentials
  ├── <MobileStickyBar>            # Bottom fixed action dock (Call, WhatsApp, Quote)
  └── <Modals>
        ├── <WordPressSettingsModal>        # Theme download modal & setup instructions
        └── <TrackingModal>                 # In-modal tracking interface
```

### 3.3 Volumetric CBM Calculator Formula

Land freight across Saudi Arabia and Egypt operates on volumetric pricing (Cubic Meters / CBM) rather than raw deadweight, because vehicle capacity is volumetric:

$$\text{CBM} = \frac{\text{Length (cm)} \times \text{Width (cm)} \times \text{Height (cm)} \times \text{Quantity}}{1,000,000}$$

#### Estimation Matrix:
- **Base Rate per CBM**: 250 - 350 SAR (standard household & boxed cargo).
- **Minimum Consignment Charge**: 150 SAR.
- **Estimated Transit Duration**: 4 - 7 business days from warehouse dispatch to Egyptian border clearance.

#### WhatsApp Formatting Engine:
Upon form calculation, the user can click **"تأكيد وحجز موعد استلام عبر واتساب"** (Confirm via WhatsApp). The application generates a pre-formatted, URL-encoded Arabic template:
```text
السلام عليكم ورحمة الله وبركاته
أود تأكيد طلب تسعيرة شحن بري بالحجم (CBM) - ألفا إكسبريس:

👤 الاسم: [اسم العميل]
📞 الجوال: [رقم الجوال]
📦 نوع الشحنة: [نوع المنقولات]
📍 من: [المدينة بالسعودية]
🏁 إلى: [المحافظة بمصر]
📐 الأبعاد: L x W x H سم (العدد: N)
📊 الحجم الإجمالي: X.XX متر مكعب (CBM)
💰 التكلفة المقدرة: ~Y ريال سعودي

يرجى تأكيد الحجز وتحديد موعد المعاينة والاستلام من الباب.
```

---

## 4. WordPress Standalone Theme Specification (`alfaExpressV5.8`)

### 4.1 File & Template Structure

The theme is located in `public/wordpress-package/alfa-express-theme/` and packaged into `public/alfaExpressV5.8.zip`.

```text
alfa-express-theme/
├── 404.php                           # Custom 404 error page with quick search and navigation
├── archive.php                       # Taxonomy and blog archive template
├── footer.php                        # Site footer, quick actions, mobile sticky dock
├── front-page.php                    # Full landing page template matching React SPA
├── functions.php                     # Theme setup, customizer schema, fallback routing, asset enqueues
├── header.php                        # HTML head, dynamic scroll bar, desktop/mobile navigation
├── index.php                         # Fallback blog loop template
├── page.php                          # Default standard page wrapper
├── page-blog.php                     # Template Name: المدونة اللوجستية (Blog Archive)
├── page-branches.php                 # Template Name: فروعنا بالمملكة (Branches Directory)
├── page-faq.php                      # Template Name: الأسئلة الشائعة (FAQ Knowledge Base)
├── page-quote.php                    # Template Name: طلب عرض سعر (Quote & CBM Calculator)
├── page-services.php                 # Template Name: خدمات الشحن البري (Services Catalog)
├── page-tracking.php                 # Template Name: تتبع الشحنة (Shipment Tracking)
├── screenshot.png                    # Theme preview card for WordPress admin
├── single.php                        # Individual post and article template
├── style.css                         # Primary stylesheet with metadata header & RTL rules
├── template-elementor-canvas.php     # Elementor blank canvas template
├── template-elementor-fullwidth.php  # Elementor full-width template with header/footer
├── assets/
│   ├── css/alfa-theme.css            # Scoped design system and responsive styles
│   ├── js/alfa-theme.js              # Theme interactivity, CBM calculation, theme switcher
│   └── images/                       # Bundled brand assets, fleet pictures, and review graphics
└── inc/
    ├── customizer.php                # WordPress Customizer controls and sanitization
    └── elementor-calculator-widget.php # Native Elementor widget definition
```

### 4.2 Theme Customizer Schema & wp_options

Merchants can configure critical business data directly from `WordPress Admin > Appearance > Customize`:

| Option Key | Default Value | Description |
| :--- | :--- | :--- |
| `alfa_whatsapp` | `966501653999` | Primary WhatsApp contact number (international format) |
| `alfa_main_phone` | `0501653999` | Primary telephone line displayed in header & contact badges |
| `alfa_legal_name` | `شركة الفاء السريع للخدمات اللوجستية` | Official registered corporate entity name |
| `alfa_hero_title` | `أسرع شحن بري من الباب للباب` | Hero section main headline |
| `alfa_hero_subtitle`| `أسطول شاحنات مبطنة لنقل العفش...` | Hero section descriptive subtitle |
| `alfa_cbm_rate` | `280` | Default price per Cubic Meter (SAR/CBM) |
| `alfa_min_charge` | `150` | Minimum consignment fee (SAR) |
| `alfa_tracking_url` | `https://alfaexpress-ksa.com/track` | Live tracking gateway destination |

### 4.3 Fallback Routing Mechanism

To guarantee that visitors never hit a 404 error even before a webmaster creates pages in the WordPress admin panel, `functions.php` registers an intelligent template filter:

```php
function alfa_template_routing_fallback($template) {
    if (is_404()) {
        $req_uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
        $path = trim(parse_url($req_uri, PHP_URL_PATH), '/');
        
        $routes = array(
            'quote'    => 'page-quote.php',
            'tracking' => 'page-tracking.php',
            'services' => 'page-services.php',
            'branches' => 'page-branches.php',
            'faq'      => 'page-faq.php',
            'blog'     => 'page-blog.php',
        );

        foreach ($routes as $slug => $file) {
            if ($path === $slug || substr($path, -strlen('/' . $slug)) === '/' . $slug) {
                $target = get_template_directory() . '/' . $file;
                if (file_exists($target)) {
                    global $wp_query;
                    if ($wp_query) {
                        $wp_query->is_404 = false;
                        status_header(200);
                    }
                    return $target;
                }
            }
        }
    }
    return $template;
}
add_filter('template_include', 'alfa_template_routing_fallback', 99);
```

### 4.4 Elementor Compatibility & Custom Widgets

- **Detection**: Every template checks if the current post was constructed with Elementor using:
  ```php
  if ( class_exists( '\Elementor\Plugin' ) && \Elementor\Plugin::$instance->db->is_built_with_elementor( get_the_ID() ) ) {
      // Direct rendering of Elementor content
  }
  ```
- **Custom Widget**: `Alfa_Calculator_Widget` is registered in `inc/elementor-calculator-widget.php`, giving Elementor users drag-and-drop access to the live CBM calculator with customizable colors, default CBM rates, and WhatsApp destination.
- **Shortcodes**:
  - `[alfa_cbm_calculator rate="280" min="150"]`: Embeds the standalone calculator into any Gutenberg block, sidebar, or Elementor text widget.
  - `[alfa_branches_grid]`: Renders the responsive 8-branch card matrix.

### 4.5 RTL & Dark/Light Theme Switching Engine

- **Flicker-Free Initialization**: Injected in `header.php` before stylesheet rendering:
  ```javascript
  (function() {
      try {
          var saved = localStorage.getItem('alfa_theme');
          if (saved === 'light') {
              document.documentElement.setAttribute('data-theme', 'light');
              document.documentElement.classList.add('light');
          } else {
              document.documentElement.setAttribute('data-theme', 'dark');
              document.documentElement.classList.remove('light');
          }
      } catch(e) {}
  })();
  ```
- **CSS Architecture**: Scoped design tokens using CSS Custom Properties:
  - Dark mode root variables: `--alfa-bg-dark: #070d1d;`, `--alfa-bg-card: #0b1429;`
  - Light mode overrides: `[data-theme="light"] { --alfa-bg-dark: #f8fafc; --alfa-bg-card: #ffffff; }`

---

## 5. Logistics Business Logic & Data Schemas

### 5.1 Branch Model (`src/types.ts`)
```typescript
export interface Branch {
  id: string;
  city: 'جدة' | 'مكة المكرمة' | 'الرياض';
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapUrl: string;
  googleMapsUrl?: string;
  isMain?: boolean;
}
```

### 5.2 Services Model
Core specialized overland services:
1. **شحن العفش والأثاث المنزلي (Household & Furniture Freight)**: Comprehensive disassembly, protective bubble wrapping, wooden crating for TVs, and destination reassembly.
2. **شحن البضائع والطرود التجارية (Commercial Cargo & Consignments)**: Scheduled truck trips with commercial invoice verification and border manifest declarations.
3. **التغليف الاحترافي والصناديق الخشبية (Custom Wooden Crating)**: Shock-absorbing crates designed specifically for flat-screen televisions, glassware, and electronics.
4. **التخليص الجمركي بميناء ضبا وسفاجا (Customs Clearance)**: Expedited clearance through Saudi land/sea customs ports to Egypt.
5. **التوصيل لباب الشقة في مصر (Last-Mile Egyptian Delivery)**: Fleet delivery covering Cairo, Giza, Alexandria, Delta governorates, and Upper Egypt.
6. **تخزين المستودعات المؤقت (Secure Staging Warehousing)**: Free interim storage in Jeddah and Riyadh hubs prior to scheduled overland departure.

### 5.3 Tracking Gateway Integration
Shipment tracking directs users to the unified logistics gateway:
- **URL Pattern**: `https://alfaexpress-ksa.com/track?tracking_no={TRACKING_NUMBER}`
- Validated with prefix check or direct submission.

---

## 6. Build, Packaging & CI Pipeline

The project includes an automated Python build script that synchronizes changes and packages the release archives:

```bash
# To trigger a package rebuild:
python3 -c "
import os, shutil, zipfile
src = 'public/wordpress-package/alfa-express-theme'
# Build public/alfaExpressV5.8.zip
with zipfile.ZipFile('public/alfaExpressV5.8.zip', 'w', zipfile.ZIP_DEFLATED) as zf:
    for r, d, files in os.walk(src):
        for f in files:
            p = os.path.join(r, f)
            zf.write(p, os.path.join('alfa-express-theme', os.path.relpath(p, src)))
"
```

---

## 7. Security & Performance Checklist

- [x] **No Inline Evaluated Scripts**: Clean separation between templates and DOM logic.
- [x] **Input Sanitization**: All `$_GET` and form inputs run through `sanitize_text_field()` and `wp_unslash()`.
- [x] **Strict Escape Output**: All template variables passed via `esc_html()`, `esc_url()`, and `esc_attr()`.
- [x] **Responsive Images**: WebP format with native lazy loading for beneath-the-fold media.
- [x] **No Global Selector Pollution**: All CSS classes strictly prefixed with `.alfa-` to prevent collisions with third-party plugins.
- [x] **Zero Tracking or Telemetry**: No third-party analytics scripts injected without customer authorization.

---

*Engineered with precision by Jenova Media. For technical inquiries, reach out to `dev@jenova.media`.*
