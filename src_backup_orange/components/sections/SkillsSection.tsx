import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import translations, { type Language } from '../../i18n/translations'

const ORANGE = '#eb5e28'

interface SkillsSectionProps {
  isActive: boolean
  onNavigate: (i: number) => void
  language: Language
}

export function SkillsSection({ isActive, onNavigate, language }: SkillsSectionProps) {
  const t = translations[language].skills
  // Default left is orange; tracks last hovered
  const [activeBlock, setActiveBlock] = useState<'left' | 'right'>('left')
  const [expanding, setExpanding] = useState<'left' | 'right' | null>(null)

  const handleClick = (side: 'left' | 'right', navIdx: number) => {
    setExpanding(side)
    setTimeout(() => { setExpanding(null); onNavigate(navIdx) }, 1100)
  }

  const leftOrange = activeBlock === 'left'
  const rightOrange = activeBlock === 'right'

  return (
    <section
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: '#1a1714' }}
    >
      <div className="flex flex-col md:flex-row flex-1 min-h-0 relative">

        {/* Center hint pill */}
        <motion.div
          className="hidden md:flex absolute inset-0 items-center justify-center z-20 pointer-events-none"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            background: 'rgba(38,28,20,0.80)',
            borderRadius: 999,
            padding: '8px 22px',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.40)',
          }}>
            <p style={{ fontSize: 9, letterSpacing: '0.30em', color: 'rgba(255,255,255,0.76)', textTransform: 'uppercase', margin: 0 }}>
              {t.hint}
            </p>
          </div>
        </motion.div>

        {/* ── LEFT: AUTOMATIONS ── */}
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -30 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleClick('left', 2)}
          data-cursor="hover"
          className="relative flex-1 flex flex-col justify-start overflow-hidden text-left"
          style={{
            background: leftOrange ? ORANGE : '#0f0d0c',
            border: 'none',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            cursor: 'pointer',
            padding: '0',
            transition: 'background 0.55s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={() => setActiveBlock('left')}
        >
          {/* Grain overlay */}
          <div aria-hidden className="absolute inset-0 pointer-events-none grain opacity-[0.05] z-[1]" />
          {/* Orange bottom glow when dark */}
          {!leftOrange && (
            <div aria-hidden className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]" style={{
              height: '50%',
              background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${ORANGE}22 0%, transparent 70%)`,
              filter: 'blur(20px)',
            }} />
          )}
          {/* Orange grid lines on dark state */}
          {!leftOrange && (
            <div aria-hidden className="absolute inset-0 pointer-events-none z-[1]" style={{
              backgroundImage: `linear-gradient(${ORANGE}0C 1px, transparent 1px), linear-gradient(90deg, ${ORANGE}0C 1px, transparent 1px)`,
              backgroundSize: '48px 24px',
            }} />
          )}
          {/* Giant number — fills block */}
          <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(22rem, 55vw, 70rem)',
              color: 'transparent',
              WebkitTextStroke: leftOrange ? '2px rgba(0,0,0,0.22)' : `2px ${ORANGE}30`,
              whiteSpace: 'nowrap',
              lineHeight: 0.85,
              transition: '-webkit-text-stroke 0.55s cubic-bezier(0.16,1,0.3,1)',
            }}>
              01
            </span>
          </div>

          <div className="relative z-10 p-8 md:pr-14" style={{ paddingTop: 'clamp(120px, 16vh, 200px)', paddingLeft: 'clamp(56px, 13vw, 190px)' }}>
            <p className="text-[9px] tracking-[0.34em] uppercase mb-4" style={{
              color: leftOrange ? 'rgba(0,0,0,0.50)' : 'rgba(255,255,255,0.85)',
              transition: 'color 0.55s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {t.automationsTag}
            </p>
            <h3 className="art-text" style={{
              fontSize: 'clamp(3rem, 6vw, 6.5rem)',
              color: leftOrange ? '#252422' : '#ffffff',
              marginBottom: '20px',
              lineHeight: 0.9,
              transition: 'color 0.55s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {t.automationsTitle}
            </h3>
            <p style={{
              color: leftOrange ? 'rgba(0,0,0,0.58)' : 'rgba(255,255,255,0.72)',
              fontSize: '14px', lineHeight: 1.7, maxWidth: '300px',
              transition: 'color 0.55s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {t.automationsDesc}
            </p>
            <div className="mt-10 w-11 h-11 rounded-full flex items-center justify-center" style={{
              border: leftOrange ? '1px solid rgba(0,0,0,0.30)' : '1px solid rgba(255,255,255,0.55)',
              color: leftOrange ? '#252422' : '#ffffff',
              fontSize: '20px',
              transition: 'border-color 0.55s, color 0.55s',
            }}>→</div>
          </div>
        </motion.button>

        {/* ── RIGHT: VIDEO EDITING ── */}
        <motion.button
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 30 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleClick('right', 3)}
          data-cursor="hover"
          className="relative flex-1 flex flex-col justify-start overflow-hidden text-left"
          style={{
            background: rightOrange ? ORANGE : '#0f0d0c',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            transition: 'background 0.55s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={() => setActiveBlock('right')}
        >
          {/* Grain overlay */}
          <div aria-hidden className="absolute inset-0 pointer-events-none grain opacity-[0.05] z-[1]" />
          {/* Orange bottom glow when dark */}
          {!rightOrange && (
            <div aria-hidden className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]" style={{
              height: '50%',
              background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${ORANGE}22 0%, transparent 70%)`,
              filter: 'blur(20px)',
            }} />
          )}
          {/* Orange grid lines on dark state */}
          {!rightOrange && (
            <div aria-hidden className="absolute inset-0 pointer-events-none z-[1]" style={{
              backgroundImage: `linear-gradient(${ORANGE}0C 1px, transparent 1px), linear-gradient(90deg, ${ORANGE}0C 1px, transparent 1px)`,
              backgroundSize: '48px 24px',
            }} />
          )}
          {/* Giant number */}
          <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(22rem, 55vw, 70rem)',
              color: 'transparent',
              WebkitTextStroke: rightOrange ? '2px rgba(0,0,0,0.22)' : `2px ${ORANGE}30`,
              whiteSpace: 'nowrap',
              lineHeight: 0.85,
              transition: '-webkit-text-stroke 0.55s cubic-bezier(0.16,1,0.3,1)',
            }}>
              02
            </span>
          </div>

          <div className="relative z-10 p-8 md:p-14" style={{ paddingTop: 'clamp(120px, 16vh, 200px)' }}>
            <p className="text-[9px] tracking-[0.34em] uppercase mb-4" style={{
              color: rightOrange ? 'rgba(0,0,0,0.50)' : 'rgba(255,255,255,0.85)',
              transition: 'color 0.55s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {t.editingTag}
            </p>
            <h3 className="art-text" style={{
              fontSize: 'clamp(3rem, 6vw, 6.5rem)',
              color: rightOrange ? '#252422' : '#ffffff',
              marginBottom: '20px',
              lineHeight: 0.9,
              transition: 'color 0.55s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {t.editingTitle}
            </h3>
            <p style={{
              color: rightOrange ? 'rgba(0,0,0,0.58)' : 'rgba(255,255,255,0.72)',
              fontSize: '14px', lineHeight: 1.7, maxWidth: '300px',
              transition: 'color 0.55s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {t.editingDesc}
            </p>
            <div className="mt-10 w-11 h-11 rounded-full flex items-center justify-center" style={{
              border: rightOrange ? '1px solid rgba(0,0,0,0.30)' : '1px solid rgba(255,255,255,0.55)',
              color: rightOrange ? '#252422' : '#ffffff',
              fontSize: '20px',
              transition: 'border-color 0.55s, color 0.55s',
            }}>→</div>
          </div>
        </motion.button>
      </div>

      {/* Smooth expand overlay */}
      <AnimatePresence>
        {expanding && (
          <motion.div
            key="expand"
            className="absolute inset-0 z-50 pointer-events-none"
            style={{
              background: ORANGE,
              transformOrigin: expanding === 'left' ? 'left center' : 'right center',
            }}
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
