import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Zap, Image as ImageIcon, Terminal, 
    Crown, ArrowUpRight, Lock, Sparkles, X, 
    CheckCircle2, ShieldCheck, Globe, ShoppingCart,
    Trash2, CreditCard, ChevronRight, Check, Plus,
    Banknote, Wallet, Download
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../utils/i18n';

interface Product {
    id: string;
    type: 'script' | 'wallpaper' | 'prompt';
    category: string;
    title: string;
    description: string;
    longDescription?: string;
    price: string;
    priceValue: number;
    image: string;
    features: string[];
    isHot?: boolean;
    downloadUrl?: string;
}

interface FlyingMoney {
    id: number;
    x: number;
    y: number;
}

const Store: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'all' | 'script' | 'wallpaper' | 'prompt'>('all');
    const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState<'idle' | 'review' | 'payment' | 'success'>('idle');
    const [flyingMoneys, setFlyingMoneys] = useState<FlyingMoney[]>([]);
    const [showReminder, setShowReminder] = useState(false);
    const cartBtnRef = useRef<HTMLButtonElement>(null);
    const [purchasedItems, setPurchasedItems] = useState<Product[]>([]);
    const [searchParams] = useSearchParams();

    const products: Product[] = useMemo(() => [
        {
            id: 'p1',
            type: 'script',
            category: t('store.tabs.scripts'),
            title: t('store.items.v177.title'),
            description: t('store.items.v177.desc'),
            longDescription: t('store.items.v177.long_desc'),
            price: '$6.49',
            priceValue: 6.49,
            image: '/optimizer_mockup_1776953052268.png',
            features: [
                t('store.items.v177.features.0'),
                t('store.items.v177.features.1'),
                t('store.items.v177.features.2')
            ],
            isHot: true,
            downloadUrl: '/assets/delivery/v177_optimizer.ps1'
        },
        {
            id: 'p2',
            type: 'prompt',
            category: t('store.tabs.prompts'),
            title: t('store.items.bible.title'),
            description: t('store.items.bible.desc'),
            longDescription: t('store.items.bible.long_desc'),
            price: '$9.99',
            priceValue: 9.99,
            image: '/bible_mockup_1776953067628.png',
            features: [
                t('store.items.bible.features.0'),
                t('store.items.bible.features.1'),
                t('store.items.bible.features.2')
            ],
            isHot: true,
            downloadUrl: '/assets/delivery/prompt_bible.md'
        },
        {
            id: 'p3',
            type: 'wallpaper',
            category: t('store.tabs.wallpapers'),
            title: t('store.items.obsidian.title'),
            description: t('store.items.obsidian.desc'),
            longDescription: t('store.items.obsidian.long_desc'),
            price: '$4.99',
            priceValue: 4.99,
            image: '/obsidian_pack_mockup_1776953097546.png',
            features: [
                t('store.items.obsidian.features.0'),
                t('store.items.obsidian.features.1'),
                t('store.items.obsidian.features.2')
            ],
            isHot: false,
            downloadUrl: '/assets/delivery/wallpapers/wallpaper_01.png'
        },
        {
            id: 'p4',
            type: 'script',
            category: t('store.tabs.scripts'),
            title: t('store.items.sdk.title'),
            description: t('store.items.sdk.desc'),
            longDescription: t('store.items.sdk.long_desc'),
            price: '$24.99',
            priceValue: 24.99,
            image: '/sdk_mockup_1776953081899.png',
            features: [
                t('store.items.sdk.features.0'),
                t('store.items.sdk.features.1'),
                t('store.items.sdk.features.2')
            ],
            isHot: true,
            downloadUrl: '/assets/delivery/neural_bridge_sdk.tsx'
        }
    ], [t]);

    // Detection logic for Stripe success/cancel redirects
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('success') === 'true') {
            setCheckoutStep('success');
            // Auto-populate purchased items for the success screen
            setPurchasedItems(products); 
            setCart([]);
        }
    }, [products]);

    const filteredProducts = useMemo(() => 
        activeTab === 'all' 
            ? products 
            : products.filter(p => p.type === activeTab)
    , [activeTab, products]);

    // Timer logic for checkout reminder
    useEffect(() => {
        if (cart.length > 0) {
            setShowReminder(false);
            const timer = setTimeout(() => {
                setShowReminder(true);
            }, 30000); // 30 seconds
            return () => clearTimeout(timer);
        } else {
            setShowReminder(false);
        }
    }, [cart.length]);

    const addToCart = (product: Product, event: React.MouseEvent) => {
        // Trigger money animation
        const newMoney: FlyingMoney = {
            id: Date.now(),
            x: event.clientX,
            y: event.clientY
        };
        setFlyingMoneys(prev => [...prev, newMoney]);
        
        // Remove money element after animation completes
        setTimeout(() => {
            setFlyingMoneys(prev => prev.filter(m => m.id !== newMoney.id));
        }, 1000);

        if (!cart.find(item => item.id === product.id)) {
            setCart([...cart, product]);
            // No auto-open drawer as per request
        }
    };

    const removeFromCart = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((acc, item) => acc + item.priceValue, 0);

    return (
        <section className="py-16 lg:py-28 relative overflow-hidden bg-transparent min-h-screen">
            
            {/* Flying Money Container */}
            <div className="fixed inset-0 pointer-events-none z-[9999]">
                <AnimatePresence>
                    {flyingMoneys.map(money => (
                        <motion.div
                            key={money.id}
                            initial={{ x: money.x, y: money.y, opacity: 1, scale: 1, rotate: 0 }}
                            animate={{ 
                                x: window.innerWidth - 80, 
                                y: window.innerHeight - 80, 
                                opacity: 0.8,
                                scale: 0.5,
                                rotate: 360 
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "backIn" }}
                            className="absolute text-brand-yellow drop-shadow-[0_0_10px_rgba(255,193,7,0.8)]"
                        >
                            <Banknote size={32} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Header: Pure Luxury */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter leading-[0.8]" dangerouslySetInnerHTML={{ __html: t('store.title') }} />
                            <p className="text-white/40 text-sm font-medium tracking-tight max-w-sm">
                                {t('store.subhead')}
                            </p>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-3xl shadow-2xl">
                            {(['all', 'script', 'wallpaper', 'prompt'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`
                                        px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-500
                                        ${activeTab === tab 
                                            ? 'bg-brand-yellow text-black shadow-[0_4px_16px_rgba(255,193,7,0.2)]' 
                                            : 'text-white/30 hover:text-white'}
                                    `}
                                >
                                    {t(`store.tabs.${tab === 'script' ? 'scripts' : tab === 'wallpaper' ? 'wallpapers' : tab === 'prompt' ? 'prompts' : 'all'}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid: Elite Density */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence initial={false}>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ 
                                        layout: { type: "spring", stiffness: 400, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    className="group relative bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-[28px] overflow-hidden hover:border-brand-yellow/40 transition-all duration-700"
                                >
                                    {/* Image Section */}
                                    <div className="aspect-video relative overflow-hidden bg-black">
                                        <img 
                                            src={product.image} 
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1 opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80" />
                                        
                                        {/* Status Tags */}
                                        <div className="absolute top-4 left-4 flex items-center gap-2">
                                            {product.isHot && (
                                                <div className="px-2.5 py-1 bg-brand-yellow/10 border border-brand-yellow/30 backdrop-blur-md rounded-full flex items-center gap-1.5 shadow-2xl">
                                                    <Zap size={8} className="text-brand-yellow" fill="currentColor" />
                                                    <span className="text-[7px] font-black text-brand-yellow uppercase tracking-widest text-[0.6rem]">High Demand</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Quick Category */}
                                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                                            <div className="w-6 h-6 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white/60">
                                                {product.type === 'script' ? <Terminal size={12} /> : product.type === 'wallpaper' ? <ImageIcon size={12} /> : <Sparkles size={12} />}
                                            </div>
                                            <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">{product.category}</span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-4 space-y-4">
                                        <div className="flex justify-between items-start gap-3">
                                            <div className="space-y-0.5">
                                                <h3 className="text-lg font-black text-white italic tracking-tighter leading-tight group-hover:text-brand-yellow transition-colors">{product.title}</h3>
                                                <p className="text-white/40 text-[9px] leading-snug font-medium line-clamp-2 uppercase tracking-wide">
                                                    {product.description}
                                                </p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <div className="text-lg font-black text-white tracking-tighter leading-none">{product.price}</div>
                                                <div className="text-[6px] font-black text-white/20 uppercase tracking-widest mt-1">One-Time</div>
                                            </div>
                                        </div>

                                        {/* Micro Features */}
                                        <div className="flex flex-wrap gap-1">
                                            {product.features.slice(0, 3).map(f => (
                                                <span key={f} className="text-[7px] font-black text-white/30 border border-white/5 px-2 py-0.5 rounded-md bg-white/[0.01] uppercase tracking-widest">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => setPreviewProduct(product)}
                                                className="flex-1 h-10 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                            >
                                                {t('store.button.preview')}
                                                <ArrowUpRight size={12} className="opacity-40" />
                                            </button>
                                            <button 
                                                onClick={(e) => addToCart(product, e)}
                                                className="flex-[1.5] px-4 h-10 bg-brand-yellow rounded-xl text-[10px] font-black uppercase tracking-widest text-black flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_6px_16px_rgba(255,193,7,0.1)] group/btn"
                                            >
                                                {t('store.button.buy')}
                                                <ShoppingCart size={12} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Detailed Vault Cart Button */}
            <AnimatePresence>
                {cart.length > 0 && (
                    <div className="fixed bottom-10 right-10 z-[150] flex flex-col items-end gap-3">
                        {/* 30s Reminder Message */}
                        <AnimatePresence>
                            {showReminder && cart.length > 0 && !isCartOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className="fixed bottom-32 right-8 z-[150] bg-brand-purple text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-[0_15px_40px_rgba(168,85,247,0.5)] flex items-center gap-3 border border-white/20"
                                >
                                    <Sparkles size={14} className="animate-pulse" />
                                    Items ready for checkout protocol
                                    <div className="absolute -bottom-2 right-12 w-4 h-4 bg-brand-purple rotate-45 border-r border-b border-white/20" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            ref={cartBtnRef}
                            initial={{ y: 100, opacity: 0, scale: 0.5 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 100, opacity: 0, scale: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCartOpen(true)}
                            className="h-20 w-20 md:w-auto md:h-16 md:px-6 bg-black border-2 border-brand-yellow text-brand-yellow rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,193,7,0.2)] flex items-center justify-center gap-4 group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-brand-yellow opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" />
                            
                            <motion.div 
                                animate={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="relative"
                            >
                                <Wallet size={24} className="group-hover:scale-110 transition-transform" />
                                <span className="absolute -top-3 -right-3 w-6 h-6 bg-brand-yellow text-black text-[10px] font-black rounded-full flex items-center justify-center border-2 border-black shadow-[0_0_15px_rgba(255,193,7,0.5)]">
                                    {cart.length}
                                </span>
                            </motion.div>

                            <div className="hidden md:flex flex-col items-start leading-none pr-2 border-l border-brand-yellow/20 pl-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Vault Total</span>
                                <span className="text-sm font-black italic tracking-tighter text-white">${cartTotal.toFixed(2)}</span>
                            </div>

                            {/* Animated scanning line */}
                            <motion.div 
                                animate={{ y: ['-100%', '200%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 right-0 h-[1px] bg-brand-yellow/30 blur-[1px]"
                            />
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>

            {/* Cart Drawer: The Mission Control */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 z-[190] bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 z-[200] w-full max-w-md bg-[#020202]/95 backdrop-blur-3xl border-l border-white/5 shadow-[-40px_0_100px_rgba(0,0,0,0.9)] flex flex-col"
                        >
                            {/* Vault Header: High-Tech Security */}
                            <div className="p-8 flex items-center justify-between border-b border-white/[0.03]">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow border border-brand-yellow/20">
                                            <Lock size={18} />
                                        </div>
                                        <motion.div 
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#020202] shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">Secure Vault</h3>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <div className="w-1 h-1 rounded-full bg-brand-yellow/40" />
                                            <p className="text-[8px] font-black text-white/30 tracking-[0.2em] uppercase">AES-256 Encrypted Hub</p>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsCartOpen(false)}
                                    className="group w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-white/20 hover:text-white transition-all hover:bg-white/10"
                                >
                                    <X size={20} className="group-hover:rotate-90 transition-transform" />
                                </button>
                            </div>

                            {/* Item List: Crystal Card Style */}
                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-20">
                                        <div className="w-20 h-20 rounded-3xl border border-dashed border-white flex items-center justify-center mb-6">
                                            <ShoppingCart size={32} />
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">
                                            No assets detected in current vault session.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {cart.map((item, idx) => (
                                            <motion.div 
                                                key={item.id} 
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all group relative"
                                            >
                                                <div className="w-20 h-20 rounded-xl overflow-hidden bg-black border border-white/5 shrink-0">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div className="flex-1 flex flex-col justify-center min-w-0">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <div className="truncate">
                                                            <h4 className="text-[12px] font-black text-white uppercase tracking-tight italic truncate">{item.title}</h4>
                                                            <p className="text-[8px] text-white/30 font-bold uppercase tracking-widest mt-0.5">{item.category}</p>
                                                        </div>
                                                        <button 
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-white/10 hover:text-red-500/80 transition-colors p-1"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="text-brand-yellow font-black text-sm tracking-tighter">${item.priceValue}</div>
                                                        <div className="text-[7px] font-black text-white/10 uppercase tracking-widest">Asset #829{idx}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Digital Receipt Footer */}
                            <div className="p-8 bg-white/[0.02] border-t border-white/[0.03] space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">
                                        <span>Subtotal Logic</span>
                                        <span className="text-white/60">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">
                                        <span>Protocol Fee</span>
                                        <span className="text-green-500/60">FREE</span>
                                    </div>
                                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                                    <div className="flex justify-between items-end pt-2">
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black text-brand-yellow uppercase tracking-[0.3em]">Total Value</span>
                                            <div className="text-4xl font-black text-white italic tracking-tighter leading-none">
                                                Total
                                            </div>
                                        </div>
                                        <div className="text-4xl font-black text-brand-yellow italic tracking-tighter leading-none">
                                            ${cartTotal.toFixed(2)}
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    disabled={cart.length === 0}
                                    onClick={() => setCheckoutStep('review')}
                                    className="group relative w-full h-14 bg-brand-yellow disabled:opacity-20 disabled:grayscale rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(255,193,7,0.2)] hover:shadow-[0_20px_50px_rgba(255,193,7,0.3)] transition-all active:scale-[0.98]"
                                >
                                    {/* Shimmer Effect */}
                                    <motion.div 
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '200%' }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
                                    />
                                    
                                    <div className="relative flex items-center justify-center gap-3">
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black">Initialize Deployment</span>
                                        <ChevronRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>

                                <div className="flex items-center justify-center gap-4 opacity-20 grayscale">
                                    <ShieldCheck size={14} className="text-white" />
                                    <div className="text-[8px] font-black text-white uppercase tracking-widest">Enterprise Security Guaranteed</div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Asset Detail Modal */}
            <AnimatePresence>
                {previewProduct && (
                    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setPreviewProduct(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
                        />
                        
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,1)] max-h-[90vh] flex flex-col md:flex-row"
                        >
                            <button 
                                onClick={() => setPreviewProduct(null)}
                                className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all z-[210]"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative w-full md:w-[40%] h-48 md:h-auto overflow-hidden bg-black">
                                <img src={previewProduct.image} alt={previewProduct.title} className="w-full h-full object-cover opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                            </div>

                            <div className="flex-1 p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar bg-gradient-to-br from-white/[0.02] to-transparent">
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full text-[8px] font-black text-brand-yellow uppercase tracking-widest">{previewProduct.category} Protocol</span>
                                        </div>
                                        <h3 className="text-4xl font-black text-white italic tracking-tighter leading-tight">{previewProduct.title}</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="text-3xl font-black text-brand-yellow">{previewProduct.price}</div>
                                            <div className="flex items-center gap-2 text-white/30 text-[10px] font-black uppercase tracking-widest">
                                                <ShieldCheck size={14} className="text-brand-yellow" />
                                                Lifetime Access
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-6 rounded-[24px] bg-white/[0.03] border border-white/5 space-y-3">
                                            <div className="flex items-center gap-2 text-white/40">
                                                <Globe size={14} />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Documentation</span>
                                            </div>
                                            <p className="text-white/60 text-sm leading-relaxed font-medium italic">
                                                {previewProduct.longDescription || previewProduct.description}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                                                <CheckCircle2 size={14} className="text-brand-yellow" />
                                                Core Features
                                            </div>
                                            <div className="grid grid-cols-1 gap-3">
                                                {previewProduct.features.map(f => (
                                                    <div key={f} className="flex items-center gap-3 text-[11px] font-black text-white/80 uppercase tracking-wider">
                                                        <div className="w-2 h-2 rounded-full bg-brand-yellow shadow-[0_0_8px_rgba(255,193,7,0.5)]" />
                                                        {f}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 mt-auto">
                                        <button 
                                            onClick={(e) => { addToCart(previewProduct, e); setPreviewProduct(null); }}
                                            className="w-full h-14 bg-brand-yellow rounded-[20px] text-[12px] font-black uppercase tracking-[0.2em] text-black hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_12px_32px_rgba(255,193,7,0.3)]"
                                        >
                                            BUY NOW
                                            <Lock size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Checkout Hub Modal: The Final Protocol */}
            <AnimatePresence>
                {checkoutStep !== 'idle' && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/98 backdrop-blur-[100px]"
                        />
                        
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            className="relative w-full max-w-xl bg-[#020202] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,1)]"
                        >
                            {/* Global Exit Button */}
                            <button 
                                onClick={() => setCheckoutStep('idle')}
                                className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X size={16} />
                            </button>
                            {/* Step Indicator */}
                            {checkoutStep !== 'success' && (
                                <div className="flex px-12 pt-10 gap-2">
                                    {['review', 'payment'].map((step, idx) => (
                                        <div 
                                            key={step}
                                            className={`flex-1 h-[2px] rounded-full transition-all duration-1000 relative overflow-hidden ${
                                                (checkoutStep === 'review' && idx === 0) || 
                                                (checkoutStep === 'payment')
                                                ? 'bg-brand-yellow/10' : 'bg-white/5'
                                            }`}
                                        >
                                            {((checkoutStep === 'review' && idx === 0) || (checkoutStep === 'payment')) && (
                                                <motion.div 
                                                    layoutId="progress-bar"
                                                    className="absolute inset-0 bg-brand-yellow"
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: 0 }}
                                                    transition={{ duration: 0.8, ease: "circOut" }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="p-10 lg:p-12">
                                {checkoutStep === 'review' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">{t('store.checkout.manifest')}</h3>
                                            <p className="text-white/20 text-[8px] font-black uppercase tracking-[0.4em]">{t('store.checkout.manifest_sub')}</p>
                                        </div>

                                        <div className="border-y border-white/5 divide-y divide-white/[0.03] max-h-80 overflow-y-auto custom-scrollbar">
                                            {cart.map((item, idx) => (
                                                <div key={item.id} className="py-4 flex gap-6 items-center group">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-black border border-white/10 shrink-0">
                                                        <img src={item.image} alt="" className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-500" />
                                                    </div>
                                                    <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                                                        <div className="col-span-5 space-y-0.5">
                                                            <div className="text-[10px] font-black text-white uppercase tracking-tight truncate">{item.title}</div>
                                                            <div className="text-[7px] text-white/20 font-black uppercase tracking-widest">{item.category}</div>
                                                        </div>
                                                        <div className="col-span-3 text-right">
                                                            <div className="text-[7px] text-white/10 font-black uppercase tracking-widest leading-none">ID: {idx+1}00-{idx+1}</div>
                                                            <div className="text-[7px] text-brand-yellow/30 font-black uppercase tracking-widest mt-1 leading-none">READY</div>
                                                        </div>
                                                        <div className="col-span-4 text-right pr-2">
                                                            <div className="text-sm font-black text-white italic tracking-tight tabular-nums">${item.priceValue}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-end pb-2">
                                            <div className="space-y-1">
                                                <div className="text-[8px] font-black text-brand-yellow uppercase tracking-[0.4em]">{t('store.checkout.total')}</div>
                                                <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Calculated Protocol Value</div>
                                            </div>
                                            <div className="text-4xl font-black text-white italic tracking-tight leading-none tabular-nums pr-4">
                                                ${cartTotal.toFixed(2)}
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => setCheckoutStep('payment')} 
                                            className="w-full h-14 bg-brand-yellow rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-black flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(255,193,7,0.3),0_0_30px_rgba(168,85,247,0.4)] border border-brand-purple/20 hover:scale-[1.01] active:scale-[0.98] transition-all group"
                                        >
                                            {t('store.button.checkout')}
                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                )}

                                {checkoutStep === 'payment' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none highlight-pro">{t('store.checkout.security')}</h3>
                                            <p className="text-white/20 text-[8px] font-black uppercase tracking-[0.4em]">{t('store.checkout.security_sub')}</p>
                                        </div>

                                        <div className="space-y-3">
                                            {/* Stripe Card - Ultra Compact */}
                                            <button className="w-full p-6 rounded-2xl bg-gradient-to-br from-brand-yellow/[0.05] to-transparent border border-brand-yellow/30 flex items-center justify-between group transition-all relative overflow-hidden">
                                                <div className="flex items-center gap-5 relative z-10">
                                                    <div className="w-12 h-12 rounded-xl bg-brand-yellow text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,193,7,0.2)] transition-transform group-hover:scale-105">
                                                        <CreditCard size={20} />
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="text-[11px] font-black text-white uppercase tracking-widest italic">{t('store.checkout.stripe')}</div>
                                                        <div className="text-[7px] font-black text-white/20 uppercase tracking-widest">{t('store.checkout.stripe_sub')}</div>
                                                    </div>
                                                </div>
                                                <div className="w-6 h-6 rounded-full border border-brand-yellow/40 flex items-center justify-center">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow shadow-[0_0_10px_rgba(255,193,7,1)]" />
                                                </div>
                                            </button>

                                            {/* Crypto Link - Compacted */}
                                            <button className="w-full p-6 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-between opacity-10 grayscale pointer-events-none">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                                                        <Globe size={20} />
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="text-[11px] font-black text-white uppercase tracking-widest">Crypto Link</div>
                                                        <div className="text-[7px] font-black text-white/10 uppercase tracking-widest">Web3 Authorized Only</div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                        <button 
                                            onClick={async () => {
                                                const btn = document.getElementById('pay-btn');
                                                if (btn) {
                                                    btn.innerHTML = `<span class="animate-pulse">${t('store.checkout.connecting')}</span>`;
                                                    btn.style.opacity = '0.7';
                                                }
                                                
                                                try {
                                                    const response = await fetch('/api/create-checkout-session', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ items: cart }),
                                                    });
                                                    const { url } = await response.json();
                                                    
                                                    const width = 500;
                                                    const height = 800;
                                                    const left = (window.innerWidth / 2) - (width / 2);
                                                    const top = (window.innerHeight / 2) - (height / 2);
                                                    
                                                    const popup = window.open(
                                                        url, 
                                                        'StripeCheckout', 
                                                        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=yes`
                                                    );

                                                    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
                                                        window.location.href = url;
                                                    } else {
                                                        if (btn) {
                                                            btn.innerHTML = `${t('store.checkout.session_active')} <div class="w-2 h-2 rounded-full bg-brand-yellow animate-ping ml-2" />`;
                                                            btn.style.background = 'rgba(255,193,7,0.1)';
                                                            btn.style.color = '#FFC107';
                                                            btn.style.border = '1px solid rgba(255,193,7,0.3)';
                                                        }
                                                    }
                                                } catch (err) {
                                                    console.error('Payment Error:', err);
                                                    if (btn) btn.innerText = 'Protocol Failed';
                                                }
                                            }}
                                            id="pay-btn"
                                            className="w-full h-20 py-6 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#F59E0B] rounded-[28px] text-[12px] font-black uppercase tracking-[0.4em] text-black flex items-center justify-center gap-4 shadow-[0_30px_70px_rgba(255,193,7,0.25),0_0_40px_rgba(168,85,247,0.3)] border border-brand-purple/30 hover:shadow-[0_40px_80px_rgba(255,193,7,0.4),0_0_50px_rgba(168,85,247,0.5)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-500 group"
                                        >
                                            {t('store.button.buy')}
                                            <div className="relative">
                                                <Lock size={20} className="group-hover:scale-110 transition-transform" />
                                                <motion.div 
                                                    animate={{ opacity: [0, 1, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                    className="absolute -inset-1 bg-white/40 blur-sm rounded-full"
                                                />
                                            </div>
                                        </button>
                                    </motion.div>
                                )}

                                {checkoutStep === 'success' && (
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        className="text-center space-y-8 py-4"
                                    >
                                        <div className="relative inline-block">
                                            <motion.div 
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', damping: 15 }}
                                                className="w-20 h-20 rounded-full bg-brand-yellow flex items-center justify-center text-black shadow-[0_0_50px_rgba(255,193,7,0.4)] relative z-10"
                                            >
                                                <Check size={32} strokeWidth={4} />
                                            </motion.div>
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{t('store.checkout.access')}</h3>
                                            <p className="text-brand-yellow text-[8px] font-black uppercase tracking-[0.4em]">{t('store.checkout.welcome')}</p>
                                        </div>

                                        <p className="text-white/30 text-[11px] max-w-xs mx-auto leading-relaxed italic">
                                            {t('store.checkout.success_msg')}
                                        </p>

                                        <div className="space-y-2">
                                            {purchasedItems.map(item => (
                                                <a 
                                                    key={item.id}
                                                    href={item.downloadUrl}
                                                    download
                                                    className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:bg-brand-yellow/10 hover:border-brand-yellow/30 transition-all group"
                                                >
                                                    <div className="text-left flex items-center gap-4">
                                                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-black border border-white/10 shrink-0">
                                                            <img src={item.image} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-black text-white uppercase tracking-tight italic group-hover:text-brand-yellow transition-colors">{item.title}</div>
                                                            <div className="text-[7px] text-white/20 font-black uppercase tracking-widest">{item.category}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-brand-yellow text-[8px] font-black uppercase tracking-widest">
                                                        {t('store.button.download')} <Download size={12} />
                                                    </div>
                                                </a>
                                            ))}
                                        </div>

                                        <button 
                                            onClick={() => { setCheckoutStep('idle'); setIsCartOpen(false); setPurchasedItems([]); }}
                                            className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] hover:text-white transition-colors pt-4"
                                        >
                                            {t('store.button.close')}
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};


export default Store;
