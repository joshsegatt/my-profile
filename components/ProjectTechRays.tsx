import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProjectTechRays
 * A localized version of TechRays optimized for project cards.
 */
interface ProjectTechRaysProps {
    isActive: boolean;
}

export const ProjectTechRays: React.FC<ProjectTechRaysProps> = ({ isActive }) => {
    // Precise paths that hug the card corners and edges
    const cardCircuits = [
        { d: "M 0,20 L 5,20 L 5,5 L 20,5", dur: 1.5, delay: 0 },
        { d: "M 100,80 L 95,80 L 95,95 L 80,95", dur: 1.8, delay: 0.2 },
        { d: "M 5,60 L 5,75 L 15,75", dur: 2, delay: 0.5 },
        { d: "M 95,40 L 95,25 L 85,25", dur: 1.6, delay: 0.8 },
    ];

    return (
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                    >
                        <svg
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="cardCircuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFC107" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#FFC107" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#FFC107" stopOpacity="0" />
                                </linearGradient>
                                
                                <filter id="cardGlow">
                                    <feGaussianBlur stdDeviation="0.8" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {cardCircuits.map((circ, i) => (
                                <React.Fragment key={i}>
                                    {/* Animated Path */}
                                    <motion.path
                                        d={circ.d}
                                        stroke="url(#cardCircuitGradient)"
                                        strokeWidth="0.8"
                                        filter="url(#cardGlow)"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: [0, 1.2],
                                            opacity: [0, 1, 0],
                                        }}
                                        transition={{
                                            duration: circ.dur,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: circ.delay,
                                        }}
                                    />
                                    
                                    {/* Pulsating Endpoint */}
                                    <motion.circle
                                        r="0.8"
                                        fill="#FFC107"
                                        filter="url(#cardGlow)"
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0.8, 1.5, 0.8]
                                        }}
                                        transition={{
                                            duration: circ.dur / 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: circ.delay + (circ.dur * 0.4),
                                        }}
                                        style={{
                                            offsetPath: `path("${circ.d}")`,
                                            offsetDistance: "100%"
                                        }}
                                    />
                                </React.Fragment>
                            ))}
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
