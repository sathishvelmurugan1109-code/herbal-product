// Small helpers: WhatsApp deep links + smooth scrolling through Lenis.
import { site } from '../data/site.js'

export function whatsappLink(message) {
  const text = encodeURIComponent(
    message || 'Hello Keerthika Sai! I would like to know more about your herbal products.',
  )
  return `https://wa.me/${site.whatsappNumber}?text=${text}`
}

export function orderLink(productName, extra) {
  const lines = [
    'Hello Keerthika Sai! 🙏',
    `I would like to order: ${productName}`,
  ]
  if (extra) lines.push(extra)
  lines.push('Please share the price, pack sizes and delivery details.')
  return whatsappLink(lines.join('\n'))
}

export function scrollToId(id) {
  const el = typeof document !== 'undefined' ? document.getElementById(id) : null
  if (!el) return
  const lenis = typeof window !== 'undefined' ? window.__lenis : null
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(el, { offset: -84, duration: 1.4 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 84
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
