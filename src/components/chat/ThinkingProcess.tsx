import { useEffect, useRef, useState } from 'react'
import { Brain, Zap, Search, Cpu, Sparkles } from 'lucide-react'

const ICONS = [Brain, Zap, Search, Cpu, Sparkles]

const LINES = [
  'Searching memory...',
  'Processing context...',
  'Formulating response...',
  'Thinking about Jayden...',
  'Connecting the dots...',
  'Analyzing the question...',
]

export function ThinkingProcess() {
  const [lineIdx, setLineIdx] = useState(() => Math.floor(Math.random() * LINES.length))
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing')
  const [iconIdx, setIconIdx] = useState(0)
  const cycleCountRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const Icon = ICONS[iconIdx % ICONS.length]

  useEffect(() => {
    const line = LINES[lineIdx]

    const tick = () => {
      if (phase === 'typing') {
        setDisplayed(prev => {
          const next = line.slice(0, prev.length + 1)
          if (next.length >= line.length) setPhase('pause')
          return next
        })
        timerRef.current = setTimeout(tick, 48)
      } else if (phase === 'pause') {
        timerRef.current = setTimeout(() => setPhase('deleting'), 2800)
      } else {
        setDisplayed(prev => {
          const next = prev.slice(0, prev.length - 1)
          if (next.length === 0) {
            cycleCountRef.current++
            if (cycleCountRef.current % 3 === 0) setIconIdx(i => i + 1)
            setTimeout(() => {
              setLineIdx(i => {
                let n = Math.floor(Math.random() * LINES.length)
                while (n === i) n = Math.floor(Math.random() * LINES.length)
                return n
              })
              setPhase('typing')
            }, 250)
          }
          return next
        })
        timerRef.current = setTimeout(tick, 28)
      }
    }

    timerRef.current = setTimeout(tick, 48)
    return () => clearTimeout(timerRef.current)
  }, [phase, lineIdx])

  return (
    <div className="flex items-center gap-2 py-1">
      <Icon className="w-3 h-3 text-white/35 shrink-0" />
      <span className="inline-flex items-center min-h-[1em]">
        <span className="text-white/38 text-xs italic">{displayed}</span>
        <span className="inline-block w-0.5 h-3 bg-amber-500/50 animate-pulse ml-[2px]" />
      </span>
    </div>
  )
}
