import { useRef } from 'react'
import { motion } from 'framer-motion'
import { NeonButton } from '../ui/NeonButton'
import { useVantaNet } from '../../hooks/useVantaNet'
import { usePerformanceTier } from '../../hooks/usePerformanceTier'
import translations, { type Language } from '../../i18n/translations'

interface HeroSectionProps {
  isActive: boolean
  onScrollDown: () => void
  onOpenChat: () => void
  language: Language
}


export function HeroSection({ isActive, onScrollDown, onOpenChat, language }: HeroSectionProps) {
  const t = translations[language].hero
  const containerRef = useRef<HTMLDivElement>(null)
  const tier = usePerformanceTier()
  useVantaNet(tier === 'full' ? containerRef : { current: null })

  return (
    <section
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Radial amber pulse */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65vw 55vh at 50% 45%, rgba(245,158,11,0.055) 0%, transparent 68%)',
        }}
      />

      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="text-[10px] tracking-[0.36em] uppercase mb-8 block"
          style={{ color: 'rgba(245,158,11,0.60)', fontFamily: 'Inter, sans-serif' }}
        >
          {t.eyebrow}
        </motion.span>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(3.2rem, 9vw, 8.5rem)',
            color: '#ffffff',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            margin: 0,
            marginBottom: '0.08em',
          }}
        >
          {t.line1}
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
          transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(3.2rem, 9vw, 8.5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            margin: 0,
            marginBottom: '0.5em',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.55)',
          }}
        >
          {t.line2}
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.65rem)',
            color: 'rgba(245,158,11,0.80)',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
            marginBottom: '16px',
          }}
        >
          {t.sub}
        </motion.p>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
          style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.50)',
            maxWidth: '420px',
            lineHeight: 1.7,
            marginBottom: '40px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {t.body}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.92 }}
          transition={{ duration: 0.55, delay: 0.8, type: 'spring', stiffness: 300, damping: 26 }}
          className="flex items-center gap-4 flex-wrap justify-center mb-16"
        >
          <NeonButton size="lg" onClick={onScrollDown}>
            {t.cta1}
          </NeonButton>
          <NeonButton size="lg" variant="ghost" onClick={onOpenChat}>
            {t.cta2}
          </NeonButton>
        </motion.div>

        {/* Stats — two blocks */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
          transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
          className="flex items-stretch gap-4"
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Block 1: Automations */}
          <div className="flex flex-col items-center justify-center px-8 py-4 rounded-2xl gap-1"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
            <span className="text-white/90 font-serif text-3xl md:text-4xl font-bold tracking-tight">
              {t.stat1Value}
            </span>
            <span className="text-white/38 text-[10px] tracking-[0.22em] uppercase">{t.stat1Label}</span>
          </div>

          {/* Block 2: Editing */}
          <div className="flex flex-col items-center justify-center px-8 py-4 rounded-2xl gap-1"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
            <span className="text-white/90 font-serif text-3xl md:text-4xl font-bold tracking-tight">
              {t.stat2Value}
            </span>
            <span className="text-white/38 text-[10px] tracking-[0.22em] uppercase">{t.stat2Label}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
