import { motion } from 'framer-motion'

/**
 * Aesthetic animated background for orange sections.
 * 70%+ orange (#8B5CF6), max 30% dark accent (#0D0B1A / #403d39).
 */
export function OrangeFlowBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Flowing dark blob 1 — upper left */}
      <motion.div
        animate={{ x: [0, 55, -30, 20, 0], y: [0, -40, 30, -15, 0], scale: [1, 1.08, 0.94, 1.04, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 520, height: 520,
          top: '-12%', left: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,36,34,0.38) 0%, rgba(37,36,34,0.16) 42%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Flowing dark blob 2 — bottom right */}
      <motion.div
        animate={{ x: [0, -50, 35, -10, 0], y: [0, 45, -55, 20, 0], scale: [1, 0.92, 1.1, 0.96, 1] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        style={{
          position: 'absolute',
          width: 480, height: 480,
          bottom: '-10%', right: '-8%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(64,61,57,0.32) 0%, rgba(37,36,34,0.14) 48%, transparent 72%)',
          filter: 'blur(90px)',
        }}
      />
      {/* Mid dark accent — center */}
      <motion.div
        animate={{ x: [0, 30, -40, 10, 0], y: [0, -30, 50, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
        style={{
          position: 'absolute',
          width: 320, height: 320,
          top: '28%', left: '42%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,36,34,0.22) 0%, transparent 65%)',
          filter: 'blur(65px)',
        }}
      />
      {/* Warm highlight orb — upper right */}
      <motion.div
        animate={{ x: [0, -25, 15, 0], y: [0, 35, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        style={{
          position: 'absolute',
          width: 280, height: 280,
          top: '5%', right: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.28) 0%, rgba(64,61,57,0.10) 55%, transparent 75%)',
          filter: 'blur(60px)',
          mixBlendMode: 'multiply',
        }}
      />
      {/* Bottom subtle warm pulse */}
      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position: 'absolute',
          width: 700, height: 260,
          bottom: '-8%', left: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(37,36,34,0.18) 0%, transparent 65%)',
          filter: 'blur(55px)',
        }}
      />
    </div>
  )
}
