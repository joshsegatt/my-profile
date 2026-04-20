import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TOOLS_CONFIG } from '@/data/toolsData';

const ShowcaseGallery: React.FC = () => {
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">Neural Showcase</h3>
        <span className="text-[10px] text-brand-yellow/60 font-mono">{TOOLS_CONFIG.showcase.length} High-Res Captures</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS_CONFIG.showcase.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group/item relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] cursor-zoom-in"
            onClick={() => setZoomedImg(s.img)}
          >
            <img 
              src={s.img} 
              alt={s.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110 group-hover/item:rotate-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 p-4 flex flex-col justify-end gap-1">
              <span className="text-[9px] font-bold text-brand-yellow uppercase tracking-widest">{s.tag}</span>
              <h4 className="text-white font-bold text-sm">{s.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {zoomedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md"
            onClick={() => setZoomedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
              onClick={() => setZoomedImg(null)}
            >
              <X size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={zoomedImg}
              className="max-w-full max-h-full object-contain rounded-xl border border-white/10 shadow-2xl"
              alt="Zoomed interface"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShowcaseGallery;
