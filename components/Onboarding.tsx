import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Cpu, Globe, Layout, Zap, ArrowRight, ArrowLeft, 
    CheckCircle2, Clock, DollarSign, Wallet, Star, Rocket
} from 'lucide-react';
import { submitInquiry } from '../utils/emailService';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const Onboarding: React.FC = () => {
    const [step, setStep] = useState<Step>(1);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        projectType: '',
        goal: '',
        timeline: '',
        budget: '',
        name: '',
        email: ''
    });

    const steps = [
        { id: 1, title: 'Project Type' },
        { id: 2, title: 'Main Goal' },
        { id: 3, title: 'Timeline' },
        { id: 4, title: 'Budget Range' },
        { id: 5, title: 'Contact Details' },
    ];

    const projectTypes = [
        { id: 'saas', icon: <Cpu />, label: 'SaaS Platform', desc: 'Scalable cloud applications' },
        { id: 'ai', icon: <Star />, label: 'AI Integration', desc: 'LLMs, RAG, and automation' },
        { id: 'web', icon: <Globe />, label: 'Premium Website', desc: 'High-end brand presence' },
        { id: 'custom', icon: <Layout />, label: 'Custom Software', desc: 'Tailored enterprise solutions' },
    ];

    const goals = [
        { id: 'growth', label: 'Hyper Growth', desc: 'Driven by conversion & speed' },
        { id: 'brand', label: 'Brand Majesty', desc: 'Elite aesthetics & presence' },
        { id: 'efficiency', label: 'AI Efficiency', desc: 'Automate manual workflows' },
        { id: 'legacy', label: 'Legacy Modernization', desc: 'Rebuild old systems tech' },
    ];

    const timelines = [
        { id: 'asap', icon: <Rocket />, label: 'ASAP', desc: 'Ready to start immediately' },
        { id: '1month', icon: <Clock />, label: '1 - 2 Months', desc: 'Strategic planning phase' },
        { id: 'flexible', icon: <Zap />, label: 'Flexible', desc: 'Quality over speed' },
    ];

    const budgets = [
        { id: 'pro', icon: <Wallet />, label: 'Growth Project', desc: '$5k - $15k range' },
        { id: 'elite', icon: <DollarSign />, label: 'Elite / Enterprise', desc: '$20k+ investment' },
        { id: 'custom', icon: <Star />, label: 'Custom Quote', desc: 'Let\'s define the scope' },
    ];

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
        initial: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <section className="py-12 lg:py-20 relative min-h-[600px] flex flex-col items-center">
            <div className="max-w-4xl mx-auto w-full">
                
                {/* Progress Header */}
                {step < 6 && (
                    <div className="mb-12 flex flex-col items-center">
                        <div className="flex gap-2 mb-4">
                            {steps.map((s) => (
                                <div 
                                    key={s.id}
                                    className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= s.id ? 'bg-brand-yellow' : 'bg-white/10'}`}
                                />
                            ))}
                        </div>
                        <h2 className="text-white font-bold text-sm uppercase tracking-[0.2em] opacity-40">
                            Onboarding Step {step} of 5
                        </h2>
                    </div>
                )}

                <div className="bg-brand-card rounded-[40px] border border-white/5 p-8 lg:p-16 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        
                        {/* Step 1: Project Type */}
                        {step === 1 && (
                            <motion.div key="step1" variants={containerVariants} initial="initial" animate="visible" exit="exit" className="space-y-8">
                                <div className="text-center">
                                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 italic leading-tight">What nature of project <br/> <span className="text-brand-yellow not-italic italic underline">are we architecting?</span></h3>
                                    <p className="text-brand-textSecondary font-medium">Select the primary domain of your vision.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {projectTypes.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => { setFormData({ ...formData, projectType: type.label }); nextStep(); }}
                                            className="group p-6 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-brand-yellow/40 hover:bg-white/[0.05] transition-all text-left flex items-start gap-5"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-yellow group-hover:scale-110 transition-transform">
                                                {type.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold mb-1">{type.label}</h4>
                                                <p className="text-brand-textTertiary text-xs font-medium">{type.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Goal */}
                        {step === 2 && (
                            <motion.div key="step2" variants={containerVariants} initial="initial" animate="visible" exit="exit" className="space-y-8">
                                <div className="text-center">
                                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 italic leading-tight text-brand-yellow underline">Main Objective.</h3>
                                    <p className="text-brand-textSecondary font-medium text-lg">What is the most critical success metric for this deployment?</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {goals.map(goal => (
                                        <button
                                            key={goal.id}
                                            onClick={() => { setFormData({ ...formData, goal: goal.label }); nextStep(); }}
                                            className="group p-8 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-brand-yellow/40 transition-all text-center flex flex-col items-center gap-2"
                                        >
                                            <h4 className="text-white font-bold text-lg">{goal.label}</h4>
                                            <p className="text-brand-textTertiary text-xs font-medium uppercase tracking-[0.1em]">{goal.desc}</p>
                                        </button>
                                    ))}
                                </div>
                                <div className="pt-4 flex justify-center">
                                    <button onClick={prevStep} className="text-brand-textTertiary font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                                        <ArrowLeft size={14} /> Back
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Timeline */}
                        {step === 3 && (
                            <motion.div key="step3" variants={containerVariants} initial="initial" animate="visible" exit="exit" className="space-y-8">
                                <div className="text-center">
                                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 italic tracking-tight">How fast do we <br/> <span className="text-brand-yellow italic underline">need to launch?</span></h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {timelines.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => { setFormData({ ...formData, timeline: t.label }); nextStep(); }}
                                            className="group p-6 bg-white/[0.03] border border-white/10 rounded-3xl hover:border-brand-yellow/40 transition-all flex flex-col items-center text-center gap-4"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-yellow">
                                                {t.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-[14px] mb-1">{t.label}</h4>
                                                <p className="text-brand-textTertiary text-[10px] font-bold uppercase tracking-[0.1em]">{t.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="pt-4 flex justify-center">
                                    <button onClick={prevStep} className="text-brand-textTertiary font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                                        <ArrowLeft size={14} /> Back
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Budget */}
                        {step === 4 && (
                            <motion.div key="step4" variants={containerVariants} initial="initial" animate="visible" exit="exit" className="space-y-8">
                                <div className="text-center">
                                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 italic leading-tight text-brand-yellow underline">Investment Range.</h3>
                                    <p className="text-brand-textSecondary font-medium">This helps in defining the depth and complexity of the architecture.</p>
                                </div>
                                <div className="space-y-4 max-w-md mx-auto">
                                    {budgets.map(b => (
                                        <button
                                            key={b.id}
                                            onClick={() => { setFormData({ ...formData, budget: b.label }); nextStep(); }}
                                            className="group w-full p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-brand-yellow/40 transition-all flex items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-yellow">
                                                    {b.icon}
                                                </div>
                                                <div className="text-left">
                                                    <h4 className="text-white font-bold text-sm">{b.label}</h4>
                                                    <p className="text-brand-textTertiary text-[10px] font-bold uppercase tracking-[0.1em]">{b.desc}</p>
                                                </div>
                                            </div>
                                            <ArrowRight size={18} className="text-brand-yellow opacity-0 group-hover:opacity-100 transition-all" />
                                        </button>
                                    ))}
                                </div>
                                <div className="pt-4 flex justify-center">
                                    <button onClick={prevStep} className="text-brand-textTertiary font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                                        <ArrowLeft size={14} /> Back
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Final Contact */}
                        {step === 5 && (
                            <motion.div key="step5" variants={containerVariants} initial="initial" animate="visible" exit="exit" className="space-y-8">
                                <div className="text-center">
                                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 italic underline decoration-brand-yellow">Last Step.</h3>
                                    <p className="text-brand-textSecondary font-medium">Where should I send the project overview PDF?</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-yellow/50 transition-all text-sm font-medium"
                                    />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Your Work Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-yellow/50 transition-all text-sm font-medium"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full bg-brand-yellow text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {status === 'loading' ? (
                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Deploy Inquiry & Generate PDF
                                                <Rocket size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                                <div className="pt-4 flex justify-center">
                                    <button onClick={prevStep} className="text-brand-textTertiary font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                                        <ArrowLeft size={14} /> Back
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 6: Success */}
                        {step === 6 && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                                <div className="w-24 h-24 rounded-full bg-brand-yellow/20 text-brand-yellow flex items-center justify-center mx-auto mb-8">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-4 italic">Vision Received.</h3>
                                <p className="text-brand-textSecondary text-lg font-medium max-w-md mx-auto mb-10 leading-relaxed">
                                    I've generated your Project Brief PDF and dispatched it to your inbox. I'll reach out within 24 hours to discuss the architecture.
                                </p>
                                <button 
                                    onClick={() => window.location.href = '/'}
                                    className="bg-white/5 border border-white/10 text-white font-bold py-4 px-10 rounded-2xl hover:bg-white/10 transition-all"
                                >
                                    Return Home
                                </button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Onboarding;
