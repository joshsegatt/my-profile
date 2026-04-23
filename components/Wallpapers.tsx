import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Maximize2, X, ChevronRight, RefreshCw, Search, Sparkles, ImageOff } from 'lucide-react';
import { createPortal } from 'react-dom';
import { CURATED_WALLPAPERS, Wallpaper } from '../data/wallpapersData';
import './Wallpapers.css';

const WallpaperCard: React.FC<{ wp: any, onPreview: (wp: any) => void }> = ({ wp, onPreview }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className="group relative rounded-3xl overflow-hidden border border-white/5 bg-[#080808] transition-all duration-300 hover:border-brand-yellow/30 cursor-pointer aspect-[16/10]"
      onClick={() => !error && onPreview(wp)}
    >
      {!error ? (
        <>
          <img src={wp.thumbs.small} alt="bg" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-10 scale-110" />
          <img 
            src={wp.thumbs.large} 
            alt={wp.id} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setError(true)}
          />
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/[0.02]">
          <ImageOff size={24} className="text-white/10" />
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Node Connectivity Offline</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="text-[8px] font-black text-brand-yellow uppercase tracking-widest mb-1.5 block drop-shadow-md">{wp.source === 'CURATED' ? '★ SELECTION' : 'GLOBAL NODE'}</span>
            <h3 className="text-[13px] font-black text-white tracking-tight uppercase truncate drop-shadow-md">NODE_{wp.id.substring(0, 10)}</h3>
          </div>
          {!error && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={12} className="text-brand-yellow" /><span className="text-[9px] font-bold text-white/80 uppercase">View</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Wallpapers: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Curated');
  const [searchQuery, setSearchQuery] = useState('');
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [previewWp, setPreviewWp] = useState<any | null>(null);
  const [displayCount, setDisplayCount] = useState(9);

  const categories = [
    { id: 'Curated', label: '★ SELECTION' },
    { id: 'Tech', label: 'TECH NOIR' },
    { id: 'Minimal', label: 'MINIMAL ARCH' }
  ];

  const filterWallpapers = useCallback(() => {
    setLoading(true);
    let filtered = CURATED_WALLPAPERS.map(w => ({ ...w, source: 'CURATED' }));
    
    if (selectedCategory) {
      filtered = filtered.filter(w => w.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = CURATED_WALLPAPERS.filter(w => 
        w.category.toLowerCase().includes(q) || 
        w.id.toLowerCase().includes(q)
      ).map(w => ({ ...w, source: 'MATCHED' }));
    }

    // Sort to keep the order consistent
    setWallpapers(filtered);
    setLoading(false);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    setDisplayCount(9);
    filterWallpapers();
  }, [selectedCategory, filterWallpapers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedCategory('');
      filterWallpapers();
    }
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulation of a fetch for UX feel
    setTimeout(() => {
      setDisplayCount(prev => prev + 9);
      setLoadingMore(false);
    }, 400);
  };

  const visibleWallpapers = wallpapers.slice(0, displayCount);

  return (
    <div className="wallpapers-container w-full pb-20">
      <section className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div><h1 className="hub-title !mb-2">ASSET <span>HUB</span></h1><p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Proprietary Elite Asset Node</p></div>
          <form onSubmit={handleSearch} className="relative flex-1 max-w-2xl group"><Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-yellow transition-colors" size={18} /><input type="text" placeholder="SEARCH ASSET REPOSITORY..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-[12px] font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-brand-yellow/50 focus:bg-white/[0.08] transition-all" /></form>
        </div>
        <div className="flex flex-wrap gap-3">{categories.map((cat) => (<button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }} className={`flex items-center gap-2 px-10 py-4.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${selectedCategory === cat.id ? 'bg-brand-yellow border-brand-yellow text-black' : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:border-white/20'}`}>{cat.id === 'Curated' && <Sparkles size={12} />} {cat.label}</button>))}</div>
      </section>

      <div className="grid gap-8 min-h-[500px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? Array.from({ length: 6 }).map((_, i) => (<div key={`skel-${i}`} className="rounded-3xl bg-white/5 border border-white/10 animate-pulse aspect-[16/10]" />)) : visibleWallpapers.map((wp, idx) => (<WallpaperCard key={`${wp.id}-${idx}`} wp={wp} onPreview={setPreviewWp} />))}
      </div>

      {visibleWallpapers.length < wallpapers.length && (
        <div className="mt-20 flex justify-center">
          <button onClick={handleLoadMore} disabled={loading || loadingMore} className="group px-20 py-7 rounded-2xl bg-white/5 border border-white/10 text-white text-[12px] font-black uppercase tracking-[0.5em] hover:bg-white/10 hover:border-brand-yellow transition-all flex items-center gap-6 active:scale-95 shadow-2xl shadow-black disabled:opacity-50">
            {loadingMore ? <><RefreshCw size={20} className="animate-spin text-brand-yellow" /> Synchronizing Assets...</> : <>Expand Repository <ChevronRight size={20} className="group-hover:translate-x-3 transition-transform text-brand-yellow" /></>}
          </button>
        </div>
      )}

      {previewWp && createPortal(<AnimatePresence><PreviewModal wp={previewWp} onClose={() => setPreviewWp(null)} /></AnimatePresence>, document.body)}
    </div>
  );
};

const PreviewModal: React.FC<{ wp: any, onClose: () => void }> = ({ wp, onClose }) => {
  const [loading, setLoading] = useState(true);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative max-w-[90vw] w-full max-h-[90vh] bg-[#0a0a0a] rounded-[3rem] overflow-hidden border border-white/10 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)]" onClick={e => e.stopPropagation()}>
        <button className="absolute top-8 right-8 z-50 p-5 rounded-full bg-black/40 text-white/60 hover:text-white transition-all border border-white/10 backdrop-blur-md" onClick={onClose}><X size={24} /></button>
        <div className="flex-1 min-h-0 relative flex items-center justify-center bg-black/20">{loading && <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]"><RefreshCw size={32} className="animate-spin text-brand-yellow" /></div>}<img src={wp.path} alt="Source" className="max-w-full max-h-[75vh] object-contain" onLoad={() => setLoading(false)} /></div>
        <div className="p-10 bg-[#0d0d0d] border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"><div className="flex-1"><h4 className="text-3xl font-black text-white uppercase tracking-tighter">ELITE ASSET NODE</h4><p className="text-white/40 text-[11px] font-mono uppercase mt-2 tracking-[0.3em]">{wp.resolution} Master Quality</p></div><a href={wp.path} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-12 py-6 bg-white text-black rounded-2xl text-[13px] font-black uppercase tracking-[0.3em] hover:bg-brand-yellow transition-all flex items-center justify-center gap-4 shadow-xl"><Download size={22} /> DOWNLOAD SOURCE</a></div>
      </motion.div>
    </motion.div>
  );
};

export default Wallpapers;
