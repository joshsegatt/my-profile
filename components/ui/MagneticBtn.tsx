import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  className?: string;
  id?: string;
}

const MagneticBtn: React.FC<MagneticBtnProps> = ({
  children,
  onClick,
  primary = false,
  className = "",
  id,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useSpring(0, { stiffness: 220, damping: 22 });
  const my = useSpring(0, { stiffness: 220, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.28);
    my.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      id={id}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: mx, y: my }}
      whileTap={{ scale: 0.96 }}
      className={`relative group overflow-hidden flex items-center gap-2 rounded-full font-semibold transition-colors
        ${primary
          ? 'px-8 py-[13px] text-[13px] text-black bg-brand-yellow shadow-[0_8px_28px_rgba(255,90,0,0.28)]'
          : 'px-8 py-[13px] text-[13px] border border-white/10 text-white/40 hover:bg-white/5'
        } ${className}`}
    >
      {primary && (
        <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default MagneticBtn;
