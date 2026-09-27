import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Ban, ChevronLeft, ChevronRight, HeartHandshake, Home, Leaf, Quote, Star } from 'lucide-react'
import { benefits, testimonials } from '../data/content.js'
import { Branch, LeafDivider, LeafShape } from '../components/art/Ornaments.jsx'
import { OilBottle, PowderBowl } from '../components/art/ProductArt.jsx'
import hibiscus from '../assets/herbs/hibiscus.jpg'
import amla from '../assets/herbs/amla.jpg'

/* ------------------------------------------------------------------ *
 * Kind words - the customer love carousel.
 *
 * The data file still ships three template entries, so this section has
 * to stay honest about that: a template entry is rendered as an empty
 * "review slot" with no invented name, place, rating or photo.  Drop
 * real entries into `testimonials` in src/data/content.js and the same
 * layout lights up with stars, an initial avatar and the real quote -
 * no code change needed.
 * ------------------------------------------------------------------ */

const RATING_MAX = 5
const PLACEHOLDER_RE = /placeholder|replace this with|lorem ipsum|your customer review|\btbd\b/i
const isDraft = (entry) => PLACEHOLDER_RE.test(`${entry.name} ${entry.text}`)
const initials = (name) => name.trim().charAt(0).toUpperCase() || '\u00b7'
const wrap = (i) => (i + testimonials.length) % testimonials.length

/* The trust strip reads straight from the benefits data, so it can never
   claim anything the rest of the page does not already claim. */
const TRUST_ICONS = { Leaf, Home, Ban, HeartHandshake }
const TRUST_TAMIL = ['100% à®‡à®¯à®±à¯à®•à¯ˆ', 'à®°à®šà®¾à®¯à®©à®™à¯à®•à®³à¯ à®‡à®²à¯à®²à¯ˆ', 'à®µà¯€à®Ÿà¯à®Ÿà®¿à®²à¯ à®¤à®¯à®¾à®°à®¿à®ªà¯à®ªà¯', 'à®…à®©à¯à®ªà¯à®Ÿà®©à¯ à®¤à®¯à®¾à®°à¯']
const trustStrip = benefits
  .filter((b) => TRUST_TAMIL.includes(b.tamil))
  .map((b) => ({ ta: b.tamil, en: b.title, Icon: TRUST_ICONS[b.icon] || Leaf }))

/* The active card travels in from whichever side you navigated to. */
const cardVariants = {
  enter: (d) => ({ opacity: 0, x: d > 0 ? 54 : -54, scale: 0.975 }),
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (d) => ({
    opacity: 0,
    x: d > 0 ? -40 : 40,
    scale: 0.97,
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  }),
}

/**
 * The section's own scroll reveal - a short 20px lift rather than the
 * site-wide 46px, so the display heading keeps the strongest place in
 * the hierarchy.  Same pattern as the Ritual and Tamil band sections.
 */
