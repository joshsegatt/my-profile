import React from 'react';
import { motion } from 'framer-motion';

const MOSAIC_VIDEOS = [
  { url: 'https://cdn.pixabay.com/vimeo/450257404/gaming-49231.mp4?width=640&hash=d374465492d2b8b9b8b9b8b9b8b9b8b9b8b9b8b9', span: 'col-span-2 row-span-2' }, // Main Action
  { url: 'https://cdn.pixabay.com/vimeo/345385623/game-24831.mp4?width=640&hash=8504fa9d96860000000000000000000000000000', span: 'col-span-1 row-span-1' }, // Secondary
  { url: 'https://cdn.pixabay.com/vimeo/548234857/competition-70493.mp4?width=640&hash=4753066600000000000000000000000000000000', span: 'col-span-1 row-span-1' }, // Detail
  { url: 'https://cdn.pixabay.com/vimeo/363847582/technology-28491.mp4?width=640&hash=363847582', span: 'col-span-1 row-span-1' }, // Teardown
  { url: 'https://cdn.pixabay.com/vimeo/450257404/gaming-49231.mp4?width=640&hash=d374465492d2b8b9b8b9b8b9b8b9b8b9b8b9b8b9', span: 'col-span-1 row-span-1' }, // Action 2
];

const GamerMosaic: React.FC = () => {
  return (
    <div className="relative w-full max-w-[600px] aspect-square lg:aspect-[4/3] grid grid-cols-3 grid-rows-3 gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.4)] overflow-hidden group">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-brand-yellow/5 blur-[100px] pointer-events-none" />

      {MOSAIC_VIDEOS.map((vid, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: idx * 0.15 }}
          className={`${vid.span} relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors bg-black`}
        >
          {/* Video Element */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity grayscale-[30%] group-hover:grayscale-0 duration-700"
          >
            <source src={vid.url} type="video/mp4" />
          </video>

          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          
          {/* Internal Scanlines Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </motion.div>
      ))}

      {/* Decorative Badges */}
      <div className="absolute top-8 left-8 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-brand-yellow z-10">
        Live Feed · 1.7.7
      </div>
    </div>
  );
};

export default GamerMosaic;
