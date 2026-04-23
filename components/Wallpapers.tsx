import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Monitor, Maximize2, Smartphone, X, ChevronRight, RefreshCw, Shuffle, AlertCircle } from 'lucide-react';
import './Wallpapers.css';

import { createPortal } from 'react-dom';

const WallpaperCard: React.FC<{ wp: any, deviceType: 'desktop' | 'mobile', onPreview: (wp: any) => void }> = ({ wp, deviceType, onPreview }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group relative rounded-3xl overflow-hidden border border-white/5 bg-[#080808] transition-all duration-500 hover:border-brand-yellow/30 cursor-pointer ${deviceType === 'mobile' ? 'aspect-[9/16]' : 'aspect-[16/10]'}`}
      onClick={() => onPreview(wp)}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse z-10" />
      )}

      <img 
        src={wp.thumbs.large} 
        alt={wp.id} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-black text-brand-yellow uppercase tracking-widest mb-1 block">
              {wp.resolution}
            </span>
            <h3 className="text-lg font-black text-white tracking-tight uppercase">
              NODE_{wp.id}
            </h3>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Maximize2 size={12} className="text-white/60" />
              <span className="text-[10px] font-mono text-white/60">4K FEED</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PreviewModal: React.FC<{ wp: any, onClose: () => void }> = ({ wp, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="preview-overlay"
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative max-w-6xl w-full max-h-[90vh] bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button 
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/40 text-white/60 hover:text-white hover:bg-black/60 border border-white/10 transition-all"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Loading State Inside Modal */}
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a] z-40">
            <RefreshCw size={32} className="animate-spin text-brand-yellow" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Syncing Source...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a] z-40 p-8 text-center">
            <AlertCircle size={32} className="text-red-500" />
            <span className="text-sm font-bold text-white">Falha ao carregar fonte 4K</span>
            <p className="text-xs text-white/40 max-w-xs">O servidor da Wallhaven não respondeu. Tente novamente em alguns instantes.</p>
          </div>
        )}

        {/* Main Image Viewport */}
        <div className="w-full h-full overflow-auto flex items-center justify-center bg-black/20">
          <img 
            src={wp.path} 
            alt="Source" 
            className={`max-w-full max-h-[75vh] object-contain transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true); }}
          />
        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-white/5 bg-[#0d0d0d] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-brand-yellow uppercase tracking-widest">Node Resolution</span>
            <div className="flex items-center gap-3">
              <h4 className="text-xl font-black text-white">{wp.resolution}</h4>
              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-white/40">MASTER_REF</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <a 
              href={wp.path} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-brand-yellow transition-all"
            >
              <Download size={18} />
              Get 4K Source
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Wallpapers: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile'>('desktop');
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [previewWp, setPreviewWp] = useState<any | null>(null);

  const categories = ['All', 'Animes', 'Cyberpunk', 'Gaming', 'Landscape', 'Heroes', 'Minimalist', 'Art'];

  const fetchWallpapers = useCallback(async (category: string, pageNum: number = 1, isLoadMore: boolean = false, forceRandom: boolean = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    let query = '';
    switch(category) {
      case 'Animes': query = 'anime'; break;
      case 'Cyberpunk': query = 'cyberpunk futuristic city'; break;
      case 'Gaming': query = 'gaming video games'; break;
      case 'Landscape': query = 'nature landscape 4k'; break;
      case 'Heroes': query = 'marvel dc superhero'; break;
      case 'Minimalist': query = 'minimalism minimalist'; break;
      case 'Art': query = 'digital art illustration'; break;
      default: query = '';
    }

    try {
      const baseUrl = `https://wallhaven.cc/api/v1/search`;
      const params = new URLSearchParams({
        purity: '100',
        sorting: forceRandom ? 'random' : (category === 'All' ? 'toplist' : 'relevance'),
        page: pageNum.toString(),
        ratios: deviceType === 'desktop' ? '16x9,16x10' : '9x16,10x16',
        ...(query && { q: query })
      });

      const wallhavenUrl = `${baseUrl}?${params.toString()}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(wallhavenUrl)}&_=${Date.now()}`;
      
      const response = await fetch(proxyUrl);
      const json = await response.json();
      const data = JSON.parse(json.contents);
      
      if (data && data.data) {
        if (isLoadMore) {
          setWallpapers(prev => [...prev, ...data.data]);
        } else {
          setWallpapers(data.data);
        }
      }
    } catch (error) {
      console.error("Wallhaven API Error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [deviceType]);

  useEffect(() => {
    setPage(1);
    fetchWallpapers(selectedCategory, 1, false);
  }, [selectedCategory, deviceType, fetchWallpapers]);

  const handleRefresh = () => {
    setPage(1);
    fetchWallpapers(selectedCategory, 1, false, true);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchWallpapers(selectedCategory, nextPage, true);
  };

  return (
    <div className="wallpapers-container w-full pb-20">
      {/* Page Header Area */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
          }
        }}
        className="mb-12"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <motion.h1 
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="hub-title !mb-0"
            >
              WALLPAPER <span>HUB</span>
            </motion.h1>
          </div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex items-center gap-4"
          >
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button 
                onClick={() => setDeviceType('desktop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${deviceType === 'desktop' ? 'bg-brand-yellow text-black' : 'text-white/40 hover:text-white'}`}
              >
                <Monitor size={14} />
                Desktop
              </button>
              <button 
                onClick={() => setDeviceType('mobile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${deviceType === 'mobile' ? 'bg-brand-yellow text-black' : 'text-white/40 hover:text-white'}`}
              >
                <Smartphone size={14} />
                Mobile
              </button>
            </div>

            <button 
              onClick={handleRefresh}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-brand-yellow hover:border-brand-yellow/50 transition-all"
              title="Shuffle Wallpapers"
            >
              <Shuffle size={18} />
            </button>
          </motion.div>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="filter-system custom-scrollbar flex overflow-x-auto pb-4 gap-3 no-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-pill whitespace-nowrap ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </motion.section>

      {/* Grid Container */}
      <div className={`grid gap-8 min-h-[400px] ${deviceType === 'mobile' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {loading && wallpapers.length === 0 ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={`skeleton-${i}`} className={`rounded-3xl bg-white/5 animate-pulse border border-white/10 ${deviceType === 'mobile' ? 'aspect-[9/16]' : 'aspect-[16/10]'}`} />
          ))
        ) : (
          <AnimatePresence mode="popLayout">
            {wallpapers.map((wp) => (
              <WallpaperCard key={wp.id} wp={wp} deviceType={deviceType} onPreview={setPreviewWp} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Sync Button */}
      {!loading && wallpapers.length > 0 && (
        <div className="mt-20 flex justify-center">
          <button 
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="group px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:border-brand-yellow/50 transition-all flex items-center gap-4 disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <RefreshCw size={16} className="animate-spin text-brand-yellow" />
                Synchronizing...
              </>
            ) : (
              <>
                Synchronize More Nodes
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-brand-yellow" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Lightbox Preview Modal via Portal */}
      {previewWp && createPortal(
        <AnimatePresence>
          <PreviewModal wp={previewWp} onClose={() => setPreviewWp(null)} />
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Wallpapers;
