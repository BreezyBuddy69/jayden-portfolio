import { motion } from 'framer-motion'
import translations, { type Language } from '../../i18n/translations'

// 0:Hero | 1:Skills | 2:Automations | 3:Editing | 4:Arsenal | 5:Testimonials | 6:About | 7:Contact
const NAV_ITEMS = [
  { key: 'home',         idx: 0, sub: false },
  { key: 'skills',       idx: 1, sub: false },
  { key: 'automations',  idx: 2, sub: true  },
  { key: 'editing',      idx: 3, sub: true  },
  { key: 'arsenal',      idx: 4, sub: true  },
  { key: 'testimonials', idx: 5, sub: false },
  { key: 'about',        idx: 6, sub: false },
  { key: 'contact',      idx: 7, sub: false },
]

interface SideNavProps {
  currentSection: number
  onNavigate: (i: number) => void
  language: Language
}

export function SideNav({ currentSection, onNavigate, language }: SideNavProps) {
  const nav = translations[language].nav

  return (
    <nav
      data-cursor="hover"
      className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-0.5"
    >
      {NAV_ITEMS.map(({ key, idx, sub }) => {
        const isActive = idx === currentSection
        const label = nav[key as keyof typeof nav]

        return (
          <motion.button
            key={idx}
            data-cursor="hover"
            layout
            onClick={() => onNavigate(idx)}
            className="relative flex items-center text-left rounded-full transition-colors duration-200"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              paddingLeft: sub ? '20px' : '12px',
              paddingRight: '12px',
              paddingTop: sub ? '4px' : '6px',
              paddingBottom: sub ? '4px' : '6px',
              color: isActive
                ? 'rgba(255,255,255,1)'
                : sub
                ? 'rgba(255,255,255,0.55)'
                : 'rgba(255,255,255,0.72)',
            }}
          >
            {isActive && (
              <motion.span
                layoutId="sidenav-active"
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'rgba(139, 92, 246,0.08)',
                  border: '1px solid rgba(139, 92, 246,0.30)',
                }}
                transition={{ type: 'spring', damping: 22, stiffness: 260, mass: 0.8 }}
              />
            )}

            {/* Dot or sub-dash */}
            {sub ? (
              <span
                className="shrink-0 relative z-10 mr-2 text-[8px]"
                style={{ color: isActive ? 'rgba(139, 92, 246,0.7)' : 'rgba(255,255,255,0.20)' }}
              >
                —
              </span>
            ) : isActive ? (
              <motion.span
                layoutId="sidenav-dot"
                className="w-1.5 h-1.5 rounded-full shrink-0 relative z-10 mr-2"
                style={{ background: 'rgba(139, 92, 246,0.9)' }}
                transition={{ type: 'spring', damping: 22, stiffness: 260, mass: 0.8 }}
              />
            ) : (
              <span className="w-1 h-1 rounded-full bg-white/20 shrink-0 relative z-10 mr-2" />
            )}

            <span
              className="relative z-10"
              style={{
                fontSize: sub ? '9px' : '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          </motion.button>
        )
      })}
    </nav>
  )
}
