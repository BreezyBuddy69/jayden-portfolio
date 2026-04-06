import { motion } from 'framer-motion'
import { Play, ExternalLink } from 'lucide-react'

function YoutubeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

// Add your YouTube video IDs here to feature specific videos
// Leave empty to show the channel showcase only
const FEATURED_VIDEOS: Array<{ id: string; title: string }> = [
  // { id: 'dQw4w9WgXcQ', title: 'Best Edit' },
]

const CHANNEL_URL = 'https://www.youtube.com/@subspeedy'

interface ReelSectionProps {
  isActive: boolean
}

function VideoCard({ id, title, index }: { id: string; title: string; index: number }) {
  const thumb = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-xl overflow-hidden aspect-video block"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <img src={thumb} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(245,158,11,0.85)', backdropFilter: 'blur(8px)' }}>
          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
        <p className="text-white/80 text-xs truncate">{title}</p>
      </div>
    </motion.a>
  )
}

export function ReelSection({ isActive }: ReelSectionProps) {
  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}>
      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url(/gallery/noise.png)', backgroundSize: '200px' }} />

      {/* Top-right ambient */}
      <div aria-hidden className="absolute top-0 right-0 w-[45vw] h-[45vh] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(245,158,11,0.05) 0%, transparent 65%)' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -12 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="block text-[10px] tracking-[0.32em] uppercase mb-4"
          style={{ color: 'rgba(245,158,11,0.55)' }}
        >
          Featured Work
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 24 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.6rem, 6vw, 5rem)',
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            margin: 0,
            marginBottom: '12px',
          }}
        >
          The Work Speaks.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ color: 'rgba(255,255,255,0.42)', fontSize: '15px', marginBottom: '40px', maxWidth: '480px', lineHeight: 1.65 }}
        >
          1,000,000+ views across 25 videos in 4 months. Aesthetic edits crafted on DaVinci Resolve,
          built to make people feel something.
        </motion.p>

        {FEATURED_VIDEOS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {FEATURED_VIDEOS.map((v, i) => (
              <VideoCard key={v.id} id={v.id} title={v.title} index={i} />
            ))}
          </div>
        ) : (
          /* Channel showcase card */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl overflow-hidden mb-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '40px 40px',
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* YouTube icon + channel info */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.20)' }}>
                  <YoutubeIcon className="w-8 h-8" style={{ color: 'rgba(245,158,11,0.85)' }} />
                </div>
                <div>
                  <p className="text-white/85 font-semibold text-lg mb-0.5">@subspeedy</p>
                  <p className="text-white/40 text-sm">YouTube Channel</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-8 md:ml-auto">
                {[
                  { n: '1M+', l: 'Total Views' },
                  { n: '25+', l: 'Videos' },
                  { n: '4mo', l: 'To Reach 1M' },
                ].map(({ n, l }) => (
                  <div key={l} className="text-center">
                    <p className="text-white/90 font-serif text-2xl font-bold">{n}</p>
                    <p className="text-white/38 text-[10px] tracking-[0.18em] uppercase">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="inline-flex items-center gap-2 text-sm font-medium group"
          style={{ color: 'rgba(245,158,11,0.75)', textDecoration: 'none' }}
        >
          <span className="group-hover:text-amber-400 transition-colors">Watch on YouTube</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </div>
    </section>
  )
}
