import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Bot, Loader2, Mic, MicOff } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const AIAvatarIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M7.5 9C7.5 6 9.5 4 12 4C14.5 4 16.5 6 16.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="7" y="10" width="4" height="2.5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="10" width="4" height="2.5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 11H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 12.5V14C7 16.5 9.5 20 12 20C14.5 20 17 16.5 17 14V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.5 15.5C10.5 15.5 11.5 16.5 12 16.5C12.5 16.5 13.5 15.5 13.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CatIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21C16.9706 21 21 17.5 21 13C21 11.5 20.6 10.1 20 8.9L19.5 3L15.2 4.7C14.2 4.3 13.1 4 12 4C10.9 4 9.8 4.3 8.8 4.7L4.5 3L4 8.9C3.4 10.1 3 11.5 3 13C3 17.5 7.02944 21 12 21Z" />
        <path d="M9 13.5C9 13.5 10 14.5 10 14.5" />
        <path d="M15 13.5C15 13.5 14 14.5 14 14.5" />
        <path d="M12 16L11.5 15.5H12.5L12 16Z" fill="currentColor" />
    </svg>
);

const OrganicTrigger = ({ setIsOpen, isOpen }: { setIsOpen: (v: boolean) => void, isOpen: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`fixed bottom-6 z-40 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] right-6 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            
            {/* Subtle Outer Shadow (Default) */}
            <div 
                className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.4)] border border-white/5 pointer-events-none"
            />

            {/* Tech Rays Effect (Hover Only) */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="absolute inset-[-40px] pointer-events-none z-[-1] flex items-center justify-center"
                    >
                        {/* Rotating HUD Rings */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-8 border border-brand-yellow/20 border-dashed rounded-full"
                        />
                        <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-12 border border-brand-yellow/10 border-dotted rounded-full"
                        />
                        
                        {/* Radiating Laser Beams (Tech Rays) */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{ 
                                    opacity: [0, 0.8, 0],
                                    scaleY: [0, 1.2, 0.5],
                                    translateY: [-20, -50, -20]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity, 
                                    delay: i * 0.1,
                                    ease: "easeInOut"
                                }}
                                className="absolute w-[1px] h-12 bg-gradient-to-t from-transparent via-brand-yellow/40 to-transparent origin-bottom"
                                style={{ transform: `rotate(${i * 18}deg)` }}
                            />
                        ))}

                        {/* Hexagon/Tech Particles */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={`p-${i}`}
                                animate={{ 
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1.5, 0.5],
                                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
                                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 60]
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                                className="absolute w-1 h-1 bg-brand-yellow/40 rotate-45"
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pulsing Core Ring (Softer) */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.04, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-brand-yellow/20 pointer-events-none"
            />

            <motion.button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsOpen(true)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-16 h-16 rounded-full bg-[#050505] flex items-center justify-center cursor-pointer outline-none overflow-hidden group border-2 border-brand-yellow/30"
            >
                {/* Tech Cat Image Asset (jason-yellow.png) - Zoomed to crop edges */}
                <img 
                    src="/assets/jason-yellow.png" 
                    alt="AI Core"
                    className="w-full h-full object-cover rounded-full scale-[1.35] group-hover:scale-[1.45] transition-transform duration-500 brightness-[1.1] contrast-[1.1]"
                />
                
                {/* Overlay Glow */}
                <div className="absolute inset-0 bg-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.button>

            {/* AI Label - ASK AI */}
            <div className="absolute -top-5 right-0 flex items-center gap-1.5 pointer-events-none">
                <span className="text-[10px] font-mono text-brand-yellow font-black tracking-[0.25em] uppercase drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">ASK AI</span>
                <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-pulse" />
            </div>
        </div>
    );
};

const AIChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Iniciando protocolo de triagem... Qual é o teu maior desafio técnico atual?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    
    const hasSidebar = false;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Contextual AI Nudge & Voice Interface Logic
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const handleNudge = (e: any) => {
            const { message } = e.detail;
            setIsOpen(true);
            setMessages(prev => [...prev, { role: 'assistant', content: message }]);
        };

        window.addEventListener('nudge-ai', handleNudge);

        // Initialize Speech Recognition
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'pt-BR';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }

        return () => window.removeEventListener('nudge-ai', handleNudge);
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            setInput('');
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const newMessages: Message[] = [...messages, { role: 'user', content: trimmedInput }];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!response.ok) {
                throw new Error('Falha na comunicação com os servidores centrais.');
            }

            if (!response.body) throw new Error('ReadableStream not supported');

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let done = false;

            setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
            
            setIsTyping(false);

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    setMessages((prev) => {
                        const updated = [...prev];
                        const lastIndex = updated.length - 1;
                        updated[lastIndex] = {
                            ...updated[lastIndex],
                            content: updated[lastIndex].content + chunk,
                        };
                        return updated;
                    });
                }
            }
        } catch (error) {
            console.error('Chat error:', error);
            setIsTyping(false);
            setMessages((prev) => [
                ...prev, 
                { role: 'assistant', content: 'ERRO: Ligação ao modelo Gemini interrompida. Usa o formulário /intake para procederes manualmente.' }
            ]);
        }
    };

    return (
        <>
            {/* Floating Trigger */}
            <OrganicTrigger setIsOpen={setIsOpen} isOpen={isOpen} />

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={`fixed bottom-6 z-[100] w-[380px] h-[600px] max-h-[85vh] flex flex-col bg-[#050505] border border-brand-yellow/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,215,0,0.05)] overflow-hidden right-6`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-yellow/10 bg-black/40 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-brand-yellow/30 overflow-hidden shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                                    <img src="/assets/jason-yellow.png" alt="AI" className="w-full h-full object-cover scale-110" />
                                    <div className="absolute inset-0 bg-brand-yellow/5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-brand-yellow uppercase tracking-widest drop-shadow-[0_0_5px_rgba(255,215,0,0.3)]">JOSH_AI</span>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                        <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">CORE_OS v2.0 // ACTIVE</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 border border-transparent transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/80 scroll-smooth">
                            <style>{`
                                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
                                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 215, 0, 0.2); border-radius: 10px; }
                                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 215, 0, 0.5); }
                            `}</style>
                            {messages.map((msg, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <div className={`flex items-center justify-center min-w-[28px] h-7 rounded-full border ${msg.role === 'user' ? 'bg-white/5 border-white/10' : 'bg-brand-yellow/10 border-brand-yellow/20'}`}>
                                        {msg.role === 'user' ? <User size={12} className="text-white/60" /> : <Bot size={12} className="text-brand-yellow" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl max-w-[85%] ${
                                        msg.role === 'user' 
                                        ? 'bg-white/5 border border-white/5 rounded-tr-sm text-right' 
                                        : 'bg-transparent border border-brand-yellow/10 rounded-tl-sm shadow-[inset_0_0_20px_rgba(255,184,0,0.02)]'
                                    }`}>
                                        <p className={`text-xs leading-relaxed ${msg.role === 'assistant' ? 'font-mono text-brand-yellow/90' : 'text-white/80'}`}>
                                            {msg.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex items-center gap-2 text-brand-yellow/50 text-xs font-mono pl-11">
                                    <Loader2 size={12} className="animate-spin" />
                                    <span>PROCESSANDO...</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-black border-t border-brand-yellow/10">
                            <form onSubmit={handleSend} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={isListening ? "Ouvindo..." : "Descreve o teu problema..."}
                                    className={`w-full bg-white/5 border ${isListening ? 'border-brand-yellow animate-pulse' : 'border-white/10'} rounded-full py-3 pl-4 pr-24 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow/50 transition-all font-mono`}
                                />
                                <div className="absolute right-2 flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={toggleListening}
                                        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-white/5 text-white/40 hover:text-brand-yellow'}`}
                                    >
                                        {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isTyping}
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-yellow text-black disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30 transition-all hover:scale-105 active:scale-95"
                                    >
                                        <Send size={14} />
                                    </button>
                                </div>
                            </form>
                            <div className="flex justify-center mt-3">
                                <Link 
                                    to="/intake" 
                                    onClick={() => setIsOpen(false)}
                                    className="text-[9px] text-white/30 hover:text-brand-yellow transition-colors font-mono tracking-widest uppercase"
                                >
                                    [ FORÇAR TRIAGEM MANUAL ]
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChat;
