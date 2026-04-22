import React from 'react';
import { motion } from 'framer-motion';

const OnboardingBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base Grid */}
            <div 
                className="absolute inset-0 opacity-[0.03]" 
                style={{ 
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), 
                                     linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} 
            />

            {/* Neural Nodes (Animated Blobs) */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[120px]"
            />
            
            <motion.div 
                animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.05, 0.15, 0.05],
                    x: [0, -40, 0],
                    y: [0, 60, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"
            />

            {/* Scanning Light Sweep */}
            <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-[-20deg]"
            />
        </div>
    );
};

export default OnboardingBackground;
