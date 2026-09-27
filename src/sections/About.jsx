import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Leaf, Sun, Sprout } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Counter from '../components/ui/Counter.jsx'
import { stats } from '../data/content.js'
import { Branch, LeafShape } from '../components/art/Ornaments.jsx'
import {
  HerbStillLife,
  NaturalGoodnessSeal,
  LeafCheck,
  StatSprout,
  StatLeaf,
  StatMortar,
  StatMessage,
} from '../components/art/StoryArt.jsx'

/** The three proofs, each with its own botanical glyph. */
const cardIcons = [Leaf, Sun, Sprout]

const cards = [
  { title: 'Sourced pure', text: 'Locally grown herbs' },
  { title: 'Sun dried', text: 'Never machine heated' },
  { title: 'Fresh batches', text: 'Ground to order' },
]

const promises = [
  'Herbs cleaned, sun-dried and stone ground at home',
  'No fillers, no artificial colour, no added fragrance',
  'Small batches so every pack is fresh',
  'Recipes that have been in the family for generations',
]

/** Stat glyphs, in the same order as `stats` in src/data/content.js. */
const statIcons = [StatSprout, StatLeaf, StatMortar, StatMessage]

/** Leaves that drift around the arched frame. */
const leaves = [
  { left: '-2%', top: '20%', size: 30, tone: '#7c9885', rot: -16, dx: 9, dy: -16, duration: 15 },
  { left: '92%', top: '26%', size: 25, tone: '#4d7a4a', rot: 26, dx: -8, dy: -13, duration: 17 },
  { left: '86%', top: '58%', size: 21, tone: '#8fb98a', rot: 10, dx: 7, dy: -12, duration: 13 },
  { left: '3%', top: '63%', size: 26, tone: '#3f6b41', rot: -32, dx: -7, dy: -14, duration: 16 },
  { left: '78%', top: '7%', size: 18, tone: '#a8c79b', rot: 18, dx: 6, dy: -10, duration: 19 },
]

/**
 * Our Story - a premium editorial two column block: the arched herbal
 * still-life on the left, the story and its proof points on the right,
 * with the statistics bar locked underneath as one composition.
 * The section id stays `about` so the navigation is untouched.
 */
export default function About() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // gentle parallax for the frame, a slow scale for the picture inside it
  const yArt = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 28, reduce ? 0 : -28])
  const zoomArt = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.06, 1])

  // The still-life is revealed with the same `Reveal` wrapper the rest of the
  // section uses. An earlier version drove a `clipPath` wipe with a bare
  // `whileInView` object: framer-motion left it stuck on
  // `inset(0% 0% 100% 0%)`, so the artwork never painted at all. The hero
  // image must never depend on an animation actually running to be visible,
  // so the reveal is a plain opacity/rise that resolves reliably.

  return (
    <section className="about section" id="about" ref={ref}>
      <span className="about__wash" aria-hidden="true" />
      <span className="about__grain" aria-hidden="true" />
      <Branch className="ornament ornament--left" width={300} tone="#7c9885" />
      <Branch className="ornament ornament--right" width={280} flip tone="#8fb98a" />

      <div className="container about__inner">
        {/* ===================== the two column composition ===================== */}
        <div className="story__grid">
          {/* ------------------ left: the arched herbal still life --------------- */}
          <Reveal className="story__visual" direction="up" duration={1} amount={0.12}>
            <motion.div className="story__photo" style={{ y: yArt }}>
              <span className="story__plate" aria-hidden="true" />
              <span className="story__frame" aria-hidden="true" />

              <Reveal className="story__arch" direction="up" duration={1.4} amount={0.2}>
                <motion.div className="story__art-wrap" style={{ scale: zoomArt }}>
                  <HerbStillLife className="story__art" />
                </motion.div>
                <span className="story__arch-light" aria-hidden="true" />
                <span className="story__arch-vignette" aria-hidden="true" />
                <span className="story__arch-gloss" aria-hidden="true" />
              </Reveal>

            {leaves.map((leaf, i) => (
              <span
                key={i}
                className="story__leaf"
                aria-hidden="true"
                style={{
                  left: leaf.left,
                  top: leaf.top,
                  animationDuration: `${leaf.duration}s`,
                  animationDelay: `${i * -3.4}s`,
                  '--rot': `${leaf.rot}deg`,
                  '--dx': `${leaf.dx}px`,
                  '--dy': `${leaf.dy}px`,
                }}
              >
                <LeafShape size={leaf.size} tone={leaf.tone} />
              </span>
            ))}

            <NaturalGoodnessSeal className="story__seal" />
          </motion.div>

            {/* the handwritten note, set under the picture like a caption */}
            <Reveal className="story__caption" delay={0.2} amount={0.4}>
              <span className="story__caption-rule" aria-hidden="true" />
              <p className="story__caption-text">
                Pure Herbs
                <span className="story__caption-leaf">
                  <LeafShape size={15} tone="#8fb98a" />
                </span>
                <br />
                for Healthy
                <br />
                You
              </p>
              <span className="story__caption-rule" aria-hidden="true" />
            </Reveal>
          </Reveal>

          {/* -------------------- right: the story itself ---------------------- */}
          <div className="story__copy">
            <SectionHeading
              align="left"
              eyebrow="OUR STORY"
              title="Embrace the nature,"
              highlight="naturally"
              tamil="இயற்கையை அரவணைப்போம்"
            />

            <div className="story__body">
              <Reveal as="p" className="story__text" delay={0.08}>
                Keerthika Sai Herbal Products started in a home kitchen with a stone grinder and a
                stubborn belief: the best skin and hair care does not come out of a factory. It comes
                from kasthuri manjal, avaram poo, rose, vetiver, amla, curry leaves and hibiscus
                &mdash; dried, ground and packed the way our grandmothers did it.
              </Reveal>
              <Reveal as="p" className="story__text" delay={0.14}>
                That is why our bath podi, hair oil, seekakai podi and hair packs have no chemicals
                and no preservatives. Just herbs, patience and a lot of love. Suitable for all ages,
                and safe for kids too.
              </Reveal>
            </div>
          </div>
        </div>
        {/* ========================= feature cards ========================= */}
        <ul className="story__cards">
          {cards.map(({ title, text }, i) => {
            const Icon = cardIcons[i]
            return (
              <Reveal as="li" key={title} className="story-card" delay={0.07 * i} amount={0.2}>
                <span className="story-card__icon" aria-hidden="true">
                  <Icon size={19} strokeWidth={1.5} />
                </span>
                <span className="story-card__body">
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              </Reveal>
            )
          })}
        </ul>

        {/* ========================== the promises ========================= */}
        <ul className="story__list">
          {promises.map((promise, i) => (
            <Reveal as="li" key={promise} className="story__list-item" delay={0.05 * i} amount={0.2}>
              <LeafCheck size={21} className="story__check" />
              <span>{promise}</span>
            </Reveal>
          ))}
        </ul>

        {/* ======================= statistics bar ======================== */}
        <Reveal className="story-stats" direction="up" amount={0.15}>
          <span className="story-stats__pattern" aria-hidden="true" />
          <ul className="story-stats__grid">
            {stats.map((stat, i) => {
              const Glyph = statIcons[i]
              return (
                <li className="story-stat" key={stat.label}>
                  <span
                    className={`story-stat__icon${i === 2 ? ' story-stat__icon--none' : ''}`}
                    aria-hidden="true"
                  >
                    <Glyph size={22} />
                  </span>
                  <span className="story-stat__body">
                    <span className="story-stat__value">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="story-stat__label">{stat.label}</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}