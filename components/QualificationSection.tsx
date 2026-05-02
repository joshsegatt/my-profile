import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';
import { useLanguage } from '../utils/i18n';

const QualificationSection: React.FC = () => {
    const { t } = useLanguage();

    const ideal = [
        t('qualification_home.ideal1'),
        t('qualification_home.ideal2'),
        t('qualification_home.ideal3'),
    ];

    const notFit = [
        t('qualification_home.not_fit1'),
        t('qualification_home.not_fit2'),
        t('qualification_home.not_fit3'),
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

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section className="w-full py-24 relative overflow-hidden">
            {/* Background Decorative Elements removed to use site default */}


            <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    
                    {/* Left Column: Ideal Partnerships */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -5 }}
                        viewport={{ once: true }}
                        className="group relative"
                    >
                        {/* Gradient Border Backdrop */}
                        <div className="absolute -inset-[1px] bg-gradient-to-b from-brand-yellow/20 to-transparent rounded-[24px] blur-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative h-full bg-[#080808] border border-white/[0.05] p-10 lg:p-12 rounded-[24px] overflow-hidden shadow-2xl transition-all duration-500 group-hover:bg-[#0a0a0a]">
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20 pointer-events-none" />
                            
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow border border-brand-yellow/20 shadow-[0_0_20px_rgba(255,215,0,0.1)] group-hover:scale-110 transition-transform duration-500">
                                    <Check size={24} className="stroke-[2.5px]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-[0.1em] leading-tight">
                                        {t('qualification_home.ideal_title')}
                                    </h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <Sparkles size={10} className="text-brand-yellow" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-yellow/50">High-Impact Flow</span>
                                    </div>
                                </div>
                            </div>

                            <motion.ul 
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-6 relative z-10"
                            >
                                {ideal.map((text, idx) => (
                                    <motion.li key={idx} variants={itemVariants} className="flex items-start gap-5 group/item">
                                        <div className="mt-2 min-w-[6px] w-[6px] h-[6px] bg-brand-yellow shadow-[0_0_12px_rgba(255,199,0,1)] rounded-full group-hover/item:scale-150 transition-transform duration-300" />
                                        <span className="text-white/70 font-bold text-[13px] leading-relaxed group-hover/item:text-white transition-colors duration-300">
                                            {text}
                                        </span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </motion.div>

                    {/* Right Column: Not a Good Fit */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -5 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group relative"
                    >
                        {/* Gradient Border Backdrop */}
                        <div className="absolute -inset-[1px] bg-gradient-to-b from-red-500/20 to-transparent rounded-[24px] blur-[1px] opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
                        
                        <div className="relative h-full bg-[#080808] border border-white/[0.05] p-10 lg:p-12 rounded-[24px] overflow-hidden shadow-2xl transition-all duration-500 group-hover:bg-[#0a0a0a]">
                             {/* Texture Overlay */}
                             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20 pointer-events-none" />

                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)] group-hover:scale-110 transition-transform duration-500">
                                    <X size={24} className="stroke-[2.5px]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white/80 uppercase tracking-[0.1em] leading-tight group-hover:text-white transition-colors duration-500">
                                        {t('qualification_home.not_fit_title')}
                                    </h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <ShieldAlert size={10} className="text-red-500/50" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500/40">Alignment Warning</span>
                                    </div>
                                </div>
                            </div>

                            <motion.ul 
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-6 relative z-10"
                            >
                                {notFit.map((text, idx) => (
                                    <motion.li key={idx} variants={itemVariants} className="flex items-start gap-5 group/item">
                                        <div className="mt-2 min-w-[6px] w-[6px] h-[6px] bg-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.3)] rounded-full group-hover/item:bg-red-500 transition-colors duration-300" />
                                        <span className="text-white/30 font-bold text-[13px] leading-relaxed group-hover/item:text-white/50 transition-colors duration-300">
                                            {text}
                                        </span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Disclaimer */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block relative">
                        {/* Glow effect for footer */}
                        <div className="absolute -inset-4 bg-brand-yellow/5 blur-2xl rounded-full opacity-50" />
                        
                        <p className="relative z-10 text-brand-yellow/50 text-[10px] font-black uppercase tracking-[0.25em] max-w-xl mx-auto leading-relaxed border border-brand-yellow/10 px-10 py-5 rounded-full bg-black/60 backdrop-blur-md shadow-2xl">
                            {t('qualification_home.footer')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default QualificationSection;

