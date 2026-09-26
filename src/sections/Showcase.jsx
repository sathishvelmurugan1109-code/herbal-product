import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products } from '../data/products.js'
import { orderLink } from '../lib/links.js'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'

/**
 * Showcase band - the real printed posters, one product at a time so the fine
 * print on each poster stays readable. The pills switch posters and the poster
 * (or "View details") opens the same detail sheet that the product grid uses.
 * Posters come from `banner` in src/data/products.js; products without a
 * poster are simply skipped.
 */
export default function Showcase({ onSelect }) {
  const reduce = useReducedMotion()
  const posters = products.filter((product) => product.banner)
  const [activeId, setActiveId] = useState(posters[0]?.id)
  const [loadedPoster, setLoadedPoster] = useState(null)

  const active = posters.find((product) => product.id === activeId) ?? posters[0]
  if (!active) return null

  return (
    <section className="showcase section" id="showcase">
      <div className="container">
        <SectionHeading
          eyebrow="Real Posters"
          title="The packs"
          highlight="up close"
          tamil="100% இயற்கை · ரசாயனங்கள் இல்லை · ஆர்கானிக்"
          text="These are the printed posters that travel with every order. Open one to read the full product sheet."
        />

        <Reveal direction="zoom" duration={0.95}>
          <div className="showcase__stage" style={{ '--accent': active.accent }}>
            <AnimatePresence mode="wait">
              <motion.button
                key={active.id}
                type="button"
                className={`showcase__poster${loadedPoster === active.id ? ' is-loaded' : ''}`}
                onClick={() => onSelect(active)}
                aria-label={`Open ${active.name} details`}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={active.banner}
                  alt={`${active.name} - ${active.subtitle}`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setLoadedPoster(active.id)}
                />
              </motion.button>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="showcase__tabs" role="group" aria-label="Choose a product poster">
            {posters.map((product) => {
              const isActive = product.id === active.id
              return (
                <button
                  key={product.id}
                  type="button"
                  className={`showcase__tab${isActive ? ' is-active' : ''}`}
                  style={{ '--accent': product.accent }}
                  aria-pressed={isActive}
                  onClick={() => setActiveId(product.id)}
                >
                  <span aria-hidden="true">{product.emoji}</span>
                  {product.name}
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="showcase__caption">
            <div className="showcase__caption-copy">
              <p className="showcase__sub">{active.subtitle}</p>
              <p className="showcase__short">{active.short}</p>
            </div>

            <div className="showcase__actions">
              <a
                className="btn btn--whatsapp btn--sm"
                href={orderLink(active.name)}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={16} />
                <span>Order</span>
              </a>
              <button className="btn btn--text btn--sm" onClick={() => onSelect(active)}>
                <span>View details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
