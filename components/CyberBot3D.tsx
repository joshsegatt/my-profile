import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CyberBot3D: React.FC<{ className?: string }> = ({ className = "w-40 h-40" }) => {
  const [eyeState, setEyeState] = useState<'normal' | 'blink' | 'lookLeft' | 'lookRight' | 'happy'>('normal');
  const [isHovered, setIsHovered] = useState(false);

  // Natural blinking cycle while remaining stably in place
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovered) return;
      const rand = Math.random();
      if (rand < 0.4) {
        setEyeState('blink');
        setTimeout(() => setEyeState('normal'), 160);
      } else if (rand < 0.7) {
        setEyeState('lookRight');
        setTimeout(() => setEyeState('lookLeft'), 600);
        setTimeout(() => setEyeState('normal'), 1200);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className={`relative ${className} flex items-center justify-center select-none cursor-pointer group`}
      onMouseEnter={() => {
        setIsHovered(true);
        setEyeState('happy');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setEyeState('normal');
      }}
    >
      {/* ── Soft Ambient Glow Energy Field ── */}
      <div
        className={`absolute w-36 h-36 rounded-full bg-[#FF5A00] blur-2xl pointer-events-none -z-10 transition-opacity duration-500 ${
          isHovered ? 'opacity-35 scale-110' : 'opacity-15 scale-100'
        }`}
      />

      {/* ── Stable Mascot Container (No constant floating loop, smooth micro-hover) ── */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* ── Rich Multi-Stop Shading Gradients ── */}
            {/* Outer Helmet Obsidian Metal */}
            <linearGradient id="botHelmetMain" x1="40" y1="30" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2D2E37" />
              <stop offset="25%" stopColor="#1A1B22" />
              <stop offset="70%" stopColor="#0D0E12" />
              <stop offset="100%" stopColor="#060608" />
            </linearGradient>

            {/* Inner Visor Deep Black OLED Screen */}
            <radialGradient id="botVisorScreen" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#14151C" />
              <stop offset="60%" stopColor="#08080C" />
              <stop offset="100%" stopColor="#030304" />
            </radialGradient>

            {/* Glossy Top Bevel Reflection */}
            <linearGradient id="botGlassReflect" x1="100" y1="40" x2="100" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Ear Cup Rim Gradient */}
            <linearGradient id="botEarRim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3F414D" />
              <stop offset="50%" stopColor="#1E1F26" />
              <stop offset="100%" stopColor="#0C0D11" />
            </linearGradient>

            {/* Rim Light / Edge Highlights */}
            <linearGradient id="botOrangeRim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF7A29" />
              <stop offset="100%" stopColor="#FF5A00" />
            </linearGradient>

            {/* Neon Glow Filter */}
            <filter id="neonEyeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur1" />
              <feGaussianBlur stdDeviation="1.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Drop Shadow Filter */}
            <filter id="botDropShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.65" />
            </filter>
          </defs>

          {/* ── 1. Neck / Collar Support Ring ── */}
          <g filter="url(#botDropShadow)">
            <ellipse cx="100" cy="148" rx="26" ry="7" fill="#121318" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <ellipse cx="100" cy="146" rx="22" ry="5" fill="#0A0A0E" />
            <ellipse cx="100" cy="146" rx="14" ry="3" fill="#FF5A00" opacity="0.8" filter="url(#neonEyeGlow)" />
            <ellipse cx="100" cy="146" rx="8" ry="1.5" fill="#FFFFFF" />
          </g>

          {/* ── 2. Top Antenna with LED Beacon ── */}
          <g>
            {/* Stem */}
            <rect x="98" y="24" width="4" height="16" rx="2" fill="#25262F" stroke="#3A3B47" strokeWidth="0.5" />
            {/* Beacon Base */}
            <circle cx="100" cy="22" r="6" fill="#181920" stroke="#FF5A00" strokeWidth="1" />
            {/* Glowing Bulb */}
            <circle cx="100" cy="22" r="4" fill="#FF5A00" filter="url(#neonEyeGlow)" />
            <circle cx="99" cy="21" r="1.5" fill="#FFFFFF" />
          </g>

          {/* ── 3. Ear Cups / Headset Details ── */}
          {/* Left Ear */}
          <g filter="url(#botDropShadow)">
            <rect x="18" y="70" width="16" height="44" rx="8" fill="url(#botEarRim)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <rect x="22" y="76" width="8" height="32" rx="4" fill="#0D0E12" />
            <circle cx="26" cy="92" r="4.5" fill="#FF5A00" filter="url(#neonEyeGlow)" />
            <circle cx="25.5" cy="91.5" r="1.8" fill="#FFF" />
          </g>
          {/* Right Ear */}
          <g filter="url(#botDropShadow)">
            <rect x="166" y="70" width="16" height="44" rx="8" fill="url(#botEarRim)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <rect x="170" y="76" width="8" height="32" rx="4" fill="#0D0E12" />
            <circle cx="174" cy="92" r="4.5" fill="#FF5A00" filter="url(#neonEyeGlow)" />
            <circle cx="173.5" cy="91.5" r="1.8" fill="#FFF" />
          </g>

          {/* ── 4. Main Helmet Skull (Refined Shading & Metallic Rim) ── */}
          <g filter="url(#botDropShadow)">
            {/* Outer Hull */}
            <rect
              x="30"
              y="38"
              width="140"
              height="112"
              rx="46"
              fill="url(#botHelmetMain)"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1.5"
            />

            {/* Subtle Inner Ambient Shadow */}
            <rect
              x="32"
              y="40"
              width="136"
              height="108"
              rx="44"
              fill="none"
              stroke="rgba(0, 0, 0, 0.6)"
              strokeWidth="2"
            />

            {/* Specular Curved Highlight on Crown */}
            <path
              d="M 54 46 C 80 40, 120 40, 146 46 C 130 52, 70 52, 54 46 Z"
              fill="url(#botGlassReflect)"
            />
          </g>

          {/* ── 5. Curved OLED Digital Visor Screen ── */}
          <g>
            {/* Screen Recess Bevel */}
            <rect
              x="44"
              y="54"
              width="112"
              height="80"
              rx="32"
              fill="#060608"
              stroke="rgba(255, 90, 0, 0.25)"
              strokeWidth="1"
            />
            {/* Screen Glass Surface */}
            <rect
              x="46"
              y="56"
              width="108"
              height="76"
              rx="30"
              fill="url(#botVisorScreen)"
            />

            {/* Visor Glare Crescent */}
            <path
              d="M 56 64 C 80 58, 120 58, 144 64 C 134 70, 66 70, 56 64 Z"
              fill="#FFFFFF"
              opacity="0.1"
            />
          </g>

          {/* ── 6. Expressive High-Definition LED Eyes ── */}
          {eyeState === 'blink' ? (
            /* Blink Laser Bars */
            <g filter="url(#neonEyeGlow)">
              <line x1="68" y1="94" x2="88" y2="94" stroke="#FF5A00" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="112" y1="94" x2="132" y2="94" stroke="#FF5A00" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="72" y1="94" x2="84" y2="94" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
              <line x1="116" y1="94" x2="128" y2="94" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : eyeState === 'happy' ? (
            /* Happy Anime Smile Curves */
            <g filter="url(#neonEyeGlow)">
              <path d="M 65 98 Q 78 80 91 98" stroke="#FF5A00" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              <path d="M 109 98 Q 122 80 135 98" stroke="#FF5A00" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              <path d="M 68 97 Q 78 83 88 97" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M 112 97 Q 122 83 132 97" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>
          ) : eyeState === 'lookRight' ? (
            /* Look Right */
            <g filter="url(#neonEyeGlow)">
              <rect x="75" y="82" width="16" height="24" rx="8" fill="#FF5A00" />
              <rect x="119" y="82" width="16" height="24" rx="8" fill="#FF5A00" />
              <circle cx="83" cy="88" r="3.5" fill="#FFF" />
              <circle cx="127" cy="88" r="3.5" fill="#FFF" />
            </g>
          ) : eyeState === 'lookLeft' ? (
            /* Look Left */
            <g filter="url(#neonEyeGlow)">
              <rect x="65" y="82" width="16" height="24" rx="8" fill="#FF5A00" />
              <rect x="109" y="82" width="16" height="24" rx="8" fill="#FF5A00" />
              <circle cx="69" cy="88" r="3.5" fill="#FFF" />
              <circle cx="113" cy="88" r="3.5" fill="#FFF" />
            </g>
          ) : (
            /* Standard Oval LED Eyes with Depth */
            <g filter="url(#neonEyeGlow)">
              <rect x="69" y="80" width="18" height="26" rx="9" fill="url(#botOrangeRim)" />
              <rect x="113" y="80" width="18" height="26" rx="9" fill="url(#botOrangeRim)" />
              {/* Primary Glint */}
              <circle cx="75" cy="87" r="4" fill="#FFFFFF" />
              <circle cx="119" cy="87" r="4" fill="#FFFFFF" />
              {/* Micro Glint */}
              <circle cx="80" cy="98" r="1.8" fill="#FFFFFF" opacity="0.9" />
              <circle cx="124" cy="98" r="1.8" fill="#FFFFFF" opacity="0.9" />
            </g>
          )}

          {/* Cheerful Blush when Hovered */}
          {isHovered && (
            <g filter="url(#neonEyeGlow)" opacity="0.65">
              <ellipse cx="58" cy="114" rx="6.5" ry="3" fill="#FF5A00" />
              <ellipse cx="142" cy="114" rx="6.5" ry="3" fill="#FF5A00" />
            </g>
          )}
        </svg>

        {/* ── Status Pill ── */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/8 mt-1 backdrop-blur-md transition-colors group-hover:border-[#FF5A00]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-white/60 group-hover:text-white">
            {isHovered ? 'Neural Engine Active' : 'Prompt Synthesizer'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CyberBot3D;
