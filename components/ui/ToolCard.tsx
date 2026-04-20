import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock, Terminal, Cpu, Zap, Activity, BarChart3, Settings } from 'lucide-react';
import { ToolModule } from '@/data/hubData';

interface ToolCardProps {
  tool: ToolModule;
  onClick: (tool: ToolModule) => void;
}

const getIcon = (name: string, className?: string) => {
  const props = { size: 24, className };
  switch (name) {
    case 'Settings': return <Settings {...props} />;
    case 'Zap':      return <Zap {...props} />;
    case 'Cpu':      return <Cpu {...props} />;
    case 'Activity': return <Activity {...props} />;
    case 'BarChart3': return <BarChart3 {...props} />;
    default:         return <Terminal {...props} />;
  }
};

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const isComingSoon = tool.status === 'Coming Soon';
  const isBeta = tool.status === 'Beta';

  return (
    <motion.div
      whileHover={!isComingSoon ? { y: -5, scale: 1.02 } : {}}
      whileTap={!isComingSoon ? { scale: 0.98 } : {}}
      className={`group relative flex flex-col p-8 rounded-[24px] border transition-all duration-500 overflow-hidden ${
        isComingSoon 
          ? 'bg-white/[0.01] border-white/5 opacity-60 cursor-not-allowed' 
          : 'bg-white/[0.02] border-white/10 hover:border-brand-yellow/30 hover:bg-white/[0.05] cursor-pointer'
      }`}
      onClick={() => !isComingSoon && onClick(tool)}
    >
      {/* Background Glow */}
      {!isComingSoon && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      )}

      {/* Header Info */}
      <div className="flex items-start justify-between mb-8">
        <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 transition-colors ${
          !isComingSoon ? 'group-hover:bg-brand-yellow/10 group-hover:text-brand-yellow group-hover:border-brand-yellow/20' : ''
        }`}>
          {getIcon(tool.icon)}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {isComingSoon ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/30">
              <Lock size={10} /> Locked
            </div>
          ) : (
            <div className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${
              isBeta 
                ? 'bg-blue-400/10 border-blue-400/30 text-blue-400' 
                : 'bg-green-400/10 border-green-400/30 text-green-400'
            }`}>
              {tool.status}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-black text-white/90 group-hover:text-white transition-colors">{tool.title}</h3>
          {!isComingSoon && <ArrowUpRight size={16} className="text-white/20 group-hover:text-brand-yellow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />}
        </div>
        <p className="text-sm text-white/30 leading-relaxed group-hover:text-white/50 transition-colors">
          {tool.shortDesc}
        </p>
      </div>

      {/* Hover Line */}
      {!isComingSoon && (
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-yellow transition-all duration-700 group-hover:w-full" />
      )}
    </motion.div>
  );
};

export default ToolCard;
