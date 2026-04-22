
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ProjectLab from './components/ProjectLab';
import Sidebar from './components/Sidebar';
import Onboarding from './components/Onboarding';
import Tools from './components/Tools';
import GamerOptimizer from './components/GamerOptimizer';

import { motion, AnimatePresence } from 'framer-motion';
import Intro from './components/Intro';

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const mainContent = document.getElementById('main-scroll-area');
    if (mainContent) mainContent.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [showIntro, setShowIntro] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
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
    // Add a small delay for the reveal to feel more intentional
    setTimeout(() => setIsReady(true), 200);
  };

  return (
    <Router>
      <ScrollToTop />
      
      <AnimatePresence mode="wait">
        {showIntro && <Intro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Global "Obsidian Nexus" Canvas System */}
      <div className="fixed inset-0 bg-[#020202] z-0 overflow-hidden pointer-events-none">
        
        {/* Dynamic Mesh Aura Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 80, -40, 0], 
            y: [0, -40, 80, 0],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="aura-blob w-[800px] h-[800px] bg-brand-yellow/5 top-[-10%] left-[-10%]"
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 100, 0], 
            y: [0, 80, -60, 0],
            scale: [1, 0.9, 1.05, 1]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="aura-blob w-[700px] h-[700px] bg-brand-yellow/[0.03] bottom-[-10%] right-[-5%]"
        />

        {/* Global Grid & Noise */}
        <div className="global-grid" />
        <div className="global-noise" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col h-screen w-full overflow-hidden font-sans selection:bg-brand-yellow selection:text-black"
      >
        
        {/* Elite System Header (Global Fixed) */}
        <Header />

        {/* Global Content Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main Scrollable Content (Full Page Feel) */}
          <main id="main-scroll-area" className="flex-1 overflow-y-auto custom-scrollbar relative bg-transparent">
            <Routes>
              <Route path="/" element={
                <div className="w-full">
                  <Hero />
                  <div className="max-w-[1440px] mx-auto px-8 lg:px-16 pb-24 lg:pb-32">
                    <Projects />
                  </div>
                </div>
              } />
              <Route path="/about" element={<div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-36 pb-24 lg:pb-32"><About /></div>} />
              <Route path="/tools" element={<div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-36 pb-24 lg:pb-32"><Tools /></div>} />
              <Route path="/gamer" element={<div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-36 pb-24 lg:pb-32"><GamerOptimizer /></div>} />
              <Route path="/contact" element={<div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-36 pb-24 lg:pb-32"><Contact /></div>} />
              <Route path="/onboard" element={<div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-36 pb-24 lg:pb-32"><Onboarding /></div>} />
              <Route path="/lab" element={<div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-36 pb-24 lg:pb-32"><ProjectLab /></div>} />
            </Routes>
            
            <Footer />
          </main>

          {/* Sidebar (Right-Side Panel - Desktop Only) */}
          <aside className="hidden xl:block w-[380px] h-full overflow-y-auto custom-scrollbar border-l border-white/5 bg-black/20 backdrop-blur-3xl">
            <div className="p-8 lg:p-10">
              <Sidebar />
            </div>
          </aside>
        </div>
      </motion.div>
    </Router>
  );
};

export default App;

