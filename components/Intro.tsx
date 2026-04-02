import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroProps {
    onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
    const [isFinished, setIsFinished] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800); // Wait for exit animation
        }, 3200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden"
                >
                    {/* Atmospheric Depth / Particle Field */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ 
                                    x: Math.random() * window.innerWidth, 
                                    y: Math.random() * window.innerHeight,
                                    opacity: 0 
                                }}
                                animate={{ 
                                    y: [null, Math.random() * -100],
                                    opacity: [0, 0.5, 0] 
                                }}
                                transition={{ 
                                    duration: Math.random() * 3 + 2, 
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                                className="absolute w-[1px] h-[1px] bg-brand-yellow/40 rounded-full"
                            />
                        ))}
                    </div>

                    {/* Scanline / CRT Subtle Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]" />

                    {/* The Focal Point (Strike of Light) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0.8, 1.2, 2],
                            rotate: [0, 45, 90]
                        }}
                        transition={{ duration: 2.5, ease: "circOut" }}
                        className="absolute w-[600px] h-[200px] bg-brand-yellow/10 blur-[120px] -rotate-12 pointer-events-none"
                    />

                    {/* The Signature (3D Text Materialization) */}
                    <div className="relative group text-center">
                        {/* Shadow Layers for 3D Depth */}
                        <motion.h2
                            initial={{ opacity: 0, letterSpacing: '0.8em', filter: 'blur(10px)' }}
                            animate={{ opacity: 1, letterSpacing: '0.4em', filter: 'blur(0px)' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-[40px] md:text-[80px] font-black uppercase text-white selection:bg-brand-yellow tracking-[0.4em] relative z-20"
                            style={{
                                textShadow: `
                                    0 1px 0 #b38700, 
                                    0 2px 0 #997400, 
                                    0 3px 0 #806100, 
                                    0 4px 0 #664d00, 
                                    0 20px 40px rgba(0,0,0,0.6)
                                `
                            }}
                        >
                            Josh Segat
                        </motion.h2>

                        {/* Light Sweep Effect (Chrome/Unreal Strike) */}
                        <motion.div
                            className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '200%' }}
                                transition={{ duration: 2.5, ease: "easeInOut", delay: 1 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg]"
                            />
                        </motion.div>

                        {/* Chromatic Aberration Pulse */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.4, 0] }}
                            transition={{ duration: 0.1, delay: 2.2, repeat: 3 }}
                            className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center"
                        >
                            <h2 className="text-[40px] md:text-[80px] font-black uppercase text-red-500/30 translate-x-1 tracking-[0.4em]">Josh Segat</h2>
                            <h2 className="absolute text-[40px] md:text-[80px] font-black uppercase text-blue-500/30 -translate-x-1 tracking-[0.4em]">Josh Segat</h2>
                        </motion.div>
                        
                        {/* Sub-text Initialization */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.8 }}
                            className="mt-8 flex flex-col items-center gap-2"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="h-[1px] w-12 bg-white/10" />
                                <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em] animate-pulse">
                                    Initializing System UI
                                </span>
                                <div className="h-[1px] w-12 bg-white/10" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Final Flash Trigger */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, delay: 2.8 }}
                        className="absolute inset-0 bg-white z-[100] pointer-events-none"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Intro;
