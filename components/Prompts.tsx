import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Sparkles, Image as ImageIcon, Zap } from 'lucide-react';
import './Prompts.css';
import './Wallpapers.css'; // Reutilizando tipografia do ttuilo

const Prompts: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dados de Exemplo (Você pode substituir pelas suas fotos reais no /public)
  const promptList = [
    {
      id: '1',
      category: 'Realistic',
      image: 'https://images.unsplash.com/photo-1675125211995-1811568ca984?q=80&w=1000&auto=format&fit=crop',
      prompt: 'Ultra-realistic 8k portrait of a futuristic warrior, intricate obsidian armor, neon amber accents, rain falling, moody lighting, shot on 35mm lens, high contrast.',
      model: 'Flux.1'
    },
    {
      id: '2',
      category: 'Cyberpunk',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop',
      prompt: 'Cyberpunk city street at night, neon signs in japanese, flying cars, rain reflecting on asphalt, cinematic atmosphere, blade runner aesthetic, highly detailed.',
      model: 'Midjourney v6'
    },
    {
      id: '3',
      category: 'Portrait',
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
      prompt: 'Symmetric digital art portrait of a cyborg woman, transparent skin revealing golden circuits, liquid gold tears, black background, minimal, hyper-detailed.',
      model: 'DALL-E 3'
    }
  ];


  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="prompts-container w-full pb-20">
      {/* Page Header Area */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
          }
        }}
        className="mb-12"
      >
        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 30, filter: 'blur(20px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hub-title"
        >
          PROMPT <span>HUB</span>
        </motion.h1>
      </motion.section>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {promptList.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="prompt-card"
            >
              {/* Image Header */}
              <div className="prompt-image-wrapper">
                <img src={item.image} alt="AI Generation" className="prompt-image" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                  <Sparkles size={10} className="text-brand-yellow" />
                  <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">{item.model}</span>
                </div>
              </div>

              {/* Content Area */}
              <div className="prompt-content">
                <span className="prompt-tag">{item.category}</span>
                <div className="prompt-text-area custom-scrollbar">
                  {item.prompt}
                </div>

                <button 
                  onClick={() => handleCopy(item.id, item.prompt)}
                  className={`btn-copy-prompt ${copiedId === item.id ? 'copied' : ''}`}
                >
                  {copiedId === item.id ? (
                    <>
                      <Check size={16} />
                      Prompt Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy System Prompt
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Prompts;
