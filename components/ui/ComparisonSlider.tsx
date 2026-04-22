import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ 
  beforeImage, 
  afterImage, 
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sliderPos = useMotionValue(50);
  const smoothSliderPos = useSpring(sliderPos, { stiffness: 400, damping: 40 });

  const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;

    sliderPos.set(Math.max(0, Math.min(100, position)));
  };

  const onMouseDown = () => setIsResizing(true);
  const onMouseUp = () => setIsResizing(false);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', onMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isResizing]);

  const clipPath = useTransform(smoothSliderPos, (v) => `inset(0 ${100 - v}% 0 0)`);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-col-resize select-none bg-[#0a0a0a]"
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      {/* After Image (Base) */}
      <img 
        src={afterImage} 
        alt="Optimized" 
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Before Image (Clipped) */}
      <motion.div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath }}
      >
        <img 
          src={beforeImage} 
          alt="Original" 
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
      </motion.div>

      {/* Minimal Handle Bar */}
      <motion.div 
        className="absolute inset-y-0 z-20 w-[2px] bg-brand-yellow"
        style={{ left: useTransform(smoothSliderPos, (v) => `${v}%`) }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-brand-yellow/30 blur-md rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-yellow border-4 border-[#020202] shadow-[0_0_20px_rgba(255,184,0,0.4)] flex items-center justify-center">
            <div className="flex gap-0.5">
                <div className="w-0.5 h-3 bg-black/40 rounded-full" />
                <div className="w-0.5 h-3 bg-black/40 rounded-full" />
            </div>
        </div>
      </motion.div>

      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-2xl" />
    </div>
  );
};

export default ComparisonSlider;
