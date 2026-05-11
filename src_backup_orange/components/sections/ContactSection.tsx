import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import translations, { type Language } from '../../i18n/translations'
import { BackgroundPaths } from '../ui/background-paths'

const ORANGE = '#eb5e28'
const BG = '#0a0807'
const EMAIL = 'mikus.jayden@outlook.com'

// Orange mouse orb — warm atmospheric glow on dark background
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
        width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(235,94,40,0.18) 0%, rgba(235,94,40,0.06) 45%, transparent 70%)',
        filter: 'blur(65px)',
      }} />
    </motion.div>
  )
}

// Staggered letter animation — same as Hero JAYDEN/MIKUS
function AnimatedWord({
  word,
  delay,
  style,
  className,
}: {
  word: string
  delay: number
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <span aria-label={word} className={className} style={{ display: 'block', ...style }}>
      {word.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.055,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

interface ContactSectionProps {
  isActive: boolean
  language: Language
}

export function ContactSection({ isActive, language }: ContactSectionProps) {
  const t = translations[language].contact

  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: BG }}
    >
      {/* ── Animated orange paths background ── */}
      <BackgroundPaths />

      {/* ── Radial vignette — dark edges ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 68% 60% at 50% 44%, transparent 0%, rgba(10,8,7,0.58) 55%, rgba(10,8,7,0.82) 100%)`,
        }}
      />

      {/* ── Dark top gradient band ── */}
      <div aria-hidden className="absolute top-0 left-0 right-0 pointer-events-none" style={{
        height: '40%', zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(10,8,7,0.65) 0%, rgba(10,8,7,0.20) 65%, transparent 100%)',
      }} />

      {/* ── Dark bottom gradient band ── */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: '32%', zIndex: 1,
        background: 'linear-gradient(to top, rgba(10,8,7,0.60) 0%, transparent 100%)',
      }} />

      {/* ── Dark left + right edge panels ── */}
      <div aria-hidden className="absolute top-0 left-0 bottom-0 pointer-events-none" style={{
        width: '15%', zIndex: 1,
        background: 'linear-gradient(to right, rgba(10,8,7,0.50) 0%, transparent 100%)',
      }} />
      <div aria-hidden className="absolute top-0 right-0 bottom-0 pointer-events-none" style={{
        width: '15%', zIndex: 1,
        background: 'linear-gradient(to left, rgba(10,8,7,0.50) 0%, transparent 100%)',
      }} />

      {/* ── Dark mouse orb ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <DarkMouseOrb />
      </div>

      {/* ── Grain ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px', zIndex: 2 }} />

      {/* ── "LET'S GO." — animated letter by letter, like MIKUS on Hero ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        style={{ zIndex: 3 }}
      >
        {isActive && (
          <AnimatedWord
            word="LET'S GO."
            delay={0.2}
            className="font-anurati text-center"
            style={{
              fontSize: 'clamp(6rem, 18vw, 22rem)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(235,94,40,0.22)',
              lineHeight: 0.82,
              letterSpacing: '0.12em',
              transform: 'translateY(20%)',
              whiteSpace: 'nowrap',
            }}
          />
        )}
      </div>

      {/* ── Thin top accent line ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent 0%, rgba(235,94,40,0.25) 30%, rgba(235,94,40,0.45) 50%, rgba(235,94,40,0.25) 70%, transparent 100%)',
          transformOrigin: 'center',
          zIndex: 4,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-[10] w-full max-w-3xl mx-auto px-6 md:pl-[190px] md:pr-12 text-center">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="text-[10px] tracking-[0.36em] uppercase mb-4"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          {t.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 28 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)',
            color: '#ffffff',
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            marginBottom: '0.08em',
            textShadow: '0 2px 30px rgba(0,0,0,0.20)',
          }}
        >
          {t.heading1}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 28 }}
          transition={{ duration: 0.75, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)',
            color: 'rgba(255,255,255,0.70)',
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            marginBottom: '22px',
          }}
        >
          {t.heading2}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          style={{ color: 'rgba(255,255,255,0.82)', fontSize: '14px', lineHeight: 1.75, maxWidth: '340px', margin: '0 auto 44px' }}
        >
          {t.desc}
        </motion.p>

        {/* Email card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center gap-3 px-6 py-4 rounded-xl"
            style={{
              background: 'rgba(62,46,30,0.92)',
              border: '1.5px solid rgba(235,94,40,0.65)',
              backdropFilter: 'blur(20px)',
              textDecoration: 'none',
              boxShadow: '0 6px 28px rgba(0,0,0,0.45)',
              transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(235,94,40,0.80)'
              el.style.background = 'rgba(55,38,24,0.92)'
              el.style.boxShadow = '0 0 36px rgba(235,94,40,0.22)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(235,94,40,0.50)'
              el.style.background = 'rgba(38,28,20,0.85)'
              el.style.boxShadow = '0 6px 28px rgba(0,0,0,0.45)'
              el.style.transform = 'translateY(0)'
            }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(235,94,40,0.15)', border: '1px solid rgba(235,94,40,0.35)' }}>
              <Mail className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.75)' }} />
            </div>
            <div className="text-left">
              <p className="text-[9px] tracking-[0.18em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.emailLabel}</p>
              <span className="text-sm text-white/90 group-hover:text-white/95 transition-colors">{EMAIL}</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/76 group-hover:text-white/82 transition-colors ml-1" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.85 }}
          className="mt-14 text-[10px] tracking-[0.22em] uppercase"
          style={{ color: 'rgba(255,255,255,0.76)' }}
        >
          {t.footer}
        </motion.p>
      </div>
    </section>
  )
}
