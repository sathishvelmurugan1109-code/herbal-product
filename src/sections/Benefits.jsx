import { motion, useReducedMotion } from 'framer-motion'
import { Ban, HeartHandshake, House, Leaf, Sparkles, Truck } from 'lucide-react'
import { benefits } from '../data/content.js'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { whatsappLink } from '../lib/links.js'
import { Branch } from '../components/art/Ornaments.jsx'
import { CornerSprig } from '../components/art/CollectionDecor.jsx'
import { NaturalGoodnessSeal } from '../components/art/StoryArt.jsx'

import herbCurryLeaves from '../assets/herbs/curry-leaves.jpg'
import herbKasthuriManjal from '../assets/herbs/kasthuri-manjal.jpg'
import herbVetiver from '../assets/herbs/vetiver.jpg'
import herbRose from '../assets/herbs/rose.jpg'
import herbHibiscus from '../assets/herbs/hibiscus.jpg'
import herbSeekakai from '../assets/herbs/seekakai.jpg'

/* content.js still names the house glyph 'Home' - map it onto lucide's House */
const ICONS = { Leaf, Home: House, House, Ban, Sparkles, HeartHandshake, Truck }

/*
 * One botanical photograph per promise: the same herbs the Ingredients band
 * introduces, in content order, so the two sections read as one garden.
 */
const VISUALS = [
  { image: herbCurryLeaves, alt: 'Fresh curry leaves' },
  { image: herbKasthuriManjal, alt: 'Kasthuri manjal root' },
  { image: herbVetiver, alt: 'Vetiver roots' },
  { image: herbRose, alt: 'Fresh rose' },
  { image: herbHibiscus, alt: 'Hibiscus flower' },
  { image: herbSeekakai, alt: 'Seekakai pods' },
]

const ORDER_MESSAGE =
  'Hello Keerthika Sai! 🙏 I would like to place an order for your herbal products.'

export default function Benefits() {
  const reduce = useReducedMotion()

  const cardNodes = benefits.map((item, i) => {
    const Icon = ICONS[item.icon] || Leaf
    const visual = VISUALS[i]
    const isOrder = item.icon === 'Truck'
    const CardTag = isOrder ? motion.a : motion.article
    const linkProps = isOrder
      ? { href: whatsappLink(ORDER_MESSAGE), target: '_blank', rel: 'noreferrer' }
      : {}

    return (
      <Reveal key={item.title} delay={i * 0.08} direction="up" duration={0.8}>
        <CardTag
          className={`why-card${isOrder ? ' why-card--link' : ''}`}
          whileHover={reduce ? undefined : { y: -10 }}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          {...linkProps}
        >
          <span className="why-card__index" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>

          <span className="why-card__media">
            <img src={visual.image} alt="" aria-hidden="true" loading="lazy" />
            <span className="why-card__ring" aria-hidden="true" />
            <span className="why-card__icon">
              <Icon size={17} strokeWidth={1.8} />
              <motion.span
                className="why-card__pulse"
                animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.35 }}
                aria-hidden="true"
              />
            </span>
          </span>

          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <em className="tamil">{item.tamil}</em>

          {isOrder && (
            <span className="why-card__wa" aria-hidden="true">
              <WhatsAppIcon size={15} />
            </span>
          )}
        </CardTag>
      </Reveal>
    )
  })

  return (
    <section className="why section" id="why">
      <div className="why__bg" aria-hidden="true">
        <span className="blob blob--4" />
        <span className="blob blob--5" />
        <span className="why__grain" />
      </div>
      <Branch className="ornament ornament--left" width={280} tone="#7c9885" />
      <Branch className="ornament ornament--right" width={260} flip tone="#7c9885" />

      <div className="container">
        <div className="why__head">
          <CornerSprig
            className="why__head-sprig why__head-sprig--left"
            width={210}
            tone="#c8a24a"
          />
          <CornerSprig
            className="why__head-sprig why__head-sprig--right"
            width={210}
            flip
            tone="#c8a24a"
          />
          <SectionHeading
            light
            eyebrow="Why Keerthika Sai"
            title="Because your skin deserves"
            highlight="honesty"
            tamil="100% இயற்கை · ரசாயனங்கள் இல்லை"
            text="Six reasons families keep coming back to our little herbal kitchen."
          />
        </div>

        <div className="why__grid">
          {cardNodes.slice(0, 3)}

          {/* the botanical seal that rests between the two rows of promises */}
          <div className="why__seal-cell">
            <span className="why__seal-line" aria-hidden="true" />
            <Reveal className="why__seal-wrap" direction="zoom" duration={0.9}>
              <span className="why__seal">
                <NaturalGoodnessSeal className="why__seal-mark" size={132} />
                <span className="why__seal-ring" aria-hidden="true" />
              </span>
            </Reveal>
            <span className="why__seal-line why__seal-line--end" aria-hidden="true" />
          </div>

          {cardNodes.slice(3)}
        </div>
      </div>
    </section>
  )
}
