import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, Mail, User, MessageSquare, 
    CheckCircle2, XCircle, ArrowRight, AlertCircle
} from 'lucide-react';
import { useLanguage } from '../utils/i18n';
import { submitInquiry } from '../utils/emailService';

const Contact: React.FC = () => {
    const { t } = useLanguage();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const success = await submitInquiry({
            name: formData.name,
            email: formData.email,
            subject: `Direct Inquiry from ${formData.name}`,
            message: formData.message,
            details: {
                source: "Direct Contact Form"
            }
        });

        if (success) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="py-24 lg:py-36 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
                    
                    {/* Left side: Heading */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-brand-yellow font-bold uppercase tracking-[0.3em] text-[10px]"
                            >
                                <span className="w-8 h-[1px] bg-brand-yellow" />
                                <span>{t('nav.contact')}</span>
                            </motion.div>
                            <h2 className="text-4xl lg:text-[42px] font-extrabold text-white leading-[1.1] italic tracking-tighter">
                                {t('contact.title')}
                            </h2>
                            <p className="text-brand-textSecondary text-lg font-medium max-w-lg">
                                {t('contact.subhead')}
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 text-brand-textTertiary group hover:text-white transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-black transition-all">
                                    <Mail size={18} />
                                </div>
                                <span className="text-sm font-bold">josuesegatofilho@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Form */}
                    <form onSubmit={handleSubmit} className="lg:w-1/2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brand-textTertiary uppercase tracking-[0.2em] ml-2">
                                    {t('contact.labels.name')}
                                </label>
                                <input
                                    type="text" required
                                    placeholder={t('contact.placeholders.name')}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-yellow/50 transition-all text-sm font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brand-textTertiary uppercase tracking-[0.2em] ml-2">
                                    {t('contact.labels.email')}
                                </label>
                                <input
                                    type="email" required
                                    placeholder={t('contact.placeholders.email')}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-yellow/50 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-textTertiary uppercase tracking-[0.2em] ml-2">
                                {t('contact.labels.message')}
                            </label>
                            <textarea
                                required rows={4}
                                placeholder={t('contact.placeholders.message')}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-yellow/50 transition-all text-sm font-medium resize-none"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full lg:w-auto bg-brand-yellow text-black font-bold py-4 px-10 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale group"
                            >
                                {status === 'loading' ? (
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {t('contact.button')}
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Notification Toast */}
                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 font-medium text-sm">
                                    <CheckCircle2 size={18} />
                                    {t('contact.success')}
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="mt-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400 font-medium text-sm">
                                    <AlertCircle size={18} />
                                    {t('contact.error')}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
