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
import GamerOptimizer from './components/GamerOptimizer';
import Wallpapers from './components/Wallpapers';
import Prompts from '@/components/Prompts';
import Intro from './components/Intro';
import { PostHogProvider } from './components/analytics/PostHogProvider';
import AsyncIntakeForm from './components/AsyncIntakeForm';
import AIChat from './components/AIChat';

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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isInternalTools = window.location.pathname === '/tools';
    const introSeen = sessionStorage.getItem('josh_intro_seen');
    
    if (isInternalTools) {
      sessionStorage.setItem('josh_intro_seen', 'true');
      setIsReady(true);
      setShowIntro(false);
    } else if (!introSeen) {
      setShowIntro(true);
    } else {
      setIsReady(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('josh_intro_seen', 'true');
    setShowIntro(false);
    setIsReady(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#020202] text-white">
      <ScrollToTop />
      
      <AnimatePresence>
        {showIntro && <Intro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Global Background System */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[120px]" />
        <div className="global-grid opacity-20" />
        <div className="global-noise opacity-[0.03]" />
      </div>

      <motion.div 
        initial={false}
        animate={{ opacity: isReady ? 1 : 0 }}
        className="relative z-10 flex flex-col h-screen w-full overflow-hidden"
      >
        <Header />

        <div className="flex-1 flex overflow-hidden pt-24 lg:pt-[104px]">
          <main id="main-scroll-area" className="flex-1 overflow-y-auto custom-scrollbar relative">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, ease: "linear" }}
              className={`w-full min-h-screen pb-24 ${location.pathname === '/solutions' ? 'px-6 lg:px-12' : 'px-8 lg:px-16'}`}
            >
              <div className="max-w-[1440px] mx-auto">
                <Routes location={location}>
                  <Route path="/" element={<div><Hero /><Projects /><QualificationSection /></div>} />
                  <Route path="/about" element={<About />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/wallpapers" element={<Wallpapers />} />
                  <Route path="/prompts" element={<Prompts />} />
                  <Route path="/gamer" element={<GamerOptimizer />} />
                  <Route path="/solutions" element={<AISolutions />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/intake" element={<AsyncIntakeForm />} />
                  <Route path="/lab" element={<ProjectLab />} />
                </Routes>
              </div>
              <Footer />
            </motion.div>
          </main>

          {location.pathname !== '/solutions' && (
            <aside className="hidden xl:block w-[380px] h-full overflow-y-auto custom-scrollbar border-l border-white/5 bg-black/20 backdrop-blur-3xl">
              <div className="p-10">
                <Sidebar />
              </div>
            </aside>
          )}
        </div>
        <AIChat />
      </motion.div>
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
