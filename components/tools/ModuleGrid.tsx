import React from 'react';
import { Download, ExternalLink, Github, Zap, Shield, Cpu, Terminal } from 'lucide-react';
import { TOOLS_CONFIG } from '@/data/toolsData';
import WindowFrame from '../ui/WindowFrame';

const getModuleIcon = (iconName: string) => {
  switch (iconName) {
    case 'Zap': return <Zap size={18} />;
    case 'Shield': return <Shield size={18} />;
    case 'Cpu': return <Cpu size={18} />;
    default: return <Terminal size={18} />;
  }
};

const ModuleGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Features List */}
      <div className="flex flex-col gap-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 px-2">Core Modules</h3>
        <div className="flex flex-col gap-3">
          {TOOLS_CONFIG.modules.map((f, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
              <div className="p-2.5 rounded-xl bg-brand-yellow/5 text-brand-yellow border border-brand-yellow/10">
                {getModuleIcon(f.icon)}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-white tracking-wide">{f.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Section */}
      <div className="flex flex-col gap-6">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 px-2">Offline Installers</h3>
        <WindowFrame className="p-6 flex flex-col gap-4">
          <a 
            href={TOOLS_CONFIG.downloads.exe}
            className="flex items-center justify-between p-5 rounded-2xl bg-brand-yellow text-black font-bold text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <Download size={20} />
              <span>Download .EXE (v1.7.7)</span>
            </div>
            <ExternalLink size={16} className="opacity-40" />
          </a>
          
          <a 
            href={TOOLS_CONFIG.downloads.msi}
            className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm tracking-wide hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-3">
              <Download size={20} className="text-brand-yellow" />
              <span>Download .MSI (v1.7.7)</span>
            </div>
            <ExternalLink size={16} className="opacity-20" />
          </a>

          <div className="h-px bg-white/5 my-2" />

          <a 
            href={TOOLS_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2 text-xs text-white/30 hover:text-brand-yellow transition-colors"
          >
            <Github size={14} />
            <span>View Source on GitHub</span>
          </a>
        </WindowFrame>
      </div>
    </div>
  );
};

export default ModuleGrid;
