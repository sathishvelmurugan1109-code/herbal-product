import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { AnimatePresence, motion } from 'framer-motion'
import Preloader from './components/Preloader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'
import Marquee from './components/Marquee.jsx'
import Hero from './sections/Hero.jsx'
import Products from './sections/Products.jsx'
import ProductModal from './sections/ProductModal.jsx'
import Showcase from './sections/Showcase.jsx'
import Ingredients from './sections/Ingredients.jsx'
import Benefits from './sections/Benefits.jsx'
import Ritual from './sections/Ritual.jsx'
import TamilBand from './sections/TamilBand.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Order from './sections/Order.jsx'
import Footer from './sections/Footer.jsx'
import WhatsAppIcon from './components/ui/WhatsAppIcon.jsx'
import { orderLink } from './lib/links.js'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [activeProduct, setActiveProduct] = useState(null)

  // Buttery smooth scrolling (disabled for reduced-motion visitors).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 })
    window.__lenis = lenis

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  // Freeze the page while the intro plays.
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
      window.__lenis?.stop?.()
    } else {
      document.body.style.overflow = ''
      window.__lenis?.start?.()
    }
  }, [loading])

  return (
    <>
      <Preloader onDone={() => setLoading(false)} />
      <ScrollProgress />
      <Cursor />
      <Navbar />

      <main>
        <Hero />

        <Marquee
          items={[
            '100% Natural',
            'Chemical Free',
            'Organic',
            'Homemade',
            'No Preservatives Added',
            'Suitable For All Ages',
          ]}
          speed={38}
          className="marquee--leaf"
        />

        <Products onSelect={setActiveProduct} />
        <Showcase onSelect={setActiveProduct} />
        <Ingredients />
        <Benefits />
        <Ritual />
        <TamilBand />
        <Testimonials />
        <Order />
      </main>

      <Footer />

      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />

      {/* Floating WhatsApp order button */}
      <motion.a
        className="wa-float"
        href={orderLink('Quick order')}
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.4, type: 'spring', stiffness: 240, damping: 18 }}
        whileHover={{ scale: 1.08 }}
      >
        <WhatsAppIcon size={26} />
        <motion.span
          className="wa-float__ring"
          animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          aria-hidden="true"
        />
        <AnimatePresence>
          {!loading && (
            <motion.span
              className="wa-float__label"
              initial={{ opacity: 0, x: 12 }}
              whileHover={{ opacity: 1, x: 0 }}
              animate={{ opacity: 0 }}
            >
              Order on WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
    </>
  )
}
