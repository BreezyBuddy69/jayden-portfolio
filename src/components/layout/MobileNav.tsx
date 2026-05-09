import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import translations, { type Language } from '../../i18n/translations'

// 0:Hero | 1:Skills | 2:Automations | 3:Editing | 4:Arsenal | 5:Testimonials | 6:About | 7:Contact
const ITEMS = [
  { key: 'home',         idx: 0, sub: false },
  { key: 'skills',       idx: 1, sub: false },
  { key: 'automations',  idx: 2, sub: true  },
  { key: 'editing',      idx: 3, sub: true  },
  { key: 'arsenal',      idx: 4, sub: true  },
  { key: 'testimonials', idx: 5, sub: false },
  { key: 'about',        idx: 6, sub: false },
  { key: 'contact',      idx: 7, sub: false },
]

interface MobileNavProps {
  currentSection: number
  onNavigate: (i: number) => void
  language: Language
}

export function MobileNav({ currentSection, onNavigate, language }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const nav = translations[language].nav

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-5 py-4 md:hidden"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, transparent 100%)' }}
      >
        <button
          data-cursor="hover"
          onClick={() => setOpen(v => !v)}
          className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          {open ? <X className="w-4 h-4 text-white/80" /> : <Menu className="w-4 h-4 text-white/80" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-3"
            style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(24px)' }}
            onClick={() => setOpen(false)}
          >
            {ITEMS.map(({ key, idx, sub }, i) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  onNavigate(idx)
                  setOpen(false)
                  setTimeout(() => {
                    document.getElementById(`section-${idx}`)?.scrollIntoView({ behavior: 'smooth' })
                  }, 50)
                }}
                className="flex items-center gap-2"
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentSection === idx
                    ? 'rgba(245,158,11,0.95)'
                    : sub
                    ? 'rgba(255,255,255,0.88)'
                    : 'rgba(255,255,255,0.70)',
                  fontSize: sub ? '14px' : '22px',
                  fontFamily: sub ? 'Inter, sans-serif' : 'Georgia, serif',
                  letterSpacing: sub ? '0.18em' : 'normal',
                }}
              >
                {sub && (
                  <span style={{ color: 'rgba(245,158,11,0.40)', fontSize: '10px' }}>—</span>
                )}
                {nav[key as keyof typeof nav]}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
