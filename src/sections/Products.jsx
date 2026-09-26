import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products } from '../data/products.js'
import { orderLink } from '../lib/links.js'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import ProductCardArt from '../components/art/ProductCardArt.jsx'
import { CardLeaf, CornerSprig, DustMotes } from '../components/art/CollectionDecor.jsx'

/*
 * Warm tint + glow per card. Both are keyed off the `art` value that is
 * already stored in src/data/products.js, so the catalogue itself stays
 * exactly as it was.
 */
const LOOK = {
  powder: { tint: 'rgba(238, 242, 222, 0.92)', glow: 'rgba(199, 154, 59, 0.34)' },
  oil: { tint: 'rgba(247, 234, 205, 0.92)', glow: 'rgba(216, 168, 60, 0.36)' },
  seekakai: { tint: 'rgba(240, 228, 208, 0.92)', glow: 'rgba(169, 113, 60, 0.3)' },
  hairpack: { tint: 'rgba(228, 240, 216, 0.94)', glow: 'rgba(95, 143, 90, 0.32)' },
}

/**
 * One editorial card: the photograph fills the right column (it keeps the top
 * slot on phones), the copy and the two actions sit on the left. The photo
 * drifts a few pixels against the pointer so the card feels alive.
 */
function ProductCard({ product, onSelect }) {
  const reduce = useReducedMotion()
  const card = useRef(null)
  const look = LOOK[product.art] ?? LOOK.powder

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 110, damping: 20, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 110, damping: 20, mass: 0.4 })

  const photoX = useTransform(sx, [0, 1], [7, -7])
  const photoY = useTransform(sy, [0, 1], [5, -5])
  const haloX = useTransform(sx, [0, 1], [-9, 9])
  const haloY = useTransform(sy, [0, 1], [-6, 6])

  const track = (event) => {
    if (reduce || !card.current) return
    const rect = card.current.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width)
    my.set((event.clientY - rect.top) / rect.height)
  }

  const rest = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <article
      ref={card}
      className="product-card"
      onMouseMove={track}
      onMouseLeave={rest}
      style={{ '--accent': look.glow, '--pc-tint': look.tint }}
    >
      <div className="product-card__media">
        <motion.span
          className="product-card__halo"
          aria-hidden="true"
          style={reduce ? undefined : { x: haloX, y: haloY }}
        />

        <motion.div
          className="product-card__frame"
          initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span className="product-card__shift" style={reduce ? undefined : { x: photoX, y: photoY }}>
            <ProductCardArt
              art={product.art}
              className="product-card__photo"
              alt={`${product.name} with fresh herbs and flowers`}
            />
          </motion.span>
          <span className="product-card__glow" aria-hidden="true" />
          <span className="product-card__grain" aria-hidden="true" />
        </motion.div>

        <span className="product-card__badge" aria-hidden="true">
          {product.emoji}
        </span>
        <CardLeaf className="product-card__leaf product-card__leaf--a" tone="#6f9a5f" />
        <CardLeaf className="product-card__leaf product-card__leaf--b" tone="#b09040" size={38} />
      </div>
      <div className="product-card__body">
        <p className="product-card__tamil tamil">{product.tamil}</p>
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__cat">{product.subtitle}</p>
        <p className="product-card__text">{product.short}</p>

        <ul className="product-card__chips">
          {product.herbs.slice(0, 4).map((herb) => (
            <li key={herb}>{herb}</li>
          ))}
        </ul>

        <span className="product-card__rule" aria-hidden="true" />

        <div className="product-card__actions">
          <a
            className="btn btn--whatsapp btn--sm btn--order"
            href={orderLink(product.name)}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={16} />
            <span>Order</span>
          </a>
          <button className="btn btn--text btn--sm" type="button" onClick={() => onSelect(product)}>
            <span>Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}

/**
 * Our Collection - the four herbal essentials. Each card is a small campaign:
 * the real product photograph on one side, the ritual, the herbs and the
 * WhatsApp order on the other. "Details" still opens the shared detail sheet.
 */
export default function Products({ onSelect }) {
  return (
    <section className="products section" id="products">
      <div className="products__decor" aria-hidden="true">
        <CornerSprig className="products__sprig products__sprig--tl" width={260} tone="#4f7a4c" />
        <CornerSprig className="products__sprig products__sprig--tr" width={230} tone="#4f7a4c" flip />
        <CornerSprig className="products__sprig products__sprig--bl" width={215} tone="#4f7a4c" />
        <CornerSprig className="products__sprig products__sprig--br" width={245} tone="#4f7a4c" flip />
        <DustMotes />
      </div>

      <div className="container">
        <SectionHeading
          eyebrow="Our Collection"
          title="Four herbal"
          highlight="essentials"
          tamil="குளியல் பொடி · ஹேர் ஆயில் · சீயக்காய் தூள் · ஹேர் பேக்"
          text="Every jar is ground, sieved and packed by hand. Choose the ritual your skin and hair have been asking for."
        />

        <div className="products__grid">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.1} duration={0.85} amount={0.18}>
              <ProductCard product={product} onSelect={onSelect} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
