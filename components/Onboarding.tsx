import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../utils/i18n';
import { 
    Cpu, Globe, Layout, Zap, ArrowRight, ArrowLeft, 
    CheckCircle2, Clock, DollarSign, Wallet, Star, Rocket, Mail, User
} from 'lucide-react';
import { submitInquiry } from '../utils/emailService';
import OnboardingBackground from './ui/OnboardingBackground';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

// Haptic Magnetic Card Component for "Senior" feel
const HapticCard = ({ children, onClick, active }: { children: React.ReactNode, onClick: () => void, active?: boolean }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`group p-6 bg-white/[0.03] border rounded-[32px] transition-all text-left flex items-start gap-5 relative overflow-hidden ${
                active ? 'border-brand-yellow/60 bg-brand-yellow/[0.02]' : 'border-white/10 hover:border-brand-yellow/30'
            }`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-yellow group-hover:scale-110 transition-transform shadow-2xl">
                {children[0 as keyof typeof children]}
            </div>
            <div style={{ transform: "translateZ(10px)" }} className="relative z-10">
                {children[1 as keyof typeof children]}
            </div>
        </motion.button>
    );
};

const Onboarding: React.FC = () => {
    const [step, setStep] = useState<Step>(1);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        projectType: '',
        goal: '',
        timeline: '',
        budget: '',
        name: '',
        email: ''
    });

    const nextStep = () => setStep(prev => (prev + 1) as Step);
    const prevStep = () => setStep(prev => (prev - 1) as Step);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        
        const success = await submitInquiry({
            name: formData.name,
            email: formData.email,
            subject: `Onboarding: ${formData.projectType} for ${formData.name}`,
            details: {
                project_type: formData.projectType,
                primary_goal: formData.goal,
                timeline_expectation: formData.timeline,
                budget_range: formData.budget,
                client_name: formData.name,
                client_email: formData.email
            }
        });

        if (success) {
            setStatus('success');
            setStep(6);
        } else {
            setStatus('error');
        }
    };

    const containerVariants = {
        initial: { opacity: 0, scale: 0.96, filter: 'blur(10px)' },
        visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, scale: 1.04, filter: 'blur(10px)' }
    };

    return (
        <section className="py-12 lg:py-24 relative min-h-[700px] flex flex-col items-center overflow-hidden">
            <OnboardingBackground />

            <div className="max-w-4xl mx-auto w-full relative z-10 px-6">
                
                {/* Senior Progress Header */}
                {step < 6 && (
                    <div className="mb-16 flex flex-col items-center">
                        <div className="flex gap-2.5 mb-6 relative">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <div 
                                    key={s}
                                    className="relative h-[4px] w-14 rounded-full overflow-hidden bg-white/5"
                                >
                                    <motion.div 
                                        initial={false}
                                        animate={{ width: step >= s ? '100%' : '0%' }}
                                        transition={{ duration: 0.8, ease: "circOut" }}
                                        className="h-full bg-brand-yellow relative"
                                    >
                                        {step === s && (
                                            <motion.div 
                                                animate={{ x: ['-100%', '200%'] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 bg-white/40 blur-sm"
                                            />
                                        )}
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-3 overflow-hidden h-6">
                            <h2 className="text-white/30 font-bold text-[10px] uppercase tracking-[0.4em]">
                                PASSO
                            </h2>
                            <AnimatePresence mode="wait">
                                <motion.span 
                                    key={step}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="text-brand-yellow font-black text-xs"
                                >
                                    0{step}
                                </motion.span>
                            </AnimatePresence>
                            <h2 className="text-white/30 font-bold text-[10px] uppercase tracking-[0.4em]">
                                DE 05 DO ONBOARDING
                            </h2>
                        </div>
                    </div>
                )}

                <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[48px] border border-white/10 p-8 lg:p-14 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                    <AnimatePresence mode="wait">
                        
                        {/* Step 1: Project Type */}
                        {step === 1 && (
                            <motion.div key="step1" variants={containerVariants} initial="initial" animate="visible" exit="exit" className="space-y-10" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                <div className="text-center">
                                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-4 italic tracking-tight leading-[1.0] uppercase">{t('onboarding.step1.question')}</h3>
                                    <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[11px]">{t('onboarding.step1.sub')}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {[
                                        { id: 'saas', icon: <Cpu />, label: t('onboarding.step1.saas'), desc: t('onboarding.step1.saas_desc') },
                                        { id: 'ai', icon: <Star />, label: t('onboarding.step1.ai'), desc: t('onboarding.step1.ai_desc') },
                                        { id: 'web', icon: <Globe />, label: t('onboarding.step1.web'), desc: t('onboarding.step1.web_desc') },
                                        { id: 'custom', icon: <Layout />, label: t('onboarding.step1.custom'), desc: t('onboarding.step1.custom_desc') },
                                    ].map(type => (
                                        <HapticCard key={type.id} onClick={() => { setFormData({ ...formData, projectType: type.label }); nextStep(); }} active={formData.projectType === type.label}>
                                            {type.icon}
                                            <div><h4 className="text-white font-black mb-1 uppercase tracking-tight text-[15px]">{type.label}</h4><p className="text-white/30 text-[11px] font-bold leading-tight">{type.desc}</p></div>
                                        </HapticCard>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Goal */}
                        {step === 2 && (
                            <motion.div key="step2" variants={containerVariants} initial="initial" animate="visible" exit="exit" className="space-y-10" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                <div className="text-center">
                                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-4 italic tracking-tight leading-[1.0] uppercase">{t('onboarding.step2.question')}</h3>
                                    <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[11px]">{t('onboarding.step2.sub')}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {[
                                        { id: 'growth', icon: <Rocket />, label: t('onboarding.step2.growth'), desc: t('onboarding.step2.growth_desc') },
                                        { id: 'brand', icon: <Zap />, label: t('onboarding.step2.brand'), desc: t('onboarding.step2.brand_desc') },
                                        { id: 'efficiency', icon: <Cpu />, label: t('onboarding.step2.efficiency'), desc: t('onboarding.step2.efficiency_desc') },
                                        { id: 'legacy', icon: <Clock />, label: t('onboarding.step2.legacy'), desc: t('onboarding.step2.legacy_desc') },
                                    ].map(goal => (
                                        <HapticCard key={goal.id} onClick={() => { setFormData({ ...formData, goal: goal.label }); nextStep(); }} active={formData.goal === goal.label}>
                                            {goal.icon}
                                            <div><h4 className="text-white font-black mb-1 uppercase tracking-tight text-[15px]">{goal.label}</h4><p className="text-white/30 text-[11px] font-bold leading-tight">{goal.desc}</p></div>
                                        </HapticCard>
                                    ))}
                                </div>
                                <button onClick={prevStep} className="flex items-center gap-2 text-white/20 hover:text-white transition-all mx-auto text-[10px] font-black uppercase tracking-[0.3em]"><ArrowLeft size={14} /> Retornar</button>
                            </motion.div>
                        )}

                        {/* Step 3: Timeline */}
                        {step === 3 && (
                            <motion.div key="step3" variants={containerVariants} initial="initial" animate="visible" exit="exit" className="space-y-10" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                <div className="text-center">
                                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-4 italic tracking-tight leading-[1.0] uppercase">{t('onboarding.step3.question')}</h3>
                                    <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[11px]">{t('onboarding.step3.sub')}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'asap', label: t('onboarding.step3.asap') },
                                        { id: 'short', label: t('onboarding.step3.short') },
                                        { id: 'mid', label: t('onboarding.step3.mid') },
                                        { id: 'long', label: t('onboarding.step3.long') },
                                    ].map(time => (
                                        <motion.button key={time.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setFormData({ ...formData, timeline: time.label }); nextStep(); }} className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-brand-yellow/40 hover:bg-white/[0.08] transition-all text-center text-white font-black uppercase tracking-widest text-sm">{time.label}</motion.button>
                                    ))}
                                </div>
                                <button onClick={prevStep} className="flex items-center gap-2 text-white/20 hover:text-white transition-all mx-auto text-[10px] font-black uppercase tracking-[0.3em]"><ArrowLeft size={14} /> Retornar</button>
                            </motion.div>
                        )}

                        {/* Step 4: Budget */}
                        {step === 4 && (
                            <motion.div key="step4" variants={containerVariants} initial="initial" animate="visible" exit="exit" className="space-y-10" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                <div className="text-center">
                                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-4 italic tracking-tight leading-[1.0] uppercase">{t('onboarding.step4.question')}</h3>
                                    <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[11px]">{t('onboarding.step4.sub')}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 't1', label: t('onboarding.step4.tier1') },
                                        { id: 't2', label: t('onboarding.step4.tier2') },
                                        { id: 't3', label: t('onboarding.step4.tier3') },
                                        { id: 't4', label: t('onboarding.step4.tier4') },
                                    ].map(budget => (
                                        <motion.button key={budget.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setFormData({ ...formData, budget: budget.label }); nextStep(); }} className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-brand-yellow/40 hover:bg-white/[0.08] transition-all text-center text-white font-black uppercase tracking-widest text-sm">{budget.label}</motion.button>
                                    ))}
                                </div>
                                <button onClick={prevStep} className="flex items-center gap-2 text-white/20 hover:text-white transition-all mx-auto text-[10px] font-black uppercase tracking-[0.3em]"><ArrowLeft size={14} /> Retornar</button>
                            </motion.div>
                        )}

                        {/* Step 5: Contact */}
                        {step === 5 && (
                            <motion.div key="step5" variants={containerVariants} initial="initial" animate="visible" exit="exit" className="space-y-10" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                <div className="text-center">
                                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-4 italic tracking-tight leading-[1.0] uppercase">{t('onboarding.step5.question')}</h3>
                                    <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[11px]">{t('onboarding.step5.sub')}</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-yellow transition-colors" size={20} />
                                        <input type="text" required placeholder={t('onboarding.step5.name')} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-[28px] pl-14 pr-6 py-5 text-white outline-none focus:border-brand-yellow/40 focus:bg-white/[0.06] transition-all font-medium" />
                                    </div>
                                    <div className="relative group">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-yellow transition-colors" size={20} />
                                        <input type="email" required placeholder={t('onboarding.step5.email')} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-[28px] pl-14 pr-6 py-5 text-white outline-none focus:border-brand-yellow/40 focus:bg-white/[0.06] transition-all font-medium" />
                                    </div>
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={status === 'loading'} className="w-full bg-brand-yellow text-black font-black py-6 rounded-[28px] hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,184,0,0.15)] uppercase tracking-widest text-[11px]">
                                        {status === 'loading' ? t('onboarding.step5.sending') : t('onboarding.step5.button')} <ArrowRight size={20} className="stroke-[3px]" />
                                    </motion.button>
                                </form>
                                <button onClick={prevStep} className="flex items-center gap-2 text-white/20 hover:text-white transition-all mx-auto text-[10px] font-black uppercase tracking-[0.3em]"><ArrowLeft size={14} /> Retornar</button>
                            </motion.div>
                        )}

                        {/* Step 6: Success */}
                        {step === 6 && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }} className="w-28 h-28 rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(255,184,0,0.2)]"><CheckCircle2 size={56} /></motion.div>
                                <h3 className="text-5xl font-black text-white mb-6 italic tracking-tight uppercase leading-[0.9]">{t('onboarding.step6.title')}</h3>
                                <p className="text-white/40 text-lg font-bold max-w-md mx-auto mb-14 leading-relaxed tracking-tight">{t('onboarding.step6.sub')}</p>
                                <motion.button whileHover={{ y: -5 }} onClick={() => window.location.href = '/'} className="bg-white/5 border border-white/10 text-white font-black py-5 px-14 rounded-2xl hover:bg-brand-yellow hover:text-black transition-all uppercase tracking-widest text-[11px]">{t('onboarding.step6.button')}</motion.button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Onboarding;