function Lift({ children, className = '', delay = 0, from = 20, scale, duration = 0.7, amount = 0.4 }) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: from, ...(scale ? { scale } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Five stars, filled to the real rating - never rounded up for looks. */
function Stars({ rating, size = 18 }) {
  return (
    <span className="reviews__stars" role="img" aria-label={`Rated ${rating} out of ${RATING_MAX}`}>
      {Array.from({ length: RATING_MAX }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'is-on' : 'is-off'}
          fill="currentColor"
          strokeWidth={0}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

/** The same row, revealed one star at a time. */
function LiveStars({ rating }) {
  const reduce = useReducedMotion()

  return (
    <div className="reviews__stars" role="img" aria-label={`Rated ${rating} out of ${RATING_MAX}`}>
      {Array.from({ length: RATING_MAX }).map((_, i) => (
        <motion.span
          key={i}
          className={i < rating ? 'is-on' : 'is-off'}
          initial={reduce ? false : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12 + i * 0.07, duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <Star size={18} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        </motion.span>
      ))}
    </div>
  )
}

/** Hairline sprig tucked into each corner of the active card. */
function CornerSprig({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <path
        d="M2 70C2 38 34 6 70 2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity=".7"
      />
      <path d="M13 58c7-1 12-6 13-13-7 1-12 6-13 13Z" fill="currentColor" opacity=".5" />
      <path d="M28 45c1-7 6-12 13-13-1 7-6 12-13 13Z" fill="currentColor" opacity=".42" />
      <path d="M45 28c-1-7-6-12-13-13 1 7 6 12 13 13Z" fill="currentColor" opacity=".34" />
      <path d="M58 15c7 1 12 6 13 13-7-1-12-6-13-13Z" fill="currentColor" opacity=".46" />
    </svg>
  )
}

/** Faded neighbour that gives the carousel its context. */
function SideCard({ entry, side }) {
  const draft = isDraft(entry)

  return (
    <article className={`reviews__side reviews__side--${side}`} aria-hidden="true">
      {draft ? (
        <span className="reviews__side-tag">Sample slot</span>
      ) : (
        <Stars rating={entry.rating} size={13} />
      )}

      <p className="reviews__side-text">{entry.text}</p>

      <span className="reviews__side-foot">
        <span className="reviews__side-avatar">
          {draft ? <Leaf size={12} strokeWidth={1.7} /> : initials(entry.name)}
        </span>
        <span className="reviews__side-name">{draft ? 'Coming soon' : entry.name}</span>
      </span>
    </article>
  )
}

export default function Testimonials() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)

  const stageRef = useRef(null)
  const touchX = useRef(null)
  const inView = useInView(stageRef, { margin: '-12% 0px -12% 0px' })

  const count = testimonials.length
  const active = testimonials[index]
  const draftActive = isDraft(active)
  const hasDraft = testimonials.some(isDraft)

  /* Same 5.2s rhythm as before, but it only runs while the carousel is
     actually on screen, unfocused, unhovered, and motion is welcome. */
  useEffect(() => {
    if (paused || reduce || !inView) return undefined
    const id = window.setInterval(() => {
      setDir(1)
      setIndex((i) => (i + 1) % count)
    }, 5200)
    return () => window.clearInterval(id)
  }, [paused, reduce, inView, count])

  const go = useCallback(
    (step) => {
      setDir(step > 0 ? 1 : -1)
      setIndex((i) => wrap(i + step))
    },
    [count]
  )

  const jump = (i) => {
    setDir(i > index ? 1 : -1)
    setIndex(wrap(i))
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      jump(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      jump(count - 1)
    }
  }

  /* Touch swipe - only a decisive horizontal flick counts. */
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 44) go(dx < 0 ? 1 : -1)
  }

  return (
    <section className="reviews section" id="reviews">
      {/* background: soft glows, the powder bowl + oil bottle still life,
          pressed hibiscus and amla, and a little drawn foliage */}
      <div className="reviews__decor" aria-hidden="true">
        <span className="reviews__glow reviews__glow--a" />
        <span className="reviews__glow reviews__glow--b" />

        <span className="reviews__art reviews__art--l">
          <PowderBowl size={260} />
        </span>
        <span className="reviews__art reviews__art--r">
          <OilBottle size={240} />
        </span>

        <span className="reviews__medal reviews__medal--hibiscus">
          <img src={hibiscus} alt="" loading="lazy" decoding="async" />
        </span>
        <span className="reviews__medal reviews__medal--amla">
          <img src={amla} alt="" loading="lazy" decoding="async" />
        </span>

        <Branch className="reviews__branch reviews__branch--l" width={300} tone="#4d7a4a" />
        <Branch className="reviews__branch reviews__branch--r" width={250} flip tone="#4d7a4a" />
        <LeafShape size={30} tone="#8fb98a" className="reviews__leaf reviews__leaf--a" />
        <LeafShape size={22} tone="#a8c79b" className="reviews__leaf reviews__leaf--b" />
      </div>

      <div className="container">
        <div className="section-heading section-heading--center reviews__heading">
          <Lift from={16} duration={0.6}>
            <span className="eyebrow reviews__eyebrow">
              <span className="reviews__rule" aria-hidden="true" />
              <Leaf size={15} strokeWidth={1.7} aria-hidden="true" />
              <span>Kind Words</span>
              <span className="reviews__rule" aria-hidden="true" />
            </span>
          </Lift>

          <Lift delay={0.08}>
            <h2 className="section-title">
              Loved in <em className="title-accent">every home</em>
            </h2>
          </Lift>

          <Lift delay={0.16} from={12}>
            <LeafDivider width={200} />
          </Lift>

          <Lift delay={0.22}>
            <p className="section-text reviews__lede">
              A few notes from the families who order from us again and again.
            </p>
          </Lift>
        </div>

        <Lift from={14} scale={0.97} duration={0.85} amount={0.15}>
          <div
            ref={stageRef}
            className="reviews__stage"
            role="group"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <p className="reviews__live" aria-live="polite">
              Review {index + 1} of {count}
            </p>

            <span className="reviews__badge" aria-hidden="true">
              <Leaf size={17} strokeWidth={1.6} />
              <span className="reviews__badge-text">
                <span>Trusted</span>
                <em>by</em>
                <span>Families</span>
              </span>
            </span>

            <div className="reviews__frame">
              <SideCard entry={testimonials[wrap(index - 1)]} side="prev" />

              <div className="reviews__center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={index}
                    className="reviews__card"
                    custom={dir}
                    variants={cardVariants}
                    initial={reduce ? false : 'enter'}
                    animate="show"
                    exit={reduce ? undefined : 'exit'}
                  >
                    <CornerSprig className="reviews__sprig reviews__sprig--tl" />
                    <CornerSprig className="reviews__sprig reviews__sprig--tr" />
                    <CornerSprig className="reviews__sprig reviews__sprig--bl" />
                    <CornerSprig className="reviews__sprig reviews__sprig--br" />
                    <span className="reviews__card-glow" aria-hidden="true" />

                    <span className="reviews__quote" aria-hidden="true">
                      <Quote size={38} strokeWidth={1.2} />
                    </span>

                    {draftActive ? (
                      <>
                        <span className="reviews__draft">Sample slot</span>
                        <p className="reviews__text reviews__text--draft">{active.text}</p>
                        <div className="reviews__meta">
                          <span className="reviews__avatar" aria-hidden="true">
                            <Leaf size={22} strokeWidth={1.4} />
                          </span>
                          <span className="reviews__who">
                            <strong>Customer review</strong>
                            <small>Coming soon</small>
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <LiveStars rating={active.rating} />
                        <p className="reviews__text">{active.text}</p>
                        <div className="reviews__meta">
                          <span className="reviews__avatar" aria-hidden="true">
                            {initials(active.name)}
                          </span>
                          <span className="reviews__who">
                            <strong>{active.name}</strong>
                            <small>{active.place}</small>
                          </span>
                        </div>
                      </>
                    )}
                  </motion.figure>
                </AnimatePresence>
              </div>

              <SideCard entry={testimonials[wrap(index + 1)]} side="next" />
            </div>

            <div className="reviews__controls">
              <button
                type="button"
                className="reviews__nav"
                onClick={() => go(-1)}
                aria-label="Previous review"
              >
                <ChevronLeft size={20} strokeWidth={1.6} />
              </button>

              <div className="reviews__dots">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    className={`reviews__dot ${i === index ? 'is-active' : ''}`}
                    onClick={() => jump(i)}
                    aria-label={`Go to review ${i + 1} of ${count}`}
                    aria-current={i === index}
                  />
                ))}
              </div>

              <button
                type="button"
                className="reviews__nav"
                onClick={() => go(1)}
                aria-label="Next review"
              >
                <ChevronRight size={20} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </Lift>

        {hasDraft && (
          <Lift delay={0.1} from={14} amount={0.5}>
            <p className="reviews__note">
              <Leaf size={15} strokeWidth={1.6} aria-hidden="true" />
              <span>
                These are empty layout slots &mdash; your real customer reviews will appear here the
                moment you add them to <code>src/data/content.js</code>.
              </span>
            </p>
          </Lift>
        )}

        <Lift delay={0.12} from={16} amount={0.3}>
          <div className="reviews__strip">
            {trustStrip.map(({ ta, en, Icon }, i) => (
              <span key={ta} className="reviews__strip-point">
                {i > 0 && <span className="reviews__strip-sep" aria-hidden="true" />}
                <span className="reviews__strip-icon" aria-hidden="true">
                  <Icon size={15} strokeWidth={1.7} />
                </span>
                <span className="reviews__strip-text">
                  <strong className="tamil">{ta}</strong>
                  <em>{en}</em>
                </span>
              </span>
            ))}
          </div>
        </Lift>
      </div>

      <p className="reviews__margin-note" aria-hidden="true">
        Real People
        <br />
        Real Care
      </p>
    </section>
  )
}
