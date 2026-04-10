import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import translations, { type Language } from '../../i18n/translations'
import { OrangeFlowBg } from '../ui/OrangeFlowBg'

const CHANNEL_URL = 'https://www.youtube.com/@subspeedy'
const STIFFNESS = 480, DAMPING = 30, MASS = 0.35


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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isActive) { video.muted = true; video.volume = 0; video.play().catch(() => {}) }
    else {
      video.pause(); video.currentTime = 0; video.muted = true; video.volume = 0
      setIsMuted(true); setVideoFull(false)
    }
  }, [isActive])

  // Scroll DOWN to expand video (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(hover: none)').matches) return
    if (!isActive || videoFull) return
    const el = sectionRef.current
    if (!el) return
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        e.stopPropagation()
        e.preventDefault()
        setVideoFull(true)
      }
    }
    el.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    return () => el.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions)
  }, [isActive, videoFull])

  useEffect(() => {
    if (!isActive) { if (buttonRef.current) buttonRef.current.style.opacity = '0'; return }
    const target = { x: -300, y: -300 }, current = { x: -300, y: -300 }, vel = { x: 0, y: 0 }
    let lastTime: number | null = null, raf: number, inZone = false
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX; target.y = e.clientY
      const container = videoContainerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
        if (inside !== inZone) { inZone = inside; if (inside) { current.x = e.clientX; current.y = e.clientY; vel.x = 0; vel.y = 0 } }
      }
    }
    const tick = (now: number) => {
      const dt = lastTime === null ? 1 / 60 : Math.min((now - lastTime) / 1000, 1 / 20); lastTime = now
      const ax = (-STIFFNESS * (current.x - target.x) - DAMPING * vel.x) / MASS
      const ay = (-STIFFNESS * (current.y - target.y) - DAMPING * vel.y) / MASS
      vel.x += ax * dt; vel.y += ay * dt; current.x += vel.x * dt; current.y += vel.y * dt
      const btn = buttonRef.current
      if (btn) { btn.style.transform = `translate(${current.x - 48}px, ${current.y - 48}px)`; btn.style.opacity = inZone ? '1' : '0' }
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
    } else {
      const fadeOut = () => { if (video.volume > 0.04) { video.volume = Math.max(video.volume - 0.04, 0); requestAnimationFrame(fadeOut) } else { video.volume = 0; video.muted = true; setIsMuted(true) } }
      requestAnimationFrame(fadeOut)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#eb5e28' }}
    >
      <OrangeFlowBg />
      {/* Spring cursor */}
      <div
        ref={buttonRef}
        className="pointer-events-none fixed z-[300] hidden md:flex items-center justify-center rounded-full"
        style={{
          width: 96, height: 96, top: 0, left: 0, opacity: 0, willChange: 'transform',
          background: 'rgba(0,0,0,0.22)',
          border: '1px solid rgba(0,0,0,0.40)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <span style={{ fontSize: 8, color: '#fff', textTransform: 'uppercase', whiteSpace: 'pre-wrap', textAlign: 'center', maxWidth: 64, display: 'block', fontWeight: 600, letterSpacing: '0.12em' }}>
          {!videoFull ? 'Click\nExpand' : isMuted ? 'Play\nSound' : 'Mute'}
        </span>
      </div>

      {/* Content — fades out in fullscreen */}
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
            {/* EDITING outlined — centered, clipped symmetrically */}
            <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="font-anurati" style={{
                fontSize: '22vw',
                color: 'transparent',
                WebkitTextStroke: '5px #000000',
                paintOrder: 'stroke fill',
                whiteSpace: 'nowrap',
                letterSpacing: '0.08em',
                lineHeight: 1,
                flexShrink: 0,
              }}>
                EDITING
              </span>
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12 flex flex-col gap-5">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="block text-[11px] tracking-[0.32em] uppercase"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {t.eyebrow}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                  color: '#ffffff',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                  fontWeight: 700,
                }}
              >
                {t.heading1}<br />{t.heading2}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.22 }}
                className="flex flex-wrap gap-8"
              >
                {[{ n: t.stat1n, l: t.stat1l }, { n: t.stat2n, l: t.stat2l }, { n: t.stat3n, l: t.stat3l }].map(({ n, l }) => (
                  <div key={l}>
                    <p className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#ffffff' }}>{n}</p>
                    <p className="text-[11px] tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>{l}</p>
                  </div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.30 }}
                style={{ color: 'rgba(255,255,255,0.80)', fontSize: 'clamp(14px, 1.4vw, 18px)', lineHeight: 1.7, maxWidth: '38rem' }}
              >
                {t.desc}
              </motion.p>

              <div className="flex flex-wrap gap-3">
                {[{ label: t.feat1 }, { label: t.feat2 }, { label: t.feat3 }].map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                    transition={{ duration: 0.45, delay: 0.40 + i * 0.07 }}
                    className="rounded-xl px-5 py-3.5"
                    style={{ background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(0,0,0,0.40)' }}
                  >
                    <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 'clamp(13px, 1.2vw, 16px)', fontWeight: 700 }}>{f.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.52 }}
                className="inline-flex items-center gap-2.5 group w-fit px-5 py-3 rounded-xl font-semibold"
                style={{
                  background: 'rgba(0,0,0,0.28)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: 'clamp(13px, 1.1vw, 15px)',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.45)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.28)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)' }}
              >
                <span>{t.cta}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video layer */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '100%', zIndex: 20, pointerEvents: 'none' }}>
        <motion.div
          ref={videoContainerRef}
          animate={{ y: videoFull ? '0%' : '72%' }}
          transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
          style={{ cursor: 'none', pointerEvents: 'auto' }}
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            src="/halovisionai3.3.mp4"
            muted loop playsInline
            className="w-full h-full object-cover"
            style={{
              borderRadius: videoFull ? '0' : '24px 24px 0 0',
              opacity: videoFull ? 1 : 0.55,
              transition: 'border-radius 0.70s ease, opacity 0.70s ease',
            }}
          />
        </motion.div>
      </div>

    </section>
  )
}
