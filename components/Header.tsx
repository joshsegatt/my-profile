import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: 'Gamer', href: '/gamer' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 z-[100] transition-all duration-500 xl:w-[calc(100%-380px)] w-full ${
        isScrolled 
          ? 'py-4 surface-glass backdrop-blur-2xl border-b border-white/5 bg-[#020617]/95' 
          : 'py-8 bg-[#020617]/20 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Elite Branding System */}
          <a href="/" className="cursor-pointer">
            <Logo />
          </a>

          {/* Minimalist Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-6">
            <motion.a
              href="/onboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow hover:bg-brand-yellow/20 transition-all cursor-pointer"
            >
              Start Onboarding
            </motion.a>
          </div>

          {/* Mobile Menu Icon (Placeholder) */}
          <div className="md:hidden text-white/60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;
