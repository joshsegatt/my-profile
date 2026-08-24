import React from 'react';

interface WindowFrameProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const WindowFrame: React.FC<WindowFrameProps> = ({ 
  children, 
  title, 
  icon, 
  className = "",
  glowColor = "rgba(255,90,0,0.05)"
}) => {
  return (
    <section className={`relative overflow-hidden group rounded-3xl border border-white/5 bg-brand-window/40 backdrop-blur-xl ${className}`}>
      {/* Decorative Glow */}
      <div 
        className="absolute top-0 right-0 w-80 h-80 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors duration-700" 
        style={{ backgroundColor: glowColor }}
      />
      
      {/* Optional Header */}
      {(title || icon) && (
        <div className="flex items-center gap-3 px-8 lg:px-12 py-6 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-3 text-brand-yellow">
            {icon}
            {title && <h2 className="text-sm font-bold uppercase tracking-[0.2em]">{title}</h2>}
          </div>
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default WindowFrame;
