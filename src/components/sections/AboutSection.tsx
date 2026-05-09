import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import translations, { type Language } from '../../i18n/translations'
import { BackgroundPaths } from '../ui/background-paths'
import { GlowCard } from '../ui/spotlight-card'

const ORANGE = '#eb5e28'

// Dark orb that follows the mouse — creates depth on orange background
function DarkMouseOrb() {
  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)
  const x = useSpring(rawX, { stiffness: 80, damping: 30 })
  const y = useSpring(rawY, { stiffness: 80, damping: 30 })
  const left = useTransform(x, [0, 1], ['10%', '80%'])
  const top  = useTransform(y, [0, 1], ['10%', '80%'])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth)
      rawY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [rawX, rawY])

  return (
    <motion.div
      style={{ left, top, position: 'absolute', translateX: '-50%', translateY: '-50%' }}
      className="pointer-events-none"
    >
      <div style={{
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(235,94,40,0.18) 0%, rgba(235,94,40,0.06) 45%, transparent 70%)',
        filter: 'blur(70px)',
      }} />
    </motion.div>
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
      style={{ background: '#0a0807' }}
    >
      {/* ── Animated orange paths background ── */}
      <BackgroundPaths />

      {/* ── Edge vignette — keeps content readable ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 18%, rgba(10,8,7,0.65) 100%)', zIndex: 1 }} />

      {/* ── Top gradient band ── */}
      <div aria-hidden className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '38%', background: 'linear-gradient(to bottom, rgba(10,8,7,0.75) 0%, rgba(10,8,7,0.25) 60%, transparent 100%)', zIndex: 1 }} />

      {/* ── Bottom gradient band ── */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '30%', background: 'linear-gradient(to top, rgba(10,8,7,0.70) 0%, transparent 100%)', zIndex: 1 }} />

      {/* ── Left-edge panel ── */}
      <div aria-hidden className="absolute top-0 left-0 bottom-0 pointer-events-none"
        style={{ width: '22%', background: 'linear-gradient(to right, rgba(10,8,7,0.65) 0%, transparent 100%)', zIndex: 1 }} />

      {/* ── Orange mouse orb — warm atmospheric light ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        <DarkMouseOrb />
      </div>

      {/* Grain texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px', zIndex: 2 }} />

      {/* Giant "JAYDEN" watermark at bottom — animated */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none flex justify-center" style={{ zIndex: 2 }}>
        <motion.div
          className="font-anurati"
          style={{
            fontSize: 'clamp(8rem, 22vw, 28rem)',
            color: 'transparent',
            WebkitTextStroke: `2.5px rgba(235,94,40,0.22)`,
            lineHeight: 0.85,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            transform: 'translateY(5%)',
          }}
          animate={{
            opacity: [0.50, 0.85, 0.50],
            x: [-18, 18, -18],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
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

              {/* Pulsing glow ring */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute pointer-events-none rounded-2xl"
                style={{
                  inset: '-20px',
                  background: `radial-gradient(ellipse at center, rgba(37,36,34,0.28) 0%, rgba(37,36,34,0.08) 45%, transparent 72%)`,
                  filter: 'blur(24px)',
                }}
              />

              {/* Secondary border ring */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute pointer-events-none rounded-2xl"
                style={{
                  inset: '-4px',
                  border: `1px solid rgba(37,36,34,0.25)`,
                  borderRadius: '14px',
                }}
              />

              <img
                src="/gallery/photo.jpeg"
                alt="Jayden Mikus"
                className="relative z-10 w-full h-full object-cover rounded-xl"
                style={{
                  objectPosition: '50% 35%',
                  border: '1px solid rgba(0,0,0,0.12)',
                  filter: 'contrast(1.05) brightness(0.90)',
                }}
              />

              {/* Subtle dark tint overlay */}
              <div
                className="absolute inset-0 z-20 rounded-xl pointer-events-none"
                style={{ background: 'linear-gradient(160deg, rgba(37,36,34,0.08) 0%, transparent 50%, rgba(37,36,34,0.05) 100%)' }}
              />

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.7 }}
                transition={{ duration: 0.4, delay: 0.6, type: 'spring', stiffness: 300, damping: 24 }}
                className="absolute -bottom-4 -right-4 z-30 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(0,0,0,0.72)',
                  border: '1px solid rgba(0,0,0,0.30)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.20)',
                }}
              >
                <p className="text-white/85 text-sm font-semibold font-serif">17 y/o</p>
                <p className="text-[10px] tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.60)' }}>
                  {t.badge}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text column */}
          <GlowCard
            glowColor="orange"
            customSize
            className="w-full"
            style={{
              background: 'rgba(10,8,7,0.35)',
              border: '1px solid rgba(235,94,40,0.12)',
              backdropFilter: 'blur(2px)',
              padding: '24px 20px',
            }}
          >
            <div className="relative" style={{ zIndex: 1 }}>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[10px] tracking-[0.34em] uppercase mb-4"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              {t.eyebrow}
            </motion.p>

            {/* Accent line — white on dark panel */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 48, height: 2,
                background: `rgba(235,94,40,0.85)`,
                borderRadius: 2,
                transformOrigin: 'left center',
                marginBottom: 20,
              }}
            />

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 24 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                color: '#ffffff',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: '0.08em',
                textShadow: '0 2px 30px rgba(0,0,0,0.45)',
              }}
            >
              {t.heading1}
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 24 }}
              transition={{ duration: 0.75, delay: 0.30, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(235,94,40,0.55)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: '24px',
              }}
            >
              {t.heading2}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.40 }}
              style={{ color: 'rgba(255,255,255,0.72)', fontSize: '15px', lineHeight: 1.82, marginBottom: '28px', maxWidth: '360px' }}
            >
              {t.p1}
            </motion.p>

            {/* Chips */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="flex flex-wrap gap-2"
            >
              {t.chips.slice(0, 3).map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
                  transition={{ duration: 0.4, delay: 0.56 + i * 0.07 }}
                  className="px-3 py-1.5 rounded-full text-xs cursor-default"
                  style={{
                    background: 'rgba(235,94,40,0.10)',
                    border: '1px solid rgba(235,94,40,0.30)',
                    color: 'rgba(255,255,255,0.80)',
                    letterSpacing: '0.05em',
                    transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(235,94,40,0.65)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(235,94,40,0.22)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.95)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(235,94,40,0.30)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(235,94,40,0.10)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.80)'
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  )
}
