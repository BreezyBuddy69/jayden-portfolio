import { motion } from 'framer-motion'
import translations, { type Language } from '../../i18n/translations'
import { OrangeFlowBg } from '../ui/OrangeFlowBg'

const ORANGE = '#eb5e28'

// Floating ember sparks — float upward and fade out
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: 5 + ((i * 13) % 90),
    bottom: 5 + ((i * 7) % 30),
    delay: i * 0.55,
    duration: 7 + ((i * 1.4) % 5),
    size: 1 + (i % 3),
    opacity: 0.25 + (i % 4) * 0.1,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -(100 + (p.id * 18) % 120)], opacity: [0, p.opacity, p.opacity * 0.7, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            background: `rgba(232,69,18,${p.opacity + 0.1})`,
          }}
        />
      ))}
    </div>
  )
}

function DarkOrbsBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* Dark orb 1 — left */}
      <motion.div
        animate={{ x: [0, 30, -20, 10, 0], y: [0, -30, 20, -10, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width: 650, height: 650,
          top: '-10%', left: '-15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 45%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      {/* Dark orb 2 — top-right */}
      <motion.div
        animate={{ x: [0, -45, 25, -10, 0], y: [0, 30, -50, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width: 420, height: 420,
          top: '-5%', right: '-8%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 50%, transparent 72%)',
          filter: 'blur(75px)',
        }}
      />
      {/* Dark orb 3 — bottom-right */}
      <motion.div
        animate={{ x: [0, 35, -20, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute pointer-events-none"
        style={{
          width: 320, height: 320,
          bottom: '5%', right: '20%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  )
}

interface AboutSectionProps {
  isActive: boolean
  language: Language
}

export function AboutSection({ isActive, language }: AboutSectionProps) {
  const t = translations[language].about

  return (
    <section
      className="relative w-full h-full flex flex-col justify-center overflow-hidden"
      style={{ background: '#eb5e28' }}
    >
      {/* Flowing background animation */}
      <OrangeFlowBg />

      {/* Extra dark overlay for more contrast */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 35%, rgba(37,36,34,0.28) 100%)', zIndex: 1 }} />

      {/* Grain texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px', zIndex: 1 }} />

      {/* Floating spark particles */}
      <FloatingParticles />

      {/* Giant "JAYDEN" in Anurati — centered, animated */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none flex justify-center">
        <motion.div
          className="font-anurati"
          style={{
            fontSize: 'clamp(8rem, 22vw, 28rem)',
            color: 'transparent',
            WebkitTextStroke: `3px rgba(37,36,34,0.55)`,
            lineHeight: 0.85,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            transform: 'translateY(5%)',
          }}
          animate={{
            opacity: [0.50, 0.90, 0.50],
            x: [-20, 20, -20],
            scale: [0.98, 1.02, 0.98],
            filter: [
              'drop-shadow(0 0 0px rgba(37,36,34,0))',
              'drop-shadow(0 0 50px rgba(37,36,34,0.30))',
              'drop-shadow(0 0 0px rgba(37,36,34,0))',
            ],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        >
          JAYDEN
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -24 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center md:justify-start"
          >
            <div className="relative" style={{ width: 'min(220px, 55vw)', aspectRatio: '3/4' }}>

              {/* Pulsing animated glow ring */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute pointer-events-none rounded-2xl"
                style={{
                  inset: '-20px',
                  background: `radial-gradient(ellipse at center, ${ORANGE}28 0%, ${ORANGE}0C 45%, transparent 72%)`,
                  filter: 'blur(24px)',
                }}
              />

              {/* Secondary subtle ring */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute pointer-events-none rounded-2xl"
                style={{
                  inset: '-4px',
                  border: `1px solid rgba(232,69,18,0.25)`,
                  borderRadius: '14px',
                }}
              />

              <img
                src="/gallery/photo.jpeg"
                alt="Jayden Mikus"
                className="relative z-10 w-full h-full object-cover rounded-xl"
                style={{
                  objectPosition: '50% 35%',
                  border: '1px solid rgba(255,255,255,0.07)',
                  filter: 'contrast(1.05) brightness(0.88)',
                }}
              />

              {/* Orange tint overlay */}
              <div
                className="absolute inset-0 z-20 rounded-xl pointer-events-none"
                style={{ background: `linear-gradient(160deg, ${ORANGE}0D 0%, transparent 55%, ${ORANGE}07 100%)` }}
              />

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.7 }}
                transition={{ duration: 0.4, delay: 0.6, type: 'spring', stiffness: 300, damping: 24 }}
                className="absolute -bottom-4 -right-4 z-30 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(0,0,0,0.80)',
                  border: '1px solid rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 20px rgba(0,0,0,0.15)',
                }}
              >
                <p className="text-white/85 text-sm font-semibold font-serif">17 y/o</p>
                <p className="text-[10px] tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {t.badge}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text column */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[10px] tracking-[0.32em] uppercase mb-5"
              style={{ color: 'rgba(37,36,34,0.75)' }}
            >
              {t.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
                color: '#ffffff',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: '28px',
              }}
            >
              {t.heading1}<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(0,0,0,0.55)' }}>
                {t.heading2}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ color: 'rgba(37,36,34,0.80)', fontSize: '15px', lineHeight: 1.8, marginBottom: '32px', maxWidth: '360px' }}
            >
              {t.p1}
            </motion.p>

            {/* Chips with orange hover */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {t.chips.slice(0, 3).map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.07 }}
                  className="px-3 py-1.5 rounded-full text-xs cursor-default"
                  style={{
                    background: 'rgba(0,0,0,0.10)',
                    border: '1px solid rgba(0,0,0,0.22)',
                    color: 'rgba(0,0,0,0.65)',
                    letterSpacing: '0.05em',
                    transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.45)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.22)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.90)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.22)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.10)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(0,0,0,0.65)'
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
