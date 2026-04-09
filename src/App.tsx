import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'

import { ChatProvider } from './contexts/ChatContext'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useSectionScroll } from './hooks/useSectionScroll'

import { Cursor } from './components/ui/Cursor'
import { SplashGate } from './components/ui/SplashGate'
import { SectionStack } from './components/layout/SectionStack'
import { Header } from './components/layout/Header'
import type { Language } from './components/layout/Header'
import { SideNav } from './components/layout/SideNav'
import { MobileNav } from './components/layout/MobileNav'
import { ChatBot } from './components/chat/ChatBot'

import { HeroSection } from './components/sections/HeroSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { AutomationsSection } from './components/sections/AutomationsSection'
import { EditingSection } from './components/sections/EditingSection'
import { ArsenalSection } from './components/sections/ArsenalSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'

// 0:Hero | 1:Skills | 2:Automations | 3:Editing | 4:Arsenal | 5:Testimonials | 6:About | 7:Contact
const TOTAL_SECTIONS = 8

const SECTION_MAP: Record<string, number> = {
  hero: 0,
  skills: 1,
  automations: 2,
  editing: 3,
  arsenal: 4,
  testimonials: 5,
  about: 6,
  contact: 7,
}

function getSplashSeen() {
  try { return sessionStorage.getItem('splash_seen') === '1' } catch { return false }
}
function setSplashSeen() {
  try { sessionStorage.setItem('splash_seen', '1') } catch { /* */ }
}

function detectLanguage(): Language {
  const lang = (navigator.language || (navigator.languages?.[0]) || 'en').toLowerCase()
  if (lang.startsWith('de')) return 'de'
  if (lang.startsWith('fr')) return 'fr'
  return 'en'
}

export default function App() {
  const [splashDone, setSplashDone] = useState(getSplashSeen)
  const [currentSection, setCurrentSection] = useState(0)
  const [chatForceOpen, setChatForceOpen] = useState(false)
  const [language, setLanguage] = useState<Language>(detectLanguage)
  const isMobile = useMediaQuery('(max-width: 767px)')

  const navigate = useCallback((i: number) => {
    setCurrentSection(Math.max(0, Math.min(TOTAL_SECTIONS - 1, i)))
  }, [])

  const handleSplashDone = useCallback(() => {
    setSplashDone(true)
    setSplashSeen()
  }, [])

  const handleOpenChat = useCallback(() => {
    setTimeout(() => setChatForceOpen(true), 300)
  }, [])

  useSectionScroll({
    totalSections: TOTAL_SECTIONS,
    currentSection,
    onNavigate: navigate,
    isMobile,
  })

  const sections = [
    <HeroSection
      key="hero"
      isActive={currentSection === 0}
      onScrollDown={() => navigate(1)}
      onOpenChat={handleOpenChat}
      language={language}
    />,
    <SkillsSection
      key="skills"
      isActive={currentSection === 1}
      onNavigate={navigate}
      language={language}
    />,
    <AutomationsSection
      key="automations"
      isActive={currentSection === 2}
      language={language}
    />,
    <EditingSection
      key="editing"
      isActive={currentSection === 3}
      language={language}
    />,
    <ArsenalSection
      key="arsenal"
      isActive={currentSection === 4}
      language={language}
    />,
    <TestimonialsSection
      key="testimonials"
      isActive={currentSection === 5}
      language={language}
    />,
    <AboutSection
      key="about"
      isActive={currentSection === 6}
      language={language}
    />,
    <ContactSection
      key="contact"
      isActive={currentSection === 7}
      language={language}
    />,
  ]

  return (
    <ChatProvider>
      <div className="relative w-screen h-screen overflow-hidden" style={{ background: '#080808' }}>
        <Cursor />

        <AnimatePresence>
          {!splashDone && <SplashGate key="splash" onDone={handleSplashDone} />}
        </AnimatePresence>

        {splashDone && (
          <>
            <Header
              onNavigate={navigate}
              currentSection={currentSection}
              sectionMap={SECTION_MAP}
              language={language}
              onLanguageChange={setLanguage}
            />
            <SideNav currentSection={currentSection} onNavigate={navigate} language={language} />
            <MobileNav currentSection={currentSection} onNavigate={navigate} language={language} />

            <SectionStack
              currentSection={currentSection}
              onSectionChange={navigate}
            >
              {sections}
            </SectionStack>

            <ChatBot
              forceOpen={chatForceOpen}
              onForceOpenConsumed={() => setChatForceOpen(false)}
              language={language}
            />
          </>
        )}
      </div>
    </ChatProvider>
  )
}
