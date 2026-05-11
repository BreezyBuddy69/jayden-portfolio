import { ORANGE } from '../../lib/utils';
import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Code2, Server, Bot, TrendingUp, Target, Lightbulb } from 'lucide-react'
import { type Language } from '../../i18n/translations'
import { GlowCard } from '../ui/spotlight-card'

const VIOLET = '#8B5CF6'
const DARK = '#0f0d0c'

const CARDS = [
  {
    icon: Code2,
    title: 'Built This Website',
    sub: 'React · TypeScript · Vite',
    desc: 'Every pixel of this portfolio — designed and coded by me. React, TypeScript, Framer Motion, Tailwind. Including the AI chatbot, animations, and all the details.',
    accent: 'rgba(139, 92, 246,0.85)',
  },
  {
    icon: Server,
    title: 'Server & Infrastructure',
    sub: 'Docker · Linux · n8n Self-Hosted',
    desc: 'Self-hosted n8n on a VPS, Dockerized deployments, basic Linux server management. I own the infrastructure my automations run on.',
    accent: 'rgba(255,100,50,0.85)',
  },
  {
    icon: Bot,
    title: 'AI & Automation Stack',
    sub: 'LangChain · Anthropic API · n8n',
    desc: 'Custom AI agents using Claude, memory systems, tool use, and complex n8n workflows. I live in this stack.',
    accent: 'rgba(109,40,217,0.85)',
  },
  {
    icon: Target,
    title: 'Goal-Driven Mindset',
    sub: 'Ambitious · Focused · Consistent',
    desc: "I don't have hobbies — I have targets. Marathon training, daily gym, sleep optimization. Everything is a system. Everything is measured.",
    accent: 'rgba(139, 92, 246,0.85)',
  },
  {
    icon: TrendingUp,
    title: 'Business & Future',
    sub: 'Tech · AI · Entrepreneurship',
    desc: "AI, automation, and future tech aren't trends to me — they're the only direction worth going. I'm building toward owning infrastructure, not just using it.",
    accent: 'rgba(255,100,50,0.85)',
  },
  {
    icon: Lightbulb,
    title: 'Built Different',
    sub: 'Self-Taught · Contrarian · 17',
    desc: "Most 17-year-olds are figuring out what they want to do. I already know. I want to build things that matter and be different — on purpose.",
    accent: 'rgba(109,40,217,0.85)',
  },
]

const CARDS_DE = [
  { title: 'Diese Website gebaut', sub: 'React · TypeScript · Vite', desc: 'Jedes Detail dieses Portfolios — von mir designed und programmiert. React, TypeScript, Framer Motion, Tailwind. Inklusive KI-Chatbot, Animationen und allem drumherum.' },
  { title: 'Server & Infrastruktur', sub: 'Docker · Linux · n8n Self-Hosted', desc: 'Selbst gehostetes n8n auf einem VPS, Docker-Deployments, grundlegendes Linux-Servermanagement. Ich besitze die Infrastruktur, auf der meine Automatisierungen laufen.' },
  { title: 'KI & Automatisierungs-Stack', sub: 'LangChain · Anthropic API · n8n', desc: 'Individuelle KI-Agenten mit Claude, Gedächtnissysteme, Tool-Nutzung und komplexe n8n-Workflows. Ich lebe in diesem Stack.' },
  { title: 'Zielorientiertes Denken', sub: 'Ehrgeizig · Fokussiert · Konsequent', desc: 'Ich habe keine Hobbys — ich habe Ziele. Marathontraining, tägliches Gym, Schlafoptimierung. Alles ist ein System. Alles wird gemessen.' },
  { title: 'Business & Zukunft', sub: 'Tech · KI · Unternehmertum', desc: 'KI, Automatisierung und Zukunftstechnologie sind für mich keine Trends — sie sind die einzige Richtung, die sich lohnt. Ich baue darauf hin, Infrastruktur zu besitzen, nicht nur zu nutzen.' },
  { title: 'Anders gebaut', sub: 'Autodidakt · Andersdenkend · 17', desc: 'Die meisten 17-Jährigen überlegen noch, was sie wollen. Ich weiß es bereits. Ich will Dinge bauen, die zählen — und bewusst anders sein.' },
]

function MouseOrb() {
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
        background: `radial-gradient(circle, ${VIOLET}60 0%, ${VIOLET}20 45%, transparent 70%)`,
        filter: 'blur(65px)',
      }} />
    </motion.div>
  )
}

interface ArsenalSectionProps {
  isActive: boolean
  language: Language
}

