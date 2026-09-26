import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/ui/Reveal.jsx'
import { LeafDivider, LeafShape } from '../components/art/Ornaments.jsx'
import { site } from '../data/site.js'

const highlights = [
  { en: 'Gentle natural cleanse', ta: 'இயற்கையான சுத்தம்', text: 'Clears the scalp and hair without stripping natural oils.' },
  { en: 'Softness & shine', ta: 'மென்மை & பளபளப்பு', text: 'Hair feels softer, looks fuller and catches the light.' },
  { en: 'Encourages growth', ta: 'முடி வளர்ச்சி', text: 'Feeds the roots so new hair comes in stronger.' },
  { en: 'Root nourishment', ta: 'வேர்களுக்கு ஊட்டம்', text: 'Deep nourishment that calms an itchy, tired scalp.' },
]

/** Bilingual (Tamil + English) band - matches the Tamil product posters. */
export default function TamilBand() {
  const reduce = useReducedMotion()

  return (
    <section className="tamil-band">
      <div className="tamil-band__bg" aria-hidden="true">
        <motion.span
          className="tamil-band__glow"
          animate={reduce ? undefined : { opacity: [0.4, 0.75, 0.4], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container">
        <Reveal direction="down">
          <p className="tamil-band__brand tamil">{site.tamilName}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="tamil-band__title tamil">{site.tamilTagline}</h2>
        </Reveal>
        <Reveal delay={0.14} direction="zoom">
          <LeafDivider width={190} />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="tamil-band__sub">
            A healthy, beautiful head of hair is not a luxury &mdash; it is what nature already
            planned for you.
          </p>
        </Reveal>

        <div className="tamil-band__grid">
          {highlights.map((item, i) => (
            <Reveal key={item.en} delay={0.1 + i * 0.08} direction="up">
              <article className="tamil-card">
                <LeafShape size={20} tone="#b9d3a5" />
                <h3>{item.ta}</h3>
                <strong>{item.en}</strong>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <p className="tamil-band__note tamil">
            100% இயற்கை &nbsp;|&nbsp; ரசாயனங்கள் இல்லை &nbsp;|&nbsp; ஆர்கானிக் &nbsp;|&nbsp; ஆரோக்கியமான,
            அழகான கூந்தலை மீண்டும் கண்டறியுங்கள்
          </p>
        </Reveal>
      </div>
    </section>
  )
}
