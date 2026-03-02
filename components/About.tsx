
import React from 'react';
import { Cpu, Zap, Globe, Layout, ArrowUpRight } from 'lucide-react';

const About: React.FC = () => {
    return (
        <section id="about" className="bg-brand-hero min-h-screen flex flex-col pt-24 pb-16 px-6 lg:px-12">
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-start lg:pt-10">
                {/* Header Section - Global Tech Minimalist */}
                <div className="mb-6 lg:mb-10">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-brand-black leading-tight">
                        AI-Powered Senior Developer <br />
                        <span className="text-brand-textTertiary">Crafting Digital Excellence.</span>
                    </h2>
                </div>

                {/* Bento Grid Layout - High Density / Ultra Clean */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 auto-rows-[minmax(120px,auto)]">

                    {/* Main Story Card */}
                    <div className="md:col-span-8 md:row-span-2 group relative overflow-hidden bg-white border border-black/[0.03] rounded-[24px] p-5 lg:p-7 shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] transition-all duration-700 h-full flex flex-col justify-between">
                        <div className="relative z-10">
                            <div className="w-8 h-8 rounded-lg bg-brand-hero flex items-center justify-center mb-4 border border-black/[0.02] shadow-sm">
                                <Cpu className="text-brand-black" size={18} />
                            </div>
                            <h3 className="text-lg lg:text-xl font-bold text-brand-black mb-2.5 leading-tight tracking-tight">
                                Augmenting Creativity <br /> with Artificial Intelligence
                            </h3>
                            <p className="text-brand-textSecondary text-xs lg:text-sm leading-relaxed max-w-xl opacity-80">
                                As an Elite-level developer, I leverage cutting-edge AI workflows to deliver software that isn't just functional—it's visionary. I provide 10x efficiency with the precision required by world-class clients.
                            </p>
                        </div>
                        <div className="mt-3 flex items-center gap-3 text-brand-black font-bold group-hover:gap-5 transition-all text-[10px] lg:text-[11px] uppercase tracking-wider">
                            <span>The Future of Code</span>
                            <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                                <ArrowUpRight size={12} className="group-hover:rotate-45 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* Efficiency Metric Card */}
                    <div className="md:col-span-4 md:row-span-1 group bg-white border border-black/[0.03] rounded-[24px] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] transition-all duration-700 overflow-hidden relative flex flex-col justify-center">
                        <div className="relative z-10">
                            <Zap className="text-brand-textTertiary mb-2 group-hover:text-brand-black transition-colors" size={24} />
                            <div className="text-3xl font-bold text-brand-black mb-0.5 tracking-tighter">10x</div>
                            <p className="text-brand-textTertiary font-bold text-[8px] uppercase tracking-[1.5px]">Efficiency via AI</p>
                        </div>
                        <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-brand-hero rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>

                    {/* European Market Card */}
                    <div className="md:col-span-4 md:row-span-1 group bg-white border border-black/[0.03] rounded-[24px] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] transition-all duration-700 overflow-hidden relative flex flex-col justify-center">
                        <div className="relative z-10">
                            <Globe className="text-brand-textTertiary mb-2 group-hover:text-brand-black transition-colors" size={24} />
                            <h4 className="text-brand-black font-bold text-base mb-0 tracking-tight">Swiss Grade</h4>
                            <p className="text-brand-textSecondary text-[10px] font-medium uppercase tracking-tighter opacity-70">Precision Engineering.</p>
                        </div>
                    </div>

                    {/* Design Stack Card */}
                    <div className="md:col-span-4 md:row-span-1 group bg-white border border-black/[0.03] rounded-[24px] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] transition-all duration-700 overflow-hidden relative flex flex-col justify-center">
                        <div className="relative z-10">
                            <Layout className="text-brand-textTertiary mb-2 group-hover:text-brand-black transition-colors" size={24} />
                            <h4 className="text-brand-black font-bold text-sm mb-1.5 tracking-tight">Stack</h4>
                            <div className="flex flex-wrap gap-1">
                                {['Figma', 'Linear', 'Vercel', 'Next.js'].map(tech => (
                                    <span key={tech} className="px-1.5 py-0.5 bg-brand-hero border border-black/5 rounded text-[8px] font-bold text-brand-textSecondary group-hover:text-brand-black transition-all shadow-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Elite Callout Card */}
                    <div className="md:col-span-8 md:row-span-1 group bg-brand-black rounded-[24px] p-5 lg:p-7 shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-all duration-700 flex items-center justify-between relative overflow-hidden">
                        <div className="relative z-10 max-w-sm">
                            <h3 className="text-white text-xl font-bold mb-2 leading-tight tracking-tight">Beyond the traditional.</h3>
                            <p className="text-white/30 text-sm font-medium italic">
                                Scalable. Adaptive. Visionary.
                            </p>
                        </div>
                        <div className="relative z-10 hidden lg:block">
                            <div className="w-10 h-10 rounded-full bg-white text-brand-black flex items-center justify-center transform group-hover:scale-110 transition-all duration-700 shadow-lg">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                        {/* Animated Decoration */}
                        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px:12px]" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
