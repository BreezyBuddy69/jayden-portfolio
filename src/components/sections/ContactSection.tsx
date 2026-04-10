import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import translations, { type Language } from '../../i18n/translations'
import { OrangeFlowBg } from '../ui/OrangeFlowBg'

const ORANGE = '#eb5e28'
const EMAIL = 'mikus.jayden@outlook.com'
const YOUTUBE = 'https://www.youtube.com/@subspeedy'

function YoutubeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

// Rising ember sparks from bottom
function RisingEmbers() {
  const embers = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: 3 + ((i * 11) % 94),
    delay: i * 0.42,
    duration: 8 + ((i * 1.6) % 6),
    size: 1.5 + (i % 3) * 0.5,
    opacity: 0.2 + (i % 5) * 0.1,
    drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 6),
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {embers.map(e => (
        <motion.div
          key={e.id}
          animate={{
            y: [0, -(180 + (e.id * 20) % 140)],
            x: [0, e.drift],
            opacity: [0, e.opacity, e.opacity * 0.6, 0],
          }}
          transition={{ duration: e.duration, delay: e.delay, repeat: Infinity, ease: 'easeOut' }}
          className="absolute rounded-full"
          style={{
            left: `${e.left}%`,
            bottom: '8%',
            width: e.size,
            height: e.size,
            background: `rgba(232,69,18,${e.opacity + 0.15})`,
          }}
        />
      ))}
    </div>
  )
}

function DarkOrbsBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ x: [0, -35, 20, -10, 0], y: [0, 40, -30, 15, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 700,
          top: '-20%', left: '-15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 45%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <motion.div
        animate={{ x: [0, 40, -25, 10, 0], y: [0, -35, 45, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute pointer-events-none"
        style={{
          width: 500, height: 500,
          bottom: '-10%', right: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.08) 50%, transparent 72%)',
          filter: 'blur(85px)',
        }}
      />
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6], x: [0, 20, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        className="absolute pointer-events-none"
        style={{
          width: 400, height: 400,
          top: '20%', left: '35%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.16) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />
    </div>
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
      style={{ background: '#eb5e28' }}
    >
      {/* Flowing background animation */}
      <OrangeFlowBg />

      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px', zIndex: 1 }} />

      {/* Rising sparks */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}><RisingEmbers /></div>

      {/* Massive "LET'S GO." — moved higher, overflow clipped */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        style={{ zIndex: 1 }}
      >
        <div
          className="art-text text-center"
          style={{
            fontSize: 'clamp(8rem, 22vw, 26rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.22)',
            lineHeight: 0.82,
            letterSpacing: '-0.05em',
            transform: 'translateY(10%)',
            whiteSpace: 'nowrap',
            filter: 'drop-shadow(0 0 60px rgba(232,69,18,0.10))',
          }}
        >
          LET'S GO.
        </div>
      </div>

      {/* Thin top accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.20) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.20) 70%, transparent 100%)',
          transformOrigin: 'center',
          zIndex: 3,
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:pl-[190px] md:pr-12 text-center">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="text-[10px] tracking-[0.36em] uppercase mb-5"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          {t.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 24 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            color: '#ffffff',
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            marginBottom: '20px',
          }}
        >
          {t.heading1}<br />
          <span style={{
            color: 'rgba(255,255,255,0.65)',
          }}>{t.heading2}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', marginBottom: '48px', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 48px' }}
        >
          {t.desc}
        </motion.p>

        {/* Contact cards — glass morphism */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="hover"
            className="group flex items-center gap-3 px-6 py-4 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.16)',
              backdropFilter: 'blur(20px)',
              textDecoration: 'none',
              transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.2s',
              boxShadow: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.32)'
              el.style.background = 'rgba(255,255,255,0.14)'
              el.style.boxShadow = '0 0 30px rgba(0,0,0,0.18)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.16)'
              el.style.background = 'rgba(255,255,255,0.07)'
              el.style.boxShadow = 'none'
              el.style.transform = 'translateY(0)'
            }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}>
              <Mail className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.75)' }} />
            </div>
            <div className="text-left">
              <p className="text-[9px] tracking-[0.18em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{t.emailLabel}</p>
              <span className="text-sm text-white/75 group-hover:text-white/95 transition-colors">{EMAIL}</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors ml-1" />
          </a>

          <a
            href={YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group flex items-center gap-3 px-6 py-4 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.16)',
              backdropFilter: 'blur(20px)',
              textDecoration: 'none',
              transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.2s',
              boxShadow: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.32)'
              el.style.background = 'rgba(255,255,255,0.14)'
              el.style.boxShadow = '0 0 30px rgba(0,0,0,0.18)'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.16)'
              el.style.background = 'rgba(255,255,255,0.07)'
              el.style.boxShadow = 'none'
              el.style.transform = 'translateY(0)'
            }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}>
              <YoutubeIcon className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.75)' }} />
            </div>
            <div className="text-left">
              <p className="text-[9px] tracking-[0.18em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{t.youtubeLabel}</p>
              <span className="text-sm text-white/75 group-hover:text-white/95 transition-colors">@subspeedy</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors ml-1" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-16 text-[10px] tracking-[0.22em] uppercase"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          {t.footer}
        </motion.p>
      </div>
    </section>
  )
}
