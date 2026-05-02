import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 500);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center gap-12">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[100px]" />
          <div className="global-grid opacity-[0.03]" />
        </div>

        {/* Logo Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Logo variant="full" className="w-48 h-auto" />
          <motion.div 
            className="absolute -inset-4 border border-brand-yellow/20 rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Technical Data Stream */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-8">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">Core Status</span>
                <span className="text-[10px] font-black tracking-[0.1em] text-brand-yellow italic">STABLE_SYSTEM</span>
             </div>
             <div className="h-8 w-[1px] bg-white/10" />
             <div className="flex flex-col items-start">
                <span className="text-[10px] font-black tracking-[0.3em] text-white/20 uppercase">Intelligence</span>
                <span className="text-[10px] font-black tracking-[0.1em] text-brand-yellow italic">SYNCING_NODE_{progress}%</span>
             </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-brand-yellow shadow-[0_0_15px_rgba(255,193,7,0.5)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>

        {/* Footer Minimalist */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 flex items-center gap-4">
           <span className="text-[8px] font-black tracking-[0.5em] text-white/10 uppercase">Elite Protocol v1.7.8</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Intro;
