import React from 'react';
import { 
    Cpu, Zap, Globe, ArrowUpRight, 
    Shield, Code2, Layers, Terminal, 
    Sparkles, Workflow, Database, Binary, Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    // Technical Stack Categories
    const techStack = [
        { category: 'AI & Machine Learning', tools: ['OpenAI / Anthropic SDKs', 'LangChain / LangGraph', 'Vector Databases', 'Fine-tuning Workflows'] },
        { category: 'Frontend Architecture', tools: ['React 19 / Next.js', 'Typescript (Strict)', 'Framer Motion', 'Tailwind Engineering'] },
        { category: 'Backend & Systems', tools: ['Node / Bun', 'PostgreSQL / Neon', 'Edge Computing', 'Modular APIs'] },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="about" className="py-12 lg:py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-6">
                
                {/* 01. The Strategic Manifesto */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 lg:mb-32"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-12 h-[2px] bg-brand-yellow" />
                        <span className="text-brand-yellow font-bold uppercase tracking-[0.4em] text-[10px]">Strategic Manifesto</span>
                    </div>
                    <h2 className="text-4xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tighter mb-8 max-w-4xl italic">
                        Software architecture <span className="text-brand-yellow not-italic underline decoration-white/20 underline-offset-8">is not a game.</span> <br />
                        It's the skeleton of your business.
                    </h2>
                    <p className="text-brand-textSecondary text-lg lg:text-2xl font-medium leading-relaxed max-w-3xl">
                        I don't just write code. I architect scalable ecosystems that integrate human ingenuity with AI-powered efficiency to drive exponential results.
                    </p>
                </motion.div>

                {/* 02. The Bento Grid of Expertise */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 mb-24"
                >
                    {/* Hero Card: AI Engineering */}
                    <motion.div 
                        variants={itemVariants}
                        className="md:col-span-8 p-10 bg-brand-card rounded-[40px] border border-white/5 relative overflow-hidden group hover:border-brand-yellow/30 transition-all duration-500"
                    >
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow mb-8">
                                <Cpu size={28} />
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight italic">AI-First <br/> <span className="text-brand-yellow underline">Engineering.</span></h3>
                            <p className="text-brand-textSecondary text-lg font-medium max-w-xl leading-relaxed">
                                Moving beyond simple wrappers. I implement advanced RAG pipelines, autonomous agentic workflows, 
                                and localized LLM integrations that redefine operational velocity.
                            </p>
                            <div className="mt-10 flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-white">10x</span>
                                    <span className="text-[10px] font-bold text-brand-textTertiary uppercase tracking-widest">Efficiency GAIN</span>
                                </div>
                                <div className="w-[1px] h-10 bg-white/10" />
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-white">99%</span>
                                    <span className="text-[10px] font-bold text-brand-textTertiary uppercase tracking-widest">Automated Tasks</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Small Card: Systems Architecture */}
                    <motion.div 
                        variants={itemVariants}
                        className="md:col-span-4 p-8 bg-brand-card rounded-[40px] border border-white/5 flex flex-col justify-between group hover:border-brand-yellow/30 transition-all duration-500"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-yellow mb-6">
                                <Layers size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Swiss-Grade <br/> Quality</h3>
                            <p className="text-brand-textSecondary text-sm font-medium leading-relaxed">
                                Robust, typed, and modular systems inspired by Swiss precision. Scalability is baked into the foundation.
                            </p>
                        </div>
                        <div className="pt-8 flex flex-wrap gap-2">
                            {['Scalable', 'Modular', 'Secure'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-brand-textTertiary uppercase tracking-tighter border border-white/10">{tag}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Small Card: Code Excellence */}
                    <motion.div 
                        variants={itemVariants}
                        className="md:col-span-4 p-8 bg-brand-card rounded-[40px] border border-white/5 group hover:border-brand-yellow/30 transition-all duration-500 flex flex-col justify-center items-center text-center italic"
                    >
                        <div className="w-20 h-20 rounded-full bg-brand-yellow text-black flex items-center justify-center mb-6">
                            <Terminal size={32} className="stroke-[2.5px]" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2 underline decoration-brand-yellow/30 underline-offset-4">Clean. Tested. Secure.</h4>
                        <p className="text-brand-textTertiary text-xs font-bold uppercase tracking-[0.2em]">The Senior Standard</p>
                    </motion.div>

                    {/* Wide Card: Product Strategy */}
                    <motion.div 
                        variants={itemVariants}
                        className="md:col-span-8 p-10 bg-brand-card rounded-[40px] border border-white/5 flex flex-col lg:flex-row items-center gap-10 group hover:border-brand-yellow/30 transition-all duration-500"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6 text-brand-yellow">
                                <Workflow size={24} />
                                <span className="font-bold uppercase tracking-[0.3em] text-[10px]">Product Partner</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4 italic tracking-tight">Building <span className="text-brand-yellow">Investible Assets.</span></h3>
                            <p className="text-brand-textSecondary text-base font-medium leading-relaxed">
                                I don't just build features; I build value. My architecture is designed to pass technical audits and scale with your growth.
                            </p>
                        </div>
                        <div className="w-full lg:w-[250px] space-y-4">
                            {[
                                { icon: <Shield size={16} />, label: 'Technical Audit Ready' },
                                { icon: <Rocket size={16} />, label: 'Fast Time-to-Market' },
                                { icon: <Database size={16} />, label: 'Data Sovereignty' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-brand-yellow/20 transition-all">
                                    <div className="text-brand-yellow">{item.icon}</div>
                                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* 03. The Elite Workflow Visualization */}
                <div className="mb-24 lg:mb-32">
                    <div className="text-center mb-16">
                        <h3 className="text-brand-yellow font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Elite Execution Workflow</h3>
                        <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight italic">From vision to <span className="underline decoration-brand-yellow">automated reality.</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        {[
                            { step: '01', title: 'Architect', desc: 'Strategic planning, schema design, and AI workflow mapping.', icon: <Binary /> },
                            { step: '02', title: 'Deploy', desc: 'Rapid development using agents and senior-tier engineering.', icon: <Code2 /> },
                            { step: '03', title: 'Scale', desc: 'Performance optimization and automated maintenance layer.', icon: <Zap /> },
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center relative z-10"
                            >
                                <div className="w-20 h-20 rounded-full bg-brand-card border border-white/10 flex items-center justify-center text-brand-yellow mb-8 hover:scale-110 transition-transform duration-500 shadow-xl">
                                    {(item.icon as any)}
                                </div>
                                <h4 className="text-brand-yellow font-bold text-xs uppercase tracking-[0.3em] mb-4">Step {item.step}</h4>
                                <h5 className="text-2xl font-bold text-white mb-3 tracking-wide">{item.title}</h5>
                                <p className="text-brand-textTertiary text-sm font-medium leading-relaxed max-w-xs">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 04. Technical Stack Showcase */}
                <div className="py-20 border-y border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                        {techStack.map((stack, i) => (
                            <div key={i} className="space-y-8">
                                <h4 className="text-brand-yellow font-bold uppercase tracking-[0.3em] text-[10px] italic">{stack.category}</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    {stack.tools.map((tool, j) => (
                                        <div key={j} className="flex items-center gap-4 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow/30 group-hover:bg-brand-yellow group-hover:scale-150 transition-all duration-300" />
                                            <span className="text-white/60 font-medium text-sm group-hover:text-white transition-colors">{tool}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Call to Action */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 lg:mt-32 p-12 lg:p-20 bg-brand-yellow rounded-[40px] text-black text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-8 italic relative z-10">Ready to build the <br/> <span className="underline decoration-black/20">next legacy?</span></h2>
                    <button 
                        onClick={() => window.location.href = '/onboard'}
                        className="bg-black text-white px-12 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl relative z-10 flex items-center gap-4 mx-auto"
                    >
                        Start Your Brief
                        <ArrowUpRight size={24} />
                    </button>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
