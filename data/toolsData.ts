export const TOOLS_CONFIG = {
  version: '1.7.7 Stable',
  psCommand: 'iex (irm https://raw.githubusercontent.com/joshsegatt/Segatt-Tools/main/install.ps1)',
  githubUrl: 'https://github.com/joshsegatt/Segatt-Tools',
  downloads: {
    exe: 'https://github.com/joshsegatt/Segatt-Tools/releases/download/v1.7.7/Segatt.Tools_1.7.7_x64-setup.exe',
    msi: 'https://github.com/joshsegatt/Segatt-Tools/releases/download/v1.7.7/Segatt.Tools_1.7.7_x64_en-US.msi'
  },
  showcase: [
    { title: 'Package Hub', img: '/projects/segatt-v177-installer.png', tag: 'Automation' },
    { title: 'System Tweaks', img: '/projects/segatt-v177-tweaks.png', tag: 'Performance' },
    { title: 'Architectural Fixes', img: '/projects/segatt-v177-fixes.png', tag: 'Repair' },
    { title: 'System Management', img: '/projects/segatt-v177-management.png', tag: 'Controls' },
    { title: 'Gamer Cleaner', img: '/projects/segatt-v177-cleaner.png', tag: 'Optimization' }
  ],
  modules: [
    { 
      id: 'installer',
      icon: 'Zap',
      title: 'App Installer', 
      desc: 'Batch install 40+ essential apps powered by WinGet.' 
    },
    { 
      id: 'tweaks',
      icon: 'Shield',
      title: 'System Tweaks', 
      desc: 'Optimize telemetry, bloatware, and deep system privacy.' 
    }
  ]
};
