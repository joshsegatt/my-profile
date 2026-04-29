import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { submitIntake, IntakeData } from '../utils/submitIntake';
import { Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const intakeSchema = z.object({
    name: z.string().min(2, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    url: z.string().optional(),
    bottleneck: z.string().min(1, "Selecione o principal gargalo"),
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
        <section className="min-h-screen bg-[#050505] text-white py-24 flex items-center justify-center px-6 relative overflow-hidden">
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
                                    Diagnóstico Técnico de Elite. Preenche os dados abaixo para darmos início ao teu Sprint ($1k - $5k).
                                </p>
                            </div>

                            {submitError && (
                                <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm font-medium">
                                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                    <p>Falha ao estabelecer ligação. Por favor, tenta novamente.</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-white/50 pl-2">Nome Completo *</label>
                                        <input 
                                            {...register("name")} 
                                            disabled={isSubmitting}
                                            className={`w-full bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-2xl px-5 py-4 text-white outline-none focus:bg-white/[0.05] transition-all font-medium placeholder:text-white/20`}
                                            placeholder="Ex: John Doe"
                                        />
                                        {errors.name && <p className="text-red-400 text-xs pl-2">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-white/50 pl-2">Email Corporativo *</label>
                                        <input 
                                            {...register("email")} 
                                            disabled={isSubmitting}
                                            className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-2xl px-5 py-4 text-white outline-none focus:bg-white/[0.05] transition-all font-medium placeholder:text-white/20`}
                                            placeholder="john@empresa.com"
                                        />
                                        {errors.email && <p className="text-red-400 text-xs pl-2">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-white/50 pl-2">Nome do Projeto ou URL (Opcional)</label>
                                    <input 
                                        {...register("url")} 
                                        disabled={isSubmitting}
                                        className={`w-full bg-white/[0.03] border ${errors.url ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-2xl px-5 py-4 text-white outline-none focus:bg-white/[0.05] transition-all font-medium placeholder:text-white/20`}
                                        placeholder="Ex: Minha Startup ou https://meusite.com"
                                    />
                                    {errors.url && <p className="text-red-400 text-xs pl-2">{errors.url.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-white/50 pl-2">Qual é o principal gargalo técnico hoje? *</label>
                                    <select 
                                        {...register("bottleneck")}
                                        disabled={isSubmitting}
                                        className={`w-full bg-[#0a0a0a] border ${errors.bottleneck ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-2xl px-5 py-4 text-white outline-none focus:bg-white/[0.05] transition-all font-medium appearance-none cursor-pointer`}
                                    >
                                        <option value="" disabled hidden>Selecione um gargalo técnico...</option>
                                        <option value="Necessito de integrar IA / Automação">Necessito de integrar IA / Automação</option>
                                        <option value="Performance inaceitável / Tempo de carregamento">Performance inaceitável / Tempo de carregamento</option>
                                        <option value="Refatoração de código / Arquitetura SaaS">Refatoração de código / Arquitetura SaaS</option>
                                        <option value="Construir um MVP do zero">Construir um MVP do zero</option>
                                    </select>
                                    {errors.bottleneck && <p className="text-red-400 text-xs pl-2">{errors.bottleneck.message}</p>}
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-white/50 pl-2">Descreve o problema ou cola um link do Loom (Opcional)</label>
                                    <textarea 
                                        {...register("description")}
                                        disabled={isSubmitting}
                                        rows={4}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-yellow/50 focus:bg-white/[0.05] transition-all font-medium placeholder:text-white/20 resize-none"
                                        placeholder="Breve resumo do projeto..."
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
                                            A validar e enviar...
                                        </>
                                    ) : (
                                        <>Submeter Escopo Técnico</>
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
                                O teu diagnóstico foi submetido com sucesso. Iniciaremos a análise em breve.
                            </p>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                onClick={() => window.location.href = '/'} 
                                className="bg-white/5 border border-white/10 text-white font-black py-4 px-10 rounded-2xl hover:bg-white hover:text-black transition-all uppercase tracking-widest text-[11px]"
                            >
                                Voltar ao Início
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default AsyncIntakeForm;
