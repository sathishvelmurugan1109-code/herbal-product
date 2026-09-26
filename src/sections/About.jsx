import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Leaf, Sun, Sprout, FlaskConical, MessageCircle } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Counter from '../components/ui/Counter.jsx'
import { stats } from '../data/content.js'
import { Branch, LeafShape } from '../components/art/Ornaments.jsx'
import { HerbStillLife, NaturalGoodnessSeal, LeafCheck, NoteArrow } from '../components/art/StoryArt.jsx'

const cards = [
  { icon: Leaf, title: 'Sourced pure', text: 'Locally grown herbs' },
  { icon: Sun, title: 'Sun dried', text: 'Never machine heated' },
  { icon: Sprout, title: 'Fresh batches', text: 'Ground to order' },
]

const promises = [
  'Herbs cleaned, sun-dried and stone ground at home',
  'No fillers, no artificial colour, no added fragrance',
  'Small batches so every pack is fresh',
  'Recipes that have been in the family for generations',
]

/** Line icons for the statistics bar, in the same order as `stats`. */
const statIcons = [Sprout, Leaf, FlaskConical, MessageCircle]

/** Leaves that float around the arched frame. */
const leaves = [
  { left: '-4%', top: '34%', size: 30, tone: '#7c9885', rot: -14, dx: 8, dy: -16, duration: 13 },
  { left: '93%', top: '21%', size: 24, tone: '#4d7a4a', rot: 24, dx: -7, dy: -14, duration: 15 },
  { left: '89%', top: '70%', size: 20, tone: '#8fb98a', rot: 8, dx: 6, dy: -12, duration: 11 },
  { left: '1%', top: '79%', size: 26, tone: '#3f6b41', rot: -30, dx: -6, dy: -14, duration: 14 },
]

/**
 * Our Story - a premium editorial two column block (arched herbal
 * still-life on the left, story copy and proof points on the right) with the
 * statistics bar underneath. Section id stays `about` for the navigation.
 */
export default function About() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yArt = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 34, reduce ? 0 : -34])

  return (
    <section className="about section" id="about" ref={ref}>
      <Branch className="ornament ornament--right" width={320} flip tone="#8fb98a" />
      <Branch className="ornament ornament--left" width={260} tone="#7c9885" />

      <div className="container story__grid">
        <Reveal className="story__visual" direction="zoom" duration={1.1} amount={0.15}>
          <motion.div className="story__photo" style={{ y: yArt }}>
            <span className="story__photo-halo" aria-hidden="true" />

            <div className="story__arch">
              <HerbStillLife className="story__art" />
              <span className="story__arch-light" aria-hidden="true" />
              <span className="story__arch-gloss" aria-hidden="true" />
            </div>

            {leaves.map((leaf, i) => (
              <span
                key={i}
                className="story__leaf"
                aria-hidden="true"
                style={{
                  left: leaf.left,
                  top: leaf.top,
                  animationDuration: `${leaf.duration}s`,
                  animationDelay: `${i * -2.6}s`,
                  '--rot': `${leaf.rot}deg`,
                  '--dx': `${leaf.dx}px`,
                  '--dy': `${leaf.dy}px`,
                }}
              >
                <LeafShape size={leaf.size} tone={leaf.tone} />
              </span>
            ))}

            <NaturalGoodnessSeal className="story__seal" />

            <div className="story__note" aria-hidden="true">
              <p className="story__note-text">
                Pure Herbs
                <span className="story__note-leaf">
                  <LeafShape size={15} tone="#8fb98a" />
                </span>
                <br />
                for Healthy
                <br />
                You
              </p>
              <NoteArrow className="story__note-arrow" />
            </div>
          </motion.div>
        </Reveal>

        <div className="story__copy">
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="Embrace the nature,"
            highlight="naturally"
            tamil="இயற்கையை அரவணைப்போம்"
          />

          <Reveal delay={0.08}>
            <p className="story__text">
              Keerthika Sai Herbal Products started in a home kitchen with a stone grinder and a
              stubborn belief: the best skin and hair care does not come out of a factory. It comes
              from kasthuri manjal, avaram poo, rose, vetiver, amla, curry leaves and hibiscus
              &mdash; dried, ground and packed the way our grandmothers did it.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="story__text">
              That is why our bath podi, hair oil, seekakai podi and hair packs have no chemicals
              and no preservatives. Just herbs, patience and a lot of love. Suitable for all ages,
              and safe for kids too.
            </p>
          </Reveal>

          <ul className="story__cards">
            {cards.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} className="story-card" delay={0.06 * i} amount={0.15}>
                <span className="story-card__icon" aria-hidden="true">
                  <Icon size={19} strokeWidth={1.6} />
                </span>
                <span className="story-card__body">
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              </Reveal>
            ))}
          </ul>

          <ul className="story__list">
            {promises.map((promise, i) => (
              <Reveal as="li" key={promise} className="story__list-item" delay={0.05 * i} amount={0.2}>
                <LeafCheck className="story__check" />
                <span>{promise}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="story-stats">
          <span className="story-stats__pattern" aria-hidden="true" />
          <ul className="story-stats__grid">
            {stats.map((stat, i) => {
              const Icon = statIcons[i % statIcons.length]
              return (
                <Reveal as="li" key={stat.label} className="story-stat" delay={0.08 * i} amount={0.3}>
                  <span
                    className={`story-stat__icon${stat.value === 0 ? ' story-stat__icon--none' : ''}`}
                    aria-hidden="true"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <span className="story-stat__body">
                    <span className="story-stat__value">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="story-stat__label">{stat.label}</span>
                  </span>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}