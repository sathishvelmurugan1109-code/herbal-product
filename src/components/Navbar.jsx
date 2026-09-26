import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '../data/site.js'
import { orderLink } from '../lib/links.js'
import { LeafMark } from './art/Ornaments.jsx'
import { scrollToId } from '../lib/links.js'
import WhatsAppIcon from './ui/WhatsAppIcon.jsx'

export default function Navbar({ onOrderClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0.1, 0.4, 0.8] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <div className="navbar__inner">
          <button className="brand" onClick={() => go('home')} aria-label="Keerthika Sai home">
            <LeafMark size={44} className="brand__mark" />
            <span className="brand__text">
              <strong>
                Keerthika <em>Sai</em>
              </strong>
              <small>Herbal Products</small>
            </span>
          </button>

          <nav className="navbar__links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`nav-link ${active === link.id ? 'is-active' : ''}`}
                onClick={() => go(link.id)}
              >
                {link.label}
                {active === link.id && (
                  <motion.span className="nav-link__dot" layoutId="nav-dot" transition={{ type: 'spring', stiffness: 420, damping: 30 }} />
                )}
              </button>
            ))}
          </nav>

          <div className="navbar__actions">
            <a
              className="btn btn--whatsapp btn--sm"
              href={orderLink('General enquiry')}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={18} />
              <span>Order now</span>
            </a>
            <button className="navbar__burger" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="drawer__scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <div className="drawer__head">
                <span className="drawer__title">Menu</span>
                <button className="drawer__close" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>

              <nav className="drawer__links" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    className="drawer__link"
                    onClick={() => go(link.id)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.5 }}
                  >
                    <span>{link.label}</span>
                  </motion.button>
                ))}
              </nav>

              <div className="drawer__foot">
                <p className="drawer__phone">{site.phoneDisplay}</p>
                <a className="btn btn--whatsapp btn--block" href={orderLink('General enquiry')} target="_blank" rel="noreferrer">
                  <WhatsAppIcon size={18} />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
