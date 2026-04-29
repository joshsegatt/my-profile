import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useLanguage } from '../utils/i18n';

const QualificationFilter: React.FC = () => {
    const { t } = useLanguage();

    const partners = [
        t('qualification.partner1'),
        t('qualification.partner2'),
        t('qualification.partner3'),
    ];

    const notFor = [
        t('qualification.not_for1'),
        t('qualification.not_for2'),
        t('qualification.not_for3'),
    ];

    return (
        <div className="w-full max-w-5xl mx-auto my-32">
            <div className="text-center mb-20">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase mb-6"
                >
                    {t('qualification.title')}
                </motion.h2>
                <div className="w-24 h-1 bg-brand-yellow/30 mx-auto rounded-full overflow-hidden">
                    <motion.div 
                        animate={{ x: ["-100%", "200%"] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full bg-brand-yellow" 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Column 1: Who I Partner With */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#080808] border border-white/5 rounded-[32px] p-8 lg:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-brand-yellow/20 hover:bg-[#0a0a0a] transition-all duration-500"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <h3 className="text-xl lg:text-2xl font-black text-white uppercase tracking-tight mb-10 flex items-center gap-4">
                        <span className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                            <Check size={24} className="stroke-[3px]" />
                        </span>
                        {t('qualification.partner_title')}
                    </h3>

                    <ul className="space-y-8">
                        {partners.map((text, idx) => (
                            <li key={idx} className="flex items-start gap-5">
                                <div className="mt-2 min-w-[6px] w-[6px] h-[6px] rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
                                <span className="text-white/70 font-medium text-sm lg:text-base leading-relaxed">{text}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Column 2: Who This is NOT For */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#080808] border border-red-500/10 rounded-[32px] p-8 lg:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-red-500/30 hover:bg-[#0a0a0a] transition-all duration-500"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <h3 className="text-xl lg:text-2xl font-black text-white uppercase tracking-tight mb-10 flex items-center gap-4">
                        <span className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                            <X size={24} className="stroke-[3px]" />
                        </span>
                        {t('qualification.not_for_title')}
                    </h3>

                    <ul className="space-y-8">
                        {notFor.map((text, idx) => (
                            <li key={idx} className="flex items-start gap-5">
                                <div className="mt-2 min-w-[6px] w-[6px] h-[6px] rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                                <span className="text-white/50 font-medium text-sm lg:text-base leading-relaxed">{text}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default QualificationFilter;
