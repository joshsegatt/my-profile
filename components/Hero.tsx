import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../utils/i18n';
import { QuickQuoteModal } from './QuickQuoteModal';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }
});

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative h-[100dvh] min-h-[800px] w-full overflow-hidden bg-black">
        {/* CSS Background Split */}
        <div className="absolute inset-0 flex">
          {/* Approximate orange from the generated image */}
          <div className="w-[55%] h-full bg-[#d64700]" />
          <div className="w-[45%] h-full bg-white" />
        </div>

        {/* Full Image Background - Unzoomed & Blended */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <img 
            src="/assets/josh-hero.jpg" 
            alt="Hero Background" 
            className="h-full w-auto max-w-none object-contain pointer-events-none"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
            }}
          />
          {/* Subtle gradient overlay to ensure text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 w-full max-w-[1600px] mx-auto flex">
          
          {/* Left Column Content */}
          <div className="w-1/2 h-full flex flex-col justify-center px-12 lg:px-24 z-20">
            <motion.div {...fadeUp(0)}>
              <h1 className="text-[clamp(40px,9vw,150px)] font-black text-white leading-[0.85] tracking-tighter mix-blend-overlay opacity-90 -ml-2 select-none uppercase">
                CREATE
              </h1>
            </motion.div>
            
            <motion.div {...fadeUp(0.1)} className="mt-8 mb-10">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight drop-shadow-md">
                {t('hero.title_line1')} <br />
                {t('hero.title_line2')}
              </h2>
              <p className="text-white/90 text-base md:text-lg max-w-sm font-medium drop-shadow-md">
                {t('hero.subhead')}
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#FF5A00] text-sm font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 border-none cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Request a Quote
                  <ChevronRight size={18} />
                </span>
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div {...fadeUp(0.3)} className="absolute bottom-20 left-12 lg:left-24">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FF5A00] bg-[#cc4f00] flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#FF5A00] bg-black/20 flex items-center justify-center text-[10px] font-bold text-white">
                    +12
                  </div>
                </div>
              </div>
              <p className="text-white/90 text-xs mt-3 max-w-[200px] drop-shadow-md font-medium">
                Trusted by forward-thinking startups across Europe.
              </p>
            </motion.div>
          </div>

          {/* Right Column Content */}
          <div className="w-1/2 h-full flex flex-col justify-center px-12 lg:px-24 z-20 text-black">
             <motion.div 
               {...fadeUp(0.2)}
               className="absolute top-1/3 right-12 lg:right-24 text-right"
             >
               <p className="text-[#FF5A00] text-xs font-bold tracking-[0.3em] uppercase mb-2 flex items-center justify-end gap-2 drop-shadow-sm">
                 Available For <span className="w-2 h-2 rounded-full bg-[#FF5A00] inline-block" />
               </p>
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-none drop-shadow-sm">
                 Freelance<br />Projects
               </h2>
             </motion.div>

             <motion.div 
               {...fadeUp(0.4)}
               className="absolute bottom-20 right-12 lg:right-24 bg-white/80 backdrop-blur-md p-6 rounded-2xl max-w-sm border border-gray-100 shadow-xl shadow-black/10"
             >
               <p className="text-[#FF5A00] text-4xl font-serif leading-none h-4">“</p>
               <p className="text-gray-800 text-sm italic mb-4 mt-2">
                 Josh delivered outstanding work that exceeded our expectations on latency and architecture.
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                   <img src="https://i.pravatar.cc/100?img=33" alt="Client" />
                 </div>
                 <div>
                   <p className="text-black font-bold text-xs uppercase">James Carter</p>
                   <p className="text-gray-500 text-[10px] uppercase tracking-wider">Founder, SaaS Co.</p>
                 </div>
               </div>
             </motion.div>
          </div>
        </div>
      </section>

      <QuickQuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Hero;
