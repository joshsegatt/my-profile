import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Copy,
  Check,
  Code2,
  Brain,
  Zap,
  Wand2,
  ChevronRight,
  ShieldCheck,
  Cpu,
  FileCode,
  Flame,
  Terminal,
  RefreshCw,
  Sliders,
  ExternalLink,
  Bot,
  LayoutTemplate
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import CyberBot3D from './CyberBot3D';

interface PromptArchetype {
  id: string;
  name: string;
  short: string;
  badge: string;
  icon: React.ReactNode;
  description: string;
  targetAIs: string[];
  placeholder: string;
  sampleIdeas: string[];
  systemBuilder: (input: string, model: string, options: Record<string, boolean>) => string;
}

const ARCHETYPES: PromptArchetype[] = [
  {
    id: 'vibe-coding',
    name: 'Vibe Coding & Full-Stack Spec',
    short: 'Vibe Coding',
    badge: 'Cursor · Claude 3.7 · Windsurf',
    icon: <Code2 size={16} className="text-[#FF5A00]" />,
    description: 'Generates zero-ambiguity architecture blueprints for Cursor / Claude 3.7 with file trees, Zod contracts, state management, and TDD checklists.',
    targetAIs: ['Claude 3.7 Sonnet', 'Cursor AI (Agent)', 'Windsurf / Cascade', 'OpenAI o1 / GPT-4o'],
    placeholder: 'Describe your app idea or feature (e.g., Online booking SaaS MVP with Stripe, Supabase, and Next.js 15)...',
    sampleIdeas: [
      'Online booking SaaS MVP with Stripe payments and live dashboard in Next.js 15 & Supabase',
      'Chrome Extension for local AI article summaries with sleek Tailwind UI',
      'Node.js/TypeScript microservice for idempotent webhook processing with Redis'
    ],
    systemBuilder: (input, model, opts) => `
You are an Elite Principal AI Architect and Lead Vibe Coding Engineer. 
Your task is to transform the user's raw idea into a flawless, production-ready Master Implementation Prompt tailored for ${model}.

User's Concept:
"${input}"

Generate a structured Master Prompt in English that follows this exact format:

# CONTEXT & OBJECTIVE
State the exact product goal, core architecture, and constraints.

# TECH STACK & REQUIREMENTS
- Frontend / Framework: Modern, optimal stack (e.g., Next.js App Router, React 19, TypeScript)
- State & Styling: Tailwind CSS, Framer Motion, Zustand
- Backend / DB: PostgreSQL / Supabase / Prisma / Server Actions
- Auth & Payments: Stripe / Clerk / Supabase Auth

${opts.fileStructure ? `# SUGGESTED FILE HIERARCHY\nProvide an explicit directory layout showing modified, new, and deleted files.` : ''}

# ATOMIC SPECIFICATION & STEP-BY-STEP WORKFLOW
1. Step 1: Database Schema & Type Contracts
2. Step 2: Backend Endpoints & Zod Validation
3. Step 3: UI Components & Mobile-First UX
4. Step 4: Edge Cases & Error Boundaries

${opts.edgeCases ? `# DEFENSIVE ENGINEERING & EDGE CASES\n- Handle network timeouts, optimistic UI updates, rate limits, schema validation, and defensive null-checks.` : ''}
${opts.tdd ? `# TDD VERIFICATION PLAN\n- Explicit unit test checklist, integration tests, and manual verification steps.` : ''}

# SYSTEM INSTRUCTION FOR THE AI
Output clean, complete, copy-pasteable code with zero placeholders or "TODO" omissions. Follow strict DRY principles and modern TypeScript strict mode.
`.trim(),
  },
  {
    id: 'ai-agents',
    name: 'Autonomous Agents & RAG Pipelines',
    short: 'Agents & RAG',
    badge: 'LangChain · LlamaIndex · OpenAI',
    icon: <Brain size={16} className="text-[#FF5A00]" />,
    description: 'System prompts with strict XML structure, role personas, tool schemas, and zero-hallucination citation guardrails.',
    targetAIs: ['Claude 3.7 (Tool Calling)', 'OpenAI GPT-4o / o1', 'DeepSeek V3 / R1', 'CrewAI'],
    placeholder: 'Describe the agent task (e.g., PDF legal contract auditor extracting high-risk liability clauses)...',
    sampleIdeas: [
      'Autonomous PDF legal contract auditor with exact citations and strict JSON output',
      'Customer support agent with hybrid RAG (vector + BM25) and prompt injection guardrails'
    ],
    systemBuilder: (input, model) => `
You are a Lead AI Research Engineer specializing in Autonomous Multi-Agent Systems and Production RAG architectures.
Transform this request into a Master System Prompt for ${model}:

Idea: "${input}"

Generate the prompt using strict XML tag structure:
<system_prompt>
<role_and_persona>
Define the exact identity, tone, domain authority, and execution mindset.
</role_and_persona>

<context_and_grounding>
Define how data is ingested, citation requirements, and zero-hallucination policies.
</context_and_grounding>

<tool_definitions_and_schema>
List available tools, arguments, and when each tool must be invoked.
</tool_definitions_and_schema>

<execution_protocol>
Step-by-step reasoning cycle:
1. Parse intent & retrieve context
2. Verify against constraints
3. Generate structured output
</execution_protocol>

<output_format>
Strict JSON Schema or formatted Markdown specifications.
</output_format>
</system_prompt>
`.trim(),
  },
  {
    id: 'deep-reasoning',
    name: 'Deep Reasoning & First-Principles',
    short: 'Reasoning CoT',
    badge: 'OpenAI o1/o3 · Claude Thinking',
    icon: <Zap size={16} className="text-[#FF5A00]" />,
    description: 'Enforces mathematical rigor, first-principles logic chains, adversarial critique, and Tree-of-Thought exploration.',
    targetAIs: ['OpenAI o1 / o3-mini', 'Claude 3.7 Thinking', 'DeepSeek R1'],
    placeholder: 'Describe the complex engineering problem (e.g., Zero-lock DB latency optimization for 100k req/sec)...',
    sampleIdeas: [
      'Optimize PostgreSQL database architecture for 100k req/s with zero write contention',
      'Solidity smart contract security audit against reentrancy and flash loan exploits'
    ],
    systemBuilder: (input, model) => `
You are a World-Class Mathematician, Systems Architect, and Algorithmic Theorist.
Construct an exhaustive, multi-layered Deep Reasoning prompt for ${model}.

Task: "${input}"

Structure:
1. PROBLEM DECONSTRUCTION: Break into fundamental atomic components and axioms.
2. HYPOTHESIS & COUNTERFACTUAL TESTING: Formulate 3 distinct hypotheses and critique vulnerabilities.
3. MATHEMATICAL / SYSTEM MODELING: Provide quantitative or structural analysis.
4. STEP-BY-STEP PROOF / DERIVATION: Full logic chain without skipping intermediate steps.
5. OPTIMAL SYNTHESIS: Final bulletproof solution with trade-off matrix.
`.trim(),
  },
  {
    id: 'cro-copy',
    name: 'High-Converting Copy & Product Marketing',
    short: 'CRO & Copy',
    badge: 'Landing Pages · Launches · VSL',
    icon: <Sparkles size={16} className="text-[#FF5A00]" />,
    description: 'Applies Hormozi, Schwartz awareness stages, PAS, and AIDA psychological frameworks to create irresistible sales copy.',
    targetAIs: ['Claude 3.7', 'ChatGPT / GPT-4o', 'DeepSeek V3'],
    placeholder: 'Describe your offer or product (e.g., High-converting landing page for a 14-day MVP launch sprint)...',
    sampleIdeas: [
      'High-converting landing page copy for 14-day rapid MVP sprint service',
      'Multi-touch email launch sequence for high-ticket enterprise SaaS product'
    ],
    systemBuilder: (input, model) => `
You are an Elite Direct-Response Copywriter and Conversion Rate Optimization (CRO) Director.
Craft a Master Copywriting Prompt for ${model}.

Offer / Concept: "${input}"

Framework Requirements to Embed:
- Target Awareness Stage (Unaware / Problem-Aware / Solution-Aware)
- Grand Slam Offer Breakdown (Dream Outcome x Likelihood / Time Delay x Effort)
- Hero Headline (Magnetic Hook, Subhead, Social Proof, CTA microcopy)
- Objection Preemption Matrix (Address price, time, complexity, trust)
`.trim(),
  },
  {
    id: 'creative-art',
    name: 'Visual AI & Creative Art Direction',
    short: 'Visual Art',
    badge: 'Flux.1 Pro · Midjourney v6.1',
    icon: <Wand2 size={16} className="text-[#FF5A00]" />,
    description: 'Photorealistic lenses, studio lighting setups, color grading palettes, and exact render switches.',
    targetAIs: ['Flux.1 Pro', 'Midjourney v6.1', 'Ideogram 2.0'],
    placeholder: 'Describe the visual scene (e.g., Cinematic editorial portrait of tech founder with dramatic studio rim lighting)...',
    sampleIdeas: [
      'Cinematic editorial portrait of tech founder with natural studio rim lighting and 85mm lens',
      'Minimalist 3D luxury device mockup with frosted glass refraction and volumetric glow'
    ],
    systemBuilder: (input, model) => `
You are a World-Class Creative Director, Master Cinematographer, and AI Prompt Artist.
Convert this concept into a Master Art Prompt for ${model}:

Visual Idea: "${input}"

Provide:
1. PRIMARY PROMPT: Dense visual description (Subject, Environment, Lighting, Color Palette, Lens, Depth of Field, Mood).
2. PARAMETERS: Exact flags for Midjourney/Flux (--ar 16:9, --style raw, --v 6.1, --stylize 250).
3. NEGATIVE PROMPT: Elements to explicitly avoid.
`.trim(),
  }
];

const Prompts: React.FC = () => {
  const [activeArchetype, setActiveArchetype] = useState<PromptArchetype>(ARCHETYPES[0]);
  const [activeModel, setActiveModel] = useState<string>(ARCHETYPES[0].targetAIs[0]);
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<Record<string, boolean>>({
    fileStructure: true,
    edgeCases: true,
    tdd: true,
  });

  const handleArchetypeChange = (arch: PromptArchetype) => {
    setActiveArchetype(arch);
    setActiveModel(arch.targetAIs[0]);
    setOutputVal('');
  };

  const toggleOption = (key: string) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = () => {
    if (!outputVal) return;
    navigator.clipboard.writeText(outputVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    if (!inputVal.trim()) return;
    setLoading(true);
    setOutputVal('');

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    try {
      if (apiKey) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const instruction = activeArchetype.systemBuilder(inputVal, activeModel, options);
        
        const result = await model.generateContent(
          instruction + '\n\nIMPORTANT: Output ONLY the engineered Master Prompt. Zero preamble or meta chatter.'
        );
        setOutputVal(result.response.text().trim());
      } else {
        const synthesized = activeArchetype.systemBuilder(inputVal, activeModel, options);
        setOutputVal(synthesized);
      }
    } catch (err) {
      const fallback = activeArchetype.systemBuilder(inputVal, activeModel, options);
      setOutputVal(fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white selection:bg-[#FF5A00] selection:text-white h-full flex flex-col justify-center items-center overflow-hidden py-2">
      
      {/* ── Main Studio Split View (Centered, Balanced Proportions) ── */}
      <div className="w-full max-w-5xl h-[570px] max-h-[85vh] flex flex-col lg:flex-row gap-4">
        
        {/* ── Left Pane: Studio Controls & Input ── */}
        <div className="lg:w-[46%] h-full flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-[#0B0B0E]/95 backdrop-blur-3xl border border-white/[0.04] shadow-2xl shadow-black/50 relative overflow-hidden">
          
          {/* Subtle background ambient orange aura */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5A00]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-col gap-4 relative z-10 min-h-0 flex-1">
            
            {/* Mode Pills Row */}
            <div>
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider block mb-2">
                Select Prompt Engine:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {ARCHETYPES.map((arch) => {
                  const isActive = activeArchetype.id === arch.id;
                  return (
                    <button
                      key={arch.id}
                      onClick={() => handleArchetypeChange(arch)}
                      className={`px-3 py-2 rounded-xl text-left border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-[#1A1A1D] border-[#FF5A00] text-white shadow-[0_0_15px_rgba(255,90,0,0.25)]'
                          : 'bg-white/[0.02] border-white/6 text-white/50 hover:text-white hover:border-white/15'
                      }`}
                    >
                      <div className={`shrink-0 ${isActive ? 'scale-110' : 'opacity-60'}`}>
                        {arch.icon}
                      </div>
                      <span className="text-[11px] font-bold tracking-tight truncate">
                        {arch.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target AI Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">
                  Target AI Architecture:
                </span>
                <span className="text-[10px] font-mono text-white/30 truncate max-w-[180px]">
                  {activeArchetype.badge}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeArchetype.targetAIs.map((ai) => (
                  <button
                    key={ai}
                    onClick={() => setActiveModel(ai)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase transition-all ${
                      activeModel === ai
                        ? 'bg-[#FF5A00] text-white shadow-[0_0_12px_rgba(255,90,0,0.5)]'
                        : 'bg-white/[0.03] border border-white/8 text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {ai}
                  </button>
                ))}
              </div>
            </div>

            {/* Vibe Coding Enhancement Modifiers */}
            {activeArchetype.id === 'vibe-coding' && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => toggleOption('fileStructure')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                    options.fileStructure
                      ? 'bg-[#FF5A00]/15 border-[#FF5A00]/40 text-[#FF5A00]'
                      : 'bg-white/5 border-white/8 text-white/40'
                  }`}
                >
                  {options.fileStructure ? '✓' : '+'} File Hierarchy
                </button>
                <button
                  onClick={() => toggleOption('edgeCases')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                    options.edgeCases
                      ? 'bg-[#FF5A00]/15 border-[#FF5A00]/40 text-[#FF5A00]'
                      : 'bg-white/5 border-white/8 text-white/40'
                  }`}
                >
                  {options.edgeCases ? '✓' : '+'} Edge Cases & Error Boundaries
                </button>
                <button
                  onClick={() => toggleOption('tdd')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                    options.tdd
                      ? 'bg-[#FF5A00]/15 border-[#FF5A00]/40 text-[#FF5A00]'
                      : 'bg-white/5 border-white/8 text-white/40'
                  }`}
                >
                  {options.tdd ? '✓' : '+'} TDD Checklist
                </button>
              </div>
            )}

            {/* Textarea Input */}
            <div className="flex-1 flex flex-col min-h-0 pt-1">
              <label className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Input Idea or Feature:</span>
                <span className="font-mono text-white/30">{inputVal.length} chars</span>
              </label>
              <textarea
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={activeArchetype.placeholder}
                className="flex-1 w-full bg-[#050507]/80 border border-white/10 rounded-2xl p-3.5 text-white text-xs leading-relaxed placeholder:text-white/20 focus:outline-none focus:border-[#FF5A00]/60 transition-colors resize-none custom-scrollbar min-h-[100px]"
              />
            </div>

            {/* Quick Inspiration Chip */}
            <div className="flex items-center gap-1.5 overflow-hidden text-xs">
              <span className="text-[9px] uppercase font-bold text-white/30 shrink-0">Sample:</span>
              <button
                onClick={() => setInputVal(activeArchetype.sampleIdeas[0])}
                className="text-[10px] text-white/60 hover:text-white truncate bg-white/[0.02] hover:bg-white/5 border border-white/5 rounded-md px-2 py-0.5 transition-colors text-left"
              >
                "{activeArchetype.sampleIdeas[0]}"
              </button>
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-3 mt-3 border-t border-white/6 relative z-10">
            <button
              onClick={handleGenerate}
              disabled={loading || !inputVal.trim()}
              className="w-full py-3.5 rounded-xl bg-[#FF5A00] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff6f1f] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(255,90,0,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Master Spec...</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Synthesize Master Prompt</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* ── Right Pane: Claude 3.7 / GPT Canvas Artifact Spec Window ── */}
        <div className="lg:w-[54%] h-full flex flex-col rounded-3xl bg-[#0B0B0E]/95 backdrop-blur-3xl border border-white/[0.04] shadow-2xl shadow-black/50 overflow-hidden relative border-beam-orange">
          
          {/* Canvas Window Header Bar */}
          <div className="px-5 py-3.5 bg-white/[0.03] border-b border-white/8 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-white/20 text-xs font-mono">|</span>
              <div className="flex items-center gap-1.5 text-white/70 font-mono text-[11px]">
                <FileCode size={13} className="text-[#FF5A00]" />
                <span className="font-semibold">{activeArchetype.id}_spec.md</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {outputVal && (
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FF5A00] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#ff6f1f] transition-all active:scale-95 shadow-[0_0_15px_rgba(255,90,0,0.4)] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="stroke-[3px]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Canvas Content Terminal */}
          <div className="flex-1 p-5 font-mono text-xs text-white/85 leading-relaxed overflow-y-auto custom-scrollbar relative">
            {outputVal ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="whitespace-pre-wrap selection:bg-[#FF5A00] selection:text-white"
              >
                {outputVal}
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-3 text-white/30">
                <CyberBot3D className="w-48 h-48 sm:w-56 sm:h-56" />
                <div className="max-w-xs space-y-1">
                  <p className="text-xs font-bold text-white/80 tracking-tight">
                    Claude & Vibe Coding Neural Canvas
                  </p>
                  <p className="text-[11px] text-white/40 leading-relaxed">
                    Select an engine and click synthesize to generate high-precision prompts.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Canvas Status Bottom Footer */}
          <div className="px-5 py-2.5 bg-black/60 border-t border-white/6 flex items-center justify-between text-[10px] font-mono text-white/40 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Canvas Ready · UTF-8</span>
            </div>
            <span>Optimized for {activeModel}</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Prompts;
