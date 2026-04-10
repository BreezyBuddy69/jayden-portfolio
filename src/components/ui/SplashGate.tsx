import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const TARGET = 'JAYDEN MIKUS'
const SUB = 'Creative Technologist'

function useScrambleReveal(text: string, started: boolean) {
  const [display, setDisplay] = useState(() => text.split('').map(() => (Math.random() < 0.5 ? CHARS[Math.floor(Math.random() * CHARS.length)] : ' ')).join(''))
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (!started) return
    const chars = text.split('')
    let iteration = 0
    const total = chars.length * 4

    const tick = () => {
      const next = chars.map((char, i) => {
        if (char === ' ') return ' '
        if (i < iteration / 4) return chars[i]
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')
      setDisplay(next)
      iteration++
      if (iteration <= total) {
        timerRef.current = setTimeout(tick, 22)
      } else {
        setDisplay(text)
      }
    }
    timerRef.current = setTimeout(tick, 80)
    return () => clearTimeout(timerRef.current)
  }, [started, text])

  return display
}

interface SplashGateProps {
  onDone: () => void
}

export function SplashGate({ onDone }: SplashGateProps) {
  const [phase, setPhase] = useState<'scramble' | 'reveal' | 'exit'>('scramble')
  const [started, setStarted] = useState(false)
  const display = useScrambleReveal(TARGET, started)

  useEffect(() => {
    const t1 = setTimeout(() => { setStarted(true); setPhase('scramble') }, 300)
    const t2 = setTimeout(() => setPhase('reveal'), 1400)
    const t3 = setTimeout(() => setPhase('exit'), 2800)
    const t4 = setTimeout(() => onDone(), 3350)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [onDone])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
          style={{ background: '#252422' }}
        >
          {/* Ambient amber glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60vw 50vh at 50% 50%, rgba(232,69,18,0.07) 0%, transparent 70%)',
            }}
          />

          {/* Grain */}
          <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
            <filter id="sn">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#sn)" />
          </svg>

          {/* Name */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h1
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                color: '#ffffff',
                letterSpacing: '0.18em',
                lineHeight: 1,
                margin: 0,
                fontWeight: 700,
              }}
            >
              {display}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: phase === 'reveal' ? 1 : 0, y: phase === 'reveal' ? 0 : 8 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                marginTop: '16px',
                fontSize: '11px',
                letterSpacing: '0.32em',
                color: 'rgba(232,69,18,0.65)',
                textTransform: 'uppercase',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {SUB}
            </motion.p>
          </motion.div>

          {/* Bottom line */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'reveal' ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(232,69,18,0.4), transparent)' }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
