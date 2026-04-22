import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md cursor-zoom-out"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 md:p-8 lg:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-7xl max-h-full bg-[#080808] border border-white/10 rounded-[32px] shadow-[0_24px_120px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-black/40">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                  <h2 className="text-sm font-black uppercase tracking-[0.25em] text-white/90">{title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content area with custom scrollbar */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
