import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TechRays from './TechRays';

const TEXTS = ['digital experiences', 'intelligent automation', 'production-ready apps'];

const Hero: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % TEXTS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-8 lg:py-12">
            
            {/* Content (Left) */}
            <div className="flex-1 space-y-8 text-left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                >
                    {/* Availability Badge */}
                    <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-yellow/5 border border-brand-yellow/10 w-fit">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow/40"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow"></span>
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-yellow/90">
                            Status: Available for hire
                        </span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-bold tracking-tight text-white leading-[1] font-sans">
                        Design <span className="text-brand-yellow italic">and</span><br />
                        Engineering.
                    </h1>

                    <div className="flex flex-col gap-3">
                        <span className="text-white text-2xl lg:text-3xl font-light tracking-tight opacity-90">
                            Josh Segatt — Senior Tech Architect
                        </span>
                        
                        <div className="h-[1.2em] overflow-hidden relative w-full font-mono text-brand-yellow/40 text-sm lg:text-base tracking-wider uppercase">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0"
                                >
                                    &gt; EXEC_LOG: {TEXTS[index]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    <p className="text-brand-textSecondary text-lg lg:text-xl leading-relaxed max-w-xl font-light">
                        Architecting high-performance digital products where speed meets elite aesthetics. 
                        A bridge between complex engineering and senior product design.
                    </p>

                    {/* Buttons - Figma Style Radius */}
                    <div className="flex flex-wrap items-center gap-5 pt-4">
                        <button 
                            onClick={() => navigate('/contact')}
                            className="relative overflow-hidden bg-brand-yellow text-black px-10 py-4 rounded-[10px] font-bold text-[15px] hover:translate-y-[-2px] active:translate-y-[0] transition-all shadow-[0_20px_40px_rgba(255,193,7,0.15)] flex items-center gap-3 group"
                        >
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                            Let's Build Together
                            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Portrait Image (Right) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative flex-shrink-0"
            >
                {/* Tech Aura Rays (Premium Circuit) */}
                <TechRays isAccelerated={isHovered} />

                {/* Double Rim Light System */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[95%] bg-brand-yellow/10 blur-[80px] pointer-events-none rounded-full" />
                
                <div className="relative w-[340px] h-[400px] lg:w-[500px] lg:h-[600px] flex items-end justify-center">
                    <div className="w-full h-full relative">
                        {/* The Double Rim Effect in CSS */}
                        <img 
                            src="/hero-portrait-final.png" 
                            alt="Josh Segatt" 
                            className="w-full h-full object-contain grayscale-[10%] transition-all duration-700 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] relative z-10" 
                            style={{ 
                                filter: "drop-shadow(0 0 1px rgba(255,193,7,0.8)) drop-shadow(0 0 20px rgba(0,0,0,0.5))" 
                            }}
                        />
                        {/* Reflection Layer */}
                        <div className="absolute inset-0 bg-brand-yellow/5 blur-2xl rounded-full opacity-30 mix-blend-overlay pointer-events-none" />
                    </div>
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;
