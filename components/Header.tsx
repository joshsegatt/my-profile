import * as React from 'react';
import { useState, useEffect } from 'react';
import { Twitter, Linkedin, Facebook, Dribbble, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'about', href: '/about', external: false },
    { name: 'portfolio', href: '/#portfolio', external: false },
    { name: 'laboratory', href: '/lab', external: false },
    { name: 'contact', href: '/contact', external: false },
  ];

  const [isAutoExpanded, setIsAutoExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAutoExpanded(true);
      setTimeout(() => setIsAutoExpanded(false), 3000); // Stay open for 3 seconds
    }, 25000); // Every 25 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Custom logic for smooth scrolling to anchors
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-[100] flex items-center px-3 lg:px-4 justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[92%] max-w-[800px] h-[56px] lg:h-[60px] rounded-full border border-white/[0.08] ${scrolled
        ? 'top-4 bg-[rgba(10,10,10,0.85)] backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
        : 'top-6 bg-[rgba(15,15,15,0.65)] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)]'
        }`}
    >
      {/* Logo Area */}
      <Link
        to="/"
        className="flex items-center group cursor-pointer"
        aria-label="Josh Segat Home"
      >
        <div
          className={`relative h-8 lg:h-9 rounded-full flex items-center px-3 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/[0.06] ${isAutoExpanded ? 'max-w-[220px] pr-4' : 'max-w-[70px] group-hover:max-w-[220px] group-hover:pr-4'
            }`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <div className="flex items-center tracking-tighter">
            <span className="text-white font-bold text-[15px] lg:text-[16px] leading-none">J</span>
            <div className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center ${isAutoExpanded ? 'max-w-[60px] opacity-100' : 'max-w-0 opacity-0 group-hover:max-w-[60px] group-hover:opacity-100'
              }`}>
              <span className="text-white/80 font-medium text-[13px] ml-0.5 mt-[1px]">osh</span>
            </div>
            <span className={`text-white font-bold text-[15px] lg:text-[16px] leading-none transition-all duration-700 ${isAutoExpanded ? 'ml-2' : 'ml-1.5 group-hover:ml-2'
              }`}>S</span>
            <div className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center ${isAutoExpanded ? 'max-w-[60px] opacity-100' : 'max-w-0 opacity-0 group-hover:max-w-[60px] group-hover:opacity-100'
              }`}>
              <span className="text-white/80 font-medium text-[13px] ml-0.5 mt-[1px]">egat</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="px-4 py-1.5 text-white/50 text-[13px] font-medium tracking-wide rounded-full hover:bg-white/[0.08] hover:text-white transition-all duration-300 ease-out"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Desktop Utilities */}
      <div className="hidden md:flex items-center pr-1 lg:pr-1">
        <Link
          to="/lab"
          className="bg-white text-[#0A0A0A] px-6 py-[9px] rounded-full text-[13px] font-bold hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_4px_14px_rgba(255,255,255,0.25)] active:scale-95"
        >
          Let's talk
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-white/80 hover:text-white w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-black/80 backdrop-blur-3xl rounded-3xl border border-white/10 flex flex-col items-center py-8 gap-4 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-white/70 text-base font-medium hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/lab"
            className="mt-6 bg-white text-black px-10 py-3 rounded-full font-bold text-center w-[80%]"
            onClick={() => setIsMenuOpen(false)}
          >
            Let's talk
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
