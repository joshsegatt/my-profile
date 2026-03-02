
import * as React from 'react';
import { Mail, MapPin, Send, Globe, Github, Linkedin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="bg-brand-hero h-screen flex flex-col pt-28 pb-8 px-6 lg:px-12 overflow-hidden relative">
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch max-h-[480px]">

                    {/* Contact Info (4 Columns) - Micro Scale */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full">
                        <div className="space-y-3">
                            {/* Email Card */}
                            <div className="group bg-white border border-black/[0.03] rounded-[20px] p-4 lg:p-5 shadow-[0_10px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700">
                                <div className="w-8 h-8 rounded-lg bg-brand-hero flex items-center justify-center mb-2.5 border border-black/[0.02]">
                                    <Mail className="text-brand-black" size={16} />
                                </div>
                                <p className="text-brand-textTertiary text-[8px] font-bold uppercase tracking-wider mb-0.5">Email me at</p>
                                <a href="mailto:josh@segat.io" className="text-brand-black text-sm font-bold hover:text-brand-textSecondary transition-colors">
                                    josh@segat.io
                                </a>
                            </div>

                            {/* Location Card */}
                            <div className="group bg-white border border-black/[0.03] rounded-[20px] p-4 lg:p-5 shadow-[0_10px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700">
                                <div className="w-8 h-8 rounded-lg bg-brand-hero flex items-center justify-center mb-2.5 border border-black/[0.02]">
                                    <MapPin className="text-brand-black" size={16} />
                                </div>
                                <p className="text-brand-textTertiary text-[8px] font-bold uppercase tracking-wider mb-0.5">Location</p>
                                <p className="text-brand-black text-sm font-bold">
                                    Switzerland / Remote
                                </p>
                            </div>
                        </div>

                        {/* Social Links - Micro */}
                        <div className="flex gap-2.5 mt-4">
                            {[
                                { icon: <Twitter size={14} />, href: "#" },
                                { icon: <Linkedin size={14} />, href: "#" },
                                { icon: <Github size={14} />, href: "#" },
                                { icon: <Globe size={14} />, href: "#" },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className="w-9 h-9 rounded-lg bg-white border border-black/[0.03] flex items-center justify-center text-brand-textSecondary hover:text-brand-black hover:shadow-sm transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form (8 Columns) - Professional Density */}
                    <div className="lg:col-span-8 h-full">
                        <div className="bg-white border border-black/[0.03] rounded-[24px] p-6 lg:p-7 shadow-[0_20px_40px_rgba(0,0,0,0.08)] h-full flex flex-col justify-center">
                            <form className="space-y-3.5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                    <div className="space-y-1">
                                        <label className="text-brand-textTertiary text-[8px] font-bold uppercase tracking-widest ml-3">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Jane Doe"
                                            className="w-full bg-brand-hero border border-black/[0.02] rounded-lg px-4 py-2 outline-none focus:border-black/5 transition-colors text-brand-black font-medium text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-brand-textTertiary text-[8px] font-bold uppercase tracking-widest ml-3">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="jane@example.com"
                                            className="w-full bg-brand-hero border border-black/[0.02] rounded-lg px-4 py-2 outline-none focus:border-black/5 transition-colors text-brand-black font-medium text-xs"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-brand-textTertiary text-[8px] font-bold uppercase tracking-widest ml-3">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Project Inquiry"
                                        className="w-full bg-brand-hero border border-black/[0.02] rounded-lg px-4 py-2 outline-none focus:border-black/5 transition-colors text-brand-black font-medium text-xs"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-brand-textTertiary text-[8px] font-bold uppercase tracking-widest ml-3">Message</label>
                                    <textarea
                                        rows={2}
                                        placeholder="Tell me about your vision..."
                                        className="w-full bg-brand-hero border border-black/[0.02] rounded-xl px-4 py-2.5 outline-none focus:border-black/5 transition-colors text-brand-black font-medium resize-none text-xs"
                                    ></textarea>
                                </div>

                                <button className="w-full md:w-auto bg-brand-black text-white px-6 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md group text-[11px] mt-1 relative overflow-hidden">
                                    <span className="relative z-10">Send Message</span>
                                    <Send size={12} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
