import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { TOOLS_CONFIG } from '@/data/toolsData';
import WindowFrame from '../ui/WindowFrame';

const ToolsActionCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(TOOLS_CONFIG.psCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <WindowFrame 
      className="p-8 lg:p-12 flex flex-col gap-8"
      glowColor="rgba(255,90,0,0.08)"
    >
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-3 text-brand-yellow">
          <Terminal size={20} />
          <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Instant Launch</h2>
        </div>
        <p className="text-white/40 text-sm">Run this command in an administrative PowerShell window to launch the tool instantly without installation.</p>
      </div>

      <div className="relative group/cmd z-10">
        <div className="bg-black/60 border border-white/5 rounded-2xl p-6 font-mono text-sm overflow-hidden flex items-center justify-between gap-4 transition-all group-hover/cmd:border-brand-yellow/30 group-hover/cmd:bg-black/80">
          <code className="text-brand-yellow/90 break-all leading-relaxed whitespace-pre-wrap">
            {TOOLS_CONFIG.psCommand}
          </code>
          <button 
            onClick={copyToClipboard}
            className="flex-shrink-0 p-3 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow hover:bg-brand-yellow hover:text-black transition-all active:scale-95"
            title="Copy command"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>
    </WindowFrame>
  );
};

export default ToolsActionCard;
