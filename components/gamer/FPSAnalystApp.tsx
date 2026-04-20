import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, ShieldCheck, AlertTriangle } from 'lucide-react';
import { CPU_OPTIONS, GPU_OPTIONS, GAME_OPTIONS } from '@/data/gamerData';
import CustomSelect from '../ui/CustomSelect';

interface Recommendation {
  setting: string;
  value: string;
  impact: string;
}

const FPSAnalystApp: React.FC = () => {
  const [cpu, setCpu] = useState('');
  const [gpu, setGpu] = useState('');
  const [res, setRes] = useState('1080p');
  const [game, setGame] = useState('');

  const analysis = useMemo(() => {
    if (!cpu || !gpu || !game) return null;

    const isHighEndGpu = gpu.includes('4070') || gpu.includes('4080') || gpu.includes('4090') || gpu.includes('3090');
    const isMidGpu     = gpu.includes('3060') || gpu.includes('3070') || gpu.includes('4060');
    const isEntryCpu   = cpu.includes('i5') || cpu.includes('r5');
    const isHighEndCpu = cpu.includes('i9') || cpu.includes('r9');
    
    let bottleneck = 0; 
    let type: 'CPU' | 'GPU' | 'BALANCED' = 'BALANCED';

    if (res === '1080p' && isHighEndGpu && isEntryCpu) {
      bottleneck = 65;
      type = 'CPU';
    } else if (res === '4K' && !isHighEndGpu) {
      bottleneck = 85;
      type = 'GPU';
    } else if (res === '1440p' && isMidGpu && isHighEndCpu) {
      bottleneck = 15;
      type = 'BALANCED';
    } else {
      bottleneck = Math.floor(Math.random() * 20) + 5;
    }

    const recommendations: Recommendation[] = [
      { setting: 'NVIDIA Reflex', value: 'On + Boost', impact: 'Latency' },
      { setting: 'Shadow Quality', value: 'Medium', impact: 'FPS' },
      { setting: 'Texture Resolution', value: 'High', impact: 'Visual' },
      { setting: 'DLSS / FSR', value: isHighEndGpu ? 'DLAA' : 'Quality', impact: 'FPS' }
    ];

    return { bottleneck, type, recommendations };
  }, [cpu, gpu, res, game]);

  return (
    <div className="flex flex-col gap-8 p-8 lg:p-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Input Sidebar */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">System Stats</h3>
          
          <div className="flex flex-col gap-5">
            <CustomSelect 
              label="Processor"
              options={CPU_OPTIONS}
              value={cpu}
              onChange={setCpu}
              placeholder="Select CPU"
            />

            <CustomSelect 
              label="Video Card"
              options={GPU_OPTIONS}
              value={gpu}
              onChange={setGpu}
              placeholder="Select GPU"
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1">Resolution</label>
              <div className="flex gap-2">
                {['1080p', '1440p', '4K'].map(r => (
                  <button key={r} onClick={() => setRes(r)} className={`flex-1 py-3 rounded-xl border text-[11px] font-bold transition-all ${res === r ? 'bg-brand-yellow border-brand-yellow text-black' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <CustomSelect 
              label="Target Game"
              options={GAME_OPTIONS.map(g => ({ value: g, label: g }))}
              value={game}
              onChange={setGame}
              placeholder="Select Game"
            />
          </div>
        </div>

        {/* Main Analysis Display */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          <AnimatePresence mode="wait">
            {!analysis ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-[32px] text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                  <BarChart3 size={32} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-white/60 font-bold">Analysis Engine Standby</p>
                  <p className="text-white/20 text-xs">Awaiting primary system telemetry for diagnostic scan.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 flex flex-col items-center gap-6 text-center shadow-2xl">
                    <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.3em]">Bottleneck Index</span>
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="80" cy="80" r="72" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-white/5" />
                        <motion.circle 
                          cx="80" cy="80" r="72" fill="transparent" stroke="currentColor" strokeWidth="10" 
                          strokeDasharray={452.4} 
                          initial={{ strokeDashoffset: 452.4 }}
                          animate={{ strokeDashoffset: 452.4 - (452.4 * analysis.bottleneck / 100) }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          strokeLinecap="round"
                          className={analysis.bottleneck > 50 ? 'text-red-400' : analysis.bottleneck > 20 ? 'text-brand-yellow' : 'text-green-400'} 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-white">{analysis.bottleneck}%</span>
                        <span className="text-[9px] text-white/30 uppercase font-black tracking-widest">{analysis.type} TASKED</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-white/30 leading-relaxed max-w-[180px]">
                      {analysis.bottleneck > 50 ? 'Severe synchronization gap. Component upgrade recommended.' : 'Optimal parity detected across the hardware stack.'}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="p-7 rounded-3xl bg-brand-yellow/5 border border-brand-yellow/20 flex flex-col gap-4 shadow-lg shadow-brand-yellow/5">
                      <div className="flex items-center gap-2 text-brand-yellow">
                        <ShieldCheck size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Post-Optimization</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-3xl font-black text-white">+32% Performance</span>
                        <span className="text-[11px] text-white/40 leading-relaxed">Boosted frame pacing and latency recovery estimated.</span>
                      </div>
                    </div>
                    {analysis.bottleneck > 35 && (
                      <div className="p-7 rounded-3xl bg-red-400/5 border border-red-400/20 flex flex-col gap-4 shadow-lg shadow-red-400/5">
                        <div className="flex items-center gap-2 text-red-400">
                          <AlertTriangle size={18} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Warning</span>
                        </div>
                        <p className="text-[11px] text-white/60 leading-relaxed">The {analysis.type} is working at peak capacity, creating a queue backlog.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between px-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/25">Golden Profile Settings</h4>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-brand-yellow uppercase font-black tracking-widest">{res} Optimizations</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysis.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-yellow/20 transition-all group">
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{rec.setting}</span>
                          <span className="text-sm font-black text-white group-hover:text-brand-yellow transition-colors">{rec.value}</span>
                        </div>
                        <span className="text-[9px] font-black uppercase bg-white/5 px-2.5 py-1.5 rounded-lg text-white/30 border border-white/5">{rec.impact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FPSAnalystApp;
