import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap, Sparkles } from 'lucide-react';

const TEXTS = ['digital experiences', 'intelligent automation', 'production-ready apps'];

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-transparent pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Cinematic Glowing Orbs */}
      <div className="absolute top-[10%] lg:top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-paintCyan/5 rounded-[100%] blur-[120px] pointer-events-none z-0 rotate-12" />
      <div className="absolute top-[30%] lg:top-[40%] left-1/2 -translate-x-[40%] w-[600px] h-[400px] bg-brand-paintRed/5 rounded-[100%] blur-[120px] pointer-events-none z-0 -rotate-12" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">

        {/* Top Avatar Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mb-8 lg:mb-12"
        >
          {/* Avatar Base */}
          <div className="relative group">
            {/* Pulsing Status Ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-paintCyan/30 to-brand-paintRed/30 rounded-full blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* The Avatar */}
            <div className="relative w-32 h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border border-white/10 shadow-2xl bg-brand-black z-10 transition-transform duration-500 hover:scale-[1.02]">
              <img
                src="/hero-portrait.jpg"
                alt="Josh Segat"
                className="w-full h-full object-cover object-top filter grayscale-[60%] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-paintCyan" />
            <span className="text-xs lg:text-sm font-medium text-brand-textPrimary tracking-wide">
              Full-Stack AI Developer
            </span>
          </div>
        </motion.div>

        {/* Massive Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="w-full"
        >
          <h1 className="text-5xl lg:text-7xl xl:text-[84px] text-brand-textPrimary tracking-tight leading-[1.1] mb-4">
            <span className="font-light">Crafting high-performance</span>
            <br className="hidden md:block" />
            <span className="relative inline-block h-[1.1em] overflow-hidden align-bottom w-full max-w-[800px] mx-auto font-extrabold tracking-tighter">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-brand-paintCyan via-brand-paintRed to-brand-paintOrange pb-2"
                >
                  {TEXTS[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="text-base lg:text-xl text-brand-textSecondary leading-relaxed max-w-2xl mx-auto mt-6 lg:mt-8 font-light">
            I engineer web applications that prioritize <strong className="font-medium text-brand-textPrimary">speed, quality, and clean architecture</strong>. Specializing in Next.js, Node, and AI capabilities.
          </p>
        </motion.div>

        {/* Magnetic Button Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group inline-block">
            {/* Animated Glow Ring */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-brand-paintCyan via-brand-paintRed to-brand-paintOrange rounded-full blur-[8px] opacity-40 group-hover:opacity-100 transition duration-500"></div>

            <Link
              to="/lab"
              className="relative flex items-center justify-center px-10 py-4 lg:px-12 bg-white text-brand-black text-base font-bold rounded-full overflow-hidden shadow-2xl transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                Let's talk
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-1 transition-transform">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>

          <div className="flex items-center gap-3 text-sm font-mono text-brand-textTertiary mt-4 sm:mt-0">
            <Code size={16} />
            <Zap size={16} />
            <span>&lt;builder/&gt;</span>
          </div>
        </motion.div>
      </div>


    </section>
  );
};

export default Hero;
