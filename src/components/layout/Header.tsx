import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail } from 'lucide-react'
import { ScrambleText } from '../ui/ScrambleText'
import translations from '../../i18n/translations'

export type Language = 'en' | 'de' | 'fr'

const LANGS: Language[] = ['en', 'de', 'fr']
const LANG_LABELS: Record<Language, string> = { en: 'EN', de: 'DE', fr: 'FR' }

const CITIES = [
  { label: 'VDZ', tz: 'Europe/Vaduz' },
  { label: 'BER', tz: 'Europe/Berlin' },
  { label: 'LDN', tz: 'Europe/London' },
  { label: 'NYC', tz: 'America/New_York' },
  { label: 'TKY', tz: 'Asia/Tokyo' },
  { label: 'LAX', tz: 'America/Los_Angeles' },
]

const PILL_STYLE = {
  background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
  border: '1px solid rgba(255,255,255,0.14)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  boxShadow: '0 4px 14px rgba(0,0,0,0.36), inset 0 1.5px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.18)',
}

interface HeaderProps {
  onNavigate: (i: number) => void
  currentSection: number
  sectionMap: Record<string, number>
  language: Language
  onLanguageChange: (lang: Language) => void
}

export function Header({ onNavigate, language, onLanguageChange }: HeaderProps) {
  const [cityIdx, setCityIdx] = useState(0)
  const [cityTime, setCityTime] = useState('')
  const [langHover, setLangHover] = useState(false)
  const [mailHover, setMailHover] = useState(false)
  const langTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const mailTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Keep city time updated every second
  useEffect(() => {
    const update = () => {
      setCityTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: false,
        timeZone: CITIES[cityIdx].tz,
      }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [cityIdx])

  // Cycle cities every 5s
  useEffect(() => {
    const id = setInterval(() => setCityIdx(i => (i + 1) % CITIES.length), 5000)
    return () => clearInterval(id)
  }, [])

  const handleLangEnter = () => { clearTimeout(langTimerRef.current); setLangHover(true) }
  const handleLangLeave = () => { langTimerRef.current = setTimeout(() => setLangHover(false), 180) }
  const handleMailEnter = () => { clearTimeout(mailTimerRef.current); setMailHover(true) }
  const handleMailLeave = () => { mailTimerRef.current = setTimeout(() => setMailHover(false), 180) }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── LEFT: language pill ── */}
      <div
        className="relative hidden md:block"
        onMouseEnter={handleLangEnter}
        onMouseLeave={handleLangLeave}
      >
        <motion.div
          className="rounded-full flex items-center cursor-pointer select-none overflow-hidden"
          style={PILL_STYLE}
          animate={{ paddingLeft: 16, paddingRight: langHover ? 12 : 16, paddingTop: 8, paddingBottom: 8 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="hover"
        >
          <span className="text-xs font-medium tracking-widest" style={{ color: 'rgba(255,255,255,0.70)' }}>
            {LANG_LABELS[language]}
          </span>

          <AnimatePresence>
            {langHover && LANGS.filter(l => l !== language).map((lang, i) => (
              <motion.button
                key={lang}
                data-cursor="hover"
                className="flex items-center gap-1.5 text-xs font-medium tracking-widest text-white/35 hover:text-white/75 transition-colors duration-150"
                initial={{ opacity: 0, maxWidth: 0, marginLeft: 0 }}
                animate={{ opacity: 1, maxWidth: 60, marginLeft: i === 0 ? 10 : 0 }}
                exit={{ opacity: 0, maxWidth: 0, marginLeft: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden', whiteSpace: 'nowrap', paddingRight: 6, background: 'none', border: 'none', cursor: 'none' }}
                onClick={() => { onLanguageChange(lang); setLangHover(false) }}
              >
                <span className="text-white/20">·</span>
                {LANG_LABELS[lang]}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── CENTER: brand ── */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <button
          data-cursor="hover"
          onClick={() => onNavigate(0)}
          style={{ background: 'none', border: 'none', cursor: 'none' }}
        >
          <ScrambleText
            text="JAYDEN MIKUS"
            className="font-anurati text-white text-sm tracking-[0.3em] select-none"
          />
        </button>
      </div>

      {/* ── RIGHT: cycling clock + mail ── */}
      <div className="flex items-center gap-3">
        {/* Cycling city clock */}
        <div className="hidden sm:flex items-center gap-1.5 overflow-hidden" style={{ height: 16 }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={cityIdx}
              className="flex items-center gap-1.5"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {CITIES[cityIdx].label}
              </span>
              <span className="text-xs font-mono tracking-wider" style={{ color: 'rgba(255,255,255,0.40)' }}>
                {cityTime}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mail / contact — expands left */}
        <motion.button
          data-cursor="hover"
          className="rounded-full flex items-center justify-center overflow-hidden"
          style={PILL_STYLE}
          animate={{
            paddingLeft: mailHover ? 14 : 8,
            paddingRight: mailHover ? 14 : 8,
            paddingTop: 8,
            paddingBottom: 8,
          }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.25, 1] }}
          onMouseEnter={handleMailEnter}
          onMouseLeave={handleMailLeave}
          onClick={() => onNavigate(6)}
        >
          <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: 'rgba(255,255,255,0.55)' }} />
          <AnimatePresence>
            {mailHover && (
              <motion.span
                className="text-[11px] font-medium tracking-wide whitespace-nowrap overflow-hidden"
                style={{ color: 'rgba(255,255,255,0.75)' }}
                initial={{ opacity: 0, maxWidth: 0, marginLeft: 0 }}
                animate={{ opacity: 1, maxWidth: 120, marginLeft: 8 }}
                exit={{ opacity: 0, maxWidth: 0, marginLeft: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.25, 1] }}
              >
                {translations[language].header.getInTouch}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.header>
  )
}
