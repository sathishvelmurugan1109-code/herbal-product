import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Sparkles } from 'lucide-react'
import { orderLink } from '../lib/links.js'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { ProductArt } from '../components/art/ProductArt.jsx'
import { LeafDivider } from '../components/art/Ornaments.jsx'

/** Modal product sheet with the full herb list and a WhatsApp order button. */
export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  return (
    <AnimatePresence>
      {product && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={product.name}>
          <motion.div
            className="modal__scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="modal__panel"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal__close" onClick={onClose} aria-label="Close details">
              <X size={20} />
            </button>

            <div className="modal__grid">
              <div className="modal__art" style={{ '--accent': product.accent }}>
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ProductArt art={product.art} size={360} />
                </motion.div>
                <span className="modal__art-halo" aria-hidden="true" />
              </div>

              <div className="modal__body">
                <p className="modal__tamil tamil">{product.tamil}</p>
                <h3 className="modal__title">{product.name}</h3>
                <p className="modal__sub">{product.subtitle}</p>
                <LeafDivider width={150} />
                <p className="modal__desc">{product.description}</p>

                <ul className="modal__benefits">
                  {product.benefits.map((b, i) => (
                    <motion.li
                      key={b.title}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.09, duration: 0.5 }}
                    >
                      <span className="modal__tick">
                        <Check size={14} />
                      </span>
                      <span>
                        <strong>{b.title}</strong>
                        <em>{b.text}</em>
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <p className="modal__herbs-label">
                  <Sparkles size={14} /> Formulated with
                </p>
                <ul className="modal__herbs">
                  {product.herbs.map((herb) => (
                    <li key={herb}>{herb}</li>
                  ))}
                </ul>
                <p className="modal__note">{product.note}</p>

                <div className="modal__actions">
                  <a
                    className="btn btn--whatsapp btn--lg"
                    href={orderLink(product.name)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon size={20} />
                    <span>Order this on WhatsApp</span>
                  </a>
                  <p className="modal__disclaimer">
                    100% natural · Chemical free · Organic · Price &amp; pack sizes shared on WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
