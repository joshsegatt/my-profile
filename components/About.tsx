import React from 'react';
import { Cpu, Zap, Globe, Layout, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <section id="about" className="bg-brand-hero min-h-screen flex flex-col pt-24 pb-16 px-6 lg:px-12 relative overflow-hidden">
            {/* Background blending */}
            <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-white to-transparent pointer-events-none z-10 opacity-30" />

            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-start lg:pt-10 relative z-20">
                {/* Header Section - Global Tech Minimalist */}
                <div className="mb-8 lg:mb-12">
                    <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-brand-black leading-[1.1] mb-2">
                        AI-Powered Senior Developer <br />
                        <span className="text-brand-textTertiary">Crafting Digital Excellence.</span>
                    </h2>
                </div>

                {/* Bento Grid Layout - High Density / Ultra Clean */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 auto-rows-[minmax(120px,auto)]">

                    {/* Main Story Card */}
                    <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="md:col-span-8 md:row-span-2 group relative overflow-hidden bg-white/90 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 lg:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_24px_48px_rgba(0,0,0,0.08)] cursor-default h-full flex flex-col justify-between"
                    >
                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-black/[0.02] border border-black/[0.03] flex items-center justify-center mb-5 group-hover:bg-brand-black group-hover:text-white transition-colors duration-500 shadow-sm">
                                <Cpu className="text-brand-black group-hover:text-white transition-colors duration-500" size={20} />
                            </div>
                            <h3 className="text-xl lg:text-3xl font-bold text-brand-black mb-3 leading-[1.1] tracking-tighter">
                                Augmenting Creativity <br /> with Artificial Intelligence
                            </h3>
                            <p className="text-brand-textSecondary text-xs lg:text-sm leading-relaxed max-w-xl font-medium opacity-80">
                                As an Elite-level developer, I leverage cutting-edge AI workflows to deliver software that isn't just functional—it's visionary. I provide 10x efficiency with the precision required by world-class clients.
                            </p>
                        </div>
                        <div className="mt-6 flex items-center gap-3 text-brand-textPrimary font-bold group-hover:gap-5 transition-all text-[11px] lg:text-[12px] uppercase tracking-[0.15em]">
                            <span>The Future of Code</span>
                            <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <ArrowUpRight size={14} className="text-brand-black" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Efficiency Metric Card */}
                    <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="md:col-span-4 md:row-span-1 group bg-white/90 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_24px_48px_rgba(0,0,0,0.08)] overflow-hidden relative flex flex-col justify-center cursor-default"
                    >
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <Zap className="text-brand-textTertiary mb-3 group-hover:text-brand-black transition-colors duration-500" size={24} />
                            <div className="text-4xl lg:text-5xl font-bold text-brand-black mb-1 tracking-tighter">10x</div>
                            <p className="text-brand-textTertiary font-bold text-[9px] uppercase tracking-[0.2em]">Efficiency via AI</p>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-zinc-100 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </motion.div>

                    {/* European Market Card */}
                    <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="md:col-span-4 md:row-span-1 group bg-white/90 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_24px_48px_rgba(0,0,0,0.08)] overflow-hidden relative flex items-center gap-5 cursor-default"
                    >
                        <div className="w-12 h-12 rounded-full bg-black/[0.02] border border-black/[0.03] flex items-center justify-center flex-shrink-0 group-hover:bg-brand-black transition-colors duration-500">
                            <Globe className="text-brand-textTertiary group-hover:text-white transition-colors duration-500" size={20} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-brand-black font-bold text-lg mb-0.5 tracking-tight">Swiss Grade</h4>
                            <p className="text-brand-textSecondary text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">Precision Engineering</p>
                        </div>
                    </motion.div>

                    {/* Design Stack Card */}
                    <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="md:col-span-4 md:row-span-1 group bg-white/90 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_24px_48px_rgba(0,0,0,0.08)] overflow-hidden relative flex flex-col justify-center cursor-default"
                    >
                        <div className="relative z-10 flex flex-col items-center w-full">
                            <h4 className="text-brand-textTertiary font-bold text-[9px] uppercase tracking-[0.2em] mb-3">Core Stack</h4>
                            <div className="flex flex-wrap justify-center gap-1.5 w-full">
                                {['Figma', 'Linear', 'Vercel', 'Next.js', 'React', 'Tailwind'].map(tech => (
                                    <span key={tech} className="px-2.5 py-1 bg-black/[0.02] border border-black/[0.03] rounded-md text-[9px] font-bold text-brand-textSecondary group-hover:border-black/[0.08] group-hover:text-brand-black transition-all duration-500 shadow-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Elite Callout Card */}
                    <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="md:col-span-8 md:row-span-1 group bg-brand-black border border-white/10 rounded-[32px] p-6 lg:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_30px_60px_rgba(0,0,0,0.4)] flex items-center justify-between relative overflow-hidden cursor-default"
                    >
                        <div className="relative z-10 max-w-sm">
                            <h3 className="text-white text-xl lg:text-2xl font-bold mb-1.5 tracking-tight group-hover:tracking-tighter transition-all duration-700">Beyond the traditional.</h3>
                            <p className="text-white/40 text-sm font-medium tracking-wide">
                                Scalable &bull; Adaptive &bull; Visionary
                            </p>
                        </div>
                        <div className="relative z-10 hidden lg:block">
                            <div className="w-12 h-12 rounded-full bg-white text-brand-black flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-xl">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                        {/* Animated Decoration */}
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px:16px]" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-1000" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
