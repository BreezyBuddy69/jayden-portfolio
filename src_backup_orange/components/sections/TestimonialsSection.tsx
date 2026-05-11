import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import translations, { type Language } from '../../i18n/translations'
import { BackgroundPaths } from '../ui/background-paths'
import { GlowCard } from '../ui/spotlight-card'

const ORANGE = '#eb5e28'
const DARK = '#0f0d0c'
const YOUTUBE_URL = 'https://www.youtube.com/@subspeedy'
const HALO_URL = 'https://halovisionai.cloud'

function YoutubeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

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
        background: `radial-gradient(circle, ${ORANGE}60 0%, ${ORANGE}22 45%, transparent 70%)`,
        filter: 'blur(65px)',
      }} />
    </motion.div>
  )
}

const REVIEWS = [
  {
    name: 'Jonas W.',
    role: 'Agency Owner',
    text: 'Automated our lead pipeline end to end. We went from 4 hours of admin to zero. Best investment this year.',
    source: 'Upwork',
    link: YOUTUBE_URL,
  },
  {
    name: 'Lisa T.',
    role: 'E-Commerce Founder',
    text: 'The AI agent handles our customer support now. 80% of tickets resolved without a human. Incredible result for our team.',
    source: 'Fiverr',
    link: YOUTUBE_URL,
  },
  {
    name: 'Marco D.',
    role: 'Operations Lead',
    text: "I didn't think something this complex could be built in a week. It was. And it runs flawlessly.",
    source: 'Upwork',
    link: YOUTUBE_URL,
  },
  {
    name: 'Alex R.',
    role: 'Content Creator',
    text: 'The edit made my video go from 200 to 80k views overnight. Insane quality, insane turnaround.',
    source: 'YouTube',
    link: YOUTUBE_URL,
  },
  {
    name: 'Sarah M.',
    role: 'Brand Manager',
    text: 'Cinematic, clean, and exactly on-brand. Delivered faster than anyone else I\'ve worked with.',
    source: 'Instagram',
    link: YOUTUBE_URL,
  },
  {
    name: 'Tom K.',
    role: 'YouTuber · 500k subs',
    text: "Best editor I've hired. Understands pacing, sound design, everything — without being told twice.",
    source: 'YouTube',
    link: YOUTUBE_URL,
  },
  {
    name: 'Nina B.',
    role: 'Startup Founder',
    text: 'The automation saved us 20+ hours a week. Worth every cent and more.',
    source: 'LinkedIn',
    link: YOUTUBE_URL,
  },
  {
    name: 'Chris P.',
    role: 'Creative Director',
    text: 'Blew me away with the color grade. Every frame looked like it came out of a cinema.',
    source: 'Facebook',
    link: YOUTUBE_URL,
  },
]

const MAX_CHARS = 90

interface TestimonialsSectionProps {
  isActive: boolean
  language: Language
}

