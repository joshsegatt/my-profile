import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
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

    return (
        <section className="w-full py-16 relative overflow-hidden">
            <div className="max-w-[1000px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {/* Left Column: Ideal Partnerships */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#111210]/50 backdrop-blur-sm border border-white/5 p-8 lg:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-brand-yellow/20 transition-all duration-500 rounded-[12px]"
                    >
                        {/* Minimalist Grid Background */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-10 pointer-events-none" />
                        
                        <h3 className="text-lg lg:text-xl font-bold text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-brand-yellow border border-white/10 group-hover:bg-brand-yellow/10 transition-colors duration-500">
                                <Check size={16} className="stroke-[2.5px]" />
                            </span>
                            {t('qualification_home.ideal_title')}
                        </h3>

                        <ul className="space-y-6 relative z-10">
                            {ideal.map((text, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="mt-1.5 min-w-[4px] w-[4px] h-[4px] bg-brand-yellow/80 shadow-[0_0_8px_rgba(255,199,0,0.6)] rounded-full" />
                                    <span className="text-white/80 font-medium text-sm leading-relaxed">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right Column: Not a Good Fit */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#111210]/50 backdrop-blur-sm border border-white/5 p-8 lg:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-red-500/20 transition-all duration-500 rounded-[12px]"
                    >
                        {/* Minimalist Grid Background */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-10 pointer-events-none" />
                        
                        <h3 className="text-lg lg:text-xl font-bold text-white/80 uppercase tracking-tight mb-8 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                            <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-red-500/80 border border-white/10 group-hover:bg-red-500/10 transition-colors duration-500">
                                <X size={16} className="stroke-[2.5px]" />
                            </span>
                            {t('qualification_home.not_fit_title')}
                        </h3>

                        <ul className="space-y-6 relative z-10">
                            {notFit.map((text, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="mt-1.5 min-w-[4px] w-[4px] h-[4px] bg-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.4)] rounded-full" />
                                    <span className="text-white/40 font-medium text-sm leading-relaxed">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 text-center"
                >
                    <p className="text-white/50 text-[11px] font-bold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed border border-white/5 px-6 py-4 rounded-full bg-black/40">
                        {t('qualification_home.footer')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default QualificationSection;
