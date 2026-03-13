
import * as React from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
    const [formData, setFormData] = React.useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://formsubmit.co/ajax/josuesegatofilho@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: formData.subject || "New Portfolio Contact Form Submission",
                    ...formData
                })
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setIsSuccess(false), 5000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="bg-brand-hero min-h-screen flex flex-col pt-28 pb-12 px-6 lg:px-12 relative">
            <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-start lg:pt-10 relative z-10">
                {/* Header Section - High Density */}
                <div className="mb-6 lg:mb-8 text-center">
                    <h2 className="text-2xl lg:text-4xl font-bold tracking-tighter text-brand-black leading-tight mb-2">
                        Let's build the <br />
                        <span className="text-brand-textTertiary">next big thing together.</span>
                    </h2>
                    <p className="text-brand-textSecondary text-xs lg:text-sm max-w-md mx-auto font-medium opacity-70">
                        Available for select AI-powered projects and strategic technical leadership.
                        Based in Europe, working globally.
                    </p>
                </div>

                {/* Contact Content Grid - Ultra Compact */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-stretch">

                    {/* Contact Info (4 Columns) - Micro Scale */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full">
                        <div className="space-y-6 lg:space-y-4">
                            {/* Email Card */}
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="group bg-white/90 backdrop-blur-xl border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_24px_48px_rgba(0,0,0,0.08)] rounded-[32px] p-6 cursor-default"
                            >
                                <div className="w-10 h-10 rounded-xl bg-black/[0.02] border border-black/[0.03] flex items-center justify-center mb-4 group-hover:bg-brand-black transition-colors duration-500 shadow-sm">
                                    <Mail className="text-brand-black group-hover:text-white transition-colors duration-500" size={18} />
                                </div>
                                <p className="text-brand-textTertiary text-[10px] font-bold uppercase tracking-[0.15em] mb-1">Email me at</p>
                                <a href="mailto:josuesegatofilho@gmail.com" className="text-brand-black text-[12px] lg:text-sm font-bold hover:text-brand-textSecondary transition-colors break-all">
                                    josuesegatofilho@gmail.com
                                </a>
                            </motion.div>

                            {/* Location Card */}
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="group bg-white/90 backdrop-blur-xl border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_24px_48px_rgba(0,0,0,0.08)] rounded-[32px] p-6 cursor-default"
                            >
                                <div className="w-10 h-10 rounded-xl bg-black/[0.02] border border-black/[0.03] flex items-center justify-center mb-4 group-hover:bg-brand-black transition-colors duration-500 shadow-sm">
                                    <MapPin className="text-brand-black group-hover:text-white transition-colors duration-500" size={18} />
                                </div>
                                <p className="text-brand-textTertiary text-[10px] font-bold uppercase tracking-[0.15em] mb-1">Location</p>
                                <p className="text-brand-black text-base font-bold">
                                    London, UK
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Contact Form (8 Columns) - Professional Density */}
                    <div className="lg:col-span-8 h-full">
                        <div className="bg-white/90 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 lg:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700 h-full flex flex-col justify-center">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-brand-textTertiary text-[10px] font-bold uppercase tracking-[0.15em] ml-2">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Jane Doe"
                                            className="w-full bg-black/[0.02] border-2 border-transparent rounded-2xl px-5 py-3.5 outline-none focus:border-brand-black focus:bg-white transition-all text-brand-black font-medium text-sm placeholder:text-black/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-brand-textTertiary text-[10px] font-bold uppercase tracking-[0.15em] ml-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="jane@example.com"
                                            className="w-full bg-black/[0.02] border-2 border-transparent rounded-2xl px-5 py-3.5 outline-none focus:border-brand-black focus:bg-white transition-all text-brand-black font-medium text-sm placeholder:text-black/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-brand-textTertiary text-[10px] font-bold uppercase tracking-[0.15em] ml-2">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="Project Inquiry"
                                        className="w-full bg-black/[0.02] border-2 border-transparent rounded-2xl px-5 py-3.5 outline-none focus:border-brand-black focus:bg-white transition-all text-brand-black font-medium text-sm placeholder:text-black/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-brand-textTertiary text-[10px] font-bold uppercase tracking-[0.15em] ml-2">Message</label>
                                    <textarea
                                        rows={3}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell me about your vision..."
                                        className="w-full bg-black/[0.02] border-2 border-transparent rounded-2xl px-5 py-4 outline-none focus:border-brand-black focus:bg-white transition-all text-brand-black font-medium resize-none text-sm placeholder:text-black/20"
                                    ></textarea>
                                </div>

                                <button
                                    disabled={isSubmitting || isSuccess}
                                    className="bg-brand-black text-white px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(0,0,0,0.15)] disabled:opacity-70 disabled:hover:translate-y-0 group text-sm mt-2 relative overflow-hidden disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10">
                                        {isSubmitting ? 'Sending via FormSubmit...' : isSuccess ? 'Delivered!' : 'Send Message'}
                                    </span>
                                    {isSuccess ? (
                                        <CheckCircle2 size={16} className="relative z-10 text-green-400" />
                                    ) : (
                                        <Send size={14} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
