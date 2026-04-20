import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAMER_HUB_DATA, ToolModule, HubCategory } from '@/data/hubData';
import OptimizerHero from '@/components/gamer/OptimizerHero';
import TabFilter from '@/components/ui/TabFilter';
import ToolCard from '@/components/ui/ToolCard';
import Modal from '@/components/ui/Modal';

// App Imports
import OptimizerApp from '@/components/gamer/OptimizerApp';
import LatencyApp from '@/components/gamer/LatencyApp';
import FPSAnalystApp from '@/components/gamer/FPSAnalystApp';

const GamerOptimizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HubCategory>('All');
  const [selectedTool, setSelectedTool] = useState<ToolModule | null>(null);

  const categories: HubCategory[] = ['All', 'Optimization', 'Diagnosis', 'Network'];
  
  const filteredTools = GAMER_HUB_DATA.filter(t => 
    activeTab === 'All' || t.category === activeTab
  );

  const renderApp = (id: string) => {
    switch (id) {
      case 'GamerOptimizerApp': return <OptimizerApp />;
      case 'LatencyApp':        return <LatencyApp />;
      case 'FPSAnalystApp':      return <FPSAnalystApp />;
      default: return (
        <div className="p-20 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-brand-yellow">
            <span className="text-2xl font-black">!</span>
          </div>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">Under Construction</h2>
          <p className="text-white/40 max-w-sm">This module is being trained by our neural networks. Check back soon.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-16 lg:gap-24 animate-in fade-in duration-700">
      <OptimizerHero />

      <div className="flex flex-col gap-12">
        <TabFilter 
          categories={categories} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ToolCard tool={tool} onClick={setSelectedTool} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Tool App Modal */}
      <Modal
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        title={selectedTool?.title || ''}
      >
        {selectedTool && renderApp(selectedTool.componentId)}
      </Modal>
    </div>
  );
};

export default GamerOptimizer;
