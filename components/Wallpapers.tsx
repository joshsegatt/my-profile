import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Monitor, Maximize2, ShieldCheck, X, ChevronRight } from 'lucide-react';
import './Wallpapers.css';

import { createPortal } from 'react-dom';

const WallpaperCard: React.FC<{ wp: any, onPreview: (wp: any) => void }> = ({ wp, onPreview }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/5 bg-[#080808] transition-all duration-500 hover:border-brand-yellow/30 cursor-pointer"
      onClick={() => onPreview(wp)}
    >
      {/* Internal Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse z-10" />
      )}

      <img 
        src={wp.thumbs.large} 
        alt={wp.id} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-black text-brand-yellow uppercase tracking-widest mb-1 block">
              {wp.resolution}
            </span>
            <h3 className="text-lg font-black text-white tracking-tight uppercase">
              NODE_{wp.id}
            </h3>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Maximize2 size={12} className="text-white/60" />
              <span className="text-[10px] font-mono text-white/60">PREVIEW</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Wallpapers: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [previewWp, setPreviewWp] = useState<any | null>(null);

  const categories = ['All', 'Animes', 'Games', 'Heroes', 'Minimalist'];

  const fetchWallpapers = async (category: string, pageNum: number = 1, isLoadMore: boolean = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    let query = '';
    switch(category) {
      case 'Animes': query = 'anime'; break;
      case 'Games': query = 'gaming'; break;
      case 'Heroes': query = 'marvel dc superhero'; break;
      case 'Minimalist': query = 'minimalism'; break;
      default: query = 'technology';
    }

    try {
      const wallhavenUrl = category === 'All' 
        ? `https://wallhaven.cc/api/v1/search?purity=100&sorting=toplist&page=${pageNum}`
        : `https://wallhaven.cc/api/v1/search?q=${query}&purity=100&sorting=relevance&page=${pageNum}`;

      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(wallhavenUrl)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (isLoadMore) {
        setWallpapers(prev => [...prev, ...data.data]);
      } else {
        setWallpapers(data.data || []);
      }
    } catch (error) {
      console.error("Wallhaven API Error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchWallpapers(selectedCategory, 1, false);
  }, [selectedCategory]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchWallpapers(selectedCategory, nextPage, true);
  };

  return (
    <div className="wallpapers-container w-full pb-20">
      {/* Page Header Area - Cinematic Reveal */}
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
            hidden: { opacity: 0, scale: 0.98 },
            visible: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hub-title"
        >
          WALLPAPER <span>HUB</span>
        </motion.h1>

        {/* Tactical Filter System */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="filter-system"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </motion.section>

      {/* Wallpapers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[800px]">
        {/* API Initial Loading */}
        {loading && wallpapers.length === 0 ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="aspect-[16/10] rounded-3xl bg-white/5 animate-pulse border border-white/10" />
          ))
        ) : (
          <AnimatePresence mode="popLayout">
            {wallpapers.map((wp) => (
              <WallpaperCard key={wp.id} wp={wp} onPreview={setPreviewWp} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Load More Button */}
      {!loading && wallpapers.length > 0 && (
        <div className="mt-16 flex justify-center">
          <button 
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[12px] font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-brand-yellow/50 transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {loadingMore ? 'Syncing...' : 'Load More Nodes'}
            {!loadingMore && <ChevronRight size={16} className="text-brand-yellow" />}
          </button>
        </div>
      )}

      {/* Lightbox Preview Modal via Portal */}
      {previewWp && createPortal(
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="preview-overlay"
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
            onClick={() => setPreviewWp(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="preview-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={previewWp.path} alt="Preview" className="preview-image" />
              <button className="preview-close" onClick={() => setPreviewWp(null)}>
                <X size={24} />
              </button>
              <div className="preview-actions">
                <a href={previewWp.path} target="_blank" rel="noopener noreferrer" className="btn-preview-dl shadow-2xl">
                  <Download size={18} />
                  Download 4K Source
                </a>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Wallpapers;
