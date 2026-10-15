# Alfa Express Logistics | ألفا إكسبريس للشحن البري الدولي

> **Developed by Jenova Media** ([jenova.media](https://jenova.media))  
> **Client:** Alfa Express Logistics (شركة الفاء السريع للخدمات اللوجستية - [alfaexpressco.com](https://alfaexpressco.com))  
> **Specialization:** Cross-Border Land Freight (Saudi Arabia ⇄ Egypt)  
> **Theme Package:** `alfaExpressV5.8` (Standalone WordPress Theme & Elementor Ready)

---

## 🌟 Executive Summary

**Alfa Express Logistics** is a production-grade, dual-architecture enterprise platform engineered by **Jenova Media**. It represents a next-generation logistics web experience for cross-border shipping between Saudi Arabia and Egypt.

The project features a **two-in-one delivery model**:
1. **High-Performance React SPA**: An interactive, responsive web application built with React, Vite, TypeScript, and Tailwind CSS. It features a real-time CBM (Cubic Meter) freight calculator, interactive 3D hero container, animated Saudi-Egypt route map, dark/light theme switching, and live shipment tracking integration.
2. **Standalone WordPress Theme (`alfaExpressV5.8`)**: A native Online Store 2.0 / Elementor-compatible theme with zero external dependencies (no Hello Elementor or third-party framework required). It includes customizer controls, automated one-click demo page creation, schema structured data, responsive mobile navigation, and complete RTL typography.

---

## 🚀 Key Features & Capabilities

- **Interactive Land Freight CBM Calculator**:
  - Live calculation based on cargo dimensions: $\text{Length (cm)} \times \text{Width (cm)} \times \text{Height (cm)} \times \text{Quantity} \div 1,000,000$.
  - Instant pricing estimation based on volumetric tiers, minimum rates, and estimated delivery days.
  - One-click WhatsApp quotation dispatch with pre-filled cargo details and customer information.
- **Interactive Saudi-to-Egypt Logistics Route Map**:
  - Visual overland route highlighting origin hubs in Saudi Arabia (Jeddah, Makkah, Riyadh, Dammam, Tabuk), border crossings (Duba Port / Nuweiba), and Egyptian delivery hubs (Cairo, Giza, Alexandria, Delta, Upper Egypt).
- **Dual Theme System (Light / Dark Mode)**:
  - Zero-flicker theme toggle with `localStorage` persistence and full contrast optimization.
- **Comprehensive Branch Network (8 Official Saudi Hubs)**:
  - 5 Jeddah hubs (Al-Faisaliyah, Al-Bawadi, Al-Salamah, Al-Sharafiyah, Al-Rabwah).
  - Makkah Al-Mukarramah hub (Al-Shawqiyyah / Al-Rusaifah).
  - 2 Riyadh hubs (Al-Aziziyah, Al-Malaz).
  - Integrated direct call (`tel:`) and branch-specific WhatsApp links.
- **Shipment Tracking Engine**:
  - Direct integration with Alfa Express unified tracking gateway (`https://alfaexpress-ksa.com/track`).
- **Comprehensive Knowledge Base & FAQ**:
  - 12 in-depth Q&A entries covering packaging, door-to-door delivery, customs clearance, transit times, and vehicle fleet guarantees.
- **Verified Customer Testimonials**:
  - Visual gallery of authenticated Google Reviews with verified customer proof.

---

## 📂 Repository Architecture

```text
├── public/                               # Public assets & WordPress release archives
│   ├── alfaExpressV5.8.zip               # Current stable WordPress standalone theme (v5.8.0)
│   ├── alfa-express-theme.zip            # Standard naming theme archive
│   ├── assets/                           # High-resolution web assets (brand, fleet, reviews)
│   ├── WORDPRESS-PRODUCTION-GUIDE.md    # WordPress deployment and setup instructions
│   └── wordpress-package/                # WordPress theme source and child directories
│       ├── alfa-express-theme/           # Master standalone theme source (PHP / CSS / JS)
│       │   ├── style.css                 # Theme metadata and core RTL stylesheet
│       │   ├── functions.php             # Customizer, hooks, fallback routing, auto-setup
│       │   ├── header.php                # Responsive header, dark/light switch, navigation
│       │   ├── front-page.php            # Modular landing page layout
│       │   ├── page-quote.php            # Dedicated CBM quote calculator template
│       │   ├── page-tracking.php         # Dedicated shipment tracking template
│       │   ├── page-services.php         # Complete services catalog template
│       │   ├── page-branches.php         # 8 branch directory with interactive maps
│       │   ├── page-faq.php              # Comprehensive FAQ accordion template
│       │   ├── page-blog.php             # Logistics blog and guide articles
│       │   ├── footer.php                # Site footer, quick links, mobile dock bar
│       │   ├── assets/                   # Theme JS, CSS, and media bundles
│       │   └── inc/                      # Elementor widget extensions & shortcodes
│       └── alfa-express-core/            # Companion WordPress plugin for 1-click media import
├── src/                                  # React SPA source code
│   ├── App.tsx                           # Root application component & client routing
│   ├── main.tsx                          # React DOM entry point
│   ├── index.css                         # Global CSS & Tailwind imports
│   ├── types.ts                          # Comprehensive TypeScript interfaces & types
│   ├── components/
│   │   ├── 3d/                           # Interactive 3D hero visualization
│   │   ├── common/                       # Shared UI badges, buttons, cards
│   │   ├── home/                         # Landing page sections (Hero, Quote, Map, etc.)
│   │   ├── layout/                       # Navbar, Footer, Mobile Drawer, Theme Switcher
│   │   └── modals/                       # Theme export modal, tracking modal, call dialog
│   ├── context/                          # React context providers (ThemeContext)
│   ├── data/                             # Master company data, branches, reviews, FAQs
│   └── pages/                            # Dedicated React route pages (Quote, Tracking, etc.)
├── DOCUMENTATION.md                      # Detailed technical manual and API reference
├── JENOVA-MEDIA-GUIDE.md                 # Jenova Media developer and client handoff guide
├── package.json                          # Node dependencies and build scripts
└── vite.config.ts                        # Vite bundler configuration
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Styling & Design System** | Tailwind CSS, CSS Custom Properties, Native RTL Direction |
| **Typography** | Cairo (Arabic Primary), Tajawal (Accents), Inter (Numbers & En) |
| **Icons & Media** | Lucide React, Optimized WebP/PNG Assets |
| **WordPress Engine** | WordPress 6.x+, PHP 7.4 - 8.3+, Native Customizer API, Elementor Widget API |
| **SEO & OpenGraph** | JSON-LD Structured Data (`LogisticsService`, `LocalBusiness`), OpenGraph Meta |
| **Package Builder** | Custom Python3 `zipfile` packaging pipeline |

---

## 💻 Development & Local Setup

### Prerequisites
- Node.js (v18.x or later)
- npm or yarn

### Installation
```bash
# Clone the repository and navigate into the directory
cd alfa-express-logistics

# Install project dependencies
npm install

# Start the Vite development server (Port 3000)
npm run dev
```

### Production Build
```bash
# Compile and optimize production bundle
npm run build

# Run TypeScript linter
npm run lint
```

---

## 📦 WordPress Theme Installation (`alfaExpressV5.8`)

1. **Download the Package**:
   - Access the archive at `/alfaExpressV5.8.zip` or download directly via the in-app WordPress Settings modal.
2. **Upload to WordPress**:
   - Navigate to `WordPress Admin > Appearance > Themes > Add New > Upload Theme`.
   - Select `alfaExpressV5.8.zip` and click **Install Now**.
   - Click **Activate**.
3. **One-Click Automated Setup**:
   - Upon activation, the theme automatically registers all 7 default pages (`/quote`, `/tracking`, `/services`, `/branches`, `/faq`, `/blog`) and sets up fallback routing.
   - You can edit any page with **Elementor** or customize options via `Appearance > Customize`.

---

## 🛡️ License & Credits

- **Engineered & Designed by:** [Jenova Media](https://jenova.media)
- **Copyright:** &copy; 2026 Jenova Media. All Rights Reserved.
- **Client Organization:** Alfa Express Logistics (شركة الفاء السريع للخدمات اللوجستية).
