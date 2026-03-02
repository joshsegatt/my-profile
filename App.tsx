
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ProjectLab from './components/ProjectLab';

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-brand-textPrimary font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Projects />
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/lab" element={<ProjectLab />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
