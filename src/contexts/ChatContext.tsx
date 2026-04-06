import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
  isNew?: boolean
}

interface ChatContextValue {
  messages: ChatMessage[]
  isLoading: boolean
  addMessage: (msg: Omit<ChatMessage, 'id'>) => void
  markDone: (id: number) => void
  setIsLoading: (v: boolean) => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

let nextId = 1

const GREETING: ChatMessage = {
  id: nextId++,
  role: 'assistant',
  content: "Hey — I'm Jayden's AI. Ask me anything about him, his work, or what he can build for you.",
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [isLoading, setIsLoading] = useState(false)

  const addMessage = useCallback((msg: Omit<ChatMessage, 'id'>) => {
    setMessages(prev => [...prev, { ...msg, id: nextId++ }])
  }, [])

  const markDone = useCallback((id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isNew: false } : m))
  }, [])

  return (
    <ChatContext.Provider value={{ messages, isLoading, addMessage, markDone, setIsLoading }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used inside ChatProvider')
  return ctx
}
