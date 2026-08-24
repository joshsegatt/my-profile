import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitIntake } from '../utils/submitIntake';

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  budget: z.string().min(1, "Please select a budget range"),
  description: z.string().min(10, "Please briefly describe the project"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: "onChange"
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    const success = await submitIntake({
      name: data.name,
      email: data.email,
      budget: data.budget,
      description: data.description,
    });
    
    setIsSubmitting(false);
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        reset();
      }, 3000);
    } else {
      alert("Something went wrong. Please try again or email hello@joshsegatt.com directly.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-[101] max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-brand-yellow" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Request Sent.</h3>
                <p className="text-white/50 text-sm">
                  I will review your project and get back to you with an estimate within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Request a Quote</h2>
                  <p className="text-white/40 text-sm">
                    Fill out this quick form and I'll send you a ballpark estimate within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 pl-1">Name</label>
                    <input
                      {...register("name")}
                      placeholder="John Doe"
                      className={`w-full bg-white/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-xl px-4 py-3 text-white text-sm outline-none transition-all placeholder:text-white/20`}
                    />
                    {errors.name && <p className="text-red-400 text-xs pl-1">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 pl-1">Email</label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@company.com"
                      className={`w-full bg-white/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-xl px-4 py-3 text-white text-sm outline-none transition-all placeholder:text-white/20`}
                    />
                    {errors.email && <p className="text-red-400 text-xs pl-1">{errors.email.message}</p>}
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 pl-1">Estimated Budget</label>
                    <div className="relative">
                      <select
                        {...register("budget")}
                        defaultValue=""
                        className={`w-full bg-white/[0.03] border ${errors.budget ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-xl px-4 py-3 text-white text-sm outline-none transition-all appearance-none cursor-pointer`}
                      >
                        <option value="" disabled hidden className="bg-[#0a0a0a]">Select budget range...</option>
                        <option value="< $2k" className="bg-[#0a0a0a]">Under $2,000</option>
                        <option value="$2k - $5k" className="bg-[#0a0a0a]">$2,000 - $5,000</option>
                        <option value="$5k - $10k" className="bg-[#0a0a0a]">$5,000 - $10,000</option>
                        <option value="$10k+" className="bg-[#0a0a0a]">$10,000+</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronRight size={14} className="text-white/30 rotate-90" />
                      </div>
                    </div>
                    {errors.budget && <p className="text-red-400 text-xs pl-1">{errors.budget.message}</p>}
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 pl-1">Project Summary</label>
                    <textarea
                      {...register("description")}
                      placeholder="Briefly describe what you want to build..."
                      rows={3}
                      className={`w-full bg-white/[0.03] border ${errors.description ? 'border-red-500/50' : 'border-white/10 focus:border-brand-yellow/50'} rounded-xl px-4 py-3 text-white text-sm outline-none transition-all resize-none placeholder:text-white/20`}
                    />
                    {errors.description && <p className="text-red-400 text-xs pl-1">{errors.description.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF5A00] text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ff6f1f] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(255,90,0,0.4)] cursor-pointer mt-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Request <Send size={14} />
                      </span>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
