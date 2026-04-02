import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitInquiry } from '../utils/emailService';

const Contact: React.FC = () => {
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
            subject: `Contact Form: ${formData.name}`,
            message: formData.message,
            details: {
                message_content: formData.message,
                sender_info: `Source: Contact Form`
            }
        });

        if (success) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } else {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-12 lg:py-20 relative">
            <div className="max-w-4xl mx-auto w-full">
                {/* Header Section */}
                <div className="mb-12 text-center lg:text-left">
                    <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                        Start your project <br /> 
                        <span className="text-brand-yellow underline decoration-brand-yellow/30 underline-offset-8">with a Senior Partner.</span>
                    </h2>
                    <p className="text-brand-textSecondary text-base lg:text-lg max-w-2xl font-medium leading-relaxed">
                        I'm available for production-grade software architecture and AI-driven initiatives. 
                        A document summary will be sent to your inbox upon submission.
                    </p>
                </div>

                {/* Contact Form */}
                <div className="bg-brand-card rounded-[32px] border border-white/5 p-8 lg:p-12 relative overflow-hidden group">
                    {/* Decorative glow */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-yellow/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-brand-yellow/20 transition-all duration-500" />
                    
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brand-textTertiary uppercase tracking-[0.2em] ml-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. John Wick"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-yellow/50 focus:ring-4 focus:ring-brand-yellow/5 transition-all text-sm font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brand-textTertiary uppercase tracking-[0.2em] ml-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john@wick.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-yellow/50 focus:ring-4 focus:ring-brand-yellow/5 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-textTertiary uppercase tracking-[0.2em] ml-2">Your Message</label>
                            <textarea
                                required
                                rows={4}
                                placeholder="Tell me about your vision..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-yellow/50 focus:ring-4 focus:ring-brand-yellow/5 transition-all text-sm font-medium resize-none"
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
                                        Send Message
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Notification Toast */}
                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 font-medium text-sm"
                            >
                                <CheckCircle2 size={18} />
                                Inquiry sent! A project overview PDF has been sent to your email.
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="mt-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-400 font-medium text-sm"
                            >
                                <AlertCircle size={18} />
                                Something went wrong. Please try again or reach out directly.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Contact;
