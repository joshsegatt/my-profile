import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Monitor, Maximize2, Smartphone, X, ChevronRight, RefreshCw, Shuffle, AlertCircle } from 'lucide-react';
import './Wallpapers.css';

import { createPortal } from 'react-dom';

// Global Cache for Instant Navigation
const wallpaperCache: { [key: string]: any[] } = {};
const prefetchStatus: { [key: string]: boolean } = {};

const WallpaperCard: React.FC<{ wp: any, deviceType: 'desktop' | 'mobile', onPreview: (wp: any) => void }> = ({ wp, deviceType, onPreview }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden border border-white/5 bg-[#080808] transition-all duration-300 hover:border-brand-yellow/30 cursor-pointer ${deviceType === 'mobile' ? 'aspect-[9/16]' : 'aspect-[16/10]'}`}
      onClick={() => onPreview(wp)}
    >
      {/* Container Background as fallback */}
      
      {/* Load Small Thumb first for speed, then swap to large */}
      <img 
        src={wp.thumbs.small} 
        alt="small-thumb"
        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50"
      />

      <img 
        src={wp.thumbs.large} 
        alt={wp.id} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-black text-brand-yellow uppercase tracking-widest mb-1 block">{wp.resolution}</span>
            <h3 className="text-lg font-black text-white tracking-tight uppercase">NODE_{wp.id}</h3>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Maximize2 size={12} className="text-white/60" />
              <span className="text-[10px] font-mono text-white/60">4K FEED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreviewModal: React.FC<{ wp: any, onClose: () => void }> = ({ wp, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="preview-overlay"
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="relative max-w-6xl w-full max-h-[90vh] bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/40 text-white/60 hover:text-white border border-white/10 transition-all" onClick={onClose}><X size={20} /></button>
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a] z-40">
            <RefreshCw size={32} className="animate-spin text-brand-yellow" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Syncing Master Node...</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a] z-40 p-8 text-center">
            <AlertCircle size={32} className="text-red-500" /><span className="text-sm font-bold text-white">Source Failure</span>
          </div>
        )}
        <div className="w-full h-full overflow-auto flex items-center justify-center bg-black/20">
          <img src={wp.path} alt="Source" className={`max-w-full max-h-[75vh] object-contain transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`} onLoad={() => setLoading(false)} onError={() => { setLoading(false); setError(true); }} />
        </div>
        <div className="p-8 border-t border-white/5 bg-[#0d0d0d] flex items-center justify-between">
          <h4 className="text-xl font-black text-white">{wp.resolution}</h4>
          <a href={wp.path} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-black rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-brand-yellow transition-all flex items-center gap-2">
            <Download size={18} /> GET 4K
          </a>
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
    const cacheKey = `${category}-${deviceType}`;
    
    if (!isLoadMore && !forceRandom && wallpaperCache[cacheKey]) {
      setWallpapers(wallpaperCache[cacheKey]);
      setLoading(false);
      return;
    }

    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    let query = '';
    switch(category) {
      case 'Animes': query = 'anime'; break;
      case 'Cyberpunk': query = 'cyberpunk'; break;
      case 'Gaming': query = 'video games'; break;
      case 'Landscape': query = 'landscape nature'; break;
      case 'Heroes': query = 'superhero'; break;
      case 'Minimalist': query = 'minimalism'; break;
      case 'Art': query = 'art'; break;
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
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(wallhavenUrl)}`;
      
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (data && data.data) {
        const result = isLoadMore ? [...wallpapers, ...data.data] : data.data;
        setWallpapers(result);
        if (!forceRandom) wallpaperCache[cacheKey] = result;
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [deviceType, wallpapers]);

  // Agressive Prefetching Logic
  useEffect(() => {
    const prefetch = async () => {
      for (const cat of categories) {
        const key = `${cat}-${deviceType}`;
        if (!prefetchStatus[key] && cat !== selectedCategory) {
          prefetchStatus[key] = true;
          setTimeout(() => fetchWallpapers(cat, 1, false), 500 * categories.indexOf(cat));
        }
      }
    };
    prefetch();
  }, [deviceType]);

  useEffect(() => {
    setWallpapers([]);
    setPage(1);
    fetchWallpapers(selectedCategory, 1, false);
  }, [selectedCategory, deviceType]);

  const handleRefresh = () => {
    setWallpapers([]);
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
      <section className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <h1 className="hub-title !mb-0">WALLPAPER <span>HUB</span></h1>
          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button onClick={() => setDeviceType('desktop')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${deviceType === 'desktop' ? 'bg-brand-yellow text-black' : 'text-white/40 hover:text-white'}`}><Monitor size={14} /> Desktop</button>
              <button onClick={() => setDeviceType('mobile')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${deviceType === 'mobile' ? 'bg-brand-yellow text-black' : 'text-white/40 hover:text-white'}`}><Smartphone size={14} /> Mobile</button>
            </div>
            <button onClick={handleRefresh} className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-brand-yellow transition-all"><Shuffle size={18} /></button>
          </div>
        </div>
        <div className="filter-system custom-scrollbar flex overflow-x-auto pb-4 gap-3 no-scrollbar">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`filter-pill whitespace-nowrap ${selectedCategory === cat ? 'active' : ''}`}>{cat}</button>
          ))}
        </div>
      </section>

      <div 
        key={`grid-${deviceType}`}
        className={`grid gap-8 min-h-[400px] ${deviceType === 'mobile' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
      >
        {loading && wallpapers.length === 0 ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={`skeleton-${i}`} className={`rounded-3xl bg-white/5 border border-white/10 ${deviceType === 'mobile' ? 'aspect-[9/16]' : 'aspect-[16/10]'}`} />
          ))
        ) : (
          wallpapers.map((wp) => (
            <WallpaperCard key={`${wp.id}-${selectedCategory}`} wp={wp} deviceType={deviceType} onPreview={setPreviewWp} />
          ))
        )}
      </div>

      {!loading && wallpapers.length > 0 && (
        <div className="mt-20 flex justify-center">
          <button onClick={handleLoadMore} disabled={loadingMore} className="group px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:border-brand-yellow transition-all flex items-center gap-4 disabled:opacity-50">
            {loadingMore ? <><RefreshCw size={16} className="animate-spin text-brand-yellow" /> Syncing...</> : <>Load More <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-brand-yellow" /></>}
          </button>
        </div>
      )}

      {previewWp && createPortal(<AnimatePresence><PreviewModal wp={previewWp} onClose={() => setPreviewWp(null)} /></AnimatePresence>, document.body)}
    </div>
  );
};

export default Wallpapers;
