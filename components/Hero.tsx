import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../utils/i18n';
import './Hero.css';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home-hero-section" className="hero-container">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Column: Text Content (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col items-start text-left">
            
            {/* H1 Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-title"
              dangerouslySetInnerHTML={{ __html: t('hero.title') }}
            />

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-subhead text-white/65 text-lg mb-10 leading-relaxed"
            >
              {t('hero.subhead')}
            </motion.p>

            {/* Social Proof Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 mb-12"
            >
              {[
                "Enterprise SaaS Dev",
                "App Architecture",
                "Windows/FPS Tuning"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-yellow/60" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Interaction Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="/onboard" 
                className="cta-button inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-black uppercase tracking-[0.2em] animate-pulse-slow active:scale-95 transition-all"
              >
                {t('hero.cta')}
                <ChevronRight size={18} className="arrow-icon" />
              </a>
            </motion.div>

          </div>

          {/* Right Column: Live Product Visual (45%) */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-[500px] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(255,199,0,0.15)] group"
            >
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-90 z-10 pointer-events-none" />
              <img 
                src="/assets/hero_dashboard.png" 
                alt="AI Performance System Interface" 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
