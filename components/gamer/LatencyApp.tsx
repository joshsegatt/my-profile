import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Play, RefreshCcw, Copy, Check, Info } from 'lucide-react';
import WindowFrame from '../ui/WindowFrame';

const SAMPLE_SIZE = 5;

const LatencyApp: React.FC = () => {
  const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [times, setTimes] = useState<number[]>([]);
  const [currentStart, setCurrentStart] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setState('waiting');
    setFeedback(null);
    const delay = Math.random() * 2000 + 1500;
    timeoutRef.current = setTimeout(() => {
      setState('ready');
      setCurrentStart(performance.now());
    }, delay);
  };

  const handleTrigger = useCallback(() => {
    if (state === 'waiting') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setFeedback('Too early! Retry.');
      setState('idle');
      return;
    }

    if (state === 'ready') {
      const end = performance.now();
      const diff = Math.round(end - currentStart);
      const newTimes = [...times, diff];
      setTimes(newTimes);

      if (newTimes.length >= SAMPLE_SIZE) {
        setState('result');
      } else {
        setState('idle');
        setFeedback(`${diff}ms! Keep going.`);
      }
    }
  }, [state, currentStart, times]);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const reset = () => {
    setTimes([]);
    setState('idle');
    setFeedback(null);
  };

  // Analytics
  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const jitter = times.length > 1 
    ? Math.round(Math.max(...times) - Math.min(...times)) 
    : 0;

  const getLatencyGrade = (ms: number) => {
    if (ms < 180) return { label: 'Elite', color: 'text-green-400' };
    if (ms < 240) return { label: 'Pro', color: 'text-brand-yellow' };
    return { label: 'Average', color: 'text-white/40' };
  };

  const copyCommand = () => {
    const cmd = 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" /v TcpAckFrequency /t REG_DWORD /d 1 /f; ipconfig /flushdns';
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const grade = getLatencyGrade(avg);

  return (
    <div className="flex flex-col gap-8 p-8 lg:p-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Interactive Test Area */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">Latency Probe</h3>
            <div className="flex gap-1">
              {[...Array(SAMPLE_SIZE)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i < times.length ? 'bg-brand-yellow' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>

          <div 
            onClick={handleTrigger}
            className={`relative h-80 rounded-[32px] border flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-500 ${
              state === 'ready'   ? 'bg-brand-yellow border-brand-yellow/50' :
              state === 'waiting' ? 'bg-red-500/5 border-red-500/20' :
                                   'bg-white/[0.02] border-white/10 hover:border-white/20'
            }`}
          >
            <AnimatePresence mode="wait">
              {state === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow" onClick={(e) => { e.stopPropagation(); startTest(); }}>
                    <Play size={24} fill="currentColor" />
                  </div>
                  <p className="text-white font-bold">Launch Pulse Test</p>
                  {feedback && <p className="text-brand-yellow text-xs font-mono">{feedback}</p>}
                </motion.div>
              )}
              {state === 'waiting' && (
                <motion.div key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <p className="text-red-400/60 font-black uppercase tracking-tighter text-3xl">Wait for Yellow...</p>
                </motion.div>
              )}
              {state === 'ready' && (
                <motion.div key="ready" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                  <p className="text-black font-black text-6xl tracking-tighter">CLICK NOW!</p>
                </motion.div>
              )}
              {state === 'result' && (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Avg Response</span>
                    <span className="text-6xl font-black text-white">{avg}ms</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); reset(); }} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs font-bold hover:bg-white/10 hover:text-white transition-all">
                    <RefreshCcw size={14} /> Run Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-[10px] text-white/20 text-center italic">Tip: Use a wired mouse and high-refresh monitor for accurate system latency detection.</p>
        </div>

        {/* Right: Metrics & Analysis */}
        <AnimatePresence>
          {times.length > 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Consistency</span>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">{jitter}ms</span>
                    <span className="text-[10px] text-white/20 pb-1">jitter</span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">System Grade</span>
                  <span className={`text-2xl font-black tracking-tight ${grade.color}`}>{grade.label}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-brand-yellow">
                  <Info size={16} />
                  <h4 className="text-sm font-bold uppercase tracking-wider">Expert Analysis</h4>
                </div>
                <div className="flex flex-col gap-3">
                  {jitter > 30 ? (
                    <div className="p-4 rounded-xl bg-red-400/5 border border-red-400/20 text-xs text-red-400/80 leading-relaxed">
                      High Jitter detected. This often indicates background process interference or unstable network polling.
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-green-400/5 border border-green-400/20 text-xs text-green-400/80 leading-relaxed">
                      Stable frame-to-input pacing. Your DPC latency seems well-optimized.
                    </div>
                  )}
                  <div className="p-6 rounded-2xl border border-white/5 bg-brand-window/40 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col gap-4">
                      <p className="text-xs text-white/60">Apply <span className="text-brand-yellow font-bold">Interrupt Moderation Fix</span> to force CPU to process packets instantly without queuing delay.</p>
                      <button onClick={copyCommand} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 hover:border-brand-yellow/30 transition-all">
                        <code className="text-[10px] text-brand-yellow/80 font-mono truncate mr-4">TcpAckFrequency...</code>
                        {copied ? <Check size={14} className="text-brand-yellow" /> : <Copy size={14} className="text-white/40" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LatencyApp;
