import * as React from 'react';
import ToolsActionCard from './tools/ToolsActionCard';
import ShowcaseGallery from './tools/ShowcaseGallery';
import ModuleGrid from './tools/ModuleGrid';

const ToolsMasterApp: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 lg:gap-24 p-8 lg:p-12">
      <ToolsActionCard />
      <ShowcaseGallery />
      <ModuleGrid />
    </div>
  );
};

export default ToolsMasterApp;
