import { motion } from 'framer-motion'
import { Bot, Zap, Brain } from 'lucide-react'

const EXAMPLE_QUESTIONS = [
  'What can Jayden build for me?',
  'Tell me about his YouTube work',
  'What AI tools does he know?',
  'How can I get in touch?',
]

interface ChatSectionProps {
  isActive: boolean
  onOpenChat: () => void
}

export function ChatSection({ isActive, onOpenChat }: ChatSectionProps) {
  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}>
      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px' }} />

      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60vw 50vh at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 68%)' }} />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-12 text-center">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="block text-[10px] tracking-[0.32em] uppercase mb-5"
          style={{ color: 'rgba(245,158,11,0.55)' }}
        >
          AI Demo
        </motion.span>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.7 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 280, damping: 22 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.22)' }}>
            <Bot className="w-8 h-8" style={{ color: 'rgba(245,158,11,0.80)' }} />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(8,8,8,0.95)', border: '1px solid rgba(245,158,11,0.35)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: '#ffffff',
            letterSpacing: '-0.025em',
            marginBottom: '16px',
          }}
        >
          Ask Me Anything.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', marginBottom: '40px', lineHeight: 1.7 }}
        >
          This AI knows me — built by me, trained on my work and life.
          Ask it anything, then judge for yourself what I can build.
        </motion.p>

        {/* Feature chips */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4 flex-wrap mb-8"
        >
          {[
            { icon: Brain, label: 'Knows my full story' },
            { icon: Zap, label: 'Instant answers' },
            { icon: Bot, label: 'Built by me in n8n' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[11px]"
              style={{ color: 'rgba(255,255,255,0.40)' }}>
              <Icon className="w-3.5 h-3.5" style={{ color: 'rgba(245,158,11,0.55)' }} />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Example question pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {EXAMPLE_QUESTIONS.map((q, i) => (
            <motion.button
              key={q}
              data-cursor="hover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
              transition={{ delay: 0.55 + i * 0.06 }}
              onClick={onOpenChat}
              className="px-4 py-2 rounded-full text-xs transition-all"
              style={{
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.18)',
                color: 'rgba(255,255,255,0.60)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.12)'
                ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.06)'
                ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.60)'
              }}
            >
              "{q}"
            </motion.button>
          ))}
        </motion.div>

        {/* CTA arrow hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="text-[11px] tracking-[0.18em] uppercase"
          style={{ color: 'rgba(245,158,11,0.45)' }}
        >
          Chat button → bottom right corner
        </motion.p>
      </div>
    </section>
  )
}
