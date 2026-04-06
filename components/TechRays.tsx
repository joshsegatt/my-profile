import * as React from 'react';
import { motion } from 'framer-motion';

/**
 * TechRays Component
 * Implements high-level animated SVG paths that trace around the hero portrait.
 */
const TechRays: React.FC = () => {
    // Generate some randomized circuit paths around the container
    // Coordinates are normalized 0-100 for responsive SVG scaling
    const paths = [
        // Top-right corner branch
        "M 85,20 L 95,20 L 95,40",
        // Bottom-left corner branch
        "M 15,80 L 5,80 L 5,60",
        // Top-left vertical flow
        "M 10,10 V 30 L 20,30",
        // Bottom-right horizontal flow
        "M 90,90 H 70 V 80",
        // Floating data line 1
        "M 2,40 V 50 H 12",
        // Floating data line 2
        "M 98,60 V 50 H 88"
    ];

    return (
        <div className="absolute -inset-20 z-0 pointer-events-none select-none opacity-40 mix-blend-screen">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFC107" stopOpacity="0" />
                        <stop offset="50%" stopColor="#FFC107" stopOpacity="1" />
                        <stop offset="100%" stopColor="#FFC107" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {paths.map((d, i) => (
                    <React.Fragment key={i}>
                        {/* Static subtle trace for "circuit board" look */}
                        <path
                            d={d}
                            stroke="#FFC107"
                            strokeWidth="0.2"
                            strokeOpacity="0.1"
                        />
                        
                        {/* Animated conduit pulse */}
                        <motion.path
                            d={d}
                            stroke="url(#rayGradient)"
                            strokeWidth="0.6"
                            filter="url(#glow)"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 1.2],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.8,
                            }}
                        />
                        
                        {/* Moving data node (particle) */}
                        <motion.circle
                            r="0.5"
                            fill="#FFC107"
                            filter="url(#glow)"
                            initial={{ offsetDistance: "0%", opacity: 0 }}
                            animate={{
                                offsetDistance: ["0%", "100%"],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.8,
                            }}
                            style={{
                                offsetPath: `path("${d}")`,
                                offsetRotate: "auto"
                            }}
                        />
                    </React.Fragment>
                ))}
            </svg>
        </div>
    );
};

export default TechRays;
