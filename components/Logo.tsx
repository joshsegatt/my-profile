import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../utils/i18n';

const Logo: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="flex items-center gap-4 cursor-pointer group select-none"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* UE5-Inspired "Engine Core" Icon */}
      <div className="relative w-11 h-11 flex items-center justify-center">
        {/* Atmospheric Glow Base */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-brand-yellow/20 rounded-full blur-xl pointer-events-none"
        />

        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <svg 
            viewBox="0 0 44 44" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_0_8px_rgba(255,184,0,0.3)]"
          >
            <defs>
              <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#404040" />
                <stop offset="45%" stopColor="#1A1A1A" />
                <stop offset="55%" stopColor="#1A1A1A" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              <linearGradient id="core-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEB3B" />
                <stop offset="100%" stopColor="#FF9800" />
              </linearGradient>
              <filter id="bevel">
                <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" />
                <feOffset dx="0.5" dy="0.5" />
                <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="1 0 0 0 1  0 1 0 0 1  0 0 1 0 1  0 0 0 1 0" />
              </filter>
            </defs>

            <circle cx="22" cy="22" r="20" stroke="url(#metal-gradient)" strokeWidth="3" />
            <circle cx="22" cy="22" r="17" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

            <motion.path 
              d="M28 14H16L14 16V20L16 22H28L30 24V28L28 30H16" 
              stroke="url(#core-glow)" 
              strokeWidth="3.5" 
              strokeLinecap="square"
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ strokeDasharray: "10 5" }}
            />
            <path 
              d="M28 14H16L14 16V20L16 22H28L30 24V28L28 30H16" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeOpacity="0.3"
              strokeLinecap="square"
            />
            
            <rect x="21" y="2" width="2" height="4" fill="#FFB800" fillOpacity="0.6" />
            <rect x="21" y="38" width="2" height="4" fill="#FFB800" fillOpacity="0.6" />
          </svg>
        </motion.div>
      </div>

      <div className="flex flex-col -space-y-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[22px] font-black tracking-[-0.02em] text-white">JOSH</span>
          <span className="text-[22px] font-extralight tracking-[0.15em] text-white/40 uppercase">SEGATT</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-[1px] w-3 bg-brand-yellow/30" />
            <span className="text-[8px] font-black tracking-[0.4em] text-brand-yellow/60 uppercase">
                {t('intro.role')}
            </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Logo;
