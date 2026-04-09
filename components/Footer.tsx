
import React from 'react';
import { ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    const mainContainer = document.getElementById('main-scroll-area');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-footer py-[40px] px-6 lg:px-12 flex flex-col items-center">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="text-brand-textTertiary mb-8 hover:text-brand-textPrimary transition-colors flex flex-col items-center gap-2 group"
      >
        <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm">
          <ChevronUp size={20} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Back to top</span>
      </button>

      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Copyright */}
        <div className="text-brand-textTertiary text-[13px] font-medium tracking-tight opacity-60 hover:opacity-100 transition-opacity">
          © {new Date().getFullYear()} Josh Segatt • AI-Powered Senior Developer
        </div>
      </div>
    </footer>
  );
};

export default Footer;
