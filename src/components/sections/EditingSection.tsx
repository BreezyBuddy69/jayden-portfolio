import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import translations, { type Language } from '../../i18n/translations'

const VIOLET = '#8B5CF6'
const DARK = '#0f0d0c'
const CHANNEL_URL = 'https://www.youtube.com/@subspeedy'
const STIFFNESS = 480, DAMPING = 30, MASS = 0.35

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
        width: 520, height: 520, borderRadius: '50%',
        background: `radial-gradient(circle, ${VIOLET}66 0%, ${VIOLET}22 45%, transparent 70%)`,
        filter: 'blur(70px)',
      }} />
    </motion.div>
  )
}

interface EditingSectionProps {
  isActive: boolean
  language: Language
}

export function EditingSection({ isActive, language }: EditingSectionProps) {
  const t = translations[language].editing
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [videoFull, setVideoFull] = useState(false)
  const [showPeek, setShowPeek] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const videoFullRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isActive) { video.muted = true; video.volume = 0; video.play().catch(() => {}) }
    else {
      video.pause(); video.currentTime = 0; video.muted = true; video.volume = 0
      setIsMuted(true); setVideoFull(false); setShowPeek(false); setIsPaused(false)
      videoFullRef.current = false
    }
  }, [isActive])

  useEffect(() => {
    if (!isActive || videoFull) return
    setShowPeek(false)
    const peekTimer = setTimeout(() => setShowPeek(true), 12000)
    const fullTimer = setTimeout(() => setVideoFull(true), 50000)
    return () => { clearTimeout(peekTimer); clearTimeout(fullTimer) }
  }, [isActive, videoFull])

  // Scroll DOWN to expand video (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(hover: none)').matches) return
    if (!isActive || videoFull) return
    const el = sectionRef.current
    if (!el) return
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) { e.stopPropagation(); e.preventDefault(); setVideoFull(true) }
    }
    el.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    return () => el.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions)
  }, [isActive, videoFull])

  useEffect(() => { videoFullRef.current = videoFull }, [videoFull])

  // Spring cursor — follows everywhere when videoFull, else only inside video zone
  useEffect(() => {
    if (!isActive) { if (buttonRef.current) buttonRef.current.style.opacity = '0'; return }
    const target = { x: -300, y: -300 }, current = { x: -300, y: -300 }, vel = { x: 0, y: 0 }
    let lastTime: number | null = null, raf: number, inZone = false, hasMoved = false
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX; target.y = e.clientY; hasMoved = true
      if (!videoFullRef.current) {
        const container = videoContainerRef.current
        if (container) {
          const rect = container.getBoundingClientRect()
          const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
          if (inside !== inZone) { inZone = inside; if (inside) { current.x = e.clientX; current.y = e.clientY; vel.x = 0; vel.y = 0 } }
        }
      } else {
        if (!inZone) { current.x = e.clientX; current.y = e.clientY; vel.x = 0; vel.y = 0 }
        inZone = true
      }
    }
    const tick = (now: number) => {
      const dt = lastTime === null ? 1 / 60 : Math.min((now - lastTime) / 1000, 1 / 20); lastTime = now
      const ax = (-STIFFNESS * (current.x - target.x) - DAMPING * vel.x) / MASS
      const ay = (-STIFFNESS * (current.y - target.y) - DAMPING * vel.y) / MASS
      vel.x += ax * dt; vel.y += ay * dt; current.x += vel.x * dt; current.y += vel.y * dt
      const btn = buttonRef.current
      const show = hasMoved && (videoFullRef.current || inZone)
      if (btn) { btn.style.transform = `translate(${current.x - 48}px, ${current.y - 48}px)`; btn.style.opacity = show ? '1' : '0' }
      raf = requestAnimationFrame(tick)
    }
    document.addEventListener('mousemove', onMove); raf = requestAnimationFrame(tick)
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [isActive])

  const handleVideoClick = () => {
    if (!videoFull) { setVideoFull(true); return }
    const video = videoRef.current; if (!video) return
    if (isMuted) {
      video.volume = 0; video.muted = false; setIsMuted(false)
      const fadeIn = () => { if (video.volume < 0.98) { video.volume = Math.min(video.volume + 0.04, 1); requestAnimationFrame(fadeIn) } else video.volume = 1 }
      requestAnimationFrame(fadeIn)
    } else if (isPaused) {
      video.play().catch(() => {}); setIsPaused(false)
    } else {
      video.pause(); setIsPaused(true)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* ── Radial vignette ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: `radial-gradient(ellipse 75% 68% at 50% 44%, transparent 0%, ${DARK}88 48%, ${DARK}ee 100%)`,
      }} />

      {/* ── Mouse-following glow orb ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <MouseOrb />
      </div>

      {/* ── Ambient glows + grain ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Bottom warm violet pool — much stronger */}
        <div style={{
          position: 'absolute', bottom: '-5%', left: '50%', transform: 'translateX(-50%)',
          width: 1000, height: 380, borderRadius: '50%',
          background: `radial-gradient(ellipse, ${VIOLET}44 0%, ${VIOLET}18 45%, transparent 70%)`,
          filter: 'blur(65px)',
        }} />
        {/* Top-left accent — stronger */}
        <div style={{
          position: 'absolute', top: '-8%', left: '-5%',
          width: 480, height: 480, borderRadius: '50%',
          background: `radial-gradient(circle, ${VIOLET}22 0%, transparent 70%)`,
          filter: 'blur(50px)',
        }} />
        {/* Right-center warm glow */}
        <div style={{
          position: 'absolute', top: '25%', right: '-5%',
          width: 320, height: 320, borderRadius: '50%',
          background: `radial-gradient(circle, ${VIOLET}18 0%, transparent 70%)`,
          filter: 'blur(55px)',
        }} />
        <div aria-hidden className="absolute inset-0 grain opacity-[0.055]" />
      </div>

      {/* ── Spring cursor (video hover) ── */}
      <div
        ref={buttonRef}
        className="pointer-events-none fixed z-[300] hidden md:flex items-center justify-center rounded-full"
        style={{
          width: 96, height: 96, top: 0, left: 0, opacity: 0, willChange: 'transform',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.14)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.80)', textTransform: 'uppercase', whiteSpace: 'pre-wrap', textAlign: 'center', maxWidth: 64, display: 'block', fontWeight: 600, letterSpacing: '0.12em' }}>
          {!videoFull ? 'Click\nExpand' : isMuted ? 'Play\nSound' : isPaused ? 'Resume' : 'Pause'}
        </span>
      </div>

      {/* ── "EDITING" watermark — bottom ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none z-[2]"
        style={{ lineHeight: 0 }}
      >
        <motion.div
          className="font-anurati text-center"
          style={{
            fontSize: 'clamp(5rem, 13.5vw, 18rem)',
            color: 'transparent',
            WebkitTextStroke: `2px ${VIOLET}22`,
            lineHeight: 0.90,
            whiteSpace: 'nowrap',
            letterSpacing: '0.08em',
            transform: 'translateY(32%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 1.8, delay: 0.4 }}
        >
          EDITING
        </motion.div>
      </div>

      {/* ── Content layer — fades out in fullscreen ── */}
      <AnimatePresence>
        {!videoFull && (
          <motion.div
            key="content"
            className="absolute top-0 left-0 right-0 flex flex-col justify-center z-10"
            style={{ height: '90%' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12 flex flex-col gap-4">

              {/* Eyebrow */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="block text-[10px] tracking-[0.34em] uppercase"
                style={{ color: `${VIOLET}CC` }}
              >
                {t.eyebrow}
              </motion.span>

              {/* Orange accent line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: 48, height: 2, background: ORANGE, borderRadius: 2,
                  transformOrigin: 'left center',
                  boxShadow: `0 0 14px ${VIOLET}88`,
                  marginTop: -8,
                }}
              />

              {/* Heading */}
              <div style={{ marginTop: 4 }}>
                <motion.h2
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 32 }}
                  transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)',
                    color: '#ffffff',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.0,
                    fontWeight: 700,
                    marginBottom: '0.08em',
                    textShadow: '0 2px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  {t.heading1}
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 32 }}
                  transition={{ duration: 0.8, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)',
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.0,
                    fontWeight: 700,
                  }}
                >
                  {t.heading2}
                </motion.h2>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.30 }}
                className="flex flex-wrap gap-8"
              >
                {[
                  { n: t.stat1n, l: t.stat1l },
                  { n: t.stat2n, l: t.stat2l },
                  { n: t.stat3n, l: t.stat3l },
                ].map(({ n, l }) => (
                  <div key={l}>
                    <p className="font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', color: ORANGE }}>{n}</p>
                    <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.85)' }}>{l}</p>
                  </div>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(13px, 1.3vw, 16px)', lineHeight: 1.8, maxWidth: '38rem' }}
              >
                {t.desc}
              </motion.p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2.5">
                {[{ label: t.feat1 }, { label: t.feat2 }, { label: t.feat3 }].map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                    transition={{ duration: 0.4, delay: 0.44 + i * 0.07 }}
                    className="rounded-full px-4 py-2"
                    style={{
                      background: `rgba(139,92,246,0.14)`,
                      border: `1.5px solid ${VIOLET}68`,
                      boxShadow: `0 2px 10px rgba(0,0,0,0.30)`,
                    }}
                  >
                    <p style={{ color: 'rgba(255,255,255,0.80)', fontSize: 'clamp(11px, 1.05vw, 13px)', fontWeight: 600, letterSpacing: '0.06em' }}>{f.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* YouTube link */}
              <motion.a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.58 }}
                className="inline-flex items-center gap-2.5 group w-fit px-5 py-3 rounded-xl font-semibold"
                style={{
                  background: 'rgba(60,44,28,0.92)',
                  border: `1.5px solid ${VIOLET}68`,
                  color: 'rgba(255,255,255,0.92)',
                  textDecoration: 'none',
                  fontSize: 'clamp(12px, 1.05vw, 14px)',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.38)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(55,38,24,0.92)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${VIOLET}80`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${VIOLET}30`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(38,28,20,0.82)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${VIOLET}50`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 18px rgba(0,0,0,0.38)'
                }}
              >
                <span>{t.cta}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── "Video anschauen" button — visible before peek ── */}
      <AnimatePresence>
        {isActive && !videoFull && (
          <motion.button
            key="watch-btn"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setVideoFull(true)}
            className="absolute bottom-8 left-1/2 z-30 flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold"
            style={{
              transform: 'translateX(-50%)',
              background: `rgba(139,92,246,0.12)`,
              border: `1px solid ${VIOLET}44`,
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'clamp(12px, 1.1vw, 14px)',
              letterSpacing: '0.06em',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              boxShadow: `0 0 28px ${VIOLET}22`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `rgba(139,92,246,0.22)`
              ;(e.currentTarget as HTMLElement).style.borderColor = `${VIOLET}88`
              ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 36px ${VIOLET}44`
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = `rgba(139,92,246,0.12)`
              ;(e.currentTarget as HTMLElement).style.borderColor = `${VIOLET}44`
              ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${VIOLET}22`
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={ORANGE} style={{ flexShrink: 0 }}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
            <span>Video anschauen</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Video layer — slides up from bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '100%', zIndex: 20, pointerEvents: 'none' }}>
        <motion.div
          ref={videoContainerRef}
          animate={{ y: videoFull ? '0%' : showPeek ? '84%' : '100%' }}
          transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            src="/halovisionai3.3.mp4"
            muted loop playsInline
            className="w-full h-full object-cover"
            style={{
              borderRadius: videoFull ? '0' : '20px 20px 0 0',
              opacity: videoFull ? 1 : 0.65,
              transition: 'border-radius 0.70s ease, opacity 0.70s ease',
            }}
          />
          {/* Subtle overlay on collapsed state */}
          {!videoFull && (
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `linear-gradient(to bottom, ${DARK}66 0%, transparent 40%)`,
              borderRadius: '20px 20px 0 0',
            }} />
          )}
        </motion.div>
      </div>
    </section>
  )
}
