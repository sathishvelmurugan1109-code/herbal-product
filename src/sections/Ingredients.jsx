import { motion, useReducedMotion } from 'framer-motion'
import { ingredients } from '../data/content.js'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'

/* Simple herb glyphs so each ingredient has its own little drawing. */
function HerbGlyph({ shape, tone }) {
  if (shape === 'flower') {
    return (
      <svg viewBox="0 0 64 64" width="52" height="52" aria-hidden="true">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse key={deg} cx="32" cy="18" rx="10" ry="15" fill={tone} opacity="0.85" transform={`rotate(${deg} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="8" fill="#e9c96a" />
      </svg>
    )
  }
  if (shape === 'fruit') {
    return (
      <svg viewBox="0 0 64 64" width="52" height="52" aria-hidden="true">
        <circle cx="32" cy="36" r="20" fill={tone} />
        <circle cx="26" cy="30" r="7" fill="#ffffff" opacity="0.35" />
        <path d="M32 16c6-6 12-6 16-3-4 6-10 8-16 3Z" fill="#4d7a4a" />
      </svg>
    )
  }
  if (shape === 'grass') {
    return (
      <svg viewBox="0 0 64 64" width="52" height="52" aria-hidden="true">
        {[-24, -8, 8, 24].map((rotate) => (
          <path
            key={rotate}
            d="M32 58C28 38 30 22 34 6c2 18 3 34 0 52Z"
            fill={tone}
            opacity="0.85"
            transform={`rotate(${rotate} 32 58)`}
          />
        ))}
      </svg>
    )
  }
  if (shape === 'root') {
    return (
      <svg viewBox="0 0 64 64" width="52" height="52" aria-hidden="true">
        <path d="M22 10c8 4 10 16 8 28-1 8-6 14-12 16 2-16 4-30 4-44Z" fill={tone} />
        <path d="M40 8c8 6 8 20 4 32-2 6-6 10-10 12 4-16 5-30 6-44Z" fill={tone} opacity="0.75" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 64" width="52" height="52" aria-hidden="true">
      <path d="M56 6C34 8 16 20 12 40c-1 4 2 8 7 8 20 0 36-16 37-42Z" fill={tone} />
      <path d="M52 12C40 24 30 36 20 50" stroke="#fdfdf7" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

export default function Ingredients() {
  const reduce = useReducedMotion()
  const row = [...ingredients, ...ingredients]

  return (
    <section className="ingredients section" id="ingredients">
      <div className="container">
        <SectionHeading
          eyebrow="Inside Every Jar"
          title="Herbs you can"
          highlight="actually name"
          tamil="கஸ்தூரி மஞ்சள் · ஆவாரம் பூ · ரோஜா · வெட்டிவேர் · நெல்லி · கருவேப்பிலை · செம்பருத்தி · சீயக்காய்"
          text="Nothing hidden behind 'fragrance'. These are the botanicals that go into our products."
        />
      </div>

      <Reveal direction="zoom" duration={1}>
        <div className="herb-marquee">
          <motion.div
            className="herb-marquee__row"
            animate={reduce ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
          >
            {row.map((herb, i) => (
              <div className="herb-card" key={`${herb.name}-${i}`} style={{ '--tone': herb.tone }}>
                <span className="herb-card__ring" aria-hidden="true" />
                <span className="herb-card__glyph">
                  {herb.image ? (
                    /* real photo of the herb when we have one, hand-drawn glyph otherwise */
                    <img src={herb.image} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <HerbGlyph shape={herb.shape} tone={herb.tone} />
                  )}
                </span>
                <strong>{herb.name}</strong>
                <em className="tamil">{herb.tamil}</em>
                <small>{herb.note}</small>
              </div>
            ))}
          </motion.div>
        </div>
      </Reveal>

      <div className="container">
        <Reveal delay={0.15}>
          <p className="ingredients__foot">
            100% natural &nbsp;•&nbsp; chemical free &nbsp;•&nbsp; organic &nbsp;•&nbsp; no preservatives added
          </p>
        </Reveal>
      </div>
    </section>
  )
}
