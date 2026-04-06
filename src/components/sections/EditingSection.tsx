import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import translations, { type Language } from '../../i18n/translations'

const CHANNEL_URL = 'https://www.youtube.com/@subspeedy'

// Spring constants
const STIFFNESS = 480
const DAMPING   = 30
const MASS      = 0.35

interface EditingSectionProps {
  isActive: boolean
  language: Language
}

export function EditingSection({ isActive, language }: EditingSectionProps) {
  const t = translations[language].editing
  const videoRef          = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const buttonRef         = useRef<HTMLDivElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  // Start/stop video with section
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isActive) {
      video.muted = true
      video.volume = 0
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
      video.muted = true
      video.volume = 0
      setIsMuted(true)
    }
  }, [isActive])

  // Spring cursor — follows mouse, only visible when over video container
  useEffect(() => {
    if (!isActive) {
      const btn = buttonRef.current
      if (btn) btn.style.opacity = '0'
      return
    }

    const target  = { x: -300, y: -300 }
    const current = { x: -300, y: -300 }
    const vel     = { x: 0, y: 0 }
    let lastTime: number | null = null
    let raf: number
    let inZone = false

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY

      const container = videoContainerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        const inside = (
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top  && e.clientY <= rect.bottom
        )
        if (inside !== inZone) {
          inZone = inside
          if (inside) {
            current.x = e.clientX
            current.y = e.clientY
            vel.x = 0
            vel.y = 0
          }
        }
      }
    }

    const tick = (now: number) => {
      const dt = lastTime === null ? 1 / 60 : Math.min((now - lastTime) / 1000, 1 / 20)
      lastTime = now

      const ax = (-STIFFNESS * (current.x - target.x) - DAMPING * vel.x) / MASS
      const ay = (-STIFFNESS * (current.y - target.y) - DAMPING * vel.y) / MASS
      vel.x += ax * dt
      vel.y += ay * dt
      current.x += vel.x * dt
      current.y += vel.y * dt

      const btn = buttonRef.current
      if (btn) {
        btn.style.transform = `translate(${current.x - 48}px, ${current.y - 48}px)`
        btn.style.opacity = inZone ? '1' : '0'
      }

      raf = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [isActive])

  // Click: toggle sound with fade
  const handleVideoClick = () => {
    const video = videoRef.current
    if (!video) return
    if (isMuted) {
      video.volume = 0
      video.muted = false
      setIsMuted(false)
      const fadeIn = () => {
        if (video.volume < 0.98) { video.volume = Math.min(video.volume + 0.04, 1); requestAnimationFrame(fadeIn) }
        else video.volume = 1
      }
      requestAnimationFrame(fadeIn)
    } else {
      const fadeOut = () => {
        if (video.volume > 0.04) { video.volume = Math.max(video.volume - 0.04, 0); requestAnimationFrame(fadeOut) }
        else { video.volume = 0; video.muted = true; setIsMuted(true) }
      }
      requestAnimationFrame(fadeOut)
    }
  }

  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Cursor button — spring-follows mouse, visible only over video */}
      <div
        ref={buttonRef}
        className="pointer-events-none fixed z-[300] hidden md:flex items-center justify-center rounded-full"
        style={{
          width: 96, height: 96,
          top: 0, left: 0, opacity: 0,
          willChange: 'transform',
          background: 'rgba(255,255,255,0.10)',
          border: '1px solid rgba(255,255,255,0.30)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 0 32px rgba(255,255,255,0.06)',
        }}
      >
        <span className="text-center leading-snug font-medium tracking-widest"
          style={{ fontSize: 8, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', whiteSpace: 'pre-wrap', maxWidth: 64, display: 'block' }}>
          {isMuted ? 'Play\nSound' : 'Mute'}
        </span>
      </div>

      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px' }} />
      {/* Ambient */}
      <div aria-hidden className="absolute top-0 left-0 w-[50vw] h-[50vh] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(245,158,11,0.05) 0%, transparent 65%)' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12">

        {/* Label */}
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
          transition={{ duration: 0.5 }}
          className="block text-[10px] tracking-[0.32em] uppercase mb-4"
          style={{ color: 'rgba(245,158,11,0.55)' }}
        >
          {t.eyebrow}
        </motion.span>

        {/* Main row: text left, video right */}
        <div className="flex flex-col md:flex-row gap-8 mb-6">

          {/* Left: heading + stats + desc + CTA */}
          <div className="flex flex-col justify-center gap-4 flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: '#ffffff',
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
              }}
            >
              {t.heading1}<br />{t.heading2}
            </motion.h2>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex gap-6"
            >
              {[
                { n: t.stat1n, l: t.stat1l },
                { n: t.stat2n, l: t.stat2l },
                { n: t.stat3n, l: t.stat3l },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="font-serif text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.90)' }}>{n}</p>
                  <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.32)' }}>{l}</p>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.30 }}
              className="text-xs leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.42)', maxWidth: '300px' }}
            >
              {t.desc}
            </motion.p>

            <motion.a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.40 }}
              className="inline-flex items-center gap-1.5 text-xs font-medium group w-fit"
              style={{ color: 'rgba(245,158,11,0.70)', textDecoration: 'none' }}
            >
              <span className="group-hover:text-amber-400 transition-colors">{t.cta}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>

          {/* Right: video */}
          <motion.div
            ref={videoContainerRef}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 24 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[58%] flex-shrink-0 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)', aspectRatio: '16/9', cursor: 'none' }}
            onClick={handleVideoClick}
          >
            <video
              ref={videoRef}
              src="/halovisionai3.3.mp4"
              muted loop playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Bottom: 3 feature blocks */}
        <div className="flex gap-3">
          {[
            { label: t.feat1 },
            { label: t.feat2 },
            { label: t.feat3 },
          ].map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
              transition={{ duration: 0.45, delay: 0.50 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 rounded-xl px-4 py-3 text-center"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p className="text-white/60 text-xs font-medium tracking-wide">{f.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
