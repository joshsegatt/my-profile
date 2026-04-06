import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TechRays from './TechRays';

const TEXTS = ['digital experiences', 'intelligent automation', 'production-ready apps'];

const Hero: React.FC = () => {
    const [index, setIndex] = useState(0);
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                        Hi, I'm Josh Segat 👋
                    </h1>
                    <div className="flex flex-col gap-2">
                        <span className="text-brand-yellow text-xl lg:text-2xl font-bold uppercase tracking-[0.1em]">
                            AI-Powered Senior Developer
                        </span>
                        {/* The Animation preserved from original design */}
                        <div className="h-[1.2em] overflow-hidden relative w-full font-bold text-white/40 text-lg lg:text-xl">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    Crafting {TEXTS[index]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-brand-textSecondary text-base lg:text-lg leading-relaxed max-w-xl font-medium"
                >
                    I engineer high-performance web applications that prioritize speed, quality, and clean architecture. 
                    Specializing in React, TypeScript, and intelligent AI-driven workflows for world-class digital products.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-4"
                >
                    <button 
                        onClick={() => navigate('/about')}
                        className="bg-brand-yellow text-black px-10 py-4 rounded-full font-bold text-[14px] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,193,7,0.2)] flex items-center gap-2 group"
                    >
                        Learn More
                        <ArrowDown size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>

            {/* Portrait Image (Right) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative flex-shrink-0"
            >
                {/* High-Level Animated Rays */}
                <TechRays />

                {/* Image Background Glow */}
                <div className="absolute -inset-4 bg-brand-yellow/10 blur-[60px] pointer-events-none rounded-full" />
                
                <div className="relative w-[300px] h-[300px] lg:w-[450px] lg:h-[350px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                        src="/hero-portrait.jpg" 
                        alt="Josh Segat" 
                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                    />
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;
