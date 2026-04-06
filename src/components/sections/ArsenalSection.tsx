import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Film, Bot, Workflow, Terminal, Palette, Lightbulb } from 'lucide-react'
import { useMouseGlow } from '../../hooks/useMouseGlow'

const SKILLS = [
  {
    icon: Film,
    title: 'Video Editing',
    sub: 'DaVinci Resolve',
    desc: 'Cinematic cuts, color grading, motion design. 1M+ views earned from purely aesthetic storytelling.',
    accent: 'rgba(245,158,11,0.85)',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    sub: 'LLM Engineering',
    desc: 'Custom agents with context, memory, and tools. Built to solve real problems and run autonomously.',
    accent: 'rgba(251,191,36,0.85)',
  },
  {
    icon: Workflow,
    title: 'n8n Automation',
    sub: 'Workflow Architecture',
    desc: 'Complex multi-step automations connecting 200+ integrations. Systems that work while you sleep.',
    accent: 'rgba(217,119,6,0.85)',
  },
  {
    icon: Terminal,
    title: 'Claude Code',
    sub: 'AI-Assisted Dev',
    desc: 'Expert-level use of Claude Code for building production-grade software with AI collaboration.',
    accent: 'rgba(245,158,11,0.85)',
  },
  {
    icon: Palette,
    title: 'Creative Direction',
    sub: 'Visual Storytelling',
    desc: 'Aesthetic vision applied to everything. If it doesn\'t look right, it isn\'t right.',
    accent: 'rgba(251,191,36,0.85)',
  },
  {
    icon: Lightbulb,
    title: 'Systems Thinking',
    sub: 'Inventor Mindset',
    desc: 'From childhood sketchbooks to production systems. Ideas mean nothing without execution.',
    accent: 'rgba(217,119,6,0.85)',
  },
]

interface SkillCardProps {
  skill: typeof SKILLS[0]
  index: number
  isActive: boolean
}

function SkillCard({ skill, index, isActive }: SkillCardProps) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useMouseGlow(cardRef as React.RefObject<HTMLElement | null>, {
    color: '245,158,11',
    opacity: 0.06,
    radius: 200,
  })

  const Icon = skill.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 28 }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
      className="relative rounded-xl p-5 flex flex-col gap-3 overflow-hidden cursor-none"
      style={{
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
        border: hovered ? `1px solid rgba(245,158,11,0.30)` : '1px solid rgba(255,255,255,0.07)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'perspective(600px) rotateY(1.5deg) rotateX(-1deg)' : 'none',
        transitionProperty: 'background, border-color, transform',
        transitionDuration: '0.3s',
      }}
    >
      {/* Mouse glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" />

      {/* Icon */}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: hovered ? `rgba(245,158,11,0.12)` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? 'rgba(245,158,11,0.28)' : 'rgba(255,255,255,0.07)'}`,
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}>
        <Icon className="w-5 h-5" style={{ color: hovered ? skill.accent : 'rgba(255,255,255,0.45)' }} />
      </div>

      {/* Text */}
      <div>
        <p className="text-white/90 font-semibold text-sm mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
          {skill.title}
        </p>
        <p className="text-[10px] tracking-[0.16em] uppercase mb-2"
          style={{ color: hovered ? 'rgba(245,158,11,0.65)' : 'rgba(255,255,255,0.30)', transition: 'color 0.3s' }}>
          {skill.sub}
        </p>
        <p className="text-white/45 text-xs leading-relaxed">{skill.desc}</p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.50), transparent)' }}
      />
    </motion.div>
  )
}

interface ArsenalSectionProps {
  isActive: boolean
}

export function ArsenalSection({ isActive }: ArsenalSectionProps) {
  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}>
      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px' }} />

      {/* Ambient */}
      <div aria-hidden className="absolute bottom-0 left-0 w-[50vw] h-[40vh] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
          transition={{ duration: 0.5 }}
          className="block text-[10px] tracking-[0.32em] uppercase mb-4"
          style={{ color: 'rgba(245,158,11,0.55)' }}
        >
          Technical Arsenal
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
            color: '#ffffff',
            letterSpacing: '-0.025em',
            margin: 0,
            marginBottom: '32px',
            lineHeight: 1.05,
          }}
        >
          What I Bring.
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.title} skill={skill} index={i} isActive={isActive} />
          ))}
        </div>
      </div>
    </section>
  )
}
