import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Server, Bot, TrendingUp, Target, Lightbulb } from 'lucide-react'
import { type Language } from '../../i18n/translations'

const CARDS = [
  {
    icon: Code2,
    title: 'Built This Website',
    sub: 'React · TypeScript · Vite',
    desc: 'Every pixel of this portfolio — designed and coded by me. React, TypeScript, Framer Motion, Tailwind. Including the AI chatbot, animations, and all the details.',
    accent: 'rgba(232,69,18,0.85)',
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
    accent: 'rgba(200,50,10,0.85)',
  },
  {
    icon: Target,
    title: 'Goal-Driven Mindset',
    sub: 'Ambitious · Focused · Consistent',
    desc: "I don't have hobbies — I have targets. Marathon training, daily gym, sleep optimization. Everything is a system. Everything is measured.",
    accent: 'rgba(232,69,18,0.85)',
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
    accent: 'rgba(200,50,10,0.85)',
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

interface ArsenalSectionProps {
  isActive: boolean
  language: Language
}

// Lightweight aurora animation — two conic gradient layers rotating at different speeds
function AuroraArsenal() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Slow outer ring — CW */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{
          width: '170%', height: '170%',
          top: '-35%', left: '-35%',
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(232,69,18,0.09) 50deg, rgba(180,40,5,0.06) 90deg, transparent 130deg, rgba(255,100,30,0.07) 200deg, transparent 270deg, rgba(180,60,10,0.06) 320deg, transparent 360deg)',
        }}
      />
      {/* Medium ring — CCW, offset phase */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{
          width: '130%', height: '130%',
          top: '-15%', left: '-15%',
          background: 'conic-gradient(from 80deg at 48% 52%, transparent 0deg, rgba(255,80,20,0.07) 65deg, transparent 140deg, rgba(200,50,10,0.07) 220deg, transparent 300deg)',
        }}
      />
      {/* Static center glow */}
      <div className="absolute pointer-events-none" style={{
        width: '55%', height: '55%',
        top: '22%', left: '22%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(232,69,18,0.08) 0%, transparent 65%)',
        filter: 'blur(40px)',
      }} />
      {/* Ember accent — bottom left */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width: 400, height: 400,
          bottom: '-10%', left: '-5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,80,20,0.08) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />
    </div>
  )
}

export function ArsenalSection({ isActive, language }: ArsenalSectionProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const labels = language === 'de' ? CARDS_DE : null

  return (
    <section
      className="relative w-full h-full flex flex-col justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Aurora background */}
      <AuroraArsenal />

      {/* Grain */}
      <div aria-hidden className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px' }} />

      {/* Background "MORE" text */}
      <div aria-hidden className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-anurati" style={{
          fontSize: 'min(22vw, 20vh)',
          color: 'transparent',
          WebkitTextStroke: '2px rgba(255,255,255,0.05)',
          paintOrder: 'stroke fill',
          whiteSpace: 'nowrap',
          letterSpacing: '0.08em',
          lineHeight: 1,
        }}>
          MORE
        </span>
      </div>

      <div className="relative z-[10] w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12 overflow-y-auto" style={{ maxHeight: '100%', paddingTop: '5rem', paddingBottom: '2rem' }}>
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
          transition={{ duration: 0.5 }}
          className="block text-[10px] tracking-[0.32em] uppercase mb-4"
          style={{ color: 'rgba(232,69,18,0.60)' }}
        >
          {language === 'de' ? 'Weitere Skills' : language === 'fr' ? 'Autres compétences' : 'More Skills'}
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: '#ffffff',
            letterSpacing: '-0.025em',
            marginBottom: '6px',
            lineHeight: 1.05,
          }}
        >
          {language === 'de' ? 'Das steckt' : language === 'fr' ? 'Ce que' : 'The full'}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: 'rgba(255,255,255,0.40)',
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
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                data-cursor="hover"
                className="relative rounded-xl p-5 flex flex-col gap-3 overflow-hidden"
                style={{
                  background: isHov ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.025)',
                  border: isHov ? '1px solid rgba(232,69,18,0.28)' : '1px solid rgba(255,255,255,0.07)',
                  transition: 'background 0.3s, border-color 0.3s',
                }}
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isHov ? 'rgba(232,69,18,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isHov ? 'rgba(232,69,18,0.25)' : 'rgba(255,255,255,0.07)'}`,
                    transition: 'background 0.3s, border-color 0.3s',
                  }}>
                  <Icon className="w-4 h-4" style={{ color: isHov ? card.accent : 'rgba(255,255,255,0.40)', transition: 'color 0.3s' }} />
                </div>

                {/* Text */}
                <div>
                  <p className="text-white/85 font-semibold text-sm mb-0.5">{title}</p>
                  <p className="text-[10px] tracking-[0.14em] uppercase mb-2"
                    style={{ color: isHov ? 'rgba(232,69,18,0.60)' : 'rgba(255,255,255,0.28)', transition: 'color 0.3s' }}>
                    {sub}
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                </div>

                {/* Bottom accent line on hover */}
                {isHov && (
                  <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(232,69,18,0.45), transparent)' }} />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
