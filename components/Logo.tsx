import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
    <motion.div 
      className="flex items-center gap-3 cursor-pointer group select-none"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Icon: Geometric Hex-Polygon with 15-degree tilt and speed cuts */}
      <div className="relative w-10 h-10">
        <motion.div
          className="absolute inset-0"
          style={{ transform: 'rotate(15deg)' }}
          whileHover={{ filter: 'drop-shadow(0 0 12px rgba(255, 184, 0, 0.4))' }}
        >
          <svg 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFB800" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            {/* Speed Cut Polygon Body */}
            <path 
              d="M10 5L35 15V25L10 35L5 25V15L10 5Z" 
              fill="url(#logo-gold)" 
            />
            {/* Speed Slash #1 */}
            <path 
              d="M15 12L25 28" 
              stroke="white" 
              strokeWidth="2" 
              strokeOpacity="0.2" 
              strokeLinecap="round" 
            />
            {/* Speed Slash #2 */}
            <path 
              d="M10 18L20 34" 
              stroke="white" 
              strokeWidth="2" 
              strokeOpacity="0.1" 
              strokeLinecap="round" 
            />
          </svg>
        </motion.div>
      </div>

      {/* Typography: Plus Jakarta Sans with contrasting weights */}
      <div className="flex flex-col -gap-1">
        <div className="flex items-baseline tracking-[0.1em]">
          <span className="text-xl font-extrabold text-white">JOSH</span>
          <span className="text-xl font-extralight text-white/50 ml-1.5 uppercase">SEGATT</span>
        </div>
        <div className="text-[7px] font-black tracking-[0.4em] text-brand-yellow/40 uppercase pl-0.5">
          High-performance Engineer
        </div>
      </div>
    </motion.div>
  );
};

export default Logo;
