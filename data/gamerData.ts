export type Impact = 'HIGH' | 'MEDIUM' | 'LOW';
export type Category = 'fps' | 'network' | 'windows' | 'thermal';

export interface Tweak {
  id: string;
  title: string;
  desc: string;
  impact: Impact;
  command?: string;
  category: Category;
}

export interface FormData {
  cpu: string;
  gpu: string;
  ram: string;
  game: string;
  currentFps: string;
  issues: string[];
}

export const CPU_OPTIONS = [
  { value: 'intel-i5', label: 'Intel Core i5' },
  { value: 'intel-i7', label: 'Intel Core i7' },
  { value: 'intel-i9', label: 'Intel Core i9' },
  { value: 'amd-r5',   label: 'AMD Ryzen 5'   },
  { value: 'amd-r7',   label: 'AMD Ryzen 7'   },
  { value: 'amd-r9',   label: 'AMD Ryzen 9'   },
];

export const GPU_OPTIONS = [
  { value: 'rtx-3060', label: 'NVIDIA RTX 3060 / 3060 Ti'      },
  { value: 'rtx-3070', label: 'NVIDIA RTX 3070 / 3080'          },
  { value: 'rtx-3090', label: 'NVIDIA RTX 3090 / Ti'            },
  { value: 'rtx-4060', label: 'NVIDIA RTX 4060 / Ti'            },
  { value: 'rtx-4070', label: 'NVIDIA RTX 4070 / Ti / Super'    },
  { value: 'rtx-4080', label: 'NVIDIA RTX 4080 / 4090'          },
  { value: 'gtx-1660', label: 'NVIDIA GTX 1650 / 1660 / Ti'    },
  { value: 'rx-6600',  label: 'AMD RX 6600 / 6700 / 6800'      },
  { value: 'rx-7600',  label: 'AMD RX 7600 / 7700 / 7800'      },
  { value: 'rx-7900',  label: 'AMD RX 7900 XT / XTX'           },
];

export const RAM_OPTIONS = ['8GB', '16GB', '32GB', '64GB+'];
export const GAME_OPTIONS = [
  'Valorant', 'CS2', 'Warzone', 'Fortnite',
  'Apex Legends', 'Minecraft', 'GTA V', 'Escape from Tarkov',
];

export const ISSUE_OPTIONS = [
  { id: 'fps',     label: 'Low FPS'      },
  { id: 'stutter', label: 'Stuttering'   },
  { id: 'delay',   label: 'Input Delay'  },
  { id: 'crash',   label: 'Crashes'      },
  { id: 'temp',    label: 'High Temps'   },
  { id: 'net',     label: 'High Ping'    },
];

export const ANALYSIS_STAGES = [
  'CPU Profile',
  'GPU Driver Stack',
  'RAM Timing Config',
  'Latency Stack',
  'Process Tree',
];

