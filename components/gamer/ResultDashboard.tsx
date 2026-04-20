import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Zap, Globe, Monitor, Thermometer } from 'lucide-react';
import { Tweak, Category, FormData, GPU_OPTIONS, CPU_OPTIONS } from '@/data/gamerData';
import TweakItem from './TweakItem';

interface ResultDashboardProps {
  tweaks: Tweak[];
  form: FormData;
  doneIds: Set<string>;
  activeTab: Category;
  setActiveTab: (cat: Category) => void;
  toggleDone: (id: string) => void;
  onCopy: (tweak: Tweak) => void;
  copiedId: string | null;
  onExport: () => void;
}

const TABS: Array<{ id: Category; label: string; icon: React.ReactNode }> = [
  { id: 'fps',     label: 'FPS Boost', icon: <Zap        size={14} /> },
  { id: 'network', label: 'Network',   icon: <Globe       size={14} /> },
  { id: 'windows', label: 'Windows',   icon: <Monitor     size={14} /> },
  { id: 'thermal', label: 'Thermal',   icon: <Thermometer size={14} /> },
];

const ResultDashboard: React.FC<ResultDashboardProps> = ({
  tweaks,
  form,
  doneIds,
  activeTab,
  setActiveTab,
  toggleDone,
  onCopy,
  copiedId,
  onExport
}) => {
  const visibleTweaks = tweaks.filter(t => t.category === activeTab);
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-black text-xl">
            {tweaks.length} optimizations found for{' '}
            <span className="text-brand-yellow">{form.game}</span>
          </h3>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span>{GPU_OPTIONS.find(g => g.value === form.gpu)?.label}</span>
            <span>·</span>
            <span>{CPU_OPTIONS.find(c => c.value === form.cpu)?.label}</span>
          </div>
        </div>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-bold hover:bg-white/10 hover:text-white transition-all"
        >
          <Download size={14} /> Export Report (.TXT)
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/5 self-start">
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          const count  = tweaks.filter(t => t.category === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                active ? 'bg-brand-yellow text-black' : 'text-white/40 hover:text-white/60 hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${active ? 'bg-black/10 text-black' : 'bg-white/5 text-white/20'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 min-min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {visibleTweaks.map(tweak => (
            <TweakItem 
              key={tweak.id}
              tweak={tweak}
              isDone={doneIds.has(tweak.id)}
              onToggle={toggleDone}
              onCopy={onCopy}
              isCopied={copiedId === tweak.id}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResultDashboard;
