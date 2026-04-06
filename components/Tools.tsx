import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Download, Cpu, Shield, Zap, Copy, Check, ExternalLink, Github, X } from 'lucide-react';

const Tools: React.FC = () => {
    const [copied, setCopied] = React.useState(false);
    const [zoomedImg, setZoomedImg] = React.useState<string | null>(null);
    const psCommand = 'iex (irm https://raw.githubusercontent.com/joshsegatt/Segatt-Tools/main/install.ps1)';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(psCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-16 lg:gap-24 animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-yellow">Neural Core Engine</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">v1.7.7 Stable</span>
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight">
                        Segatt <span className="text-brand-yellow">Tools</span>
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                        The ultimate Windows optimization utility. A high-density, performance-driven toolkit featuring local AI diagnostics, batch software management, and one-click system refinement.
                    </p>
                </div>
            </section>

            {/* Main Action Card (PowerShell) */}
            <section className="window-frame bg-brand-window/40 backdrop-blur-xl rounded-3xl p-8 lg:p-12 flex flex-col gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-yellow/10 transition-colors duration-700" />
                
                <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-center gap-3 text-brand-yellow">
                        <Terminal size={20} />
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Instant Launch</h2>
                    </div>
                    <p className="text-white/40 text-sm">Run this command in an administrative PowerShell window to launch the tool instantly without installation.</p>
                </div>

                <div className="relative group/cmd z-10">
                    <div className="bg-black/60 border border-white/5 rounded-2xl p-6 font-mono text-sm overflow-hidden flex items-center justify-between gap-4 transition-all group-hover/cmd:border-brand-yellow/30 group-hover/cmd:bg-black/80">
                        <code className="text-brand-yellow/90 break-all leading-relaxed whitespace-pre-wrap">
                            {psCommand}
                        </code>
                        <button 
                            onClick={copyToClipboard}
                            className="flex-shrink-0 p-3 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow hover:bg-brand-yellow hover:text-black transition-all active:scale-95"
                            title="Copy command"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>
            </section>

            {/* Technical Showcase Gallery */}
            <section className="flex flex-col gap-6">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">Neural Showcase</h3>
                    <span className="text-[10px] text-brand-yellow/60 font-mono">6 High-Res Captures</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: 'Neural Dashboard', img: '/projects/segatt-v177-dashboard.png', tag: 'System Overview' },
                        { title: 'Package Hub', img: '/projects/segatt-v177-installer.png', tag: 'Automation' },
                        { title: 'System Tweaks', img: '/projects/segatt-v177-tweaks.png', tag: 'Performance' },
                        { title: 'Architectural Fixes', img: '/projects/segatt-v177-fixes.png', tag: 'Repair' },
                        { title: 'System Management', img: '/projects/segatt-v177-management.png', tag: 'Controls' },
                        { title: 'Gamer Cleaner', img: '/projects/segatt-v177-cleaner.png', tag: 'Optimization' }
                    ].map((s, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group/item relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] cursor-zoom-in"
                            onClick={() => setZoomedImg(s.img)}
                        >
                            <img 
                                src={s.img} 
                                alt={s.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110 group-hover/item:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 p-4 flex flex-col justify-end gap-1">
                                <span className="text-[9px] font-bold text-brand-yellow uppercase tracking-widest">{s.tag}</span>
                                <h4 className="text-white font-bold text-sm">{s.title}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features & Downloads Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Features List */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 px-2">Core Modules</h3>
                    <div className="flex flex-col gap-3">
                        {[
                            { icon: <Zap size={18} />, title: 'App Installer', desc: 'Batch install 40+ essential apps powered by WinGet.' },
                            { icon: <Shield size={18} />, title: 'System Tweaks', desc: 'Optimize telemetry, bloatware, and deep system privacy.' },
                            { icon: <Cpu size={18} />, title: 'Neural Engine AI', desc: 'On-device LLM inference for local system diagnostics.' }
                        ].map((f, i) => (
                            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                                <div className="p-2.5 rounded-xl bg-brand-yellow/5 text-brand-yellow border border-brand-yellow/10">
                                    {f.icon}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-sm font-bold text-white tracking-wide">{f.title}</h4>
                                    <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Download Section */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30 px-2">Offline Installers</h3>
                    <div className="bg-brand-window/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col gap-4">
                        <a 
                            href="https://github.com/joshsegatt/Segatt-Tools/releases/download/v1.7.7/Segatt.Tools_1.7.7_x64-setup.exe"
                            className="flex items-center justify-between p-5 rounded-2xl bg-brand-yellow text-black font-bold text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <Download size={20} />
                                <span>Download .EXE (v1.7.7)</span>
                            </div>
                            <ExternalLink size={16} className="opacity-40" />
                        </a>
                        
                        <a 
                            href="https://github.com/joshsegatt/Segatt-Tools/releases/download/v1.7.7/Segatt.Tools_1.7.7_x64_en-US.msi"
                            className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm tracking-wide hover:bg-white/10 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <Download size={20} className="text-brand-yellow" />
                                <span>Download .MSI (v1.7.7)</span>
                            </div>
                            <ExternalLink size={16} className="opacity-20" />
                        </a>

                        <div className="h-px bg-white/5 my-2" />

                        <a 
                            href="https://github.com/joshsegatt/Segatt-Tools"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2 text-xs text-white/30 hover:text-brand-yellow transition-colors"
                        >
                            <Github size={14} />
                            <span>View Source on GitHub</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Fullscreen Zoom Modal */}
            <AnimatePresence>
                {zoomedImg && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md"
                        onClick={() => setZoomedImg(null)}
                    >
                        <button 
                            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
                            onClick={() => setZoomedImg(null)}
                        >
                            <X size={24} />
                        </button>
                        <motion.img 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={zoomedImg}
                            className="max-w-full max-h-full object-contain rounded-xl border border-white/10 shadow-2xl"
                            alt="Zoomed interface"
                            onClick={(e) => e.stopPropagation()} // Prevent close when clicking the image itself
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tools;
