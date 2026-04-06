import { forwardRef } from 'react'

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  strong?: boolean
  onClick?: () => void
  style?: React.CSSProperties
  'data-cursor'?: string
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ children, className = '', glow = false, strong = false, onClick, style, 'data-cursor': dataCursor }, ref) => {
    const base = strong
      ? 'backdrop-blur-[40px] border border-white/[0.10]'
      : 'backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/30'

    const bg = strong
      ? 'bg-[rgba(12,9,3,0.80)]'
      : 'bg-white/[0.04] hover:bg-white/[0.06]'

    const shadow = glow
      ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_0_40px_rgba(0,0,0,0.5),0_0_60px_rgba(245,158,11,0.12)]'
      : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_40px_rgba(0,0,0,0.4)]'

    return (
      <div
        ref={ref}
        className={`transition-all duration-300 ${base} ${bg} ${shadow} ${className}`}
        onClick={onClick}
        style={style}
        data-cursor={dataCursor}
      >
        {children}
      </div>
    )
  }
)

GlassPanel.displayName = 'GlassPanel'
