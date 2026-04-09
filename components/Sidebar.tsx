import * as React from 'react';
import { Mail, Send, CheckCircle2, User, Github, Linkedin, Instagram, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 16 16" 
        fill="currentColor"
    >
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
);

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
        <div className="flex flex-col gap-10">
            {/* About Me Section */}
            <section>
                <div className="flex items-center gap-2 mb-5 text-brand-yellow">
                    <User size={18} className="stroke-[2.5px]" />
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]">About Me</h3>
                </div>
                <div className="space-y-4">
                    <p className="text-brand-textSecondary text-[13px] leading-relaxed font-medium">
                        I am an AI-Powered Senior Developer specialized in high-performance web applications and production-grade software architecture.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {['React', 'Next.js', 'Typescript', 'AI Workflows', 'Node.js'].map(tech => (
                            <span key={tech} className="px-2.5 py-1 bg-white/[0.03] border border-white/10 rounded-md text-[9px] font-bold text-brand-textTertiary uppercase tracking-wider group hover:border-brand-yellow/30 hover:text-brand-textPrimary transition-all duration-300">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Connect Section - NEW */}
            <section>
                <div className="flex items-center gap-2 mb-5 text-brand-yellow">
                    <Share2 size={18} className="stroke-[2.5px]" />
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]">Connect</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {[
                        { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com/joshsegatt' },
                        { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/feed/' },
                        { icon: <Instagram size={18} />, label: 'Instagram', href: 'https://www.instagram.com/josh_segatt' },
                        { icon: <WhatsAppIcon size={18} />, label: 'WhatsApp', href: 'https://wa.me/447743156438' }
                    ].map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-10 rounded-xl bg-white/[0.03] border border-white/10 text-brand-textTertiary hover:border-brand-yellow/30 hover:text-brand-yellow hover:bg-brand-yellow/5 transition-all duration-300 group"
                            aria-label={social.label}
                        >
                            <span className="group-hover:scale-110 transition-transform duration-300">
                                {social.icon}
                            </span>
                        </a>
                    ))}
                </div>
            </section>

            {/* Contact Me Section */}
            <section>
                <div className="flex items-center gap-2 mb-5 text-brand-yellow">
                    <Mail size={18} className="stroke-[2.5px]" />
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]">Contact Me</h3>
                </div>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <input
                            type="text"
                            required
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-brand-yellow/40 focus:bg-white/[0.05] transition-all text-brand-textPrimary placeholder:text-white/10 font-medium"
                        />
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-brand-yellow/40 focus:bg-white/[0.05] transition-all text-brand-textPrimary placeholder:text-white/10 font-medium"
                        />
                        <textarea
                            rows={3}
                            required
                            placeholder="Message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-brand-yellow/40 focus:bg-white/[0.05] transition-all text-brand-textPrimary placeholder:text-white/10 resize-none font-medium"
                        ></textarea>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting || isSuccess}
                        className="w-full bg-brand-yellow text-black font-bold h-11 rounded-xl text-[13px] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,193,7,0.15)] disabled:opacity-70"
                    >
                        {isSubmitting ? 'Sending...' : isSuccess ? 'Delivered!' : 'Send Message'}
                        {!isSuccess && <Send size={12} className="stroke-[2.5px]" />}
                        {isSuccess && <CheckCircle2 size={14} />}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Sidebar;
