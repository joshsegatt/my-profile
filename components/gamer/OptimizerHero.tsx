import React from 'react';
import { Zap, Globe, Activity } from 'lucide-react';

const OptimizerHero: React.FC = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow">Gamer PC Optimizer</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Free · 100% Browser-Based</span>
      </div>

      <div className="flex flex-col gap-4 max-w-3xl">
        <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight">
          Squeeze every <span className="text-brand-yellow">FPS</span> from your rig.
        </h1>
        <p className="text-lg text-white/60 leading-relaxed">
          Enter your build and target game. The optimizer generates a personalized, step-by-step
          performance plan — GPU tweaks, latency fixes, Windows optimizations, and thermal management.
          No downloads. No bloat. Just results.
        </p>
      </div>

      <div className="flex items-center gap-6 flex-wrap">
        {[
          { icon: <Zap size={14} />,      label: '+30–60 avg FPS gain'   },
          { icon: <Globe size={14} />,     label: '−20–40ms ping reduction' },
          { icon: <Activity size={14} />,  label: 'Under 5 min to apply'  },
        ].map(stat => (
          <div key={stat.label} className="flex items-center gap-2 text-sm text-white/50">
            <span className="text-brand-yellow">{stat.icon}</span>
            {stat.label}
          </div>
        ))}
      </div>
    </section>
  );
};

export default OptimizerHero;
