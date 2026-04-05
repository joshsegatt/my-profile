
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
    const introSeen = sessionStorage.getItem('josh_intro_seen');
    if (!introSeen) {
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

      {/* Background Layer (Global) */}
      <div className="fixed inset-0 bg-[#050505] z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-brand-yellow/[0.03] to-transparent pointer-events-none" />
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
            <div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-32 pb-24 lg:pt-40 lg:pb-32">
              <Routes>
                <Route path="/" element={
                  <div className="flex flex-col gap-24 lg:gap-40">
                    <Hero />
                    <Projects />
                  </div>
                } />
                <Route path="/about" element={<About />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/onboard" element={<Onboarding />} />
                <Route path="/lab" element={<ProjectLab />} />
              </Routes>
            </div>
            
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

