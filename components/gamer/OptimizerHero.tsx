import React from 'react';
import { Zap, Globe, Activity, ChevronRight } from 'lucide-react';
import GamerMosaic from './GamerMosaic';

const OptimizerHero: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      
      {/* Left Column: Cinematic Mosaic */}
      <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
        <GamerMosaic />
      </div>

      {/* Right Column: CTA Content */}
      <div className="order-1 lg:order-2 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow">Neural AI · Optimizer</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Latency Node v1.1</span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
              Squeeze every <br />
              <span className="text-brand-yellow">FPS</span> from your <br />
              battle rig.
            </h1>
            <p className="text-lg text-white/50 leading-relaxed max-w-xl">
              Engineered for competitive excellence. Our neural optimizer runs deep system analysis 
              to eliminate latency, stabilize frame-times, and reclaim lost performance. 
              No bloat. Just pure speed.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-8 flex-wrap">
            {[
              { icon: <Zap size={16} />,      label: '+30–60 AVG FPS', detail: 'Gain realized' },
              { icon: <Globe size={16} />,     label: '−40MS LATENCY', detail: 'Packet optimization' },
              { icon: <Activity size={16} />,  label: '5 MIN SETUP',   detail: 'Quick injection' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm font-black text-white tracking-wide">
                  <span className="text-brand-yellow">{stat.icon}</span>
                  {stat.label}
                </div>
                <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">{stat.detail}</span>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-white/5" />

          <div className="flex items-center gap-4 text-white/40 text-[11px] font-bold uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              Direct-X 12 Ready
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              Win 11 Pro Verified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizerHero;
