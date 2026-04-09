import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import translations, { type Language } from '../../i18n/translations'

const YOUTUBE_URL = 'https://www.youtube.com/@subspeedy'
const HALO_URL = 'https://halovisionai.cloud'

function YoutubeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

// Floating spark particles
function FloatingParticles() {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: 4 + ((i * 14) % 92),
    bottom: 10 + ((i * 9) % 25),
    delay: i * 0.6,
    duration: 8 + ((i * 1.3) % 5),
    size: 1 + (i % 3) * 0.5,
    opacity: 0.2 + (i % 4) * 0.1,
    drift: (i % 2 === 0 ? 1 : -1) * (6 + (i % 4) * 5),
  }))
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -(90 + (p.id * 22) % 110)],
            x: [0, p.drift],
            opacity: [0, p.opacity, p.opacity * 0.5, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            background: `rgba(232,69,18,${p.opacity + 0.15})`,
          }}
        />
      ))}
    </div>
  )
}

// Animated dark blobs on orange background
function DarkOrbsBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ x: [0, 40, -25, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width: 650, height: 650,
          top: '-15%', left: '-12%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 45%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -45, 30, 0], y: [0, 35, -50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute pointer-events-none"
        style={{
          width: 550, height: 550,
          bottom: '-12%', right: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.08) 50%, transparent 72%)',
          filter: 'blur(90px)',
        }}
      />
      <motion.div
        animate={{ x: [0, 25, -35, 0], y: [0, 40, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
        className="absolute pointer-events-none"
        style={{
          width: 380, height: 380,
          top: '25%', left: '38%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />
    </div>
  )
}

// Background: drifting ember orbs — deep black base, smoldering orange glow
function EmberOrbsBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Deep black base with warm undertone */}
      <div className="absolute inset-0" style={{ background: '#080604' }} />

      {/* Orb 1 — large deep-orange, top-center */}
      <motion.div
        animate={{ x: [0, 55, -35, 15, 0], y: [0, -45, 25, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          top: '-15%', left: '20%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(210,60,10,0.22) 0%, rgba(160,40,5,0.10) 45%, transparent 72%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Orb 2 — ember orange, bottom-left */}
      <motion.div
        animate={{ x: [0, -60, 30, -15, 0], y: [0, 35, -55, 25, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width: 440, height: 440,
          bottom: '-8%', left: '0%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,69,18,0.18) 0%, rgba(180,45,5,0.08) 50%, transparent 72%)',
          filter: 'blur(90px)',
        }}
      />
      {/* Orb 3 — amber accent, right */}
      <motion.div
        animate={{ x: [0, 40, -25, 0], y: [0, -35, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          width: 340, height: 340,
          top: '25%', right: '-5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,110,20,0.14) 0%, rgba(200,70,10,0.06) 50%, transparent 72%)',
          filter: 'blur(65px)',
        }}
      />
      {/* Orb 4 — tiny hot-core, center */}
      <motion.div
        animate={{ x: [0, -20, 35, 0], y: [0, 40, -25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute pointer-events-none"
        style={{
          width: 180, height: 180,
          top: '40%', left: '45%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,140,40,0.12) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Subtle warm vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(4,2,1,0.70) 100%)',
      }} />
    </div>
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

  // Duplicate reviews for seamless loop
  const looped = [...REVIEWS, ...REVIEWS]

  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#E8600A' }}
    >
      {/* Diagonal black — upper-left half */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: '#0a0a0a',
          clipPath: 'polygon(0 0, 100% 0, 0 62%)',
          zIndex: 1,
        }}
      />

      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px', zIndex: 2 }} />

      {/* Animated dark orbs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}><DarkOrbsBg /></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12 overflow-y-auto py-4" style={{ maxHeight: '100%' }}>
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
          transition={{ duration: 0.5 }}
          className="block text-[10px] tracking-[0.32em] uppercase mb-3"
          style={{ color: 'rgba(255,255,255,0.50)' }}
        >
          {t.eyebrow}
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            color: '#ffffff',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            marginBottom: '6px',
          }}
        >
          {t.heading1}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            marginBottom: '8px',
          }}
        >
          {t.heading2}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs mb-6"
          style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '400px', lineHeight: 1.7 }}
        >
          {t.desc}
        </motion.p>

        {/* Channel / website cards */}
        <div className="flex flex-col sm:flex-row gap-3 mb-7">
          {/* YouTube card */}
          <motion.a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 p-4 rounded-2xl group flex-1"
            style={{
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.22)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.40)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)'
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <YoutubeIcon className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.70)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-xs font-semibold mb-0.5">{t.ytHeading}</p>
              <p className="text-white/50 text-[10px]">{t.ytSub}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.60)' }}>
              <span className="group-hover:text-white transition-colors">{t.ytCta}</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* halovisionai.cloud card */}
          <motion.a
            href={HALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
            transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 p-4 rounded-2xl group flex-1"
            style={{
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.22)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.40)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)'
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span className="text-[10px] font-bold tracking-tight" style={{ color: 'rgba(255,255,255,0.70)' }}>HAL</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-xs font-semibold mb-0.5">{t.haloHeading}</p>
              <p className="text-white/50 text-[10px]">{t.haloSub}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.60)' }}>
              <span className="group-hover:text-white transition-colors">{t.haloCta}</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>
        </div>

        {/* Reviews label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.38 }}
          className="text-[10px] tracking-[0.22em] uppercase mb-3"
          style={{ color: 'rgba(255,255,255,0.40)' }}
        >
          {t.reviewsHeading}
        </motion.p>
      </div>

      {/* ── Scrolling ticker — outside the padded container so it spans full width ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.44 }}
        className="relative w-full overflow-hidden"
        style={{ marginTop: '-8px', paddingBottom: '16px', zIndex: 10 }}
      >
        {/* Left fade — blends over the diagonal split (dark on top-left, orange on bottom-left) */}
        <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: '22%', background: 'linear-gradient(to right, rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.50) 50%, transparent 100%)' }} />
        {/* Right fade — orange to transparent */}
        <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: '28%', background: 'linear-gradient(to left, #E8600A 0%, rgba(232,96,10,0.97) 25%, rgba(232,96,10,0.80) 55%, rgba(232,96,10,0.30) 80%, transparent 100%)' }} />

        <div className="ticker-track" style={{ gap: '12px' }}>
          {looped.map((r, i) => {
            const truncated = r.text.length > MAX_CHARS
              ? r.text.slice(0, MAX_CHARS).trimEnd() + '…'
              : r.text

            return (
              <a
                key={i}
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group flex-shrink-0 flex flex-col gap-2 p-3.5 rounded-xl"
                style={{
                  width: '220px',
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.32)'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.22)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)'
                }}
              >
                {/* Quote text */}
                <p className="text-white/70 text-[11px] leading-relaxed flex-1">
                  "{truncated}"
                </p>

                {/* Footer */}
                <div className="flex items-end justify-between mt-1">
                  <div>
                    <p className="text-white/85 text-[11px] font-semibold">{r.name}</p>
                    <p className="text-[10px] tracking-[0.10em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>{r.role}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>{r.source}</span>
                    <ExternalLink className="w-2.5 h-2.5" style={{ color: 'rgba(255,255,255,0.55)' }} />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
