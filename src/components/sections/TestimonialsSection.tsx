import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
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

// Each review has an optional link to the source platform
const REVIEWS = [
  {
    name: 'Jonas W.',
    role: 'Agency Owner',
    text: 'Automated our lead pipeline end to end. We went from 4 hours of admin to zero. Best investment this year.',
    stars: 5,
    source: 'Upwork',
    link: YOUTUBE_URL,
  },
  {
    name: 'Lisa T.',
    role: 'E-Commerce Founder',
    text: 'The AI agent handles our customer support now. 80% of tickets resolved without a human. Incredible.',
    stars: 5,
    source: 'Fiverr',
    link: YOUTUBE_URL,
  },
  {
    name: 'Marco D.',
    role: 'Operations Lead',
    text: "I didn't think something this complex could be built in a week. It was. And it runs flawlessly.",
    stars: 5,
    source: 'Upwork',
    link: YOUTUBE_URL,
  },
  {
    name: 'Alex R.',
    role: 'Content Creator',
    text: 'The edit made my video go from 200 to 80k views overnight. Insane quality, insane turnaround.',
    stars: 5,
    source: 'YouTube',
    link: YOUTUBE_URL,
  },
  {
    name: 'Sarah M.',
    role: 'Brand Manager',
    text: 'Cinematic, clean, and exactly on-brand. Delivered faster than anyone else I\'ve worked with.',
    stars: 5,
    source: 'Email',
    link: YOUTUBE_URL,
  },
  {
    name: 'Tom K.',
    role: 'YouTuber · 500k subs',
    text: "Best editor I've hired. Understands pacing, sound design, everything — without being told.",
    stars: 5,
    source: 'YouTube',
    link: YOUTUBE_URL,
  },
]

interface TestimonialsSectionProps {
  isActive: boolean
  language: Language
}

export function TestimonialsSection({ isActive, language }: TestimonialsSectionProps) {
  const t = translations[language].testimonials

  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px' }} />
      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60vw 50vh at 50% 40%, rgba(245,158,11,0.045) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12 overflow-y-auto py-4" style={{ maxHeight: '100%' }}>
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
          transition={{ duration: 0.5 }}
          className="block text-[10px] tracking-[0.32em] uppercase mb-3"
          style={{ color: 'rgba(245,158,11,0.55)' }}
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
          style={{ color: 'rgba(255,255,255,0.38)', maxWidth: '400px', lineHeight: 1.7 }}
        >
          {t.desc}
        </motion.p>

        {/* Channel / website cards */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
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
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.30)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.05)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
              <YoutubeIcon className="w-5 h-5" style={{ color: 'rgba(245,158,11,0.80)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-xs font-semibold mb-0.5">{t.ytHeading}</p>
              <p className="text-white/38 text-[10px]">{t.ytSub}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium" style={{ color: 'rgba(245,158,11,0.70)' }}>
              <span className="group-hover:text-amber-400 transition-colors">{t.ytCta}</span>
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
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.30)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.05)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
              <span className="text-[10px] font-bold tracking-tight" style={{ color: 'rgba(245,158,11,0.80)' }}>HAL</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-xs font-semibold mb-0.5">{t.haloHeading}</p>
              <p className="text-white/38 text-[10px]">{t.haloSub}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium" style={{ color: 'rgba(245,158,11,0.70)' }}>
              <span className="group-hover:text-amber-400 transition-colors">{t.haloCta}</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>
        </div>

        {/* Reviews heading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="text-[10px] tracking-[0.22em] uppercase mb-3"
          style={{ color: 'rgba(255,255,255,0.28)' }}
        >
          {t.reviewsHeading}
        </motion.p>

        {/* Review grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {REVIEWS.map((r, i) => (
            <motion.a
              key={r.name}
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
              transition={{ duration: 0.5, delay: 0.38 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-2.5 p-3.5 rounded-xl group"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.22)'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.04)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)'
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: r.stars }).map((_, s) => (
                  <Star key={s} className="w-2.5 h-2.5 fill-current" style={{ color: 'rgba(245,158,11,0.70)' }} />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/55 text-[11px] leading-relaxed flex-1">"{r.text}"</p>

              {/* Footer */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/80 text-[11px] font-semibold">{r.name}</p>
                  <p className="text-[10px] tracking-[0.10em] uppercase" style={{ color: 'rgba(245,158,11,0.42)' }}>{r.role}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(245,158,11,0.55)' }}>{r.source}</span>
                  <ExternalLink className="w-2.5 h-2.5" style={{ color: 'rgba(245,158,11,0.55)' }} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
