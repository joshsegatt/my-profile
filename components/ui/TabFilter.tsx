import React from 'react';
import { motion } from 'framer-motion';
import { HubCategory } from '@/data/hubData';

interface TabFilterProps {
  categories: HubCategory[];
  activeTab: HubCategory;
  onTabChange: (tab: HubCategory) => void;
}

const TabFilter: React.FC<TabFilterProps> = ({ categories, activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/5 self-start overflow-x-auto no-scrollbar">
      {categories.map((cat) => {
        const isActive = activeTab === cat;
        return (
          <button
            key={cat}
            onClick={() => onTabChange(cat)}
            className={`relative px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              isActive ? 'text-black' : 'text-white/30 hover:text-white/60 hover:bg-white/5'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-brand-yellow rounded-xl z-0"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TabFilter;
