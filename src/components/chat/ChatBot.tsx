import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle } from 'lucide-react'
import { ThinkingProcess } from './ThinkingProcess'
import { TypingMessage } from './TypingMessage'
import { useChatContext } from '../../contexts/ChatContext'
import { type Language } from '../../i18n/translations'

const PLACEHOLDERS: Record<Language, string> = {
  en: 'Ask me anything about Jayden…',
  de: 'Stell mir eine Frage über Jayden…',
  fr: 'Pose-moi une question sur Jayden…',
}

const CHATBOT_URL = 'https://n8n.halovisionai.cloud/webhook/jayden-portfolio-chat'
const DAILY_LIMIT = 30
const COOLDOWN_MS = 2500

function getDailyCount(): number {
  try {
    const today = new Date().toDateString()
    if (localStorage.getItem('chat_day') !== today) {
      localStorage.setItem('chat_day', today)
      localStorage.setItem('chat_n', '0')
      return 0
    }
    return parseInt(localStorage.getItem('chat_n') ?? '0', 10)
  } catch { return 0 }
}

function bumpDailyCount() {
  try { localStorage.setItem('chat_n', String(getDailyCount() + 1)) } catch { /**/ }
}

function renderText(content: string) {
  const parts = content.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: 'rgba(255,255,255,0.97)', fontWeight: 650 }}>{part.slice(2, -2)}</strong>
    }
    return part.split('\n').flatMap((line, j, arr) => j < arr.length - 1 ? [line, <br key={`${i}-${j}`} />] : [line])
  })
}

interface ChatBotProps {
  forceOpen?: boolean
  onForceOpenConsumed?: () => void
  language?: Language
}

