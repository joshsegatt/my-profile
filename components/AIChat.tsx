import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Bot, Loader2, Orbit } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const AIChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hi there. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Auto-close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isTyping) return;

        const userText = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userText }]);
        setIsTyping(true);

        // Dummy response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I've recorded your message. I'll get back to you shortly with a precise answer."
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Trigger Button */}
            <motion.div
                className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all outline-none"
                >
                    <Orbit size={24} strokeWidth={1.5} />
                </button>
            </motion.div>

            {/* Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-[100] w-[calc(100vw-32px)] sm:w-[380px] h-[600px] max-h-[85vh] flex flex-col bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                                    <Orbit size={16} className="text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-white tracking-tight">AI Assistant</span>
                                    <span className="text-[11px] text-white/50">Usually replies instantly</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-white/5'}`}>
                                        {msg.role === 'user' ? <User size={12} className="text-white" /> : <Bot size={12} className="text-white" />}
                                    </div>
                                    <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                                        <div className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                                            msg.role === 'user' 
                                                ? 'bg-white text-black rounded-tr-sm font-medium' 
                                                : 'bg-white/5 text-white/90 rounded-tl-sm border border-white/5'
                                        }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                        <Loader2 size={12} className="text-white animate-spin" />
                                    </div>
                                    <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/[0.02] border-t border-white/10">
                            <form onSubmit={handleSend} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 p-2 rounded-full bg-white text-black disabled:opacity-30 disabled:bg-white/20 disabled:text-white transition-all"
                                >
                                    <Send size={14} />
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <Link 
                                    to="/intake" 
                                    onClick={() => setIsOpen(false)}
                                    className="text-[10px] text-white/30 hover:text-white transition-colors uppercase tracking-widest"
                                >
                                    Manual Triage
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
