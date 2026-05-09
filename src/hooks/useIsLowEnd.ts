/**
 * Returns true for touch-only devices (phones/tablets) or weak hardware
 * (≤4 CPU cores or ≤2 GB RAM). Custom cursor and heavy effects are skipped
 * on these devices.
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false

  // Touch-only = no hover support (phones, tablets)
  if (window.matchMedia('(hover: none)').matches) return true

  // Low CPU core count
  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4) return true

  // Low RAM (deviceMemory is experimental but widely supported in Chromium)
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  if (mem !== undefined && mem <= 2) return true

  return false
}
