/**
 * @file types.ts
 * @project Alfa Express Logistics Platform
 * @author Jenova Media (https://jenova.media)
 * @description Core TypeScript type definitions and interfaces for the Alfa Express platform.
 * Covers branch networks, land freight services, workflow milestones, customer testimonials,
 * volumetric calculations, and master company configuration schemas.
 */

/**
 * Represents a verified logistics branch hub in Saudi Arabia.
 */
export interface Branch {
  /** Unique branch identifier (e.g. 'faisaliyah', 'riyadh-aziziyah') */
  id: string;
  /** Saudi city location of the hub */
  city: 'جدة' | 'مكة المكرمة' | 'الرياض';
  /** Display name of the branch in Arabic */
  name: string;
  /** Direct telephone number formatted for dialing (tel: protocol) */
  phone: string;
  /** International WhatsApp telephone number with country code */
  whatsapp: string;
  /** Full street and neighborhood address description */
  address: string;
  /** Embedded interactive map or coordinates URL */
  mapUrl: string;
  /** Direct link to Google Maps location */
  googleMapsUrl?: string;
  /** Flag indicating if this hub is the regional headquarters */
  isMain?: boolean;
}

/**
 * Represents an overland freight service offering.
 */
export interface ServiceItem {
  /** Unique identifier for the service */
  id: string;
  /** Service title in Arabic */
  title: string;
  /** Short punchy tagline describing the service */
  subtitle: string;
  /** Detailed multi-sentence description of the service scope */
  description: string;
  /** Lucide icon identifier key */
  iconName: string;
  /** Visual badge label (e.g. 'الأكثر طلباً', 'تغليف هيدروليكي') */
  badge: string;
  /** Key bullet points highlighting service features and guarantees */
  highlights: string[];
}

/**
 * Represents a single milestone in the 8-step land shipping workflow.
 */
export interface ProcessStep {
  /** Sequential stage number (1 through 8) */
  step: number;
  /** Milestone title in Arabic */
  title: string;
  /** Detailed explanation of what happens during this stage */
  description: string;
  /** Lucide icon identifier key */
  iconName: string;
  /** Expected transit or operational duration for this stage */
  duration?: string;
}

/**
 * Represents a verified customer testimonial screenshot and metadata.
 */
export interface CustomerReview {
  /** Unique review identifier */
  id: string;
  /** Path or URL to the verified Google Review screenshot image */
  image: string;
  /** Caption or summary of the customer's feedback */
  caption: string;
  /** Verification badge label (e.g. 'تقييم موثق من خرائط Google') */
  verifiedBadge: string;
}

/**
 * Represents an entry in the logistical FAQ knowledge base.
 */
export interface FAQItem {
  /** Optional unique identifier */
  id?: string;
  /** Frequent question asked by customers in Arabic */
  question: string;
  /** Authoritative logistics answer provided by Alfa Express */
  answer: string;
  /** Logistical categorization for tab filtering */
  category?: string;
}

/**
 * Represents an article in the logistics blog and shipping guides archive.
 */
export interface BlogPost {
  /** Unique post identifier */
  id: string;
  /** Post headline */
  title: string;
  /** Concise summary excerpt */
  excerpt: string;
  /** Full HTML or rich markdown content */
  content?: string;
  /** Classification category (e.g. 'إجراءات الجمارك', 'نصائح التغليف') */
  category: string;
  /** Publication date string */
  date: string;
  /** Approximate reading time (e.g. '4 دقائق') */
  readTime: string;
  /** URL slug identifier */
  slug: string;
  /** Author name or credit */
  author?: string;
  /** Topical tags for filtering */
  tags?: string[];
  /** Featured image URL */
  imageUrl?: string;
}

/**
 * Master configuration schema for corporate branding, telephone endpoints,
 * pricing parameters, and typographic controls.
 */
export interface CompanyConfig {
  /** Brand trading name */
  name: string;
  /** Official registered legal corporate name */
  legalName: string;
  /** Primary marketing slogan */
  tagline: string;
  /** Secondary value proposition */
  subTagline: string;
  /** Introductory pricing offer label */
  heroOffer: string;
  /** Central customer service phone line */
  mainPhone: string;
  /** Unified WhatsApp business number */
  whatsappNumber: string;
  /** Central headquarters address in Saudi Arabia */
  mainAddress: string;
  /** Unified tracking portal endpoint */
  trackingUrl: string;
  /** Verified years of operational market experience */
  yearsExperience: number;
  /** Total count of active operating branches in the Kingdom */
  branchesCount: number;
  /** Minimum baseline consignment price in Saudi Riyals */
  startingPriceSar: number;
  /** Dynamic typography scale options */
  heroFontSize?: 'sm' | 'base' | 'lg' | 'xl';
  bodyFontSize?: 'sm' | 'base' | 'lg';
  heroHeadingSize?: 'normal' | 'large' | 'huge';
  /** Custom section heading overrides */
  faqTitle?: string;
  faqSubtitle?: string;
  servicesTitle?: string;
  servicesSubtitle?: string;
  heroCtaText?: string;
}
