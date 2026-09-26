import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles, ShieldCheck, Droplets, Star } from 'lucide-react'
import { site } from '../data/site.js'
import { orderLink, scrollToId } from '../lib/links.js'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import LeafRain from '../components/LeafRain.jsx'
import { Vine, LeafShape } from '../components/art/Ornaments.jsx'
import HeroStage from './HeroStage.jsx'

const HEADLINE = ['Herbal', 'Products']

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const yCopy = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const yArt = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.15])
  const scaleArt = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.86])

  return (
    <section className="hero" id="home" ref={ref}>
      {/* layered nature background */}
      <div className="hero__bg" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="blob blob--3" />
        <span className="hero__grain" />
        <Vine className="hero__vine hero__vine--left" width={300} />
        <Vine className="hero__vine hero__vine--right" width={260} />
      </div>
      <LeafRain className="hero__leaves" />

      <motion.div className="hero__inner container" style={{ y: yCopy, opacity: fade }}>
        <div className="hero__copy">
          <motion.span
            className="pill pill--soft"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <LeafShape size={16} tone="#4d7a4a" />
            <span>100% Organic &amp; Homemade</span>
            <span className="pill__dot" />
          </motion.span>

          <motion.h1
            className="hero__title"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }}
          >
            <motion.span
              className="hero__title-line hero__title-line--1"
              variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(10px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {HEADLINE[0]}
            </motion.span>
            <motion.span
              className="hero__title-line hero__title-line--2"
              variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(10px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {HEADLINE[1]}
            </motion.span>
          </motion.h1>

          <motion.p
            className="hero__tamil tamil"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {site.tamilName} &mdash; {site.tamilTagline}
          </motion.p>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
          >
            Bath podi, hair oil, seekakai podi and hair packs &mdash; ground by hand in small
            batches. No chemicals, no preservatives, only the herbs you can smell.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <a
              className="btn btn--whatsapp btn--lg"
              href={orderLink('Herbal products')}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={20} />
              <span>Order on WhatsApp</span>
            </a>
            <button className="btn btn--ghost btn--lg" onClick={() => scrollToId('products')}>
              <span>Explore products</span>
              <ArrowRight size={18} />
            </button>
          </motion.div>

          <motion.ul
            className="hero__trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.9 }}
          >
            {[
              { icon: Sparkles, label: 'No chemicals' },
              { icon: ShieldCheck, label: 'No preservatives' },
              { icon: Droplets, label: 'Cold infused oils' },
              { icon: Star, label: 'Handmade batches' },
            ].map((item) => (
              <li key={item.label}>
                <item.icon size={16} />
                <span>{item.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="hero__stage-wrap">
          <HeroStage reduce={reduce} scaleArt={scaleArt} yArt={yArt} />
        </div>
      </motion.div>

      <button className="hero__scroll" onClick={() => scrollToId('about')} aria-label="Scroll down">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line">
          <motion.span
            animate={reduce ? undefined : { y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </button>
    </section>
  )
}
