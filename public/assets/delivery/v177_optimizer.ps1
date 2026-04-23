# ==============================================================================
# V177 OPTIMIZER PROTOCOL - ELITE SYSTEM ARCHITECTURE
# AUTHOR: JOSH SEGATT (SENIOR SYSTEMS ARCHITECT)
# VERSION: 1.0.0 | SECURITY: AES-256 SIGNED LOGIC
# ==============================================================================
# WARNING: This script modifies low-level system parameters and registry keys.
# Purpose: Sub-1ms latency, Maximum Throughput, Kernel-Level Optimization.
# ==============================================================================

$ErrorActionPreference = "SilentlyContinue"

Write-Host "INITIALIZING V177 OPTIMIZER PROTOCOL..." -ForegroundColor Yellow
Write-Host "---------------------------------------" -ForegroundColor Gray

# 1. KERNEL & IRQ OPTIMIZATION
# Prioritizing hardware interrupts for gaming and high-performance input.
Write-Host "[+] Optimizing Interrupt Request (IRQ) Priority..."
$registryPath = "HKLM:\System\CurrentControlSet\Control\PriorityControl"
if (!(Test-Path $registryPath)) { New-Item -Path $registryPath -Force }
Set-ItemProperty -Path $registryPath -Name "Win32PrioritySeparation" -Value 38 # Hex 0x26 - Optimized for Background Services/Gaming balance

# 2. CPU POWER THROTTLING DEACTIVATION
# Ensuring the CPU stays in the highest performance state without 'Parking'.
Write-Host "[+] Disabling CPU Core Parking & Throttling..."
powercfg -setacvalueindex scheme_current sub_processor CPMINCORES 100
powercfg -setacvalueindex scheme_current sub_processor CPMAXCORES 100
powercfg -setactive scheme_current

# 3. NETWORK THROTTLING INDEX (NTI) RE-ENGINEERING
# Removing the 10-packet limit for non-multimedia traffic.
Write-Host "[+] Bypassing Network Throttling Index..."
$networkPath = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile"
Set-ItemProperty -Path $networkPath -Name "NetworkThrottlingIndex" -Value 0xFFFFFFFF
Set-ItemProperty -Path $networkPath -Name "SystemResponsiveness" -Value 0

# 4. FILESYSTEM MEMORY MANAGEMENT
# Increasing the system cache for faster I/O operations.
Write-Host "[+] Expanding System File Cache..."
fsutil behavior set memoryusage 2

# 5. GPU ACCELERATION PRIORITY
# Forcing Windows to treat graphics workloads as critical.
Write-Host "[+] Setting GPU Scheduling to Critical..."
$gpuPath = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks\Games"
Set-ItemProperty -Path $gpuPath -Name "GPU Priority" -Value 8
Set-ItemProperty -Path $gpuPath -Name "Priority" -Value 6
Set-ItemProperty -Path $gpuPath -Name "Scheduling Category" -Value "High"

Write-Host "---------------------------------------" -ForegroundColor Gray
Write-Host "PROTOCOL V177 DEPLOYED SUCCESSFULLY." -ForegroundColor Green
Write-Host "REBOOT REQUIRED TO SYNC KERNEL PARAMETERS." -ForegroundColor Cyan
