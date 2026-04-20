import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Check } from 'lucide-react';
import { ANALYSIS_STAGES } from '@/data/gamerData';

interface AnalysisProgressProps {
  analysisIdx: number;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ analysisIdx }) => {
  return (
    <div className="flex flex-col items-center gap-10 py-12">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center"
      >
        <Cpu size={32} className="text-brand-yellow" />
      </motion.div>

      <div className="w-full max-w-md flex flex-col gap-5">
        <div className="text-center">
          <p className="text-white font-bold text-lg">Analyzing your system profile...</p>
          <p className="text-white/40 text-sm mt-1">Building personalized optimization report</p>
        </div>

        <div className="h-1 bg-white/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-yellow rounded-full"
            animate={{ width: `${(analysisIdx / ANALYSIS_STAGES.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        <div className="flex flex-col gap-2">
          {ANALYSIS_STAGES.map((stage, i) => (
            <div key={stage} className={`flex items-center gap-3 text-sm transition-all duration-300 ${
              i < analysisIdx  ? 'text-white/60' :
              i === analysisIdx ? 'text-brand-yellow font-medium' :
                                 'text-white/20'
            }`}>
              <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${
                i < analysisIdx  ? 'border-white/20 bg-white/10' :
                i === analysisIdx ? 'border-brand-yellow bg-brand-yellow/20 animate-pulse' :
                                   'border-white/10'
              }`}>
                {i < analysisIdx && <Check size={9} className="text-white/60" />}
              </div>
              {stage}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;
