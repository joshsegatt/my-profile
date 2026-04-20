import React from 'react';
import { TOOLS_CONFIG } from '@/data/toolsData';

const ToolsHero: React.FC = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow">Neural Core Engine</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">v{TOOLS_CONFIG.version}</span>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight">
          Segatt <span className="text-brand-yellow">Tools</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
          The ultimate Windows optimization utility. A high-density, performance-driven toolkit featuring local AI diagnostics, batch software management, and one-click system refinement.
        </p>
      </div>
    </section>
  );
};

export default ToolsHero;
