import { motion, useReducedMotion } from 'framer-motion'
import { Ban, HeartPulse, Leaf, Sparkles, Sprout, TrendingUp } from 'lucide-react'
import Reveal from '../components/ui/Reveal.jsx'
import { LeafDivider, LeafShape } from '../components/art/Ornaments.jsx'
import { FoliageFrame, LeafParticles, CardLineArt } from '../components/art/BotanicalFrame.jsx'
import { site } from '../data/site.js'

/*
 * Real botanical still-life photography, one per ritual, matching the subject
 * in the copy: a bowl of ground herbs, the amber oil bottle, the green paste
 * with the stone mortar behind it and the bowl of dried roots.
 */
import ritualStillLife from '../assets/ritual-still-life.jpg'
import oilStillLife from '../assets/products/oil-card.jpg'
import packStillLife from '../assets/products/pack-card.jpg'
import rootStillLife from '../assets/products/see-card.jpg'

const highlights = [
  {
    en: 'Gentle natural cleanse',
    ta: 'இயற்கையான சுத்தம்',
    text: 'Clears the scalp and hair without stripping natural oils.',
    Icon: Leaf,
    image: ritualStillLife,
    tone: '#7d9a63',
  },
  {
    en: 'Softness & shine',
    ta: 'மென்மை & பளபளப்பு',
    text: 'Hair feels softer, looks fuller and catches the light.',
    Icon: Sparkles,
    image: oilStillLife,
    tone: '#c79a3b',
  },
  {
    en: 'Encourages growth',
    ta: 'முடி வளர்ச்சி',
    text: 'Feeds the roots so new hair comes in stronger.',
    Icon: TrendingUp,
    image: packStillLife,
    tone: '#5f8f5a',
  },
  {
    en: 'Root nourishment',
    ta: 'வேர்களுக்கு ஊட்டம்',
    text: 'Deep nourishment that calms an itchy, tired scalp.',
    Icon: Sprout,
    image: rootStillLife,
    tone: '#a9713c',
  },
]

/* The trust strip, split out of the old pipe-separated line. */
const strip = [
  { ta: '100% இயற்கை', Icon: Leaf },
  { ta: 'ரசாயனங்கள் இல்லை', Icon: Ban },
  { ta: 'ஆரோக்கியம்', Icon: HeartPulse },
  { ta: 'ஆரோக்கியமான, அழகான கூந்தலை மீண்டும் கண்டறியுங்கள்', Icon: Sparkles },
]

/**
 * The header lines fade up a short 20px - lighter than the site-wide Reveal
 * (46px) so the display heading keeps the strongest place in the hierarchy.
 */
function Lift({ children, className = '', delay = 0, duration = 0.6 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Bilingual (Tamil + English) hair-care band - matches the Tamil product posters. */
export default function TamilBand() {
  const reduce = useReducedMotion()

  return (
    <section className="tamil-band" id="hair-care">
      {/* background: sage glows, the layered foliage frame and loose leaves */}
      <div className="tamil-band__bg" aria-hidden="true">
        <span className="tamil-band__glow" />
        <span className="tamil-band__glow tamil-band__glow--sage" />
      </div>
      <FoliageFrame />
      <LeafParticles />

      <div className="container">
        <header className="tamil-band__head">
          <Lift className="tamil-band__eyebrow-row" delay={0.02}>
            <span className="tamil-band__rule" aria-hidden="true" />
            <LeafShape size={13} tone="#c79a3b" className="tamil-band__eyebrow-leaf" />
            <p className="tamil-band__brand tamil">{site.tamilName}</p>
            <LeafShape size={13} tone="#c79a3b" className="tamil-band__eyebrow-leaf" />
            <span className="tamil-band__rule" aria-hidden="true" />
          </Lift>

          <Lift className="tamil-band__headline" delay={0.08}>
            <h2 className="tamil-band__title tamil">{site.tamilTagline}</h2>
          </Lift>

          <Lift delay={0.14} duration={0.7}>
            <LeafDivider width={190} />
          </Lift>

          <Lift className="tamil-band__lede-row" delay={0.2}>
            <p className="tamil-band__sub">
              A healthy, beautiful head of hair is not a luxury &mdash; it is what nature already
              planned for you.
            </p>
          </Lift>
        </header>

        <div className="tamil-band__grid">
          {highlights.map((item, i) => (
            <motion.article
              key={item.en}
              className="tamil-card"
              style={{ '--tone': item.tone }}
              initial={reduce ? undefined : { opacity: 0, y: 44 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              <CardLineArt className="tamil-card__lineart" flip={i % 2 === 1} />
              <span className="tamil-card__sheen" aria-hidden="true" />

              {/* the round botanical badge hangs over the top edge of the card */}
              <motion.span
                className="tamil-card__badge"
                initial={reduce ? undefined : { opacity: 0, scale: 0.85 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.22 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                <item.Icon size={27} strokeWidth={1.5} />
              </motion.span>

              <div className="tamil-card__figure">
                <motion.img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  initial={reduce ? undefined : { scale: 0.96 }}
                  whileInView={reduce ? undefined : { scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.18 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="tamil-card__figure-veil" aria-hidden="true" />
              </div>

              <div className="tamil-card__body">
                <h3 className="tamil">{item.ta}</h3>
                <strong>{item.en}</strong>
                <p>{item.text}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal className="tamil-band__strip-wrap" delay={0.12} amount={0.3}>
          <div className="tamil-band__strip">
            {strip.map(({ ta, Icon }, i) => (
              <span key={ta} className="tamil-band__point">
                {i > 0 && <span className="tamil-band__sep" aria-hidden="true" />}
                <span className="tamil-band__point-icon" aria-hidden="true">
                  <Icon size={15} strokeWidth={1.8} />
                </span>
                <span className="tamil-band__point-text tamil">{ta}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
