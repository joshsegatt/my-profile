import * as React from 'react';
import { useState } from 'react';
import { Twitter, Linkedin, Facebook, Dribbble, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'about', href: '/about', external: false },
    { name: 'portfolio', href: '/#portfolio', external: false },
    { name: 'laboratory', href: '/lab', external: false },
    { name: 'contact', href: '/contact', external: false },
  ];

  const socialLinks = [
    { icon: <Twitter size={18} />, href: '#' },
    { icon: <Linkedin size={18} />, href: '#' },
    { icon: <Facebook size={18} />, href: '#' },
    { icon: <Dribbble size={18} />, href: '#' },
  ];

  const [isAutoExpanded, setIsAutoExpanded] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsAutoExpanded(true);
      setTimeout(() => setIsAutoExpanded(false), 3000); // Stay open for 3 seconds
    }, 25000); // Every 25 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Custom logic for smooth scrolling to anchors
  React.useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <header className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center px-6 lg:px-8 justify-between transition-all duration-500 ease-in-out w-[95%] max-w-7xl h-[68px] bg-black/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* Logo Area */}
      <Link
        to="/"
        className="flex items-center group cursor-pointer"
        aria-label="Josh Segat Home"
      >
        <div
          className={`relative h-10 border border-white/20 rounded-full flex items-center px-4 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] bg-white/5 hover:border-white/40 ${isAutoExpanded ? 'max-w-[220px] pr-5' : 'max-w-[75px] group-hover:max-w-[220px] group-hover:pr-5'
            }`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <div className="flex items-center tracking-tighter">
            <span className="text-white font-bold text-lg leading-none">J</span>
            <div className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isAutoExpanded ? 'max-w-[60px] opacity-100' : 'max-w-0 opacity-0 group-hover:max-w-[60px] group-hover:opacity-100'
              }`}>
              <span className="text-white/80 font-medium text-[15px] ml-0.5 shimmer-text">osh</span>
            </div>
            <span className={`text-white font-bold text-lg leading-none transition-all duration-700 ${isAutoExpanded ? 'ml-3' : 'ml-1.5 group-hover:ml-3'
              }`}>S</span>
            <div className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isAutoExpanded ? 'max-w-[60px] opacity-100' : 'max-w-0 opacity-0 group-hover:max-w-[60px] group-hover:opacity-100'
              }`}>
              <span className="text-white/80 font-medium text-[15px] ml-0.5 shimmer-text">egat</span>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite_linear] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="px-4 py-2 text-white/70 text-[14px] font-medium tracking-tight rounded-full hover:bg-white/10 hover:text-white transition-all duration-500 ease-in-out hover:scale-105 active:scale-95"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Desktop Utilities */}
      <div className="hidden md:flex items-center gap-4">
        <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
        <Link
          to="/lab"
          className="bg-white text-black px-5 py-2 rounded-full text-[14px] font-semibold hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
        >
          Let's talk
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-white/80 hover:text-white w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-black/90 backdrop-blur-2xl rounded-2xl border border-white/10 flex flex-col items-center py-8 gap-4 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-white/80 text-lg font-medium hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/lab"
            className="mt-4 bg-white text-black px-10 py-3 rounded-full font-bold text-center w-[80%]"
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
