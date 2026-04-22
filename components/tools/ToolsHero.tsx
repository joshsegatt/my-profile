import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../utils/i18n';
import ComparisonSlider from '@/components/ui/ComparisonSlider';
import { ChevronRight, Zap } from 'lucide-react';

const ToolsHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center py-10 lg:py-20">
      
      {/* Left Column: Content & Focused CTA */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]">
            Segatt <br />
            <span className="text-brand-yellow text-6xl lg:text-8xl">Tools</span>
          </h1>
          <p className="text-lg lg:text-2xl text-white/50 max-w-xl leading-relaxed font-medium">
            {t('tools_hero.subhead')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/onboard'}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-brand-yellow text-black font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,184,0,0.15)] hover:shadow-[0_0_30px_rgba(255,184,0,0.4)] transition-all"
          >
            {t('tools_hero.cta')}
            <ChevronRight size={18} />
          </motion.button>
        </div>
        
        <div className="flex items-center gap-8 pt-10 border-t border-white/5">
            <div className="flex flex-col gap-1">
                <span className="text-white font-black text-3xl tracking-tighter">0%</span>
                <span className="text-white/30 text-[9px] uppercase font-bold tracking-[0.2em]">{t('tools_hero.stats.input_delay')}</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
                <span className="text-white font-black text-3xl tracking-tighter">+45%</span>
                <span className="text-white/30 text-[9px] uppercase font-bold tracking-[0.2em]">{t('tools_hero.stats.fps_gain')}</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col gap-1">
                <span className="text-white font-black text-3xl tracking-tighter">600+</span>
                <span className="text-white/30 text-[9px] uppercase font-bold tracking-[0.2em]">{t('tools_hero.stats.tweaks')}</span>
            </div>
        </div>
      </motion.div>

      {/* Right Column: High-Fidelity Visual Proof */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -inset-10 bg-brand-yellow/5 blur-[120px] rounded-full opacity-30 pointer-events-none" />
        <ComparisonSlider 
          beforeImage="/assets/images/native_before.png"
          afterImage="/assets/images/native_after.png"
        />
        
        {/* Subtle Tech Accents */}
        <div className="absolute -bottom-6 -left-6 flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded border border-white/5">
            <Zap size={10} className="text-brand-yellow" />
            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Real-time Analysis v2</span>
        </div>
      </motion.div>

    </section>
  );
};

export default ToolsHero;
