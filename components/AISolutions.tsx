import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Sparkles, Brain, Zap, Cpu, ArrowRight, 
    BarChart3, Fingerprint, Code2, Network, ChevronRight,
    ShieldCheck, Database
} from 'lucide-react';

const AISolutions: React.FC = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white selection:bg-brand-yellow selection:text-black">
            
            {/* Elite Hero Section - More Compact */}
            <section className="relative min-h-[60vh] flex items-center pt-[160px] pb-12 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        {/* Left Column: Strategic Copy */}
                        <div className="text-left space-y-6 lg:max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-4xl lg:text-5xl font-black tracking-[-0.05em] leading-[0.9] italic">
                                    <span className="block mb-2">A IA não vai substituir</span>
                                    <span className="text-gradient-gold">o seu negócio.</span>
                                    <span className="block text-xl lg:text-3xl mt-4 opacity-80 not-italic tracking-tighter">
                                        Um concorrente usando a <br className="hidden lg:block"/>minha arquitetura vai.
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-white/40 text-sm lg:text-base font-medium tracking-tight leading-relaxed"
                            >
                                Engenharia de Gêmeos Digitais e Sistemas RAG de Alta Performance. 
                                Transformo latência em lucro e dados em agentes autónomos.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col items-start"
                            >
                                <Link
                                    to="/onboarding"
                                    className="cta-button inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-black uppercase tracking-[0.2em] active:scale-95 transition-all shadow-[0_15px_40px_rgba(255,193,7,0.2)]"
                                >
                                    <span className="relative z-10 italic uppercase">Solicitar Avaliação</span>
                                    <ChevronRight size={18} className="arrow-icon relative z-10" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Column: Hero Mockup - Scaled Down */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative lg:max-w-sm mx-auto"
                        >
                            <div className="relative z-10 rounded-[24px] overflow-hidden border border-white/10 bg-black/40 shadow-2xl border-beam-neon skeleton-pulse aspect-video lg:aspect-auto">
                                <img 
                                    src="/assets/images/mockup_hero.png" 
                                    alt="AI Command Center Mockup" 
                                    {...(true ? { fetchpriority: "high" } as any : {})}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Technical Section - More Compact Layout */}
            <section className="py-12 lg:py-24 container mx-auto px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Mockup Column - Scaled Down */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative lg:max-w-sm mx-auto order-2 lg:order-1"
                    >
                        <div className="relative z-10 rounded-[24px] overflow-hidden border border-white/5 bg-[#0A0A0A] shadow-xl border-beam-neon skeleton-pulse aspect-video lg:aspect-auto">
                            <img 
                                src="/assets/images/mockup_rag.png" 
                                alt="RAG Knowledge Base Mockup" 
                                loading="lazy"
                                className="w-full h-auto object-cover opacity-90"
                            />
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="space-y-2">
                            <h2 className="text-[9px] font-black text-brand-yellow uppercase tracking-[0.5em]">The Core Engine</h2>
                            <h3 className="text-2xl lg:text-4xl font-black italic tracking-tighter text-white leading-tight">Arquitetura de <br/>Soberania de Dados.</h3>
                        </div>
                        <p className="text-white/40 text-sm font-medium leading-relaxed max-w-md">
                            Sistemas RAG que permitem à sua IA conversar com dados proprietários em ambientes SOC2 protegidos.
                        </p>
                        <div className="grid grid-cols-1 gap-3 pt-2">
                            {[
                                { icon: <Database size={16} />, title: "Enterprise RAG", desc: "Vector DB Connectivity." },
                                { icon: <ShieldCheck size={16} />, title: "Private Compute", desc: "Local or SOC2 Clouds." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-brand-yellow/20 transition-all">
                                    <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-white font-black uppercase tracking-widest text-[8px]">{item.title}</h4>
                                        <p className="text-white/30 text-[10px] font-medium leading-tight">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tight Bento Grid: Elite Capabilities */}
            <section className="container mx-auto px-6 mb-24">
                <div className="text-center mb-12 space-y-2">
                    <h2 className="text-[9px] font-black text-brand-yellow uppercase tracking-[0.5em]">Capabilities</h2>
                    <h3 className="text-xl lg:text-3xl font-black italic tracking-tighter">O Arsenal Técnico.</h3>
                </div>
                
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto"
                >
                    {[
                        { 
                            icon: <Brain size={20} />, 
                            title: "Digital Twins", 
                            desc: "Automação de vendas baseada na sua inteligência de negócio."
                        },
                        { 
                            icon: <Network size={20} />, 
                            title: "Autonomous Agents", 
                            desc: "Pipelines que executam tarefas complexas entre ferramentas."
                        },
                        { 
                            icon: <Code2 size={20} />, 
                            title: "Custom LLMs", 
                            desc: "Fine-tuning de modelos para casos de uso específicos."
                        }
                    ].map((card, i) => (
                        <motion.div 
                            key={i}
                            variants={cardVariants}
                            whileHover={{ y: -4 }}
                            className="p-6 rounded-[24px] bg-white/[0.01] border border-white/5 hover:border-brand-yellow/20 transition-all duration-500 group border-beam-neon"
                        >
                            <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow mb-6">
                                {card.icon}
                            </div>
                            <h4 className="text-lg font-black italic text-white mb-3 tracking-tighter">{card.title}</h4>
                            <p className="text-white/40 text-xs font-medium leading-relaxed">{card.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Investment Section - Compact Conversion */}
            <section className="container mx-auto px-6 pb-24">
                <div className="max-w-3xl mx-auto rounded-[32px] p-8 lg:p-12 relative overflow-hidden text-center bg-white/[0.01] border border-white/5 border-beam-neon">
                    <div className="relative z-10 space-y-8">
                        <div className="space-y-3">
                            <h2 className="text-2xl lg:text-5xl font-black italic tracking-tighter leading-[0.9]">Não é um custo. <br/><span className="text-brand-yellow">É a sua vantagem.</span></h2>
                            <p className="text-white/30 text-[8px] font-bold uppercase tracking-[0.4em]">Investment Profile: High-Tier B2B Strategy</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Link 
                                to="/onboarding" 
                                className="cta-button inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-black uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl"
                            >
                                <span className="relative z-10 italic uppercase">Technical Audit Gratuita</span>
                                <ChevronRight size={18} className="arrow-icon relative z-10" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Minimal */}
            <footer className="container mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-4 text-white/20 text-[8px] font-black uppercase tracking-[0.4em]">
                    <span>&copy; 2026 JOSH SEGATT AI</span>
                </div>
            </footer>
        </div>
    );
};

export default AISolutions;
