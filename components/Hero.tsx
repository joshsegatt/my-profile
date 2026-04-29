import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/i18n';
import './Hero.css';

// --- Magnetic Button Component ---
const MagneticButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

// --- Tier S Hero Image Component ---
const HeroVideo: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-full h-full aspect-video lg:aspect-auto overflow-hidden group bg-[#020202]"
    >
      <img 
        src="/assets/hero_dashboard.png" 
        alt="Hero Dashboard" 
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "translateZ(20px)" }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/80 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated Border Glow */}
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 border border-brand-yellow/10 rounded-[2.5rem] pointer-events-none"
      />

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dyd911kmh/image/upload/v1640050215/grain_u87v9v.png')] bg-repeat animate-grain" />
      </div>

      {/* Extreme Radial Mask */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(2,2,2,0.8)]" />
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home-hero-section" className="hero-container">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-8">
          
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
                <Link 
                  to="/onboarding" 
                  className="cta-button inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-black uppercase tracking-[0.2em] active:scale-95 transition-all"
                >
                  {t('hero.cta')}
                  <ChevronRight size={18} className="arrow-icon" />
                </Link>
            </motion.div>

          </div>

          {/* Right Column: Mosaic Bento Grid (45%) */}
          <div className="w-full lg:w-[45%]">
            <HeroMosaic />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Hero Mosaic Component ---
const HeroMosaic: React.FC = () => {
  return (
    <div className="hero-mosaic">
      {/* Slot Principal: Video Tier S */}
      <div className="mosaic-card main-card">
        <HeroVideo />
      </div>
      
      {/* Slot Secundrio 1 */}
      <div className="mosaic-card sub-card-1">
        <div className="placeholder-content">
          <img src="/cardhero2.png" alt="Tactical Detail" className="absolute inset-0 w-full h-full object-cover" />
          <div className="scan-line-anim" />
          <div className="vignette-overlay" />
        </div>
      </div>

      {/* Slot Secundrio 2 */}
      <div className="mosaic-card sub-card-2">
        <div className="placeholder-content">
          <img src="/cardhero3.png" alt="Performance Feed" className="absolute inset-0 w-full h-full object-cover" />
          <div className="scan-line-anim" />
          <div className="vignette-overlay" />
        </div>
      </div>

      {/* Slot Secundrio 3 */}
      <div className="mosaic-card sub-card-3">
        <div className="placeholder-content">
           <div className="flex items-center gap-8 px-6">
              <div className="flex flex-col gap-1">
                <div className="w-12 h-1 bg-brand-yellow/20 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: [-50, 50] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full bg-brand-yellow"
                  />
                </div>
                <span className="text-[8px] opacity-30 font-black">LATENCY_STABLE</span>
              </div>
              <div className="h-8 w-[1px] bg-white/5" />
              <Zap size={18} className="text-brand-yellow/40" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
