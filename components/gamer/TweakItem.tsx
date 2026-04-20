import React from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, AlertCircle } from 'lucide-react';
import { Tweak, Impact } from '@/data/gamerData';

interface TweakItemProps {
  tweak: Tweak;
  isDone: boolean;
  onToggle: (id: string) => void;
  onCopy: (tweak: Tweak) => void;
  isCopied: boolean;
}

const IMPACT_STYLE: Record<Impact, string> = {
  HIGH:   'text-red-400   bg-red-400/10   border-red-400/25',
  MEDIUM: 'text-brand-yellow bg-brand-yellow/10 border-brand-yellow/25',
  LOW:    'text-white/35  bg-white/5      border-white/10',
};

const TweakItem: React.FC<TweakItemProps> = ({ 
  tweak, 
  isDone, 
  onToggle, 
  onCopy, 
  isCopied 
}) => {
  return (
    <motion.div
      layout
      className={`p-5 rounded-2xl border transition-all ${
        isDone ? 'bg-white/[0.01] border-white/5 opacity-60' : 'bg-white/[0.03] border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black border tracking-wider ${IMPACT_STYLE[tweak.impact]}`}>
              {tweak.impact}
            </span>
            <h4 className={`font-bold text-sm leading-tight transition-all ${isDone ? 'text-white/40 line-through decoration-brand-yellow/50' : 'text-white'}`}>
              {tweak.title}
            </h4>
          </div>
          <p className="text-xs text-white/40 leading-relaxed max-w-xl">
            {tweak.desc}
          </p>
        </div>

        <button
          onClick={() => onToggle(tweak.id)}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
            isDone ? 'bg-brand-yellow border-brand-yellow text-black' : 'bg-brand-yellow/5 border-brand-yellow/20 text-brand-yellow hover:bg-brand-yellow/10'
          }`}
        >
          <Check size={18} strokeWidth={isDone ? 3 : 2} />
        </button>
      </div>

      {tweak.command && !isDone && (
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">
            <AlertCircle size={10} /> PowerShell Command
          </div>
          <div className="bg-black/40 border border-white/5 rounded-xl p-3 font-mono text-[11px] flex items-center justify-between gap-4 group/cmd">
            <code className="text-brand-yellow/80 break-all leading-relaxed">
              {tweak.command}
            </code>
            <button
              onClick={() => onCopy(tweak)}
              className="flex-shrink-0 p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:bg-white/10 hover:text-white transition-all active:scale-95"
            >
              {isCopied ? <Check size={14} className="text-brand-yellow" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TweakItem;
