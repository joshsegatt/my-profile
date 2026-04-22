export type HubCategory = 'All' | 'Core' | 'Optimization' | 'Diagnosis' | 'AI' | 'Network' | 'System';

export interface ToolModule {
  id: string;
  title: string;
  titleKey: string;
  shortDesc: string;
  descKey: string;
  category: HubCategory;
  icon: string;
  componentId: string;
  status: 'Published' | 'Beta' | 'Coming Soon';
  accent?: string;
}

export const TOOLS_HUB_DATA: ToolModule[] = [
  {
    id: 'segatt-tools-master',
    title: 'Precision Utilities',
    titleKey: 'tools_hero.title',
    shortDesc: 'Automated Windows optimization and package management suite.',
    descKey: 'tools_hero.subhead',
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
    titleKey: 'gamer.tools.rig_optimizer.title',
    shortDesc: 'Professional multi-step performance and latency tuner.',
    descKey: 'gamer.tools.rig_optimizer.desc',
    category: 'Optimization',
    icon: 'Zap',
    componentId: 'GamerOptimizerApp',
    status: 'Published',
    accent: 'brand-yellow'
  },
  {
    id: 'input-lag-test',
    title: 'Latency Sniper',
    titleKey: 'gamer.tools.latency_sniper.title',
    shortDesc: 'Measure and fix end-to-end system and network jitter.',
    descKey: 'gamer.tools.latency_sniper.desc',
    category: 'Network',
    icon: 'Activity',
    componentId: 'LatencyApp',
    status: 'Published',
    accent: 'green-400'
  },
  {
    id: 'frame-benchmark',
    title: 'FPS Analyst',
    titleKey: 'gamer.tools.fps_analyst.title',
    shortDesc: 'Analyze bottlenecks and generate golden game settings.',
    descKey: 'gamer.tools.fps_analyst.desc',
    category: 'Diagnosis',
    icon: 'BarChart3',
    componentId: 'FPSAnalystApp',
    status: 'Published',
    accent: 'brand-yellow'
  }
];