export function ArsenalSection({ isActive, language }: ArsenalSectionProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const labels = language === 'de' ? CARDS_DE : null

  return (
    <section
      className="relative w-full h-full flex flex-col justify-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* ── Radial vignette ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: `radial-gradient(ellipse 80% 75% at 50% 50%, transparent 0%, ${DARK}88 50%, ${DARK}ee 100%)`,
      }} />

      {/* ── Mouse-following glow orb ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <MouseOrb />
      </div>

      {/* ── Ambient glows + grain ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Bottom strong violet pool */}
        <div style={{
          position: 'absolute', bottom: '-5%', left: '50%', transform: 'translateX(-50%)',
          width: 850, height: 340, borderRadius: '50%',
          background: `radial-gradient(ellipse, ${VIOLET}40 0%, ${VIOLET}14 45%, transparent 70%)`,
          filter: 'blur(65px)',
        }} />
        {/* Top-left accent */}
        <div style={{
          position: 'absolute', top: '-8%', left: '-5%',
          width: 420, height: 420, borderRadius: '50%',
          background: `radial-gradient(circle, ${VIOLET}20 0%, transparent 70%)`,
          filter: 'blur(50px)',
        }} />
        {/* Right-center mid-section warm */}
        <div style={{
          position: 'absolute', top: '40%', right: '-5%',
          width: 300, height: 300, borderRadius: '50%',
          background: `radial-gradient(circle, ${VIOLET}16 0%, transparent 70%)`,
          filter: 'blur(55px)',
        }} />
        <div aria-hidden className="absolute inset-0 grain opacity-[0.05]" />
      </div>

      {/* ── "MORE" watermark ── */}
      <div aria-hidden className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          className="font-anurati"
          style={{
            fontSize: 'min(24vw, 22vh)',
            color: 'transparent',
            WebkitTextStroke: `2px ${VIOLET}20`,
            whiteSpace: 'nowrap',
            letterSpacing: '0.12em',
            lineHeight: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 1.8, delay: 0.5 }}
        >
          MORE
        </motion.span>
      </div>

      {/* ── Cards ── */}
      <div className="relative z-[10] w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12 overflow-y-auto" style={{ maxHeight: '100%', paddingTop: '5rem', paddingBottom: '2rem' }}>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
          transition={{ duration: 0.5 }}
          className="block text-[10px] tracking-[0.34em] uppercase mb-3"
          style={{ color: `${VIOLET}AA` }}
        >
          {language === 'de' ? 'Weitere Skills' : language === 'fr' ? 'Autres compétences' : 'More Skills'}
        </motion.span>

        {/* Orange accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 48, height: 2, background: ORANGE, borderRadius: 2,
            transformOrigin: 'left center',
            boxShadow: `0 0 14px ${VIOLET}88`,
            marginBottom: 20,
          }}
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            color: '#ffffff',
            letterSpacing: '-0.025em',
            marginBottom: '4px',
            lineHeight: 1.05,
            textShadow: '0 2px 30px rgba(0,0,0,0.5)',
          }}
        >
          {language === 'de' ? 'Das steckt' : language === 'fr' ? 'Ce que' : 'The full'}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '-0.025em',
            marginBottom: '28px',
            lineHeight: 1.05,
          }}
        >
          {language === 'de' ? 'noch dahinter.' : language === 'fr' ? "j'apporte." : 'picture.'}
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CARDS.map((card, i) => {
            const Icon = card.icon
            const localLabel = labels?.[i]
            const title = localLabel?.title ?? card.title
            const sub = localLabel?.sub ?? card.sub
            const desc = localLabel?.desc ?? card.desc
            const isHov = hovered === i

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 24 }}
                transition={{ duration: 0.5, delay: 0.24 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <GlowCard
                  glowColor="violet"
                  customSize
                  className="w-full flex flex-col gap-3 cursor-default"
                  style={{
                    background: isHov ? 'rgba(68,52,36,0.95)' : 'rgba(55,42,28,0.88)',
                    border: isHov ? `1.5px solid ${VIOLET}90` : '1.5px solid rgba(255,255,255,0.28)',
                    backdropFilter: 'blur(12px)',
                    padding: '20px',
                    transition: 'background 0.3s, border-color 0.3s',
                    boxShadow: isHov
                      ? `0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px ${VIOLET}22`
                      : '0 4px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset',
                  }}
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isHov ? `${VIOLET}28` : `${VIOLET}0E`,
                      border: `1px solid ${isHov ? ORANGE + '55' : ORANGE + '28'}`,
                      transition: 'background 0.3s, border-color 0.3s',
                    }}>
                    <Icon className="w-4 h-4" style={{ color: isHov ? card.accent : 'rgba(255,255,255,0.85)', transition: 'color 0.3s' }} />
                  </div>

                  {/* Text */}
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: 'rgba(255,255,255,0.95)' }}>{title}</p>
                    <p className="text-[10px] tracking-[0.14em] uppercase mb-2"
                      style={{ color: isHov ? `${VIOLET}CC` : 'rgba(255,255,255,0.76)', transition: 'color 0.3s' }}>
                      {sub}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.88)' }}>{desc}</p>
                  </div>

                  {/* Bottom accent line on hover */}
                  {isHov && (
                    <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                      style={{ background: `linear-gradient(90deg, transparent, ${VIOLET}55, transparent)` }} />
                  )}

                  {/* Corner glow on hover */}
                  {isHov && (
                    <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none" style={{
                      background: `radial-gradient(circle at top right, ${VIOLET}12 0%, transparent 70%)`,
                      borderRadius: '0 12px 0 0',
                    }} />
                  )}
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

