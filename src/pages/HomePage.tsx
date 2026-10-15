import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStats } from '../components/home/TrustStats';
import { AboutSection } from '../components/home/AboutSection';
import { SaudiEgyptMap } from '../components/home/SaudiEgyptMap';
import { ServicesSection } from '../components/home/ServicesSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { TrackingTeaser } from '../components/home/TrackingTeaser';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { FaqSection } from '../components/home/FaqSection';
import { BranchesSection } from '../components/home/BranchesSection';
import { QuoteSection } from '../components/home/QuoteSection';
import { BlogSection } from '../components/home/BlogSection';
import { CompanyConfig } from '../types';

interface HomePageProps {
  config: CompanyConfig;
  onOpenTrack: () => void;
  onOpenQuote: () => void;
  onSelectServiceForQuote: (serviceTitle: string) => void;
  selectedQuoteService: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  config,
  onOpenTrack,
  onOpenQuote,
  onSelectServiceForQuote,
  selectedQuoteService,
}) => {
  return (
    <main>
      {/* 1. Hero Section with 3D Parallax Experience */}
      <HeroSection
        config={config}
        onOpenTrack={onOpenTrack}
        onOpenQuote={onOpenQuote}
      />

      {/* 2. Official Trust & Experience Stats */}
      <TrustStats config={config} />

      {/* 3. About Company & Guarantee */}
      <AboutSection config={config} onOpenQuote={onOpenQuote} />

      {/* 4. Interactive Route Map (Saudi Arabia to Egypt) */}
      <SaudiEgyptMap onOpenQuote={onOpenQuote} />

      {/* 5. Verified Logistics Services */}
      <ServicesSection onSelectServiceForQuote={onSelectServiceForQuote} />

      {/* 6. Step-by-Step Shipping Process */}
      <HowItWorksSection onOpenQuote={onOpenQuote} />

      {/* 7. Tracking Teaser & Live Verification */}
      <TrackingTeaser config={config} />

      {/* 8. Verified Customer Reviews & WhatsApp Screenshots */}
      <ReviewsSection />

      {/* 9. 8 Verified Branches across Jeddah, Makkah, and Riyadh */}
      <BranchesSection />

      {/* 10. Dedicated Quote Calculator & WhatsApp Instant Dispatch */}
      <QuoteSection
        config={config}
        defaultService={selectedQuoteService}
      />

      {/* 11. Frequently Asked Questions Preview */}
      <FaqSection />

      {/* 12. Logistics Guides & Blog Preview */}
      <BlogSection />
    </main>
  );
};
