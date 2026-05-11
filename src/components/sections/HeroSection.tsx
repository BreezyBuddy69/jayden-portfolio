import { ORANGE } from '../../lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { type Language } from '../../i18n/translations'
import { Boxes } from '../ui/background-boxes'
import { NeonButton } from '../ui/neon-button'

const VIOLET = '#8B5CF6'
const DARK = '#0f0d0c'

interface HeroSectionProps {
  isActive: boolean
  onScrollDown: () => void
  onOpenChat: () => void
  language: Language
}

/* Floating orb that subtly follows the mouse */
function MouseOrb() {
  const ref = useRef<HTMLDivElement>(null)
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
      ref={ref}
      style={{ left, top, position: 'absolute', translateX: '-50%', translateY: '-50%' }}
      className="pointer-events-none"
    >
      <div
        style={{
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${VIOLET}44 0%, ${VIOLET}11 45%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
    </motion.div>
  )
}

/* Staggered letter animation for JAYDEN / MIKUS */
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
    <span aria-label={word} className={className} style={{ display: 'block', willChange: 'transform', ...style }}>
      {word.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export function HeroSection({ isActive, onScrollDown, onOpenChat, language }: HeroSectionProps) {
  const sub  = language === 'de' ? 'Skills, die wirklich liefern.' : language === 'fr' ? 'Des skills qui livrent vraiment.' : 'Skills that deliver.'
  const cta1 = language === 'de' ? 'Meine Arbeit' : language === 'fr' ? 'Mon travail' : 'See My Work'
  const cta2 = language === 'de' ? 'Mit KI sprechen' : language === 'fr' ? "Parler à l'IA" : 'Talk to My AI'

  return (
    <section
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ background: DARK }}
    >
      {/* ── Background boxes ── */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.3 }}
      >
        <Boxes />
      </motion.div>

      {/* ── Radial vignette — fades grid toward center so text stays readable ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 75% 68% at 50% 44%, transparent 0%, ${DARK}88 52%, ${DARK}cc 100%)`,
        }}
      />

      {/* ── Mouse-following glow orb ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <MouseOrb />
      </div>

      {/* ── Static ambient gradients ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Bottom center warm pool */}
        <div style={{
          position: 'absolute', bottom: '-5%', left: '50%',
          transform: 'translateX(-50%)',
          width: 800, height: 300,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${VIOLET}22 0%, transparent 65%)`,
          filter: 'blur(60px)',
        }} />
        {/* Top-left cool dark */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,13,12,0.9) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        {/* Grain overlay */}
        <div aria-hidden className="absolute inset-0 grain opacity-[0.06]" />
      </div>

      {/* ── Background letter JAYDEN ── */}
      {isActive && (
        <div
          aria-hidden
          className="absolute inset-0 z-[2] select-none pointer-events-none"
        >
          <div style={{ position: 'absolute', top: '3%', left: 0, right: 0, lineHeight: 0, overflow: 'visible' }}>
            <AnimatedWord
              word="JAYDEN"
              delay={0.1}
              className="font-anurati"
              style={{
                fontSize: 'clamp(7rem, 22vw, 26rem)',
                color: '#ffffff',
                fontWeight: 900,
                lineHeight: 0.90,
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                textShadow: `0 0 120px ${VIOLET}55, 0 4px 40px rgba(0,0,0,0.6)`,
              }}
            />
          </div>

          {/* MIKUS — outline, bottom right */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, overflow: 'hidden', lineHeight: 0 }}>
            <AnimatedWord
              word="MIKUS"
              delay={0.25}
              className="font-anurati"
              style={{
                textAlign: 'right',
                fontSize: 'clamp(8.05rem, 25.3vw, 29.9rem)',
                color: 'transparent',
                fontWeight: 900,
                WebkitTextStroke: `2px ${VIOLET}88`,
                lineHeight: 0.90,
                whiteSpace: 'nowrap',
                letterSpacing: '0.22em',
              }}
            />
          </div>
        </div>
      )}

      {/* ── Foreground: tagline + buttons ── */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center pointer-events-none">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20, filter: isActive ? 'blur(0px)' : 'blur(8px)' }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            color: 'rgba(255,255,255,0.90)',
            letterSpacing: '0.01em',
            lineHeight: 1.3,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          {sub}
        </motion.p>

        {/* Orange accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 48, height: 2,
            background: ORANGE,
            borderRadius: 2,
            transformOrigin: 'center',
            boxShadow: `0 0 12px ${VIOLET}88`,
          }}
        />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 pointer-events-auto"
        >
          <NeonButton variant="solid" size="default" onClick={onScrollDown} data-cursor="hover">
            {cta1}
          </NeonButton>

          <NeonButton variant="ghost" size="default" onClick={onOpenChat} data-cursor="hover" neon={false}>
            {cta2}
          </NeonButton>
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.45 : 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))' }}
        />
      </motion.div>
    </section>
  )
}

