import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';
import { useLanguage } from '../utils/i18n';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/solutions' },
    { name: 'AI Prompts', href: '/prompts' },
    { name: 'About', href: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 sm:px-6 pt-3 sm:pt-5 pointer-events-none">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto w-full max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-4 transition-all duration-500 bg-transparent border-transparent"
        >
          {/* Logo — Josh Segatt (Segatt is black on all pages over the orange split) */}
          <Link
            to="/"
            className="shrink-0 flex items-center overflow-hidden group"
          >
            <div className="flex items-baseline gap-0.5 text-white font-black tracking-tight select-none drop-shadow-sm">
              <span className="text-[17px] sm:text-[18px]">Josh</span>
              <span className="text-[17px] sm:text-[18px] text-black font-black">
                Segatt
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`
                    relative px-4 py-2 text-[11px] font-bold tracking-[0.12em] uppercase
                    transition-all duration-200 rounded-xl
                    ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-white/[0.08]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF5A00] shadow-[0_0_8px_rgba(255,90,0,0.9)]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.12em] transition-all active:scale-95 shrink-0 bg-black text-white hover:bg-gray-900 border border-white/10 shadow-md cursor-pointer"
            >
              <Mail size={13} />
              Contact
            </button>
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-white hover:bg-black/60 transition-all shadow-md active:scale-95"
              aria-label="Toggle navigation menu"
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
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[110] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-[#0A0A0A] border-l border-white/10 z-[120] p-10 flex flex-col lg:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-baseline gap-0 text-white font-black tracking-tight select-none">
                  <span className="text-[18px]">Josh</span>
                  <span className="inline-block w-[0.3em]"></span>
                  <span className="text-[18px] text-[#FF5A00]">Segatt</span>
                </div>
                <X 
                  size={24} 
                  className="text-white/40 cursor-pointer hover:text-white" 
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
              <div className="flex flex-col gap-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2xl font-black tracking-tighter transition-colors flex items-center gap-3 ${
                        location.pathname === link.href ? 'text-[#FF5A00]' : 'text-white/40'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto pt-10 border-t border-white/5">
                <Link
                  to="/onboarding"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-[#FF5A00] text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(255,90,0,0.4)]"
                >
                  Start a Project
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
