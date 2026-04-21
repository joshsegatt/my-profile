import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { Zap, Activity, Cpu, Hash, ChevronRight } from 'lucide-react';

// Specialized Counter Component using Framer Motion for high-fidelity control
const Counters: React.FC<{ from: number; to: number; decimals?: number; suffix?: string }> = ({ from, to, decimals = 0, suffix = "" }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(decimals) + suffix;
  });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5
      });
      return controls.stop;
    }
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const LiveDashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[500px] aspect-square lg:aspect-video xl:aspect-square bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden group"
    >
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 blur-[100px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-brand-yellow/20" />
      
      {/* Grid Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-yellow/10 rounded-lg">
            <Cpu size={20} className="text-brand-yellow" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">System Core</div>
            <div className="text-sm font-bold text-white">Live Monitoring</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Active</span>
        </div>
      </div>

      {/* Metrics Stack */}
      <div className="grid gap-4">
        
        {/* Latency Card */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex items-center justify-between group/card hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
              <Activity size={20} />
            </div>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">Network Latency</div>
              <div className="text-2xl font-black text-white tabular-nums">
                <Counters from={240} to={89} suffix="ms" />
              </div>
            </div>
          </div>
          <div className="w-24 h-10 overflow-hidden relative opacity-40">
            <div className="absolute inset-x-0 bottom-0 h-[px] bg-blue-500/40" />
            <motion.div 
              initial={{ scaleY: 1 }}
              animate={{ scaleY: [1, 0.5, 1.2, 0.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-blue-500/20 to-transparent" 
            />
          </div>
        </motion.div>

        {/* FPS Boost Card */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex items-center justify-between group/card hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-brand-yellow/10 rounded-xl text-brand-yellow">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">Performance Gain</div>
              <div className="text-2xl font-black text-brand-yellow tabular-nums">
                +<Counters from={0} to={52} suffix="%" />
              </div>
            </div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-white/5"
          >
            <Hash size={40} />
          </motion.div>
        </motion.div>

        {/* Memory Freed Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex justify-between items-end mb-3">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">Cache Extraction</div>
              <div className="text-xl font-bold text-white tabular-nums">
                <Counters from={0} to={2.4} decimals={1} suffix="GB" />
              </div>
            </div>
            <div className="text-[10px] font-black text-brand-yellow">CLEANED</div>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "75%" }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              className="h-full bg-brand-yellow shadow-[0_0_10px_rgba(255,193,7,0.5)]"
            />
          </div>
        </motion.div>

      </div>
      
      {/* Decorative Corner Element */}
      <div className="absolute bottom-0 left-0 p-3 opacity-10">
        <div className="text-[6px] font-mono text-white leading-tight uppercase tracking-widest">
          Scanning core metrics...<br/>
          Optimizing registry...<br/>
          Stabilizing threads...
        </div>
      </div>
    </motion.div>
  );
};

export default LiveDashboard;
