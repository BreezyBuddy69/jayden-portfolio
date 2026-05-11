import { useEffect, useRef } from 'react'

interface VantaNetOptions {
  el: HTMLElement
  mouseControls?: boolean
  touchControls?: boolean
  color?: number
  backgroundColor?: number
  points?: number
  maxDistance?: number
  spacing?: number
}

interface VantaEffect {
  destroy: () => void
}

declare global {
  interface Window {
    VANTA?: {
      NET?: (options: VantaNetOptions) => VantaEffect
    }
    THREE?: unknown
  }
}

export function useVantaNet(containerRef: React.RefObject<HTMLElement | null>) {
  const effectRef = useRef<VantaEffect | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (!window.VANTA?.NET) return

    try {
      effectRef.current = window.VANTA.NET({
        el: containerRef.current,
        mouseControls: true,
        touchControls: false,
        color: 0xd97706,        // amber deep
        backgroundColor: 0x080808,
        points: 9,
        maxDistance: 22,
        spacing: 18,
      })
    } catch {
      // Vanta failed silently — fallback bg is set in CSS
    }

    return () => {
      effectRef.current?.destroy()
      effectRef.current = null
    }
  }, [containerRef])
}
