import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../data/content.js'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5200)
    return () => clearInterval(id)
  }, [paused])

  const go = (dir) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  const active = testimonials[index]

  return (
    <section className="reviews section" id="reviews">
      <div className="container">
        <SectionHeading
          eyebrow="Kind Words"
          title="Loved in"
          highlight="every home"
          text="A few notes from the families who order from us again and again."
        />

        <Reveal direction="zoom" duration={0.9}>
          <div
            className="reviews__stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                className="review"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="review__quote">
                  <Quote size={28} />
                </span>
                <div className="review__stars" aria-label={`${active.rating} out of 5 stars`}>
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                    >
                      <Star size={16} fill="currentColor" />
                    </motion.span>
                  ))}
                </div>
                <p className="review__text">{active.text}</p>
                <footer className="review__meta">
                  <span className="review__avatar">{active.name.charAt(0)}</span>
                  <span>
                    <strong>{active.name}</strong>
                    <small>{active.place}</small>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="reviews__controls">
              <button className="round-btn" onClick={() => go(-1)} aria-label="Previous review">
                <ChevronLeft size={20} />
              </button>
              <div className="reviews__dots">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    className={`reviews__dot ${i === index ? 'is-active' : ''}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
              <button className="round-btn" onClick={() => go(1)} aria-label="Next review">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="reviews__hint">
            Placeholder reviews &mdash; replace the text in <code>src/data/content.js</code> with your
            own customer messages.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
