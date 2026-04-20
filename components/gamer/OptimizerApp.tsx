import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Check } from 'lucide-react';
import { 
  FormData, 
  Tweak, 
  Category, 
  generateTweaks, 
  ANALYSIS_STAGES,
  GPU_OPTIONS,
  CPU_OPTIONS
} from '@/data/gamerData';

import ConfigForm from './ConfigForm';
import AnalysisProgress from './AnalysisProgress';
import ResultDashboard from './ResultDashboard';
import WindowFrame from '../ui/WindowFrame';

type Step = 0 | 1 | 2;

const OptimizerApp: React.FC = () => {
  const [step,          setStep]          = useState<Step>(0);
  const [analysisIdx,   setAnalysisIdx]   = useState(0);
  const [activeTab,     setActiveTab]     = useState<Category>('fps');
  const [copiedId,      setCopiedId]      = useState<string | null>(null);
  const [doneIds,       setDoneIds]       = useState<Set<string>>(new Set());
  const [errors,        setErrors]        = useState<Partial<Record<keyof FormData | 'issues', string>>>({});
  const [tweaks,        setTweaks]        = useState<Tweak[]>([]);

  const [form, setForm] = useState<FormData>({
    cpu: '', gpu: '', ram: '', game: '', currentFps: '', issues: [],
  });

  useEffect(() => {
    if (step !== 1) return;
    setAnalysisIdx(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setAnalysisIdx(i);
      if (i >= ANALYSIS_STAGES.length) {
        clearInterval(id);
        setTimeout(() => setStep(2), 500);
      }
    }, 480);
    return () => clearInterval(id);
  }, [step]);

  const setField = (key: keyof FormData, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const toggleIssue = (id: string) => {
    setForm(prev => {
      const next = prev.issues.includes(id)
        ? prev.issues.filter(i => i !== id)
        : [...prev.issues, id];
      return { ...prev, issues: next };
    });
  };

  const handleAnalyze = () => {
    if (!form.cpu || !form.gpu || !form.game) return;
    setTweaks(generateTweaks(form));
    setDoneIds(new Set());
    setActiveTab('fps');
    setStep(1);
  };

  const handleCopy = (tweak: Tweak) => {
    if (!tweak.command) return;
    navigator.clipboard.writeText(tweak.command);
    setCopiedId(tweak.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleDone = (id: string) => {
    setDoneIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleExport = () => {
    const gpuLabel = GPU_OPTIONS.find(g => g.value === form.gpu)?.label ?? form.gpu;
    const cpuLabel = CPU_OPTIONS.find(c => c.value === form.cpu)?.label ?? form.cpu;
    const header = `GAMER PC OPTIMIZER REPORT\nRIG: ${cpuLabel} · ${gpuLabel}\nGAME: ${form.game}\n\n`;
    const body = tweaks.map(t => `${t.title}: ${t.desc}${t.command ? `\n> ${t.command}` : ''}`).join('\n\n');
    const blob = new Blob([header + body], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report.txt`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <WindowFrame title="AI RIG OPTIMIZER V1" icon={<Gamepad2 size={20} />}>
        <div className="absolute top-6 right-8 lg:right-12 flex items-center gap-2 z-20">
          {(['Configure', 'Analyze', 'Results'] as const).map((label, i) => (
            <React.Fragment key={label}>
              <div className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                step === i ? 'text-brand-yellow' : step > i ? 'text-white/40' : 'text-white/20'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border transition-colors ${
                  step === i ? 'border-brand-yellow bg-brand-yellow text-black' :
                  step > i  ? 'border-white/20 bg-white/10 text-white/60' :
                              'border-white/10 text-white/20'
                }`}>
                  {step > i ? <Check size={10} /> : i + 1}
                </div>
                <span className="hidden sm:block">{label}</span>
              </div>
              {i < 2 && <div className="w-6 h-px bg-white/10" />}
            </React.Fragment>
          ))}
        </div>

        <div className="p-8 lg:p-12">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ConfigForm 
                  form={form} 
                  setField={setField} 
                  toggleIssue={toggleIssue} 
                  onAnalyze={handleAnalyze} 
                  errors={errors} 
                />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AnalysisProgress analysisIdx={analysisIdx} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ResultDashboard 
                  tweaks={tweaks}
                  form={form}
                  doneIds={doneIds}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  toggleDone={toggleDone}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                  onExport={handleExport}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </WindowFrame>
    </div>
  );
};

export default OptimizerApp;
