export type HubCategory = 'All' | 'Core' | 'Optimization' | 'Diagnosis' | 'AI' | 'Network' | 'System';

export interface ToolModule {
  id: string;
  title: string;
  shortDesc: string;
  category: HubCategory;
  icon: string; // Lucide icon name
  componentId: string; // To match with a component mapper
  status: 'Published' | 'Beta' | 'Coming Soon';
  accent?: string;
}

export const TOOLS_HUB_DATA: ToolModule[] = [
  {
    id: 'segatt-tools-master',
    title: 'Precision Utilities',
    shortDesc: 'Automated Windows optimization and package management suite.',
    category: 'Core',
    icon: 'Settings',
    componentId: 'ToolsMaster',
    status: 'Published',
    accent: 'brand-yellow'
  }
];

export const GAMER_HUB_DATA: ToolModule[] = [
  {
    id: 'gamer-optimizer-v1',
    title: 'Rig Optimizer',
    shortDesc: 'Professional multi-step performance and latency tuner.',
    category: 'Optimization',
    icon: 'Zap',
    componentId: 'GamerOptimizerApp',
    status: 'Published',
    accent: 'brand-yellow'
  },
  {
    id: 'input-lag-test',
    title: 'Latency Sniper',
    shortDesc: 'Measure and fix end-to-end system and network jitter.',
    category: 'Network',
    icon: 'Activity',
    componentId: 'LatencyApp',
    status: 'Published',
    accent: 'green-400'
  },
  {
    id: 'frame-benchmark',
    title: 'FPS Analyst',
    shortDesc: 'Analyze bottlenecks and generate golden game settings.',
    category: 'Diagnosis',
    icon: 'BarChart3',
    componentId: 'FPSAnalystApp',
    status: 'Published',
    accent: 'brand-yellow'
  }
];
