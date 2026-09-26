import { motion, useReducedMotion } from 'framer-motion'
import { ritualSteps } from '../data/content.js'
import Reveal from '../components/ui/Reveal.jsx'
import { Branch, LeafDivider, LeafShape } from '../components/art/Ornaments.jsx'
import ritualStillLife from '../assets/ritual-still-life.jpg'
import {
  RitualLineArt,
  LeafLineArt,
  ScoopArt,
  MassageArt,
  RinseArt,
  BathTipGlyph,
  SeekkaiTipGlyph,
  HairTipGlyph,
} from '../components/art/RitualArt.jsx'

/* The small supporting drawing for each step, in `ritualSteps` order. */
const STEP_ART = [ScoopArt, MassageArt, RinseArt]

/*
 * The three tips exactly as they are written in the copy - the part before
 * the colon becomes the tip title and the rest its line, so the strip can be
 * laid out as three columns without changing a single word.
 */
const TIPS = [
  'For bath podi: Mix with a little milk or curd for extra softness.',
  'For seekakai podi: Soak for 10 minutes before use for a creamy lather.',
  'For hair pack: Apply on oiled hair for deep conditioning.',
].map((line, i) => {
  const at = line.indexOf(':')
  return {
    Icon: [BathTipGlyph, SeekkaiTipGlyph, HairTipGlyph][i],
    title: line.slice(0, at),
    text: line.slice(at + 1).trim(),
  }
})

/** Leaves that drift around the plate. */
const PLATE_LEAVES = [
  { left: '-5%', top: '30%', size: 30, tone: '#7c9885', rot: -14, dx: 8, dy: -16, duration: 13 },
  { left: '92%', top: '18%', size: 24, tone: '#4d7a4a', rot: 24, dx: -7, dy: -14, duration: 15 },
  { left: '88%', top: '68%', size: 20, tone: '#8fb98a', rot: 8, dx: 6, dy: -12, duration: 11 },
  { left: '0%', top: '76%', size: 26, tone: '#3f6b41', rot: -30, dx: -6, dy: -14, duration: 14 },
]

/** Tiny leaves loose in the section margins. */
const MOTE_LEAVES = [
  { left: '82%', top: '7%', size: 22, tone: '#8fb98a', rot: 28, dx: -8, dy: -12, duration: 16 },
  { left: '93%', top: '24%', size: 16, tone: '#a8c79b', rot: -18, dx: -6, dy: -10, duration: 13 },
  { left: '5%', top: '12%', size: 18, tone: '#b6cfa8', rot: 16, dx: 7, dy: -11, duration: 18 },
]

/**
 * The header lines rise 20px as they fade in - a lighter lift than the
 * site-wide `Reveal` (which travels 46px) because the heading sits right
 * above the artwork.
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
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * The Ritual - a premium editorial split: the herbal still-life on a cream
 * plate to the left, the three step cards hanging off a gold timeline to the
 * right and the three tips in one translucent sage strip underneath.
 */
export default function Ritual() {
  const reduce = useReducedMotion()

  return (
    <section className="ritual section" id="ritual">
      {/* background: soft glows, drawn branches and a leaf silhouette */}
      <span className="ritual__glow" aria-hidden="true" />
      <Branch className="ritual__branch ritual__branch--tl" width={300} tone="#8fb98a" />
      <Branch className="ritual__branch ritual__branch--br" width={260} flip tone="#7c9885" />
      <span className="ritual__silhouette" aria-hidden="true">
        <LeafShape size={160} tone="#8fb98a" />
      </span>
      {MOTE_LEAVES.map((leaf, i) => (
        <span
          key={`mote-${i}`}
          className="ritual__mote"
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

      <div className="container">
        <div className="section-heading section-heading--center ritual__heading">
          <Lift duration={0.6}>
            <span className="eyebrow">
              <LeafShape size={13} tone="#7c9885" className="ritual__eyebrow-leaf" />
              The Ritual
            </span>
          </Lift>

          <Lift delay={0.08} duration={0.7}>
            <h2 className="section-title ritual__title">
              Three simple <em className="title-accent">steps</em>
            </h2>
          </Lift>

          <Lift delay={0.14} duration={0.7}>
            <p className="section-tamil tamil ritual__tamil">இயற்கையான கூந்தல் பராமரிப்பு</p>
          </Lift>

          <Lift delay={0.18} duration={0.6}>
            <LeafDivider />
          </Lift>

          <Lift delay={0.22} duration={0.7}>
            <p className="section-text ritual__text">
              Used the traditional way, our powders and oils give the best results in a few weeks.
            </p>
          </Lift>
        </div>

        <div className="ritual__split">
          {/* LEFT: the herbal still-life on its cream plate */}
          <motion.div
            className="ritual__still"
            initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="ritual__halo" aria-hidden="true" />
            <RitualLineArt className="ritual__sketch" />
            <div className="ritual__arch-frame">
              <img
                src={ritualStillLife}
                alt="Wooden bowl of freshly ground herbal powder, hibiscus flower, fresh amla, and botanical herbs on a wooden platter"
                className="ritual__art"
                loading="lazy"
                decoding="async"
                width={750}
                height={945}
              />
              <RitualLineArt className="ritual__plate-line" />
            </div>

            <p className="ritual__script">
              Natural
              <br />
              Care
              <br />
              Naturally
              <br />
              <span className="ritual__script-last">
                Yours
                <LeafShape size={15} tone="#8fb98a" className="ritual__script-leaf" />
              </span>
            </p>

            {PLATE_LEAVES.map((leaf, i) => (
              <span
                key={`plate-${i}`}
                className="ritual__floating-leaf"
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
          </motion.div>

          {/* RIGHT: the three steps on a gold timeline */}
          <div className="ritual__timeline">
            {ritualSteps.map((step, i) => {
              const Art = STEP_ART[i] ?? ScoopArt
              const last = i === ritualSteps.length - 1

              return (
                <Reveal
                  key={step.step}
                  as="article"
                  className="ritual-step"
                  direction="up"
                  duration={0.6}
                  delay={0.06 * i}
                  amount={0.3}
                >
                  <div className="ritual-step__mark">
                    {!last && (
                      <motion.span
                        className="ritual-step__link"
                        aria-hidden="true"
                        initial={reduce ? undefined : { scaleY: 0 }}
                        whileInView={reduce ? undefined : { scaleY: 1 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                      />
                    )}
                    <motion.span
                      className="ritual-step__badge"
                      initial={reduce ? undefined : { opacity: 0, scale: 0.86 }}
                      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {step.step}
                      <LeafShape size={13} tone="#8fb98a" className="ritual-step__badge-leaf" />
                    </motion.span>
                  </div>

                  <div className="ritual-step__card">
                    <LeafLineArt className="ritual-step__texture" />
                    <span className="ritual-step__art">
                      <Art />
                    </span>
                    <div className="ritual-step__body">
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        <div className="ritual__tips">
          {TIPS.map(({ Icon, title, text }, i) => (
            <Reveal key={title} className="ritual__tip" delay={0.08 * i} duration={0.6} amount={0.3}>
              <span className="ritual__tip-icon" aria-hidden="true">
                <Icon />
              </span>
              <div className="ritual__tip-body">
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}