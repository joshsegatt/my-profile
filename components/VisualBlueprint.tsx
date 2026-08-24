import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Server, Globe, Database, Shield, Zap } from 'lucide-react';

interface BlueprintProps {
  data: {
    projectType: string;
    goal: string;
    budget: string;
  };
}

const VisualBlueprint: React.FC<BlueprintProps> = ({ data }) => {
  const layers = [
    { id: 'ui', icon: <Globe size={16} />, label: 'Interface Layer', active: !!data.projectType },
    { id: 'logic', icon: <Cpu size={16} />, label: 'Business Logic', active: !!data.goal },
    { id: 'data', icon: <Database size={16} />, label: 'Data Persistence', active: data.budget !== '' },
    { id: 'infra', icon: <Server size={16} />, label: 'Cloud Infrastructure', active: data.budget.includes('Premium') || data.budget.includes('Enterprise') },
  ];

  return (
    <div className="hidden lg:flex flex-col gap-6 p-8 glass-panel rounded-[40px] border-brand-yellow/10 w-full max-w-[320px] relative overflow-hidden h-fit">
      <div className="absolute top-0 right-0 p-4">
        <div className="text-[8px] font-black text-brand-yellow/40 tracking-[0.3em] uppercase">Architecture_v2.6</div>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
        <h4 className="text-white font-black text-xs uppercase tracking-widest">Live Solution Map</h4>
      </div>

      <div className="space-y-4 relative">
        {/* Connecting Lines */}
        <div className="absolute left-[23px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-brand-yellow/20 via-brand-yellow/5 to-transparent" />

        {layers.map((layer, idx) => (
          <motion.div 
            key={layer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: layer.active ? 1 : 0.2, 
              x: 0,
              scale: layer.active ? 1.05 : 1
            }}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
              layer.active ? 'bg-brand-yellow/10 border border-brand-yellow/20 shadow-[0_0_20px_rgba(255,184,0,0.05)]' : 'bg-white/5 border border-transparent'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              layer.active ? 'bg-brand-yellow text-black' : 'bg-white/5 text-white/20'
            }`}>
              {layer.icon}
            </div>
            <div>
              <div className="text-[9px] font-bold text-white/30 uppercase tracking-tighter mb-0.5">Layer 0{idx + 1}</div>
              <div className={`text-[11px] font-black uppercase tracking-tight ${layer.active ? 'text-white' : 'text-white/20'}`}>
                {layer.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {data.projectType && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap size={12} className="text-brand-yellow" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Active Stack</span>
            </div>
            <div className="text-[10px] text-white/60 font-medium leading-relaxed italic">
              Deploying {data.projectType} architecture optimised for {data.goal || 'growth'}...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative SVG grid */}
      <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none" viewBox="0 0 100 100">
        <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" />
      </svg>
    </div>
  );
};

export default VisualBlueprint;