export function TestimonialsSection({ isActive, language }: TestimonialsSectionProps) {
  const t = translations[language].testimonials
  const looped = [...REVIEWS, ...REVIEWS]

  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: DARK }}
    >
      {/* ── Animated paths background (mirrored vs About/Contact) ── */}
      <div className="absolute inset-0 z-0">
        <BackgroundPaths mirrored />
      </div>

      {/* ── Radial vignette ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: `radial-gradient(ellipse 78% 72% at 50% 44%, transparent 0%, ${DARK}88 50%, ${DARK}ee 100%)`,
      }} />

      {/* ── Mouse-following glow orb ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <MouseOrb />
      </div>

      {/* ── Ambient glows + grain ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Bottom strong orange pool */}
        <div style={{
          position: 'absolute', bottom: '-5%', left: '50%', transform: 'translateX(-50%)',
          width: 950, height: 360, borderRadius: '50%',
          background: `radial-gradient(ellipse, ${ORANGE}42 0%, ${ORANGE}16 45%, transparent 70%)`,
          filter: 'blur(65px)',
        }} />
        {/* Top-right orange accent */}
        <div style={{
          position: 'absolute', top: '-8%', right: '-5%',
          width: 450, height: 450, borderRadius: '50%',
          background: `radial-gradient(circle, ${ORANGE}20 0%, transparent 70%)`,
          filter: 'blur(50px)',
        }} />
        {/* Left-mid accent */}
        <div style={{
          position: 'absolute', top: '35%', left: '-6%',
          width: 280, height: 280, borderRadius: '50%',
          background: `radial-gradient(circle, ${ORANGE}16 0%, transparent 70%)`,
          filter: 'blur(55px)',
        }} />
        <div aria-hidden className="absolute inset-0 grain opacity-[0.055]" />
      </div>

      {/* ── "REVIEWS" watermark — bottom ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none z-[2]"
        style={{ lineHeight: 0 }}
      >
        <motion.div
          className="font-anurati text-center"
          style={{
            fontSize: 'clamp(5.5rem, 14vw, 19rem)',
            color: 'transparent',
            WebkitTextStroke: `2px ${ORANGE}22`,
            lineHeight: 0.90,
            whiteSpace: 'nowrap',
            letterSpacing: '0.12em',
            transform: 'translateY(30%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 1.8, delay: 0.4 }}
        >
          REVIEWS
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12 overflow-y-auto py-4" style={{ maxHeight: '100%' }}>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
          transition={{ duration: 0.5 }}
          className="block text-[10px] tracking-[0.34em] uppercase mb-3"
          style={{ color: `${ORANGE}CC` }}
        >
          {t.eyebrow}
        </motion.span>

        {/* Orange accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 48, height: 2, background: ORANGE, borderRadius: 2,
            transformOrigin: 'left center',
            boxShadow: `0 0 14px ${ORANGE}88`,
            marginBottom: 16,
          }}
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.10, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            color: '#ffffff',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            marginBottom: '4px',
            textShadow: '0 2px 30px rgba(0,0,0,0.5)',
          }}
        >
          {t.heading1}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            color: 'rgba(255,255,255,0.82)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            marginBottom: '10px',
          }}
        >
          {t.heading2}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="text-xs mb-5"
          style={{ color: 'rgba(255,255,255,0.88)', maxWidth: '380px', lineHeight: 1.75 }}
        >
          {t.desc}
        </motion.p>

        {/* Channel / website cards */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* YouTube card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
            transition={{ duration: 0.6, delay: 0.30, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <GlowCard
              glowColor="orange"
              customSize
              className="w-full group cursor-pointer"
              style={{
                background: 'rgba(62,46,30,0.92)',
                border: `1.5px solid ${ORANGE}65`,
                backdropFilter: 'blur(16px)',
                boxShadow: '0 6px 28px rgba(0,0,0,0.40)',
              }}
            >
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full"
                style={{ textDecoration: 'none' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <YoutubeIcon className="w-5 h-5" style={{ color: ORANGE }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.ytHeading}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.ytSub}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  <span className="group-hover:opacity-100 transition-opacity opacity-70">{t.ytCta}</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </GlowCard>
          </motion.div>

          {/* Halo card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
            transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <GlowCard
              glowColor="orange"
              customSize
              className="w-full group cursor-pointer"
              style={{
                background: 'rgba(62,46,30,0.92)',
                border: `1.5px solid ${ORANGE}65`,
                backdropFilter: 'blur(16px)',
                boxShadow: '0 6px 28px rgba(0,0,0,0.40)',
              }}
            >
              <a
                href={HALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full"
                style={{ textDecoration: 'none' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${ORANGE}18`, border: `1px solid ${ORANGE}44` }}>
                  <span className="text-[10px] font-bold tracking-tight" style={{ color: ORANGE }}>HAL</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.haloHeading}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.85)' }}>{t.haloSub}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  <span className="group-hover:opacity-100 transition-opacity opacity-70">{t.haloCta}</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </GlowCard>
          </motion.div>
        </div>

        {/* Reviews label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.42 }}
          className="text-[10px] tracking-[0.22em] uppercase mb-3"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          {t.reviewsHeading}
        </motion.p>
      </div>

      {/* ── Scrolling ticker — full width ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.48 }}
        className="relative w-full overflow-hidden z-10"
        style={{
          marginTop: '-8px', paddingBottom: '16px',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="ticker-track" style={{ gap: '10px' }}>
          {looped.map((r, i) => {
            const truncated = r.text.length > MAX_CHARS
              ? r.text.slice(0, MAX_CHARS).trimEnd() + '…'
              : r.text

            return (
              <GlowCard
                key={i}
                glowColor="orange"
                customSize
                className="flex-shrink-0 group cursor-pointer"
                style={{
                  width: '220px',
                  background: 'rgba(38,28,20,0.85)',
                  border: `1.5px solid ${ORANGE}65`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: `0 6px 24px rgba(0,0,0,0.45), 0 0 12px ${ORANGE}18`,
                }}
              >
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 p-3.5 w-full h-full"
                  style={{ textDecoration: 'none' }}
                >
                  <p className="text-[11px] leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    "{truncated}"
                  </p>
                  <div className="flex items-end justify-between mt-1">
                    <div>
                      <p className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.88)' }}>{r.name}</p>
                      <p className="text-[10px] tracking-[0.10em] uppercase" style={{ color: 'rgba(255,255,255,0.82)' }}>{r.role}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] tracking-widest uppercase" style={{ color: ORANGE }}>{r.source}</span>
                      <ExternalLink className="w-2.5 h-2.5" style={{ color: ORANGE }} />
                    </div>
                  </div>
                </a>
              </GlowCard>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
