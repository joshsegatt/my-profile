import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { submitIntake, IntakeData } from '../utils/submitIntake';
import { Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const intakeSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    url: z.string().optional(),
    bottleneck: z.string().min(1, "Select the main bottleneck"),
    description: z.string().optional()
});

type IntakeFormValues = z.infer<typeof intakeSchema>;

const AsyncIntakeForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IntakeFormValues>({
        resolver: zodResolver(intakeSchema)
    });

    const onSubmit = async (data: IntakeFormValues) => {
        setIsSubmitting(true);
        setSubmitError(false);
        const success = await submitIntake(data);
        setIsSubmitting(false);

        if (success) {
            setIsSuccess(true);
        } else {
            setSubmitError(true);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
    };

    return (
        <section className="min-h-screen text-white py-24 flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/[0.02] via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/[0.02] blur-[150px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-3xl w-full relative z-10">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div 
                            key="form"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                            className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 lg:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                        >
                            <div className="mb-12 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 shadow-2xl">
                                    <Lock className="text-brand-yellow w-8 h-8" />
                                </div>
                                <h1 className="text-3xl lg:text-5xl font-black italic tracking-tight uppercase leading-[0.9] mb-4">
                                    Async <span className="text-brand-yellow">Intake</span>
                                </h1>
                                <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[11px] max-w-md mx-auto leading-relaxed">
                                    Elite Technical Diagnostic. Fill in the details below to initiate your Sprint ($1k - $5k).
                                </p>
                            </div>

                            {submitError && (
                                <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm font-medium">
                                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                    <p>Failed to establish connection. Please try again.</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-white/50 pl-2">Full Name *</label>
                                        <input 
                                            {...register("name")} 
                                            disabled={isSubmitting}
                                            className={`w-full bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-2xl px-5 py-4 text-white outline-none focus:bg-white/[0.05] transition-all font-medium placeholder:text-white/20`}
                                            placeholder="e.g. John Doe"
                                        />
                                        {errors.name && <p className="text-red-400 text-xs pl-2">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-white/50 pl-2">Corporate Email *</label>
                                        <input 
                                            {...register("email")} 
                                            disabled={isSubmitting}
                                            className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-2xl px-5 py-4 text-white outline-none focus:bg-white/[0.05] transition-all font-medium placeholder:text-white/20`}
                                            placeholder="john@company.com"
                                        />
                                        {errors.email && <p className="text-red-400 text-xs pl-2">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-white/50 pl-2">Project Name or URL (Optional)</label>
                                    <input 
                                        {...register("url")} 
                                        disabled={isSubmitting}
                                        className={`w-full bg-white/[0.03] border ${errors.url ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-2xl px-5 py-4 text-white outline-none focus:bg-white/[0.05] transition-all font-medium placeholder:text-white/20`}
                                        placeholder="e.g. My Startup or https://mysite.com"
                                    />
                                    {errors.url && <p className="text-red-400 text-xs pl-2">{errors.url.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-white/50 pl-2">What is the main technical bottleneck today? *</label>
                                    <div className="relative group">
                                        <select 
                                            {...register("bottleneck")}
                                            disabled={isSubmitting}
                                            style={{ colorScheme: 'dark' }}
                                            className={`w-full bg-[#0a0a0a] border ${errors.bottleneck ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-2xl px-5 py-4 text-white outline-none focus:bg-white/[0.05] transition-all font-medium appearance-none cursor-pointer pr-12`}
                                        >
                                            <option value="" disabled hidden className="bg-[#0a0a0a]">Select a technical bottleneck...</option>
                                            <option value="Necessito de integrar IA / Automação" className="bg-[#0a0a0a]">I need to integrate AI / Automation</option>
                                            <option value="Performance inaceitável / Tempo de carregamento" className="bg-[#0a0a0a]">Unacceptable performance / Load time</option>
                                            <option value="Refatoração de código / Arquitetura SaaS" className="bg-[#0a0a0a]">Code refactoring / SaaS Architecture</option>
                                            <option value="Construir um MVP do zero" className="bg-[#0a0a0a]">Build an MVP from scratch</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 group-focus-within:text-brand-yellow transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                        </div>
                                    </div>
                                    {errors.bottleneck && <p className="text-red-400 text-xs pl-2">{errors.bottleneck.message}</p>}
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-white/50 pl-2">Describe the problem or paste a Loom link (Optional)</label>
                                    <textarea 
                                        {...register("description")}
                                        disabled={isSubmitting}
                                        rows={4}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-yellow/50 focus:bg-white/[0.05] transition-all font-medium placeholder:text-white/20 resize-none"
                                        placeholder="Brief project summary..."
                                    />
                                </div>

                                <motion.button 
                                    whileHover={!isSubmitting ? { scale: 1.01 } : {}} 
                                    whileTap={!isSubmitting ? { scale: 0.99 } : {}} 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="w-full bg-brand-yellow text-black font-black py-5 rounded-[20px] hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,184,0,0.15)] uppercase tracking-widest text-xs disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:brightness-100 mt-8"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin stroke-[3px]" />
                                            Validating and submitting...
                                        </>
                                    ) : (
                                        <>Submit Technical Scope</>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="success"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-brand-yellow/[0.02] border border-brand-yellow/20 rounded-[32px] p-12 text-center shadow-[0_40px_100px_rgba(255,184,0,0.1)] max-w-2xl mx-auto"
                        >
                            <motion.div 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                transition={{ type: "spring", damping: 12, delay: 0.2 }} 
                                className="w-24 h-24 rounded-[32px] bg-brand-yellow/10 flex items-center justify-center text-brand-yellow mx-auto mb-8 shadow-[0_0_50px_rgba(255,184,0,0.2)]"
                            >
                                <CheckCircle2 size={48} className="stroke-[2.5px]" />
                            </motion.div>
                            <h2 className="text-4xl lg:text-5xl font-black italic tracking-tight uppercase leading-[0.9] mb-6">
                                Scope <span className="text-brand-yellow">Locked.</span>
                            </h2>
                            <p className="text-white/60 text-lg font-medium leading-relaxed max-w-lg mx-auto mb-10">
                                Your diagnostic has been successfully submitted. We will begin the analysis shortly.
                            </p>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                onClick={() => window.location.href = '/'} 
                                className="bg-white/5 border border-white/10 text-white font-black py-4 px-10 rounded-2xl hover:bg-white hover:text-black transition-all uppercase tracking-widest text-[11px]"
                            >
                                Back to Home
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default AsyncIntakeForm;
