import * as React from 'react';
import { Mail, Send, CheckCircle2, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
    const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
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
                    _subject: "Sidebar Contact Form Submission",
                    ...formData
                })
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setIsSuccess(false), 5000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-12">
            {/* About Me Section */}
            <section>
                <div className="flex items-center gap-2 mb-6 text-brand-yellow">
                    <User size={20} className="stroke-[2.5px]" />
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.2em]">About Me</h3>
                </div>
                <div className="space-y-4">
                    <p className="text-brand-textSecondary text-[14px] leading-relaxed font-medium">
                        I am an AI-Powered Senior Developer specialized in high-performance web applications and production-grade software architecture.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {['React', 'Next.js', 'Typescript', 'AI Workflows', 'Node.js'].map(tech => (
                            <span key={tech} className="px-2.5 py-1 bg-white/[0.03] border border-white/10 rounded-md text-[10px] font-bold text-brand-textTertiary uppercase tracking-wider group hover:border-brand-yellow/30 hover:text-brand-textPrimary transition-all duration-300">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Me Section */}
            <section>
                <div className="flex items-center gap-2 mb-6 text-brand-yellow">
                    <Mail size={20} className="stroke-[2.5px]" />
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.2em]">Contact Me</h3>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <input
                            type="text"
                            required
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-brand-yellow/40 focus:bg-white/[0.05] transition-all text-brand-textPrimary placeholder:text-white/20 font-medium"
                        />
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-brand-yellow/40 focus:bg-white/[0.05] transition-all text-brand-textPrimary placeholder:text-white/20 font-medium"
                        />
                        <textarea
                            rows={4}
                            required
                            placeholder="Message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-brand-yellow/40 focus:bg-white/[0.05] transition-all text-brand-textPrimary placeholder:text-white/20 resize-none font-medium"
                        ></textarea>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting || isSuccess}
                        className="w-full bg-brand-yellow text-black font-bold h-12 rounded-xl text-[14px] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,193,7,0.15)] disabled:opacity-70"
                    >
                        {isSubmitting ? 'Sending...' : isSuccess ? 'Delivered!' : 'Send Message'}
                        {!isSuccess && <Send size={14} className="stroke-[2.5px]" />}
                        {isSuccess && <CheckCircle2 size={16} />}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Sidebar;
