import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, Clock, Phone, Send } from 'lucide-react'
import { products } from '../data/products.js'
import { site } from '../data/site.js'
import { whatsappLink, orderLink } from '../lib/links.js'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { Branch } from '../components/art/Ornaments.jsx'

const initialForm = { name: '', place: '', quantity: '', note: '' }

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
      </div>
      <Branch className="ornament ornament--right" width={260} flip tone="#4d7a4a" />

      <div className="container">
        <SectionHeading
          eyebrow="Order & Contact"
          title="Two taps and it is"
          highlight="on the way"
          tamil="வாட்ஸ்அப் ஆர்டர்"
          text="Fill this in and we will open WhatsApp with your order ready to send. Prefer to chat first? Just tap the number."
        />

        <div className="order__grid">
          <Reveal direction="right" duration={0.9}>
            <form className="order-form" onSubmit={submit}>
              <div className="order-form__row">
                <label className="field">
                  <span>Your name *</span>
                  <input value={form.name} onChange={update('name')} placeholder="e.g. Lakshmi" required />
                </label>
                <label className="field">
                  <span>City / town</span>
                  <input value={form.place} onChange={update('place')} placeholder="e.g. Coimbatore" />
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
                  <input
                    value={form.quantity}
                    onChange={update('quantity')}
                    placeholder="e.g. 250g bath podi, 100ml oil"
                  />
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
                whileHover={reduce ? undefined : { scale: 1.015 }}
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
                    <Check size={16} /> WhatsApp should be opening with your order. We&apos;ll reply shortly!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          <Reveal direction="left" duration={0.9}>
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
                  <Check size={16} /> 100% organic &amp; homemade
                </li>
                <li>
                  <Check size={16} /> No chemicals or preservatives
                </li>
                <li>
                  <Check size={16} /> Suitable for all ages
                </li>
                <li>
                  <Check size={16} /> Price &amp; pack sizes shared on chat
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
          </Reveal>
        </div>
      </div>
    </section>
  )
}
