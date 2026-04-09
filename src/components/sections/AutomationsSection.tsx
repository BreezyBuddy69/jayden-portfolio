import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Send, ChevronDown } from 'lucide-react'
import translations, { type Language } from '../../i18n/translations'
import { useChatContext } from '../../contexts/ChatContext'
import { TypingMessage } from '../chat/TypingMessage'
import { ThinkingProcess } from '../chat/ThinkingProcess'

const ORANGE = '#E8600A'
const HALO_URL = 'https://halovisionai.cloud'
const CHATBOT_URL = 'https://n8n.halovisionai.cloud/webhook/jayden-portfolio-chat'

function renderText(content: string) {
  const parts = content.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: 'rgba(255,255,255,0.97)', fontWeight: 650 }}>{part.slice(2, -2)}</strong>
    }
    return part.split('\n').flatMap((line, j, arr) => j < arr.length - 1 ? [line, <br key={`${i}-${j}`} />] : [line])
  })
}

interface AutomationsSectionProps {
  isActive: boolean
  language: Language
}

// ── Typewriter placeholder hook ──────────────────────────────────────────────
const PLACEHOLDERS = [
  'Ask me about automation…',
  'What workflows can Jayden build?',
  'How fast can you deliver?',
  'Tell me about AI agents…',
  'What tools do you use?',
]

function useTypewriterPlaceholder(active: boolean) {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const pauseRef = useRef(false)

  useEffect(() => {
    if (!active) return
    const phrase = PLACEHOLDERS[phraseIdx]

    if (pauseRef.current) return

    const delay = deleting ? 38 : charIdx === phrase.length ? 1400 : 68

    const t = setTimeout(() => {
      if (!deleting && charIdx === phrase.length) {
        pauseRef.current = true
        setTimeout(() => { pauseRef.current = false; setDeleting(true) }, 1400)
        return
      }
      if (deleting && charIdx === 0) {
        setDeleting(false)
        setPhraseIdx(i => (i + 1) % PLACEHOLDERS.length)
        return
      }
      setCharIdx(i => deleting ? i - 1 : i + 1)
      setText(phrase.slice(0, deleting ? charIdx - 1 : charIdx + 1))
    }, delay)

    return () => clearTimeout(t)
  }, [active, charIdx, deleting, phraseIdx])

  // reset when section becomes inactive
  useEffect(() => {
    if (!active) { setText(''); setCharIdx(0); setDeleting(false); setPhraseIdx(0); pauseRef.current = false }
  }, [active])

  return text
}

