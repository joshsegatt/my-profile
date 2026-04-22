import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useLanguage } from '../utils/i18n';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.tools'), href: '/tools' },
    { name: t('nav.gamer'), href: '/gamer' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 xl:right-[380px] z-[100] flex justify-center pointer-events-none pt-4 lg:pt-6 px-4 lg:px-0">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto relative flex items-center justify-between transition-all duration-500 rounded-full border border-white/10 ${
            isScrolled 
              ? 'w-full lg:w-[90%] max-w-[1200px] h-[64px] px-6 bg-[#020202]/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
              : 'w-full lg:w-[95%] max-w-[1400px] h-[80px] px-8 bg-transparent border-transparent'
          }`}
        >
          {/* Logo Section */}
          <Link to="/" className="relative z-10">
            <Logo />
          </Link>

          {/* Desktop Navigation Link System */}
          <nav className="hidden lg:flex items-center gap-1 relative px-2 py-1 bg-white/[0.03] rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative px-5 py-2 group"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {/* Hover Pill Background */}
                  <AnimatePresence>
                    {(hoveredLink === link.name || isActive) && (
                      <motion.div
                        layoutId="nav-pill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className={`absolute inset-0 rounded-full ${
                          isActive ? 'bg-brand-yellow/10' : 'bg-white/5'
                        }`}
                      />
                    )}
                  </AnimatePresence>
                  
                  <span className={`relative z-10 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? 'text-brand-yellow' : 'text-white/40 group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Actions & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={false}
              animate={isScrolled ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              className="hidden lg:block"
            >
              <Link
                to="/onboard"
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-brand-yellow text-black text-[10px] font-black uppercase tracking-[0.15em] hover:shadow-[0_0_20px_rgba(255,184,0,0.4)] transition-all"
              >
                {t('nav.onboarding')}
                <ChevronRight size={14} className="stroke-[3px]" />
              </Link>
            </motion.div>

            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#020202] border-l border-white/10 z-[120] p-8 flex flex-col gap-8 lg:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{t('nav.home').toUpperCase()}</span>
                <X 
                  size={24} 
                  className="text-white/40 cursor-pointer hover:text-white" 
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-bold tracking-tight transition-colors ${
                        location.pathname === link.href ? 'text-brand-yellow' : 'text-white/60'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto">
                <Link
                  to="/onboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-yellow text-black text-[11px] font-black uppercase tracking-[0.2em]"
                >
                  {t('nav.start_project')}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
