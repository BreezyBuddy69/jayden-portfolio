import { useState } from 'react'

export type PerformanceTier = 'full' | 'reduced' | 'minimal'

function detectTier(): PerformanceTier {
  const isTouch           = window.matchMedia('(hover: none)').matches
  const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cores             = navigator.hardwareConcurrency ?? 4
  const memory            = (navigator as unknown as { deviceMemory?: number }).deviceMemory

  if (cores <= 2 || (memory !== undefined && memory <= 1)) return 'minimal'
  if (isTouch || prefersLessMotion) return 'reduced'
  if (memory !== undefined && memory <= 2) return 'reduced'
  return 'full'
}

export function usePerformanceTier(): PerformanceTier {
  const [tier] = useState<PerformanceTier>(detectTier)
  return tier
}
