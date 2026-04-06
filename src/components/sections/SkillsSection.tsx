import { motion } from 'framer-motion'
import { Film, Cpu } from 'lucide-react'
import translations, { type Language } from '../../i18n/translations'

interface SkillsSectionProps {
  isActive: boolean
  onNavigate: (i: number) => void
  language: Language
}

// Animated film-strip lines for the Editing block
function FilmLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.12 }}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0"
          style={{ left: `${10 + i * 16}%`, width: '1px', background: 'rgba(245,158,11,0.8)' }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// Animated circuit dots for the Automations block
function CircuitDots() {
  const dots = [
    { x: '20%', y: '30%' }, { x: '50%', y: '20%' }, { x: '75%', y: '45%' },
    { x: '30%', y: '65%' }, { x: '60%', y: '70%' }, { x: '85%', y: '25%' },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.18 }}>
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ left: d.x, top: d.y, background: 'rgba(245,158,11,0.9)' }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, delay: i * 0.28, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full">
        <motion.line x1="20%" y1="30%" x2="50%" y2="20%"
          stroke="rgba(245,158,11,0.4)" strokeWidth="0.5"
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.line x1="50%" y1="20%" x2="75%" y2="45%"
          stroke="rgba(245,158,11,0.4)" strokeWidth="0.5"
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2.2, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.line x1="75%" y1="45%" x2="85%" y2="25%"
          stroke="rgba(245,158,11,0.4)" strokeWidth="0.5"
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2.2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.line x1="30%" y1="65%" x2="60%" y2="70%"
          stroke="rgba(245,158,11,0.4)" strokeWidth="0.5"
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2.2, delay: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
      </svg>
    </div>
  )
}

function SkillBlock({
  children,
  isActive,
  delay,
  onClick,
}: {
  children: React.ReactNode
  isActive: boolean
  delay: number
  onClick: () => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 32 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.015 }}
      onClick={onClick}
      data-cursor="hover"
      className="relative flex-1 rounded-2xl overflow-hidden text-left group"
      style={{
        minHeight: '220px',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'none',
        transition: 'border-color 0.3s, background 0.3s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.30)'
        ;(e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.04)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)'
      }}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)', transition: 'opacity 0.3s' }}
      />
    </motion.button>
  )
}

export function SkillsSection({ isActive, onNavigate, language }: SkillsSectionProps) {
  const t = translations[language].skills

  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12">

        {/* Label */}
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
          transition={{ duration: 0.5 }}
          className="block text-[10px] tracking-[0.32em] uppercase mb-4"
          style={{ color: 'rgba(245,158,11,0.55)' }}
        >
          {t.eyebrow}
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: '#ffffff',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            marginBottom: '12px',
          }}
        >
          {t.heading}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            color: 'rgba(255,255,255,0.42)',
            fontSize: '15px',
            maxWidth: '520px',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}
        >
          {t.desc}
        </motion.p>

        {/* Two blocks — Automations LEFT, Editing RIGHT */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* AI AUTOMATIONS block — first / left */}
          <SkillBlock isActive={isActive} delay={0.3} onClick={() => onNavigate(2)}>
            <CircuitDots />
            <div className="relative z-10 p-8 flex flex-col justify-between h-full" style={{ minHeight: '220px' }}>
              <div className="flex items-center gap-3 mb-auto">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
                  <Cpu className="w-5 h-5" style={{ color: 'rgba(245,158,11,0.75)' }} />
                </div>
              </div>
              <div className="mt-8">
                <p className="text-[10px] tracking-[0.30em] uppercase mb-2" style={{ color: 'rgba(245,158,11,0.50)' }}>
                  {t.automationsTag}
                </p>
                <h3 style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                  marginBottom: '16px',
                }}>
                  {t.automationsTitle}
                </h3>
                <p className="text-white/38 text-xs leading-relaxed max-w-[260px]">
                  {t.automationsDesc}
                </p>
              </div>
            </div>
          </SkillBlock>

          {/* EDITING block — second / right */}
          <SkillBlock isActive={isActive} delay={0.42} onClick={() => onNavigate(3)}>
            <FilmLines />
            <div className="relative z-10 p-8 flex flex-col justify-between h-full" style={{ minHeight: '220px' }}>
              <div className="flex items-center gap-3 mb-auto">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
                  <Film className="w-5 h-5" style={{ color: 'rgba(245,158,11,0.75)' }} />
                </div>
              </div>
              <div className="mt-8">
                <p className="text-[10px] tracking-[0.30em] uppercase mb-2" style={{ color: 'rgba(245,158,11,0.50)' }}>
                  {t.editingTag}
                </p>
                <h3 style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                  marginBottom: '16px',
                }}>
                  {t.editingTitle}
                </h3>
                <p className="text-white/38 text-xs leading-relaxed max-w-[260px]">
                  {t.editingDesc}
                </p>
              </div>
            </div>
          </SkillBlock>

        </div>

        {/* hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="text-[10px] tracking-[0.18em] uppercase mt-5"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >
          {t.hint}
        </motion.p>

      </div>
    </section>
  )
}
