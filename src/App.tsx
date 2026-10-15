/**
 * @file App.tsx
 * @project Alfa Express Logistics Web Application
 * @author Jenova Media (https://jenova.media)
 * @description Root application component orchestrating the client-side router,
 * global modals (shipment tracking, WordPress package export), dynamic navigation,
 * and responsive layout chrome (Navbar, Footer, Mobile Dock).
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StickyMobileBar } from './components/layout/StickyMobileBar';
import { ScrollProgressTracker } from './components/common/ScrollProgressTracker';
import { InteractiveScrollControls } from './components/common/InteractiveScrollControls';
import { ScrollToTop } from './components/common/ScrollToTop';
import { TrackingModal } from './components/modals/TrackingModal';
import { WordPressSettingsModal } from './components/modals/WordPressSettingsModal';

// Pages
import { HomePage } from './pages/HomePage';
import { FaqPage } from './pages/FaqPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ServicesPage } from './pages/ServicesPage';
import { BranchesPage } from './pages/BranchesPage';
import { TrackingPage } from './pages/TrackingPage';
import { QuotePage } from './pages/QuotePage';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { initialCompanyConfig } from './data/companyData';
import { CompanyConfig } from './types';

function AppContent() {
  const [config, setConfig] = useState<CompanyConfig>(initialCompanyConfig);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [quoteServiceSelected, setQuoteServiceSelected] = useState<string>('');
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleOpenQuote = () => {
    navigate('/quote');
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setQuoteServiceSelected(serviceTitle);
    navigate('/quote');
  };

  return (
    <div className={`min-h-screen font-['Cairo',sans-serif] selection:bg-[#E30613] selection:text-white relative flex flex-col justify-between transition-colors duration-200 ${
      theme === 'light' ? 'bg-[#f8fafc] text-slate-800' : 'bg-[#070d1d] text-slate-100'
    }`}>
      {/* Dynamic Scroll Progress Bar & Milestone Tracker */}
      <ScrollProgressTracker />

      {/* Floating Back to Top Button */}
      <InteractiveScrollControls />

      {/* Scroll to Top On Route Navigation */}
      <ScrollToTop />

      {/* Global Multi-Page Header & Navigation */}
      <Navbar
        config={config}
        onOpenTrack={() => setTrackingModalOpen(true)}
        onOpenQuote={handleOpenQuote}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                config={config}
                onOpenTrack={() => setTrackingModalOpen(true)}
                onOpenQuote={handleOpenQuote}
                onSelectServiceForQuote={handleSelectServiceForQuote}
                selectedQuoteService={quoteServiceSelected}
              />
            }
          />
          <Route
            path="/faq"
            element={
              <FaqPage
                config={config}
                onOpenTrack={() => setTrackingModalOpen(true)}
              />
            }
          />
          <Route
            path="/blog"
            element={<BlogPage config={config} />}
          />
          <Route
            path="/blog/:slug"
            element={
              <BlogPostPage
                config={config}
                onOpenQuote={handleOpenQuote}
              />
            }
          />
          <Route
            path="/services"
            element={
              <ServicesPage
                config={config}
                onSelectServiceForQuote={handleSelectServiceForQuote}
              />
            }
          />
          <Route
            path="/branches"
            element={<BranchesPage config={config} />}
          />
          <Route
            path="/tracking"
            element={<TrackingPage config={config} />}
          />
          <Route
            path="/quote"
            element={
              <QuotePage
                config={config}
                selectedQuoteService={quoteServiceSelected}
              />
            }
          />
          {/* Fallback route */}
          <Route
            path="*"
            element={
              <HomePage
                config={config}
                onOpenTrack={() => setTrackingModalOpen(true)}
                onOpenQuote={handleOpenQuote}
                onSelectServiceForQuote={handleSelectServiceForQuote}
                selectedQuoteService={quoteServiceSelected}
              />
            }
          />
        </Routes>
      </div>

      {/* Premium Footer */}
      <Footer
        config={config}
        onOpenTrack={() => setTrackingModalOpen(true)}
        onOpenQuote={handleOpenQuote}
      />

      {/* Mobile Sticky Conversion Dock (WhatsApp & Call) */}
      <StickyMobileBar
        config={config}
        onOpenTrack={() => setTrackingModalOpen(true)}
        onOpenQuote={handleOpenQuote}
      />

      {/* Fast Tracking Popup Modal */}
      <TrackingModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        config={config}
      />

      {/* WordPress Admin Settings Modal */}
      <WordPressSettingsModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        config={config}
        onUpdateConfig={(newConf) => setConfig(newConf)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