export function AutomationsSection({ isActive, language }: AutomationsSectionProps) {
  const t = translations[language].automations
  const { messages, isLoading, addMessage, markDone, setIsLoading } = useChatContext()
  const [input, setInput] = useState('')
  const [userMsgCount, setUserMsgCount] = useState(0)
  const [chatFull, setChatFull] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const placeholder = useTypewriterPlaceholder(isActive && !chatFull && !input)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const seenMsgIdsRef = useRef<Set<number>>(new Set())

  // Reset on section leave
  useEffect(() => {
    if (!isActive) { setChatFull(false) }
  }, [isActive])

  // Scroll to bottom of chat when messages arrive
  useEffect(() => {
    const el = scrollRef.current
    if (!el || !chatFull) return
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight })
  }, [messages, isLoading, chatFull])

  // Scroll DOWN to expand chat (desktop only)
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(hover: none)').matches) return
    if (!isActive || chatFull) return
    const el = sectionRef.current
    if (!el) return
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        e.stopPropagation()
        e.preventDefault()
        setChatFull(true)
      }
    }
    el.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    return () => el.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions)
  }, [isActive, chatFull])

  const handleSend = async () => {
    if (!input.trim() || isLoading || userMsgCount >= 20) return
    const text = input.trim()
    setInput('')
    setUserMsgCount(c => c + 1)
    addMessage({ role: 'user', content: text })
    setIsLoading(true)

    const history = messages.slice(-9).map(m => ({ role: m.role, content: m.content }))
    history.push({ role: 'user', content: text })

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 60000)
      const res = await fetch(CHATBOT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      })
      clearTimeout(timeout)
      const data = await res.json()
      let raw = data.response ?? data.message ?? data.output ?? data.text ?? "Sorry, I couldn't process that."
      raw = raw.replace(/<[^>]*>/g, '').replace(/#+\s/g, '').replace(/`/g, '')
      addMessage({ role: 'assistant', content: raw, isNew: true })
    } catch (err: unknown) {
      const isTimeout = err instanceof Error && err.name === 'AbortError'
      addMessage({ role: 'assistant', content: isTimeout ? "The AI is taking too long — try again." : "Connection error — try again in a moment." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full overflow-hidden"
      style={{ background: ORANGE }}
    >
      {/* AUTOMATIONS outlined bg — fills viewport width */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ overflow: 'hidden' }}>
        <span className="font-anurati text-3d-outline-on-orange" style={{
          fontSize: '17vw',
          color: 'transparent',
          WebkitTextStroke: '4px rgba(0,0,0,0.38)',
          paintOrder: 'stroke fill',
          whiteSpace: 'nowrap',
          letterSpacing: '0.08em',
          lineHeight: 1,
          display: 'block',
          opacity: 0.55,
        }}>
          AUTOMATIONS
        </span>
      </div>

      {/* Content layer — fades out when chat is fullscreen */}
      <AnimatePresence>
        {!chatFull && (
          <motion.div
            key="content"
            className="absolute top-0 left-0 right-0 flex flex-col justify-center z-10"
            style={{ height: '88%' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-5xl mx-auto px-6 md:pl-[190px] md:pr-12 flex flex-col gap-5">
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
                {[{ n: (t as any).stat1n, l: (t as any).stat1l }, { n: (t as any).stat2n, l: (t as any).stat2l }, { n: (t as any).stat3n, l: (t as any).stat3l }].map(({ n, l }) => (
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
                {(t as any).desc}
              </motion.p>

              {/* Desktop: side-by-side cards */}
              <div className="hidden md:flex gap-3 flex-wrap">
                {[
                  { title: t.aiAgentsTitle, desc: t.aiAgentsDesc },
                  { title: t.n8nTitle, desc: t.n8nDesc },
                  { title: t.claudeTitle, desc: t.claudeDesc },
                ].map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                    className="flex-1 rounded-xl px-4 py-3.5"
                    style={{ background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(0,0,0,0.40)', minWidth: '160px' }}
                  >
                    <p style={{ color: 'rgba(255,255,255,0.90)', fontSize: 'clamp(12px, 1.1vw, 15px)', fontWeight: 700, marginBottom: 4 }}>{s.title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: 'clamp(10px, 0.9vw, 13px)', lineHeight: 1.5 }}>{s.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Mobile: collapsible accordion cards */}
              <div className="flex flex-col gap-2 md:hidden">
                {[
                  { title: t.aiAgentsTitle, desc: t.aiAgentsDesc },
                  { title: t.n8nTitle, desc: t.n8nDesc },
                  { title: t.claudeTitle, desc: t.claudeDesc },
                ].map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                    className="rounded-xl overflow-hidden"
                    style={{ background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(0,0,0,0.40)' }}
                  >
                    <button
                      className="w-full flex items-center justify-between px-4 py-3"
                      style={{ background: 'none', border: 'none', textAlign: 'left' }}
                      onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                    >
                      <p style={{ color: 'rgba(255,255,255,0.90)', fontSize: 14, fontWeight: 700, margin: 0 }}>{s.title}</p>
                      <span style={{ color: 'rgba(255,255,255,0.50)', fontSize: 12, transition: 'transform 0.2s', display: 'block', transform: expandedCard === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                    </button>
                    <AnimatePresence>
                      {expandedCard === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: 13, lineHeight: 1.5, padding: '0 16px 12px' }}>{s.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={HALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.62 }}
                className="inline-flex items-center gap-3 group w-fit"
                style={{
                  textDecoration: 'none',
                  position: 'relative',
                }}
              >
                {/* Glow layer */}
                <div style={{
                  position: 'absolute', inset: '-2px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.50) 100%)',
                  filter: 'blur(6px)',
                  opacity: 0.9,
                  zIndex: 0,
                }} />
                <div
                  className="relative flex items-center gap-3 px-6 py-3.5 rounded-2xl font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(20,8,0,0.85) 100%)',
                    border: '1px solid rgba(0,0,0,0.70)',
                    boxShadow: '0 0 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)',
                    color: '#ffffff',
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    backdropFilter: 'blur(12px)',
                    transition: 'box-shadow 0.2s, border-color 0.2s',
                    zIndex: 1,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 36px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.90)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.70)' }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 7, fontWeight: 800, color: 'rgba(255,255,255,0.70)', letterSpacing: '0.02em' }}>HAL</span>
                  </div>
                  <span>halovisionai.cloud</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input peek — always at bottom of section, independent of chat layer ── */}
      <AnimatePresence>
        {!chatFull && (
          <motion.div
            key="peek"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center"
            style={{
              paddingBottom: '1.5rem',
              paddingTop: '2rem',
              paddingLeft: 'clamp(24px, 5vw, 48px)',
              paddingRight: 'clamp(24px, 5vw, 48px)',
              background: 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 100%)',
              pointerEvents: 'auto',
            }}
          >
            {/* Scroll hint — above input */}
            <motion.div
              className="flex flex-col items-center mb-3 pointer-events-none"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span style={{ fontSize: 8, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: 2 }}>
                scroll or type
              </span>
              <ChevronDown className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.40)' }} />
            </motion.div>

            {/* Input bar */}
            <div
              className="flex items-center gap-3 w-full max-w-xl"
              style={{ borderBottom: '1.5px solid rgba(255,255,255,0.55)', paddingBottom: 12, paddingRight: 'clamp(0px, 12vw, 72px)' }}
            >
              <div className="w-2 h-2 rounded-full bg-amber-300 animate-pulse shrink-0" />
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value.slice(0, 3000))}
                onKeyDown={e => {
                  if (e.key === 'Enter' && input.trim()) {
                    setChatFull(true)
                    setTimeout(() => handleSend(), 80)
                  }
                }}
                onFocus={() => setChatFull(true)}
                placeholder={placeholder || 'Ask the AI…'}
                className="flex-1 bg-transparent outline-none"
                style={{ color: 'rgba(255,255,255,0.92)', caretColor: '#fff', fontSize: 15 }}
                data-cursor="hover"
              />
              <button
                data-cursor="hover"
                onClick={() => { setChatFull(true); setTimeout(() => handleSend(), 80) }}
                disabled={!input.trim() || isLoading}
                className="shrink-0 flex items-center justify-center rounded-full transition-opacity disabled:opacity-30"
                style={{ width: 34, height: 34, background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(0,0,0,0.50)' }}
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Label */}
            <p style={{ fontSize: 9, letterSpacing: '0.20em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginTop: 8 }}>
              AI Chatbot — trained on Jayden's knowledge
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fullscreen chat ── */}
      <AnimatePresence>
        {chatFull && (
          <motion.div
            key="chat-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-30 flex flex-col"
            style={{
              paddingTop: '5rem',
              paddingBottom: '2.5rem',
              paddingLeft: 'clamp(24px, 5vw, 48px)',
              paddingRight: 'clamp(24px, 5vw, 48px)',
              background: ORANGE,
              pointerEvents: 'auto',
              overflow: 'hidden',
            }}
          >
            {/* JAYDEN'S / AI AGENT background text — two lines, centered */}
            <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
              <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', padding: '0 12px', maxWidth: '100%' }}>
                <span className="font-anurati" style={{
                  fontSize: 'min(18vw, 14vh)',
                  color: 'transparent',
                  WebkitTextStroke: '4px rgba(0,0,0,0.35)',
                  paintOrder: 'stroke fill',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                }}>
                  JAYDEN'S
                </span>
              </div>
              <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', padding: '0 12px', maxWidth: '100%' }}>
                <span className="font-anurati" style={{
                  fontSize: 'min(14vw, 10vh)',
                  color: 'transparent',
                  WebkitTextStroke: '4px rgba(0,0,0,0.35)',
                  paintOrder: 'stroke fill',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                }}>
                  AI AGENT
                </span>
              </div>
            </div>

            {/* Header row — centered */}
            <div className="flex items-center justify-between mb-5 shrink-0 max-w-2xl mx-auto w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                <span style={{ fontSize: 10, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.50)', textTransform: 'uppercase' }}>
                  AI Chatbot — trained on Jayden's knowledge
                </span>
              </div>
              <button
                data-cursor="hover"
                onClick={() => setChatFull(false)}
                className="text-[9px] tracking-[0.20em] uppercase transition-opacity hover:opacity-100 flex items-center gap-1.5"
                style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.22em' }}
              >
                ↑ collapse
              </button>
            </div>

            {/* ── Chat content — centered ── */}
            <div className="flex flex-1 min-h-0 max-w-2xl mx-auto w-full">
              <div className="flex flex-col flex-1 min-h-0">
                {/* Messages */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2"
                  style={{ minHeight: 0, scrollbarWidth: 'none' }}
                >
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'user' ? (
                          <div
                            className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                            style={{
                              background: 'rgba(0,0,0,0.28)',
                              border: '1px solid rgba(0,0,0,0.40)',
                              color: 'rgba(255,255,255,0.92)',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            {msg.content}
                          </div>
                        ) : (
                          <div
                            className="max-w-[90%] text-sm leading-relaxed"
                            style={{ color: 'rgba(255,255,255,0.90)' }}
                          >
                            {msg.isNew && !seenMsgIdsRef.current.has(msg.id) ? (
                              <TypingMessage
                                text={msg.content}
                                scrollRef={scrollRef}
                                onComplete={() => { seenMsgIdsRef.current.add(msg.id); markDone(msg.id) }}
                              />
                            ) : renderText(msg.content)}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                        <ThinkingProcess />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input */}
                <div className="mt-5 shrink-0 flex items-center gap-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.28)', paddingBottom: 10 }}>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value.slice(0, userMsgCount === 0 ? 3000 : 750))}
                    onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
                    placeholder="Ask me anything about Jayden…"
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: 'rgba(255,255,255,0.88)', caretColor: '#fff', fontSize: 14 }}
                    data-cursor="hover"
                    autoFocus
                  />
                  <button
                    data-cursor="hover"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="shrink-0 flex items-center justify-center rounded-full transition-opacity disabled:opacity-30"
                    style={{ width: 36, height: 36, background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(0,0,0,0.40)' }}
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
