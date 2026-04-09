import * as React from 'react';
import { motion } from 'framer-motion';

/**
 * TechRays Component
 * Implements high-level animated SVG paths that trace around the hero portrait.
 */
interface TechRaysProps {
    isAccelerated?: boolean;
}

const TechRays: React.FC<TechRaysProps> = ({ isAccelerated = false }) => {
    // High-precision geometric circuit paths
    const circuits = [
        { d: "M 10,20 L 25,20 L 25,35", dur: 4, delay: 0 },
        { d: "M 90,30 L 75,30 L 75,15", dur: 5, delay: 1 },
        { d: "M 5,60 L 15,60 L 15,75", dur: 4.5, delay: 0.5 },
        { d: "M 95,70 L 85,70 L 85,55", dur: 6, delay: 2 },
        { d: "M 30,5 L 30,15 L 45,15", dur: 7, delay: 1.5 },
        { d: "M 70,95 L 70,85 L 55,85", dur: 5.5, delay: 0.8 },
    ];

    return (
        <div className="absolute -inset-20 z-0 pointer-events-none select-none mix-blend-screen opacity-80">
            {/* Ultra-subtle Dot Grid */}
            <div 
                className="absolute inset-0 opacity-[0.08]" 
                style={{ 
                    backgroundImage: `radial-gradient(#FFC107 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }} 
            />

            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFC107" stopOpacity="0" />
                        <stop offset="50%" stopColor="#FFC107" stopOpacity="1" />
                        <stop offset="100%" stopColor="#FFC107" stopOpacity="0" />
                    </linearGradient>
                    
                    <filter id="premiumGlow">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {circuits.map((circ, i) => {
                    const currentDur = isAccelerated ? circ.dur / 4 : circ.dur;
                    
                    return (
                        <React.Fragment key={i}>
                            {/* Subtle Static Path (The "Guide") */}
                            <path
                                d={circ.d}
                                stroke="#FFC107"
                                strokeWidth="0.3"
                                strokeOpacity="0.1"
                            />
                            
                            {/* Animated Signal Pulse */}
                            <motion.path
                                d={circ.d}
                                stroke="url(#circuitGradient)"
                                strokeWidth="0.8"
                                filter="url(#premiumGlow)"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: [0, 1.2],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: currentDur,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: circ.delay,
                                }}
                            />
                            
                            {/* Data Node (Flashing endpoint) */}
                            <motion.circle
                                r="0.6"
                                fill="#FFC107"
                                filter="url(#premiumGlow)"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1.2, 0.5]
                                }}
                                transition={{
                                    duration: currentDur / 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: circ.delay + (currentDur * 0.4),
                                }}
                                style={{
                                    offsetPath: `path("${circ.d}")`,
                                    offsetDistance: "100%"
                                }}
                            />
                        </React.Fragment>
                    );
                })}
            </svg>
        </div>
    );
};

export default TechRays;
