import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Zap,
  Code2,
  Brain,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  ChevronRight,
  Send,
  Award,
  Sparkles,
  Lock,
  Clock
} from 'lucide-react';
import { QuickQuoteModal } from './QuickQuoteModal';

const About: React.FC = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const handleOpenContact = () => {
    window.dispatchEvent(new CustomEvent('open-contact'));
  };

  return (
    <div
      itemScope
      itemType="https://schema.org/Person"
      className="text-white selection:bg-[#FF5A00] selection:text-white h-full flex flex-col justify-center items-center overflow-hidden py-2"
    >
      {/* Hidden SEO Microdata */}
      <meta itemProp="name" content="Josh Segatt" />
      <meta itemProp="jobTitle" content="AI Software Architect & Full-Stack Engineer" />
      <meta itemProp="address" content="London, United Kingdom" />

      {/* ── Main Compact Executive Cards (Centered, Balanced Proportions) ── */}
      <div className="w-full max-w-5xl h-[560px] max-h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* ── Left Column (7 cols): Identity & Direct Client Offer ── */}
        <div className="lg:col-span-7 h-full flex flex-col justify-between p-7 sm:p-9 rounded-3xl bg-[#0B0B0E]/95 backdrop-blur-3xl border border-white/[0.04] shadow-2xl shadow-black/50 relative overflow-hidden">
          
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5A00]/8 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-col gap-6 relative z-10 min-h-0">
            
            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-none mb-2.5">
                Josh Segatt.
              </h1>
              <p className="text-[#FF5A00] text-sm font-bold uppercase tracking-widest font-mono">
                AI Architect & Principal Full-Stack Engineer
              </p>
            </div>

            {/* Direct Pitch (Zero Fluff) */}
            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              I build production-grade SaaS platforms, bespoke AI pipelines, and ultra-fast web applications for founders and companies who want to ship fast without technical debt.
            </p>

            {/* 3 Core Conversion Pillars (Obsidian Glass Cards) */}
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.04] hover:border-[#FF5A00]/40 transition-all flex items-center gap-3.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#FF5A00]/10 border border-[#FF5A00]/20 flex items-center justify-center text-[#FF5A00] shrink-0 group-hover:scale-105 transition-transform">
                  <Rocket size={17} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-white tracking-tight">14-Day MVP Launch Sprints</h3>
                  <p className="text-[11px] text-white/50 leading-snug truncate">From design to live production with Next.js 15, Supabase, and Stripe.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.04] hover:border-[#FF5A00]/40 transition-all flex items-center gap-3.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#FF5A00]/10 border border-[#FF5A00]/20 flex items-center justify-center text-[#FF5A00] shrink-0 group-hover:scale-105 transition-transform">
                  <Brain size={17} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-white tracking-tight">Autonomous AI & RAG Pipelines</h3>
                  <p className="text-[11px] text-white/50 leading-snug truncate">LLM orchestration, vector search, and agentic workflows that automate operations.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.04] hover:border-[#FF5A00]/40 transition-all flex items-center gap-3.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#FF5A00]/10 border border-[#FF5A00]/20 flex items-center justify-center text-[#FF5A00] shrink-0 group-hover:scale-105 transition-transform">
                  <ShieldCheck size={17} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-white tracking-tight">100% IP Ownership & Clean Code</h3>
                  <p className="text-[11px] text-white/50 leading-snug truncate">Complete code repository handover with zero vendor lock-in or recurring dev fees.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3 relative z-10">
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="flex-1 py-3.5 rounded-xl bg-[#FF5A00] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff6f1f] transition-all active:scale-95 shadow-[0_0_25px_rgba(255,90,0,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request a Quote</span>
              <ChevronRight size={14} />
            </button>
            <button
              onClick={handleOpenContact}
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/[0.08] text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Send size={13} />
              <span>Contact</span>
            </button>
          </div>

        </div>

        {/* ── Right Column (5 cols): Proven Stats & Client Guarantee ── */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between p-7 sm:p-9 rounded-3xl bg-[#0B0B0E]/95 backdrop-blur-3xl border border-white/[0.04] shadow-2xl shadow-black/50 relative overflow-hidden border-beam-orange">
          
          <div className="flex flex-col gap-4 relative z-10 min-h-0 flex-1 justify-between">
            
            {/* 4 Stats Bento Grid (Pure Glass Style) */}
            <div className="grid grid-cols-2 gap-3 flex-1 items-center">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.04] flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">14 Days</div>
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Avg. MVP Delivery</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.04] flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black text-[#FF5A00] tracking-tight mb-1">&lt; 50ms</div>
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider">P99 Server Latency</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.04] flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black text-[#FF5A00] tracking-tight mb-1">100/100</div>
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Lighthouse Score</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.04] flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">100%</div>
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider">IP Ownership Handover</div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] relative">
              <p className="text-white/85 text-xs italic leading-relaxed mb-3">
                “Josh delivered our SaaS platform weeks ahead of schedule. The architecture is fast, clean, and handles scale effortlessly.”
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FF5A00] text-white flex items-center justify-center text-[10px] font-bold">
                  JS
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-none">James Carter</div>
                  <div className="text-[9px] text-white/50 uppercase font-mono">Founder, SaaS Co.</div>
                </div>
              </div>
            </div>

          </div>

          {/* Guarantee Badges Footer */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/50">
            <div className="flex items-center gap-1.5">
              <Lock size={12} className="text-[#FF5A00]" />
              <span>Strict NDA Protected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-emerald-400" />
              <span>24h Quote Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* Quick Quote Intake Modal */}
      <QuickQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </div>
  );
};

export default About;
