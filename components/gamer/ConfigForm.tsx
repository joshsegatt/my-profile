import React from 'react';
import { ChevronRight, Gamepad2 } from 'lucide-react';
import { 
  FormData, 
  CPU_OPTIONS, 
  GPU_OPTIONS, 
  RAM_OPTIONS, 
  GAME_OPTIONS, 
  ISSUE_OPTIONS 
} from '@/data/gamerData';
import CustomSelect from '../ui/CustomSelect';

interface ConfigFormProps {
  form: FormData;
  setField: (key: keyof FormData, val: string) => void;
  toggleIssue: (id: string) => void;
  onAnalyze: () => void;
  errors: Partial<Record<keyof FormData | 'issues', string>>;
}

const fieldBase = 'w-full bg-black/40 border rounded-xl px-5 py-3.5 text-white text-sm font-medium focus:outline-none transition-colors appearance-none';
const fieldOk   = 'border-white/10 focus:border-brand-yellow/40 hover:border-white/20';
const fieldErr  = 'border-red-400/40 focus:border-red-400/60';

const ConfigForm: React.FC<ConfigFormProps> = ({ 
  form, 
  setField, 
  toggleIssue, 
  onAnalyze, 
  errors 
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomSelect 
          label="CPU Processor"
          options={CPU_OPTIONS}
          value={form.cpu}
          onChange={(v) => setField('cpu', v)}
          placeholder="Select your CPU"
        />
        <CustomSelect 
          label="Graphics Card"
          options={GPU_OPTIONS}
          value={form.gpu}
          onChange={(v) => setField('gpu', v)}
          placeholder="Select your GPU"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/35">RAM Profile</label>
          <div className="flex gap-2 flex-wrap">
            {RAM_OPTIONS.map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setField('ram', r)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                  form.ram === r
                    ? 'bg-brand-yellow text-black border-brand-yellow'
                    : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <CustomSelect 
          label="Main Game"
          options={GAME_OPTIONS.map(g => ({ value: g, label: g }))}
          value={form.game}
          onChange={(v) => setField('game', v)}
          placeholder="Select target game"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/35">Current FPS</label>
          <input
            type="number"
            placeholder="e.g. 120"
            value={form.currentFps}
            onChange={e => setField('currentFps', e.target.value)}
            className={`${fieldBase} ${errors.currentFps ? fieldErr : fieldOk}`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/35">Main Issues</label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {ISSUE_OPTIONS.map(issue => (
            <button
              key={issue.id}
              type="button"
              onClick={() => toggleIssue(issue.id)}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                form.issues.includes(issue.id)
                  ? 'bg-brand-yellow/15 border-brand-yellow/40 text-brand-yellow'
                  : 'bg-white/3 border-white/8 text-white/40 hover:border-white/20'
              }`}
            >
              {issue.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onAnalyze}
        className="self-start flex items-center gap-3 bg-brand-yellow text-black px-10 py-4 rounded-2xl font-bold text-[15px] tracking-wide hover:-translate-y-[2px] active:translate-y-0 transition-all shadow-[0_16px_32px_rgba(255,90,0,0.22)] group"
      >
        <Gamepad2 size={18} />
        Analyze My Rig
        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default ConfigForm;