export function ChatBot({ forceOpen, onForceOpenConsumed, language = 'en' }: ChatBotProps) {
  const { messages, isLoading, addMessage, markDone, setIsLoading } = useChatContext()

  const [isOpen, setIsOpen] = useState(false)
  const [animateOpen, setAnimateOpen] = useState(false)
  const [input, setInput] = useState('')
  const [userMsgCount, setUserMsgCount] = useState(0)
  const [buttonBrightness, setButtonBrightness] = useState(0)

  const scrollRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const rafRef = useRef<number>(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const seenMsgIdsRef = useRef<Set<number>>(new Set())
  const lastSentRef = useRef<number>(0)

  const openChat = useCallback(() => {
    seenMsgIdsRef.current = new Set(messages.map(m => m.id))
    messages.forEach(m => { if (m.isNew) markDone(m.id) })
    setIsOpen(true)
    setTimeout(() => setAnimateOpen(true), 10)
    setTimeout(() => inputRef.current?.focus(), 350)
  }, [messages, markDone])

  // Open when parent triggers forceOpen
  useEffect(() => {
    if (forceOpen && !isOpen) {
      openChat()
      onForceOpenConsumed?.()
    }
  }, [forceOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const closeChat = useCallback(() => {
    setAnimateOpen(false)
    setTimeout(() => setIsOpen(false), 300)
  }, [])

  // Scroll on new messages
  useEffect(() => {
    const el = scrollRef.current
    if (!el || !isOpen) return
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight })
  }, [messages, isLoading, isOpen])

  // Attention pulse
  useEffect(() => {
    const startPulse = () => {
      if (isOpen) return
      let start: number | null = null
      const raf = (ts: number) => {
        if (!start) start = ts
        const t = (ts - start) / 2000
        const brightness = t < 0.5 ? t * 2 : (1 - t) * 2
        setButtonBrightness(brightness)
        if (t < 1) rafRef.current = requestAnimationFrame(raf)
        else setButtonBrightness(0)
      }
      rafRef.current = requestAnimationFrame(raf)
    }
    const t1 = setTimeout(startPulse, 30000)
    const t2 = setTimeout(startPulse, 200000)
    timersRef.current = [t1, t2]
    return () => {
      timersRef.current.forEach(clearTimeout)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isOpen])

  // Click outside
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(e.target as Node)) closeChat()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, closeChat])

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return
    const now = Date.now()
    if (now - lastSentRef.current < COOLDOWN_MS) return
    if (getDailyCount() >= DAILY_LIMIT) {
      addMessage({ role: 'assistant', content: "You've reached today's message limit. Come back tomorrow!" })
      return
    }
    lastSentRef.current = now
    bumpDailyCount()
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const maxLen = userMsgCount === 0 ? 3000 : 750
    const val = e.target.value.slice(0, maxLen)
    setInput(val)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px'
  }

  const submitInput = () => {
    if (input.trim() && userMsgCount < 20) {
      handleSendMessage(input)
      setInput('')
      if (inputRef.current) inputRef.current.style.height = 'auto'
    }
  }

  const CLOSED_W = 56
  const CLOSED_H = 56
  const OPEN_W = 380
  const OPEN_H = Math.min(Math.round(window.innerHeight * 0.60), 520)

  return (
    <div ref={chatRef} className="fixed z-[100]"
      style={{ bottom: '1.5rem', right: '1.5rem', width: 0, height: 0 }}>
      <motion.div
        data-cursor="hover"
        onClick={!isOpen ? openChat : undefined}
        animate={{
          width: isOpen ? OPEN_W : CLOSED_W,
          height: isOpen ? OPEN_H : CLOSED_H,
          borderRadius: isOpen ? 20 : 9999,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 right-0 overflow-hidden flex flex-col"
        style={{
          background: isOpen
            ? 'linear-gradient(160deg, rgba(20,12,4,0.97) 0%, rgba(12,7,2,0.98) 55%, rgba(6,4,1,0.99) 100%)'
            : `linear-gradient(148deg, rgba(255,255,255,${0.30 + buttonBrightness * 0.14}) 0%, rgba(251,191,36,${0.22 + buttonBrightness * 0.16}) 45%, rgba(139, 92, 246,${0.16 + buttonBrightness * 0.12}) 100%)`,
          border: isOpen
            ? '1px solid rgba(139, 92, 246,0.18)'
            : `1px solid rgba(255,255,255,${0.40 + buttonBrightness * 0.18})`,
          boxShadow: isOpen
            ? '0 32px 72px rgba(0,0,0,0.75), 0 8px 28px rgba(0,0,0,0.45), inset 0 1.5px 0 rgba(255,255,255,0.12)'
            : `0 8px ${36 + buttonBrightness * 28}px rgba(139, 92, 246,${0.45 + buttonBrightness * 0.35}), inset 0 1.5px 0 rgba(255,255,255,${0.65 + buttonBrightness * 0.18})`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          cursor: isOpen ? 'default' : 'pointer',
        }}
      >
        {/* Liquid glass highlight — when closed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.76), rgba(255,255,255,0.06))' }}
            />
          )}
        </AnimatePresence>

        {/* Button icon */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <MessageCircle className="w-5 h-5 text-white/90 drop-shadow-sm" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat panel */}
        <AnimatePresence>
          {isOpen && animateOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="flex flex-col h-full w-full"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246,0.7) 30%, rgba(251,191,36,0.9) 50%, rgba(139, 92, 246,0.7) 70%, transparent 100%)' }} />

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 shrink-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <div className="w-2 h-2 rounded-full bg-violet-400 relative z-10" />
                    <div className="absolute w-4 h-4 rounded-full bg-violet-400/20 animate-ping" />
                  </div>
                  <span className="text-xs font-semibold text-white/90 tracking-wide">Jayden's AI</span>
                </div>
                <button data-cursor="hover" onClick={closeChat}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white/85 hover:text-white/90 hover:bg-white/08 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 chat-scroll flex flex-col gap-3" style={{ minHeight: 0 }}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className="max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-relaxed"
                      style={msg.role === 'user' ? {
                        background: 'linear-gradient(135deg, rgba(139, 92, 246,0.22) 0%, rgba(217,119,6,0.18) 100%)',
                        border: '1px solid rgba(139, 92, 246,0.30)',
                        color: 'rgba(255,255,255,0.93)',
                      } : {
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderLeft: '2px solid rgba(139, 92, 246,0.45)',
                        color: 'rgba(255,255,255,0.95)',
                        textShadow: '0 1px 8px rgba(0,0,0,0.55)',
                      }}
                    >
                      {msg.role === 'assistant' && msg.isNew && !seenMsgIdsRef.current.has(msg.id) ? (
                        <TypingMessage
                          text={msg.content}
                          scrollRef={scrollRef}
                          onComplete={() => markDone(msg.id)}
                        />
                      ) : (
                        renderText(msg.content)
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-xl px-3 py-2.5"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: '2px solid rgba(139, 92, 246,0.45)' }}>
                      <ThinkingProcess />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="px-3 py-3 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-end gap-2 rounded-xl px-3 py-2"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitInput() }
                    }}
                    placeholder={PLACEHOLDERS[language]}
                    rows={1}
                    className="flex-1 bg-transparent text-white/88 text-xs placeholder-white/28 outline-none resize-none leading-relaxed"
                    style={{ maxHeight: 80 }}
                    data-cursor="hover"
                  />
                  <button
                    data-cursor="hover"
                    onClick={submitInput}
                    disabled={!input.trim() || isLoading || userMsgCount >= 20}
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mb-0.5 transition-all disabled:opacity-25"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246,0.85) 0%, rgba(217,119,6,0.95) 100%)',
                      boxShadow: '0 2px 12px rgba(139, 92, 246,0.40)',
                    }}
                  >
                    <Send className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
