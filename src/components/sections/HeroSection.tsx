import { motion } from 'framer-motion'
import { type Language } from '../../i18n/translations'
import { OrangeFlowBg } from '../ui/OrangeFlowBg'

const ORANGE = '#eb5e28'

interface HeroSectionProps {
  isActive: boolean
  onScrollDown: () => void
  onOpenChat: () => void
  language: Language
}

export function HeroSection({ isActive, onScrollDown, onOpenChat, language }: HeroSectionProps) {
  const sub  = language === 'de' ? 'Skills, die wirklich liefern.' : language === 'fr' ? 'Des skills qui livrent vraiment.' : 'Skills that deliver.'
  const cta1 = language === 'de' ? 'Meine Arbeit' : language === 'fr' ? 'Mon travail' : 'See My Work'
  const cta2 = language === 'de' ? 'Mit KI sprechen' : language === 'fr' ? "Parler à l'IA" : 'Talk to My AI'

  return (
    <section
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ background: ORANGE }}
    >
      <OrangeFlowBg />
      <div aria-hidden className="absolute inset-0 pointer-events-none grain opacity-[0.04]" />

      {/* ── Background words ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 1.1, delay: 0.05, ease: 'easeOut' }}
        aria-hidden
        className="absolute inset-0 select-none pointer-events-none"
      >
        {/* JAYDEN — use text-shadow via CSS class; section clips letters but not
            the diffuse soft shadow which bleeds into the orange below */}
        <div style={{
          position: 'absolute',
          top: '5%',
          left: 0,
          right: 0,
          lineHeight: 0,
          overflow: 'visible',
        }}>
          <span
            className="text-3d-on-orange font-anurati"
            style={{
              display: 'block',
              fontSize: 'clamp(7rem, 22vw, 26rem)',
              color: '#252422',
              fontWeight: 900,
              lineHeight: 0.90,
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}
          >
            JAYDEN
          </span>
        </div>

        {/* MIKUS — invisible clip box, S touches right edge, bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
          lineHeight: 0,
        }}>
          <span
            className="text-3d-outline-on-orange font-anurati"
            style={{
              display: 'block',
              textAlign: 'right',
              fontSize: 'clamp(8.05rem, 25.3vw, 29.9rem)',
              color: 'transparent',
              fontWeight: 900,
              WebkitTextStroke: '2px rgba(0,0,0,0.45)',
              lineHeight: 0.90,
              whiteSpace: 'nowrap',
              letterSpacing: '0.22em',
            }}
          >
            MIKUS
          </span>
        </div>
      </motion.div>

      {/* ── Foreground: tagline + buttons centered ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 18 }}
        transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-6 text-center"
      >
        <p
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            color: '#ffffff',
            letterSpacing: '0.01em',
            lineHeight: 1.3,
          }}
        >
          {sub}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={onScrollDown}
            data-cursor="hover"
            style={{
              background: '#ffffff',
              color: '#252422',
              border: 'none',
              borderRadius: '999px',
              padding: '15px 38px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.80')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {cta1}
          </button>

          <button
            onClick={onOpenChat}
            data-cursor="hover"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.85)',
              border: '1.5px solid rgba(255,255,255,0.55)',
              borderRadius: '999px',
              padding: '14px 38px',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.90)'
              ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.55)'
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'
            }}
          >
            {cta2}
          </button>
        </div>
      </motion.div>
    </section>
  )
}