export function generateTweaks(d: FormData): Tweak[] {
  const tw: Tweak[] = [];
  const isNvidia      = d.gpu.startsWith('rtx') || d.gpu.startsWith('gtx');
  const isAmd         = d.gpu.startsWith('rx');
  const isIntel       = d.cpu.startsWith('intel');
  const isLowRam      = d.ram === '8GB';
  const isMedRam      = d.ram === '16GB';
  const fps           = parseInt(d.currentFps, 10) || 0;
  const lowFps        = fps < 80;
  const hasStutter    = d.issues.includes('stutter');
  const hasDelay      = d.issues.includes('delay');
  const hasTemp       = d.issues.includes('temp');
  const hasNet        = d.issues.includes('net');
  const hasCrash      = d.issues.includes('crash');
  const isCompetitive = ['Valorant', 'CS2', 'Warzone', 'Apex Legends'].includes(d.game);

  // FPS
  tw.push({
    id: 'power-plan', category: 'fps', impact: 'HIGH',
    title: 'Set High Performance Power Plan',
    desc:  'Prevents CPU frequency throttling during gameplay. Biggest single-click gain for most systems.',
    command: 'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c',
  });

  tw.push({
    id: 'gamebar', category: 'fps', impact: 'HIGH',
    title: 'Disable Xbox Game Bar & DVR',
    desc:  'Game Bar runs in the background even without recording, consuming ~3–6% CPU. Disabling is safe and permanent.',
    command: 'reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f',
  });

  if (isNvidia) {
    tw.push({
      id: 'nvcp-perf', category: 'fps', impact: 'HIGH',
      title: 'NVIDIA Control Panel: Power Management → Max Performance',
      desc:  'Open NVIDIA Control Panel → Manage 3D Settings → Power Management Mode → Prefer Maximum Performance. Prevents GPU downclocking.',
    });
    if (isCompetitive || hasDelay) {
      tw.push({
        id: 'reflex', category: 'fps', impact: 'HIGH',
        title: `Enable NVIDIA Reflex Low Latency in ${d.game}`,
        desc:  'Reduces GPU render queue, cutting system latency by up to 30%. Enable "Boost" mode if your GPU usage is below 95%.',
      });
    }
    if (lowFps) {
      tw.push({
        id: 'dlss', category: 'fps', impact: 'HIGH',
        title: 'Enable DLSS / DLSS Frame Generation',
        desc:  `At ${fps} FPS, upscaling via DLSS can recover 30–80% FPS with near-native image quality. Enable inside ${d.game} graphics settings.`,
      });
    }
    if (hasStutter) {
      tw.push({
        id: 'shader-cache', category: 'fps', impact: 'HIGH',
        title: 'Clear NVIDIA DXCache & Shader Cache',
        desc:  'Corrupted caches cause microstutters on game load. Forces a clean rebuild next session.',
        command: 'Remove-Item "$env:LOCALAPPDATA\\NVIDIA\\DXCache\\*" -Recurse -Force -ErrorAction SilentlyContinue; Remove-Item "$env:LOCALAPPDATA\\NVIDIA\\GLCache\\*" -Recurse -Force -ErrorAction SilentlyContinue',
      });
    }
  }

  if (isAmd) {
    tw.push({
      id: 'fsr', category: 'fps', impact: 'HIGH',
      title: 'Enable AMD FSR / Radeon Super Resolution',
      desc:  `Enable in AMD Software → Gaming → Graphics, or inside ${d.game} if FSR is natively supported. Major FPS recovery with minimal quality loss.`,
    });
    tw.push({
      id: 'antilag', category: 'fps', impact: hasDelay ? 'HIGH' : 'MEDIUM',
      title: 'Enable AMD Anti-Lag+',
      desc:  'Synchronizes CPU and GPU work more precisely, reducing input-to-frame latency. Enable in AMD Software → Gaming.',
    });
    if (hasStutter) {
      tw.push({
        id: 'shader-amd', category: 'fps', impact: 'HIGH',
        title: 'Clear AMD Shader Cache',
        desc:  'AMD builds shader cache on first game launch. Clearing it fixes stutters caused by corruption.',
        command: 'Remove-Item "$env:LOCALAPPDATA\\AMD\\DxCache\\*" -Recurse -Force -ErrorAction SilentlyContinue',
      });
    }
  }

  if (isLowRam) {
    tw.push({
      id: 'virtual-mem', category: 'fps', impact: 'HIGH',
      title: 'Expand Virtual Memory (8GB RAM Detected)',
      desc:  `${d.game} + Windows base usage will compete for 8GB. Set the paging file to a minimum of 12GB (System → Advanced → Virtual Memory).`,
    });
  }

  if (isMedRam) {
    tw.push({
      id: 'xmp', category: 'fps', impact: 'HIGH',
      title: 'Enable XMP / DOCP in BIOS',
      desc:  '16GB kits often ship running at 2133MHz — half their rated speed. Enable XMP (Intel) or DOCP (AMD) in BIOS for 8–15% performance increase.',
    });
  }

  tw.push({
    id: 'bg-kill', category: 'fps', impact: 'MEDIUM',
    title: 'Kill High-CPU Background Processes',
    desc:  'Lists processes consuming the most CPU. Close browsers, Discord, Spotify, and antivirus scans before gaming.',
    command: "Get-Process | Where-Object {$_.CPU -gt 3} | Sort-Object CPU -Descending | Select-Object -First 12 Name, @{N='CPU%';E={[math]::Round($_.CPU,1)}} | Format-Table -AutoSize",
  });

  // Network
  if (hasNet || isCompetitive) {
    tw.push({
      id: 'dns', category: 'network', impact: 'HIGH',
      title: 'Switch DNS to Cloudflare (1.1.1.1)',
      desc:  'Cloudflare resolves game server IPs faster than most ISP DNS servers, cutting connection setup time by 10–40ms.',
      command: 'Set-DnsClientServerAddress -InterfaceAlias "Wi-Fi" -ServerAddresses ("1.1.1.1","1.0.0.1")',
    });
    tw.push({
      id: 'nagle', category: 'network', impact: 'HIGH',
      title: "Disable Nagle's Algorithm",
      desc:  "Nagle's algorithm delays small TCP packets to save bandwidth — adding 0–200ms of jitter to game packets. Disabling it is standard competitive practice.",
      command: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" /v TcpAckFrequency /t REG_DWORD /d 1 /f & reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" /v TCPNoDelay /t REG_DWORD /d 1 /f',
    });
    tw.push({
      id: 'net-throttle', category: 'network', impact: 'MEDIUM',
      title: 'Remove Windows Network Throttling Index',
      desc:  'Windows applies bandwidth limits to non-multimedia processes by default. This registry key removes that cap for game traffic.',
      command: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v NetworkThrottlingIndex /t REG_DWORD /d 0xffffffff /f',
    });
    tw.push({
      id: 'flush-dns', category: 'network', impact: 'MEDIUM',
      title: 'Flush DNS Cache',
      desc:  'Removes stale DNS entries that can route you to geographically distant or deprecated game servers.',
      command: 'ipconfig /flushdns',
    });
  }

  // Windows Extended
  tw.push({
    id: 'ultimate-plan', category: 'windows', impact: 'HIGH',
    title: 'Unlock Ultimate Performance Power Plan',
    desc: 'Unlocks a hidden Windows power scheme designed for high-end workstations. Minimizes micro-latencies.',
    command: 'powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61; powercfg /setactive e9a42b02-d5df-448d-aa00-03f14749eb61',
  });

  tw.push({
    id: 'vbs-disable', category: 'windows', impact: 'HIGH',
    title: 'Disable Virtualization-Based Security (VBS)',
    desc: 'VBS can cause 5–25% FPS loss on some CPUs. Disabling it improves gaming stability at the cost of some enterprise security features.',
    command: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 0 /f',
  });

  tw.push({
    id: 'fso-disable', category: 'windows', impact: 'MEDIUM',
    title: 'Disable Global Fullscreen Optimizations',
    desc: 'Prevents Windows from "optimizing" (overlaying) fullscreen games, which often causes input lag in DX11 titles.',
    command: 'reg add "HKCU\\System\\GameConfigStore" /v GameDVR_FSEBehavior /t REG_DWORD /d 2 /f',
  });

  tw.push({
    id: 'hibernate-off', category: 'windows', impact: 'LOW',
    title: 'Disable Hibernation & Fast Startup',
    desc: 'Deletes hiberfil.sys (saving GBs of SSD space) and ensures a clean kernel boot every time, preventing "uptime" bugs.',
    command: 'powercfg -h off',
  });

  // Thermal
  if (hasTemp) {
    tw.push({
        id: 'fan-curve', category: 'thermal', impact: 'HIGH',
        title: 'Set Aggressive GPU Fan Curve (MSI Afterburner)',
        desc:  'Default fan curves hold temps too high. Set fan to 60% at 60°C and 80% at 75°C. This alone can drop GPU temps 8–15°C.',
      });
  }

  return tw;
}
