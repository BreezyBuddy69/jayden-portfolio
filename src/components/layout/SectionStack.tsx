import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface SectionStackProps {
  currentSection: number
  children: React.ReactNode[]
  onSectionChange?: (i: number) => void
}

function ScrollHint({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.65, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-white/45 text-[9px] tracking-[0.25em] uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-white/40" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SectionStack({ currentSection, children, onSectionChange }: SectionStackProps) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [showHint, setShowHint] = useState(false)
  const [prevSection, setPrevSection] = useState(currentSection)
  const isLastSection = currentSection === children.length - 1

  useEffect(() => {
    if (!isMobile || !onSectionChange) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.id.replace('section-', ''), 10)
            if (!isNaN(idx)) onSectionChange(idx)
          }
        })
      },
      { threshold: 0.6 }
    )
    const timer = setTimeout(() => {
      children.forEach((_, i) => {
        const el = document.getElementById(`section-${i}`)
        if (el) observer.observe(el)
      })
    }, 100)
    return () => { clearTimeout(timer); observer.disconnect() }
  }, [isMobile, children.length]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentSection !== prevSection) setPrevSection(currentSection)
  }, [currentSection]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setShowHint(false)
    if (isLastSection) return
    const t = setTimeout(() => setShowHint(true), 3500)
    return () => clearTimeout(t)
  }, [currentSection, isLastSection])

  if (isMobile) {
    return (
      <div
        className="w-full overflow-y-scroll"
        style={{ height: '100dvh', scrollSnapType: 'y mandatory', overscrollBehavior: 'none' }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            id={`section-${i}`}
            className="w-full overflow-hidden"
            style={{ height: '100dvh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
          >
            {child}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        {children.map((child, i) => {
          const isCurrent = i === currentSection
          const isPrev = i === prevSection && i !== currentSection

          return (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ opacity: isCurrent ? 1 : 0 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              style={{
                zIndex: isCurrent ? 10 : isPrev ? 9 : i,
                willChange: 'opacity',
                pointerEvents: isCurrent ? 'auto' : 'none',
              }}
            >
              {child}
            </motion.div>
          )
        })}
      </div>
      <ScrollHint show={showHint && !isMobile && currentSection !== 2 && currentSection !== 3} />
      <div className="fixed z-50 text-white/20 text-[10px] font-mono tracking-widest hidden md:block"
        style={{ bottom: '1.5rem', right: '1.5rem' }}>
        {String(currentSection + 1).padStart(2, '0')} / {String(children.length).padStart(2, '0')}
      </div>
    </>
  )
}
