import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import { ScrambleText } from '../ui/ScrambleText'
import translations, { type Language } from '../../i18n/translations'

function YoutubeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const EMAIL = 'mikus.jayden@outlook.com'
const YOUTUBE = 'https://www.youtube.com/@subspeedy'

interface ContactSectionProps {
  isActive: boolean
  language: Language
}

export function ContactSection({ isActive, language }: ContactSectionProps) {
  const t = translations[language].contact

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}>
      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px' }} />

      {/* Large ambient glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70vw 60vh at 50% 60%, rgba(245,158,11,0.08) 0%, transparent 65%)' }} />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:pl-[190px] md:pr-12 text-center">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="block text-[10px] tracking-[0.32em] uppercase mb-5"
          style={{ color: 'rgba(245,158,11,0.55)' }}
        >
          {t.eyebrow}
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 24 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            color: '#ffffff',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            margin: 0,
            marginBottom: '24px',
          }}
        >
          {t.heading1}<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(245,158,11,0.55)' }}>
            {t.heading2}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', marginBottom: '48px', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto 48px' }}
        >
          {t.desc}
        </motion.p>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="hover"
            className="group flex items-center gap-3 px-6 py-4 rounded-xl transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.border = '1px solid rgba(245,158,11,0.30)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.06)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.09)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
            }}
          >
            <Mail className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(245,158,11,0.75)' }} />
            <div className="text-left">
              <p className="text-[10px] tracking-[0.16em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{t.emailLabel}</p>
              <ScrambleText
                text={EMAIL}
                className="text-sm text-white/80 group-hover:text-white/95 transition-colors"
              />
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-amber-400/70 transition-colors ml-1" />
          </a>

          {/* YouTube */}
          <a
            href={YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="group flex items-center gap-3 px-6 py-4 rounded-xl transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.border = '1px solid rgba(245,158,11,0.30)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(245,158,11,0.06)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.09)'
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
            }}
          >
            <YoutubeIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(245,158,11,0.75)' }} />
            <div className="text-left">
              <p className="text-[10px] tracking-[0.16em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{t.youtubeLabel}</p>
              <ScrambleText
                text="@subspeedy"
                className="text-sm text-white/80 group-hover:text-white/95 transition-colors"
              />
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-amber-400/70 transition-colors ml-1" />
          </a>
        </motion.div>

        {/* Footer line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-16 text-[10px] tracking-[0.22em] uppercase"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >
          {t.footer}
        </motion.p>
      </div>
    </section>
  )
}
