import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, Clock, MapPin, Package, Phone, Send, User } from 'lucide-react'
import { products } from '../data/products.js'
import { site } from '../data/site.js'
import { whatsappLink, orderLink } from '../lib/links.js'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { Branch, LeafDivider, LeafShape } from '../components/art/Ornaments.jsx'
import { CardLineArt } from '../components/art/BotanicalFrame.jsx'

/* The two herbal still-lives that lean against the section edges. */
import ritualStillLife from '../assets/ritual-still-life.jpg'
import oilStillLife from '../assets/products/oil-card.jpg'

const initialForm = { name: '', place: '', quantity: '', note: '' }

/**
 * The section's own reveal - a short 20px lift / 20px slide rather than the
 * site-wide 46-64px travel, so the form and the WhatsApp panel settle in
 * gently instead of flying across the section.
 */
function Lift({ children, className = '', delay = 0, from = 'up', duration = 0.6, amount = 0.25 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const hidden =
    from === 'left'
      ? { opacity: 0, x: -20 }
      : from === 'right'
        ? { opacity: 0, x: 20 }
        : { opacity: 0, y: 20 }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Order panel. There is no backend: the form builds a tidy WhatsApp
 * message and opens it in a new tab, which is how this business works.
 */
export default function Order() {
  const reduce = useReducedMotion()
  const [form, setForm] = useState(initialForm)
  const [selected, setSelected] = useState([products[0].name])
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const toggle = (name) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]))

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || selected.length === 0) {
      setError('Please add your name and pick at least one product.')
      return
    }
    setError('')

    const message = [
      'Hello Keerthika Sai! 🙏',
      `Name: ${form.name.trim()}`,
      form.place.trim() ? `Place: ${form.place.trim()}` : null,
      `Products: ${selected.join(', ')}`,
      form.quantity.trim() ? `Quantity / pack size: ${form.quantity.trim()}` : null,
      form.note.trim() ? `Note: ${form.note.trim()}` : null,
      '',
      'Please share the price and delivery details.',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(whatsappLink(message), '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section className="order section" id="order">
      <div className="order__bg" aria-hidden="true">
        <span className="blob blob--6" />
        <span className="order__glow" />
      </div>
      <Branch className="ornament ornament--right" width={260} flip tone="#4d7a4a" />

      {/* the two herbal still-lives leaning on the section edges */}
      <span className="order__plate order__plate--left" aria-hidden="true">
        <img src={ritualStillLife} alt="" loading="lazy" decoding="async" />
      </span>
      <span className="order__plate order__plate--right" aria-hidden="true">
        <img src={oilStillLife} alt="" loading="lazy" decoding="async" />
      </span>

      <div className="container">
        <div className="order__head">
          <p className="order__note" aria-hidden="true">
            Simple Orders,
            <br />
            Natural Care
          </p>

          <span className="order__badge" aria-hidden="true">
            <LeafShape size={20} tone="#c79a3b" />
            <span className="order__badge-text">
              Traditional
              <br />
              Herbal Care
              <br />
              at your
              <br />
              fingertips
            </span>
          </span>

          <div className="section-heading section-heading--center order__heading">
            <Lift duration={0.6}>
              <span className="eyebrow">
                <LeafShape size={13} tone="#7c9885" className="order__eyebrow-leaf" />
                Order &amp; Contact
              </span>
            </Lift>

            <Lift delay={0.08} duration={0.7}>
              <h2 className="section-title">
                Two taps and it is <em className="title-accent">on the way</em>
              </h2>
            </Lift>

            <Lift delay={0.14} duration={0.7}>
              <p className="section-tamil tamil">வாட்ஸ்அப் ஆர்டர்</p>
            </Lift>

            <Lift delay={0.18} duration={0.6}>
              <LeafDivider />
            </Lift>

            <Lift delay={0.22} duration={0.7}>
              <p className="section-text">
                Fill this in and we will open WhatsApp with your order ready to send. Prefer to chat
                first? Just tap the number.
              </p>
            </Lift>
          </div>
        </div>

        <div className="order__grid">
          <Lift from="left" duration={0.8}>
            <form className="order-form" onSubmit={submit}>
              <CardLineArt className="order-form__lineart" />

              <div className="order-form__header">
                <span className="order-form__label">START YOUR ORDER</span>
                <p className="order-form__sub">
                  Tell us what you need and we'll prepare your WhatsApp order.
                </p>
              </div>

              <div className="order-form__row">
                <label className="field">
                  <span>Your name *</span>
                  <span className="field__control">
                    <User size={17} className="field__icon" aria-hidden="true" />
                    <input value={form.name} onChange={update('name')} placeholder="e.g. Lakshmi" required />
                  </span>
                </label>
                <label className="field">
                  <span>City / town</span>
                  <span className="field__control">
                    <MapPin size={17} className="field__icon" aria-hidden="true" />
                    <input value={form.place} onChange={update('place')} placeholder="e.g. Coimbatore" />
                  </span>
                </label>
              </div>

              <fieldset className="order-form__products">
                <legend>Choose products *</legend>
                <div className="chip-grid">
                  {products.map((p) => {
                    const on = selected.includes(p.name)
                    return (
                      <button
                        type="button"
                        key={p.id}
                        className={`chip ${on ? 'is-on' : ''}`}
                        onClick={() => toggle(p.name)}
                        aria-pressed={on}
                      >
                        <span className="chip__emoji">{p.emoji}</span>
                        <span>{p.name}</span>
                        {on && <Check size={14} className="chip__tick" />}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <div className="order-form__row">
                <label className="field">
                  <span>Quantity / pack size</span>
                  <span className="field__control">
                    <Package size={17} className="field__icon" aria-hidden="true" />
                    <input
                      value={form.quantity}
                      onChange={update('quantity')}
                      placeholder="e.g. 250g bath podi, 100ml oil"
                    />
                  </span>
                </label>
              </div>

              <label className="field">
                <span>Anything else?</span>
                <textarea
                  value={form.note}
                  onChange={update('note')}
                  rows={3}
                  placeholder="Skin type, hair concern, delivery preference..."
                />
              </label>

              <AnimatePresence>
                {error && (
                  <motion.p
                    className="order-form__error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="btn btn--whatsapp btn--lg btn--block"
                whileHover={reduce ? undefined : { scale: 1.015, boxShadow: '0 22px 40px -18px rgba(18, 140, 74, 0.85)' }}
                whileTap={{ scale: 0.985 }}
              >
                <Send size={18} />
                <span>Send my order on WhatsApp</span>
              </motion.button>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    className="order-form__sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Check size={16} /> WhatsApp should be opening with your order. We'll reply shortly!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Lift>

          <Lift from="right" duration={0.8} delay={0.06}>
            <aside className="order-aside">
              <motion.span
                className="order-aside__seal"
                animate={reduce ? undefined : { rotate: [0, 5, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                <WhatsAppIcon size={40} />
              </motion.span>

              <h3>Order on WhatsApp</h3>
              <a className="order-aside__phone" href={whatsappLink()} target="_blank" rel="noreferrer">
                <Phone size={20} />
                <span>{site.phoneDisplay}</span>
              </a>

              <ul className="order-aside__list">
                <li>
                  <Check size={16} /> 100% organic & homemade
                </li>
                <li>
                  <Check size={16} /> No chemicals or preservatives
                </li>
                <li>
                  <Check size={16} /> Suitable for all ages
                </li>
                <li>
                  <Check size={16} /> Price & pack sizes shared on chat
                </li>
              </ul>

              <p className="order-aside__hours">
                <Clock size={16} /> {site.hours}
              </p>

              <div className="order-aside__quick">
                {products.map((p) => (
                  <a key={p.id} className="quick-link" href={orderLink(p.name)} target="_blank" rel="noreferrer">
                    <span>
                      {p.emoji} {p.name}
                    </span>
                    <WhatsAppIcon size={16} />
                  </a>
                ))}
              </div>
            </aside>
          </Lift>
        </div>
      </div>
    </section>
  )
}