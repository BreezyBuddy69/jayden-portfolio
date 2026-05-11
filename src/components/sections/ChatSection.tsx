import { motion } from 'framer-motion'
import { Bot, Clock, TrendingUp, Zap, ArrowRight } from 'lucide-react'
import { GrainGradient } from '@paper-design/shaders-react'
import { NeonButton } from '../ui/neon-button'

const VIOLET = '#8B5CF6'

const BENEFITS = [
  { icon: Clock,       label: 'Zeit sparen',       sub: 'Stunden täglich' },
  { icon: TrendingUp,  label: 'Mehr Umsatz',        sub: 'Qualifizierte Leads' },
  { icon: Zap,         label: 'Kosten senken',      sub: 'Weniger Aufwand' },
  { icon: Bot,         label: 'Vollautomatisch',    sub: '24 / 7 aktiv' },
]

const HEADLINE_WORDS = ['Wir', 'bauen', 'eine', 'KI-Schicht', 'um', 'Ihr', 'Unternehmen.']

interface ChatSectionProps {
  isActive: boolean
  onOpenChat: () => void
}

export function ChatSection({ isActive, onOpenChat }: ChatSectionProps) {
  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0a0806' }}
    >
      {/* Shader background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
        <GrainGradient
          style={{ height: '100%', width: '100%' }}
          colorBack="hsl(14, 12%, 4%)"
          softness={0.80}
          intensity={0.52}
          noise={0.38}
          shape="corners"
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={0}
          colors={['hsl(14, 60%, 9%)', 'hsl(0, 0%, 2%)', 'hsl(20, 28%, 6%)']}
        />
      </div>

      {/* Subtle top vignette to keep edges deep black */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse 90% 75% at 50% 50%, transparent 30%, rgba(4,3,2,0.72) 100%)',
        }}
      />

      <div className="relative z-[10] w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-0">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-8"
        >
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 rounded-full animate-ping" style={{ background: ORANGE, opacity: 0.5 }} />
            <div className="w-2 h-2 rounded-full" style={{ background: ORANGE }} />
          </div>
          <span
            className="text-[10px] tracking-[0.32em] uppercase"
            style={{ color: `${VIOLET}99` }}
          >
            Live-Beispiel — unser KI-Agent
          </span>
        </motion.div>

        {/* Hey greeting */}
        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
            lineHeight: 1,
            marginBottom: '0.35em',
            fontFamily: '"Playfair Display", Georgia, serif',
            color: '#ffffff',
            letterSpacing: '-0.03em',
          }}
        >
          Hey. 👋
        </motion.p>

        {/* Animated headline */}
        <h2
          aria-label={HEADLINE_WORDS.join(' ')}
          style={{
            fontSize: 'clamp(1.6rem, 4.2vw, 3.4rem)',
            lineHeight: 1.15,
            fontWeight: 700,
            letterSpacing: '-0.025em',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.28em',
            color: '#ffffff',
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 28 }}
              transition={{
                duration: 0.7,
                delay: 0.22 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={
                word === 'KI-Schicht'
                  ? { color: ORANGE, display: 'inline-block' }
                  : { display: 'inline-block' }
              }
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          style={{
            color: 'rgba(255,255,255,0.74)',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            lineHeight: 1.75,
            maxWidth: '42ch',
            marginBottom: '2.5rem',
          }}
        >
          Wir analysieren, wo KI und Automatisierungen bei Ihnen den größten Hebel haben —
          und setzen das direkt um. Komplett für Sie gebaut, nicht aus der Schublade.
        </motion.p>

        {/* Benefit grid */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 14 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-10"
        >
          {BENEFITS.map(({ icon: Icon, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.88 }}
              transition={{ duration: 0.45, delay: 1.05 + i * 0.07 }}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl"
              style={{
                background: 'rgba(0,0,0,0.38)',
                border: `1px solid rgba(255,255,255,0.07)`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${VIOLET}18`, border: `1px solid ${VIOLET}30` }}
              >
                <Icon className="w-4 h-4" style={{ color: ORANGE }} />
              </div>
              <span className="text-[12px] font-semibold text-white/85 leading-tight">{label}</span>
              <span className="text-[10px] text-white/85">{sub}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA + arrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 1.35 }}
          className="flex flex-col items-center gap-4"
        >
          <NeonButton
            variant="default"
            size="default"
            data-cursor="hover"
            onClick={onOpenChat}
          >
            KI-Agent starten
          </NeonButton>

          {/* Animated arrow hint */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
            style={{ opacity: 0.35 }}
          >
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.4)' }} />
            <ArrowRight
              className="w-3 h-3 text-white/68"
              style={{ transform: 'rotate(90deg)' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
