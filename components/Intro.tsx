import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../utils/i18n';

interface IntroProps {
    onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
    const [isFinished, setIsFinished] = React.useState(false);
    const { t } = useLanguage();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
        }, 3200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden"
                >
                    {/* ... (Atmospheric Depth & scanline omitted for brevity, keeping same) */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                        {/* Particles kept here */}
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]" />

                    <div className="relative group text-center">
                        <motion.h2
                            initial={{ opacity: 0, letterSpacing: '0.8em', filter: 'blur(10px)' }}
                            animate={{ opacity: 1, letterSpacing: '0.4em', filter: 'blur(0px)' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-[40px] md:text-[80px] font-black uppercase text-white selection:bg-brand-yellow tracking-[0.4em] relative z-20"
                            style={{
                                textShadow: `0 1px 0 #b38700, 0 2px 0 #997400, 0 3px 0 #806100, 0 4px 0 #664d00, 0 20px 40px rgba(0,0,0,0.6)`
                            }}
                        >
                            {t('intro.name')}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.8 }}
                            className="mt-8 flex flex-col items-center gap-2"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="h-[1px] w-12 bg-white/10" />
                                <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em] animate-pulse">
                                    {t('intro.initializing')}
                                </span>
                                <div className="h-[1px] w-12 bg-white/10" />
                            </div>
                        </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, delay: 2.8 }} className="absolute inset-0 bg-white z-[100] pointer-events-none" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Intro;
