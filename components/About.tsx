import React from 'react';
import { 
    Cpu, Zap, ChevronDown, 
    Shield, Layers, BookOpen, Quote
} from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../utils/i18n';
import './About.css';

const About: React.FC = () => {
    const { t } = useLanguage();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const chapters = [
        {
            id: "01",
            subtitle: "PRÓLOGO",
            title: "The Great Stagnation",
            content: "O silício estava cansado. Por décadas, fomos ensinados que o 'lag' era uma constante física, um subproduto inevitável de sistemas cada vez mais pesados. Você sentiu isso. O stutter no momento crítico, a interface que não acompanhava o seu pensamento. O mundo digital estava um caos de bloatwares e ineficiência.",
            accent: "bg-red-500/10 text-red-500 border-red-500/20",
            image: "/assets/images/about_stagnation.png"
        },
        {
            id: "02",
            subtitle: "CAPÍTULO I",
            title: "The First Breach",
            content: "Nas sombras das primeiras telas azuis, uma mente se recusou a aceitar a lentidão. O Segatt não nasceu programador; ele nasceu inconformado. O que começou como uma necessidade pessoal de vencer o atraso, tornou-se uma obsessão por entender cada milissegundo. O código não era o fim, era o meio para dobrar a máquina à sua vontade.",
            accent: "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20",
            image: "/assets/images/about_breach.png"
        },
        {
            id: "03",
            subtitle: "CAPÍTULO II",
            title: "The Obsidian Forge",
            content: "Anos foram gastos no silêncio das camadas mais baixas do Windows. Kernel, registros, serviços descartados. Cada desvio foi uma lição. O estilo 'Obsidian' não é apenas uma cor; é uma filosofia de remover o excesso até que reste apenas o que é vital. A forja estava quente, e o 'Blueprint' de performance estava sendo escrito.",
            accent: "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20",
            image: "/assets/images/about_forge.png"
        },
        {
            id: "04",
            subtitle: t('about.chapters.chapter3.subtitle'),
            title: t('about.chapters.chapter3.title'),
            content: t('about.chapters.chapter3.content'),
            accent: "border-white/20 text-white/40",
            image: "/assets/images/about_velocity.png"
        },
        {
            id: "05",
            subtitle: t('about.chapters.epilogo.subtitle'),
            title: t('about.chapters.epilogo.title'),
            content: t('about.chapters.epilogo.content'),
            accent: "border-brand-yellow/50 text-brand-yellow shadow-[0_0_20px_rgba(255,184,0,0.2)]",
            image: "/assets/images/about_legacy.png"
        }
    ];

    return (
        <section id="about" className="relative min-h-screen bg-[#020202] pt-28 lg:pt-36 pb-24 lg:pb-40">
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-brand-yellow origin-left z-50"
                style={{ scaleX }}
            />

            <div className="max-w-6xl mx-auto px-6 relative">
                
                <div className="flex flex-col items-center text-center mb-32 lg:mb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <BookOpen size={28} className="text-brand-yellow" />
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="about-title mb-8 italic"
                        style={{ fontSize: '30px', lineHeight: '1.1' }}
                    >
                         {t('about.title').split(' ').map((word, i) => (
                             <span key={i} className={word === 'CHRONICLES' ? 'text-brand-yellow not-italic' : ''}>
                                 {word}{' '}
                                 {word === 'CHRONICLES' && <br className="lg:hidden" />}
                             </span>
                         ))}
                    </motion.h1>
                    <p className="text-white/30 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.4em]">{t('about.journey')}</p>
                    <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-16 text-white/10"
                    >
                        <ChevronDown size={32} />
                    </motion.div>
                </div>

                <div className="relative">
                    <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-yellow/50 via-white/10 to-transparent lg:-translate-x-1/2" />

                    {chapters.map((chapter, index) => (
                        <motion.div 
                            key={chapter.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`relative mb-32 lg:mb-48 flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
                        >
                            <div className="absolute left-0 lg:left-1/2 -top-10 lg:top-1/2 -translate-y-1/2 lg:-translate-x-1/2 z-10">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs border ${chapter.accent} backdrop-blur-xl shadow-[0_0_40px_rgba(255,184,0,0.1)]`}>
                                    {chapter.id}
                                </div>
                            </div>

                            <div className="flex-1 w-full pl-16 lg:pl-0 text-left">
                                <div className="flex flex-col gap-4">
                                    <span className="text-[10px] font-bold text-brand-yellow/60 tracking-[0.3em] uppercase">{chapter.subtitle}</span>
                                    <h2 className="about-chapter-title italic">
                                        {chapter.title}
                                    </h2>
                                    <p className="text-white/50 text-base lg:text-lg font-medium leading-relaxed max-w-xl">
                                        {chapter.content}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 w-full group">
                                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:border-brand-yellow/30 bg-zinc-900">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <img 
                                        src={chapter.image} 
                                        alt={chapter.title}
                                        className="w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-40 pt-32 border-t border-white/5">
                    <div className="flex flex-col items-center text-center mb-20">
                        <Quote size={40} className="text-brand-yellow/20 mb-8" />
                        <h2 className="text-4xl lg:text-[54px] font-extrabold text-white tracking-tighter mb-6 italic leading-[1.0]">
                            {t('about.arsenal.title').split(' ').map((word, i) => (
                                <span key={i} className={word === 'ARCHITECT\'S' ? 'text-brand-yellow not-italic' : ''}>
                                    {word}{' '}
                                    {word === 'ARCHITECT\'S' && <br className="lg:hidden" />}
                                </span>
                            ))}
                        </h2>
                        <p className="text-white/30 font-bold uppercase tracking-[0.4em] text-[10px]">{t('about.arsenal.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: t('about.arsenal.items.ai.title'), desc: t('about.arsenal.items.ai.desc'), icon: <Cpu />, tags: ["OpenAI", "LangChain"] },
                            { title: t('about.arsenal.items.perf.title'), desc: t('about.arsenal.items.perf.desc'), icon: <Zap />, tags: ["Windows Pro", "Blueprints"] },
                            { title: t('about.arsenal.items.ui.title'), desc: t('about.arsenal.items.ui.desc'), icon: <Layers />, tags: ["React 19", "Figma Senior"] }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -8 }}
                                className="p-10 bg-white/[0.02] rounded-[40px] border border-white/5 group hover:border-brand-yellow/30 transition-all duration-500"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-brand-yellow/5 border border-brand-yellow/10 flex items-center justify-center text-brand-yellow mb-6 group-hover:scale-110 transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-white/40 text-sm lg:text-base font-medium leading-relaxed mb-6">
                                    {item.desc}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-white/5 rounded-full text-[9px] font-black text-white/30 uppercase tracking-widest border border-white/5 group-hover:text-brand-yellow/60 group-hover:border-brand-yellow/20 transition-all">{tag}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.98, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ y: -10, scale: 1.005, transition: { duration: 0.4, ease: "easeOut" } }}
                    viewport={{ once: true }}
                    className="mt-32 p-10 lg:p-16 bg-brand-yellow rounded-[40px] text-black text-center relative overflow-hidden group shadow-[0_40px_100px_rgba(255,184,0,0.1)] transition-all duration-500"
                >
                    {/* Senior Shimmer Overlay */}
                    <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none opacity-30"
                    />
                    
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-50" />
                    <Shield size={120} className="absolute -top-12 -right-12 text-black/5 rotate-12 transition-transform duration-700 group-hover:rotate-[25deg] group-hover:scale-110" />
                    
                    <h2 className="text-4xl lg:text-[56px] font-extrabold tracking-tight mb-10 italic relative z-10 leading-[0.95] uppercase">
                        {t('about.cta.title').split('.').map((part, i) => (
                            <React.Fragment key={i}>
                                {part === 'NEXT CHAPTER' ? <span className="underline decoration-black/10">{part}</span> : part}
                                {i === 0 && <br />}
                            </React.Fragment>
                        ))}
                    </h2>
                    
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/onboard'}
                        className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl relative z-10 hover:bg-zinc-900 transition-all active:scale-95"
                    >
                        {t('about.cta.button')}
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
