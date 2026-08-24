import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import AISolutions from './components/AISolutions';
import Projects from './components/Projects';
import QualificationSection from './components/QualificationSection';
import Footer from './components/Footer';
import ProjectLab from './components/ProjectLab';
import Sidebar from './components/Sidebar';
import Onboarding from './components/Onboarding';
import Tools from './components/Tools';
import Prompts from '@/components/Prompts';
import Intro from './components/Intro';
import { PostHogProvider } from './components/analytics/PostHogProvider';
import AsyncIntakeForm from './components/AsyncIntakeForm';
import AIChat from './components/AIChat';
import ContactModal from './components/ContactModal';

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const mainContent = document.getElementById('main-scroll-area');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const isHome = location.pathname === '/' || location.pathname === '';
  const isFixedHeroPage = isHome || location.pathname === '/solutions' || location.pathname === '/prompts' || location.pathname === '/about';

  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true);
    window.addEventListener('open-contact', handleOpenContact);
    return () => window.removeEventListener('open-contact', handleOpenContact);
  }, []);

  useEffect(() => {
    // Advanced Schema Markup for Elite SEO
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Josh Segatt",
      "jobTitle": "Elite Software Engineer & AI Architect",
      "url": "https://joshsegatt.com",
      "sameAs": [
        "https://linkedin.com/in/joshsegatt",
        "https://github.com/joshsegatt"
      ],
      "knowsAbout": ["AI Software Development", "SaaS Architecture", "B2B Scaling", "Premium Web Design"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Elite Engineering Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SaaS MVP Development"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Integration & Automation"
            }
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-transparent text-white">
      <ScrollToTop />

      {/* Global Split Background System (55% Orange / 45% White like Home Hero) */}
      <div className="fixed inset-0 z-0 flex pointer-events-none overflow-hidden">
        <div className="w-[55%] h-full bg-[#d64700]" />
        <div className="w-[45%] h-full bg-white" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col h-screen w-full overflow-hidden">
        <Header />

        <div className={`flex-1 flex overflow-hidden ${isHome ? 'pt-0' : 'pt-16 sm:pt-20 lg:pt-[96px]'}`}>
          <main
            id="main-scroll-area"
            className={`flex-1 relative ${
              isHome ? 'overflow-hidden' : 'overflow-y-auto lg:overflow-hidden custom-scrollbar'
            }`}
          >
            <div className={`w-full ${isHome ? 'h-full px-0' : 'min-h-full lg:h-full px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto'}`}>
              <Routes location={location}>
                <Route path="/" element={<Hero />} />
                <Route path="/about" element={<About />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/prompts" element={<Prompts />} />
                <Route path="/solutions" element={<AISolutions />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/intake" element={<AsyncIntakeForm />} />
                <Route path="/lab" element={<ProjectLab />} />
                <Route path="*" element={<Hero />} />
              </Routes>
            </div>
            {!isFixedHeroPage && <Footer />}
          </main>
        </div>
        <AIChat />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <PostHogProvider>
        <AppContent />
      </PostHogProvider>
    </Router>
  );
};

export default App;
