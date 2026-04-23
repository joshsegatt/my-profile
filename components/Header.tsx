import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../utils/i18n';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.tools'), href: '/tools' },
    { name: t('nav.gamer'), href: '/gamer' },
    { name: t('nav.wallpapers'), href: '/wallpapers' },
    { name: 'Prompts AI', href: '/prompts' },
    { name: t('nav.store'), href: '/store' },
    { name: t('nav.about'), href: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`
            pointer-events-auto
            flex items-center gap-12 px-8 py-2 rounded-full 
            border transition-all duration-500
            ${isScrolled 
              ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-2' 
              : 'bg-white/[0.03] backdrop-blur-md border-white/5 py-3'}
          `}
        >
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo variant="minimal" className="transition-transform duration-500 group-hover:rotate-[15deg]" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`
                    relative px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]
                    transition-all duration-300 flex items-center gap-2
                    ${isActive ? 'text-black' : 'text-white/50 hover:text-white'}
                  `}
                >
                  {link.href === '/store' && (
                    <>
                      <motion.div 
                        animate={{ 
                          boxShadow: [
                            "0 0 10px rgba(168, 85, 247, 0.4)", 
                            "0 0 20px rgba(168, 85, 247, 0.7)", 
                            "0 0 10px rgba(168, 85, 247, 0.4)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full border border-purple-500/50 pointer-events-none"
                      />
                      <ShoppingBag 
                        size={12} 
                        className={`relative z-10 ${isActive ? 'text-black' : 'text-purple-400'}`} 
                      />
                    </>
                  )}
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Shared Layout Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-brand-yellow rounded-full shadow-[0_0_20px_rgba(255,184,0,0.3)]"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}

                  {/* Hover Indicator */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/5 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block"
            >
              <Link
                to="/onboard"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.15em] hover:bg-white/10 transition-all"
              >
                {t('nav.onboarding')}
                <ChevronRight size={12} className="text-brand-yellow" />
              </Link>
            </motion.div>

            {/* Mobile Toggle */}
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
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[110] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-[#020202] border-l border-white/10 z-[120] p-10 flex flex-col lg:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <Logo className="w-8 h-8" />
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
                        location.pathname === link.href ? 'text-brand-yellow' : 'text-white/40'
                      }`}
                    >
                      {link.href === '/store' && (
                        <motion.div
                          animate={{ 
                            textShadow: [
                              "0 0 5px rgba(168, 85, 247, 0.5)", 
                              "0 0 15px rgba(168, 85, 247, 1)", 
                              "0 0 5px rgba(168, 85, 247, 0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-purple-400"
                        >
                          <ShoppingBag size={24} />
                        </motion.div>
                      )}
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto pt-10 border-t border-white/5">
                <Link
                  to="/onboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-brand-yellow text-black text-[11px] font-black uppercase tracking-[0.2em]"
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
