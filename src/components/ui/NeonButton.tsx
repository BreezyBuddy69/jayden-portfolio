import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'ghost'
}

export function NeonButton({ children, onClick, className = '', size = 'md', variant = 'primary' }: NeonButtonProps) {
  const [hovered, setHovered] = useState(false)

  const sizeClass = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-[15px]',
  }[size]

  if (variant === 'ghost') {
    return (
      <motion.button
        data-cursor="hover"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={onClick}
        className={`relative rounded-full font-medium tracking-wide overflow-hidden flex items-center gap-2.5 ${sizeClass} ${className}`}
        style={{
          color: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.60)',
          background: 'transparent',
          border: `1px solid ${hovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)'}`,
          transition: 'color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  }

  return (
    <motion.button
      data-cursor="hover"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className={`relative rounded-full font-medium text-white tracking-wide overflow-hidden flex items-center gap-2.5 ${sizeClass} ${className}`}
      style={{
        background: hovered
          ? 'rgba(232,69,18,0.18)'
          : 'rgba(232,69,18,0.10)',
        border: `1px solid ${hovered ? 'rgba(232,69,18,0.80)' : 'rgba(232,69,18,0.45)'}`,
        boxShadow: hovered
          ? '0 0 32px rgba(232,69,18,0.35), inset 0 1px 0 rgba(255,120,60,0.22)'
          : '0 0 14px rgba(232,69,18,0.15), inset 0 1px 0 rgba(255,120,60,0.12)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Top shimmer */}
      <span
        className="absolute top-0 left-6 right-6 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(232,69,18,${hovered ? '0.55' : '0.25'}), transparent)`,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Sweep shimmer on hover */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%', opacity: 0 }}
        animate={hovered ? { x: '120%', opacity: 1 } : { x: '-100%', opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(232,69,18,0.18) 50%, transparent 100%)',
          skewX: '-12deg',
        }}
      />

      <span className="relative z-10">{children}</span>

      <motion.span
        className="relative z-10 flex items-center"
        animate={{ x: hovered ? 3 : 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        style={{ willChange: 'transform' }}
      >
        <ArrowRight
          className="shrink-0"
          style={{
            width: size === 'sm' ? 13 : size === 'lg' ? 17 : 15,
            height: size === 'sm' ? 13 : size === 'lg' ? 17 : 15,
            opacity: hovered ? 0.9 : 0.55,
            transition: 'opacity 0.3s ease',
            color: 'rgba(232,69,18,1)',
          }}
        />
      </motion.span>
    </motion.button>
  )
}
