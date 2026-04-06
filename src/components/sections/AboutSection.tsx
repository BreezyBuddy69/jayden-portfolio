import { motion } from 'framer-motion'
import translations, { type Language } from '../../i18n/translations'

const CHIP_ICONS = ['🏃', '🎾', '🏋️', '🧠', '🌱']

interface AboutSectionProps {
  isActive: boolean
  language: Language
}

export function AboutSection({ isActive, language }: AboutSectionProps) {
  const t = translations[language].about

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}>
      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px' }} />

      {/* Ambient glow center */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55vw 55vh at 75% 50%, rgba(245,158,11,0.045) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -32 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center md:justify-start"
          >
            <div className="relative w-56 md:w-64" style={{ aspectRatio: '3/4' }}>
              {/* Amber glow behind photo */}
              <div className="absolute -inset-4 rounded-2xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.12) 0%, transparent 70%)' }} />

              <img
                src="/gallery/photo.jpeg"
                alt="Jayden Mikus"
                className="relative z-10 w-full h-full object-cover rounded-xl"
                style={{
                  objectPosition: '50% 35%',
                  border: '1px solid rgba(255,255,255,0.08)',
                  filter: 'contrast(1.05) brightness(0.92)',
                }}
              />

              {/* Amber tint overlay */}
              <div className="absolute inset-0 z-20 rounded-xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, transparent 60%)' }} />

              {/* Age badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.7 }}
                transition={{ duration: 0.4, delay: 0.6, type: 'spring', stiffness: 320, damping: 24 }}
                className="absolute -bottom-4 -right-4 z-30 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(8,8,8,0.92)',
                  border: '1px solid rgba(245,158,11,0.35)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(245,158,11,0.12)',
                }}
              >
                <p className="text-white/85 text-sm font-semibold font-serif">17 y/o</p>
                <p className="text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: 'rgba(245,158,11,0.60)' }}>{t.badge}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text column */}
          <div>
            {/* Label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="block text-[10px] tracking-[0.32em] uppercase mb-5"
              style={{ color: 'rgba(245,158,11,0.55)' }}
            >
              {t.eyebrow}
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                color: '#ffffff',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                marginBottom: '24px',
              }}
            >
              {t.heading1}<br />{t.heading2}
            </motion.h2>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              style={{ color: 'rgba(255,255,255,0.52)', fontSize: '15px', lineHeight: 1.75, marginBottom: '28px' }}
            >
              <p className="mb-4">{t.p1}</p>
              <p className="mb-4">{t.p2}</p>
              <p>{t.p3}</p>
            </motion.div>

            {/* Chips */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-2"
            >
              {t.chips.map((label, i) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  <span>{CHIP_ICONS[i]}</span>
                  <span>{label}</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
