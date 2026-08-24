import React from 'react';
import { ChevronUp, Mail, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    const mainContainer = document.getElementById('main-scroll-area');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-white/5 mt-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left — Name + Role */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="text-white/70 text-sm font-semibold tracking-tight">Josh Segatt</span>
          <span className="text-white/25 text-xs font-medium">Senior Software Engineer · London</span>
        </div>

        {/* Centre — Back to top */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center gap-1.5 group text-white/20 hover:text-white/50 transition-colors"
        >
          <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
            <ChevronUp size={16} />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            Back to top
          </span>
        </button>

        {/* Right — Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:hello@joshsegatt.com"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-brand-yellow hover:border-brand-yellow/30 transition-all"
            aria-label="Send an email"
          >
            <Mail size={15} />
          </a>
          <a
            href="https://linkedin.com/in/joshsegatt"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-brand-yellow hover:border-brand-yellow/30 transition-all"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="https://github.com/joshsegatt"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-brand-yellow hover:border-brand-yellow/30 transition-all"
            aria-label="GitHub profile"
          >
            <Github size={15} />
          </a>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-white/5 text-center">
        <span className="text-white/15 text-[11px] font-medium">
          © {new Date().getFullYear()} Josh Segatt · All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
