import * as React from 'react';
import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', href: '/', external: false },
        { name: 'About', href: '/about', external: false },
        { name: 'Onboarding', href: '/onboard', external: false },
        { name: 'Contact', href: '/contact', external: false },
    ];

    return (
        <header className="fixed top-6 left-6 right-6 h-20 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-between px-10 relative z-50 flex-shrink-0 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500">
            {/* Brand / Logo (Left) */}
            <Link 
                to="/" 
                className="group relative flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95"
            >
                <div className="flex flex-col">
                    <span 
                        className="text-[14px] font-black uppercase tracking-[0.3em] text-brand-yellow drop-shadow-[0_1px_0_#b38700,0_2px_0_#997400,0_4px_12px_rgba(255,193,7,0.4)] transition-all group-hover:drop-shadow-[0_1px_0_#b38700,0_2px_0_#997400,0_3px_0_#806100,0_8px_20px_rgba(255,193,7,0.6)]"
                    >
                        Josh Segat
                    </span>
                    <div className="h-[2px] w-0 bg-brand-yellow transition-all duration-500 group-hover:w-full opacity-50" />
                </div>
            </Link>

            {/* Desktop Navigation (Right) */}
            <div className="hidden md:flex items-center gap-8">
                <nav className="flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-[12px] font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:text-brand-yellow hover:translate-y-[-1px] ${
                                location.pathname === link.href ? 'text-brand-yellow font-black' : 'text-white/40'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
                <button
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white transition-all active:scale-95"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed top-28 left-6 right-6 bg-brand-window/95 backdrop-blur-3xl border border-white/10 rounded-2xl flex flex-col items-center py-12 gap-8 md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-[14px] font-bold uppercase tracking-[0.3em] transition-all hover:text-brand-yellow ${
                                location.pathname === link.href ? 'text-brand-yellow' : 'text-white/60'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
