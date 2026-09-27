import { ArrowRight, ArrowUp, Ban, HeartHandshake, Leaf, Sprout } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { navLinks, site } from '../data/site.js'
import { orderLink, scrollToId, whatsappLink } from '../lib/links.js'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { Branch, LeafMark, LeafShape } from '../components/art/Ornaments.jsx'
import Marquee from '../components/Marquee.jsx'

/* Real botanical photography for the canopy edges - the same herbs the rest
   of the page already introduces, so the footer closes the same garden. */
import herbCurryLeaves from '../assets/herbs/curry-leaves.jpg'
import herbHibiscus from '../assets/herbs/hibiscus.jpg'
import herbVetiver from '../assets/herbs/vetiver.jpg'
import oilStillLife from '../assets/products/oil-card.jpg'

const PRODUCT_LINKS = ['Herbal Bath Podi', 'Herbal Hair Oil', 'Seekakai Podi', 'Herbal Hair Pack']

/*
 * The claim badges under the CTA.  Every label is already made elsewhere on
 * the page, so the footer never promises anything new.
 */
const TRUST_BADGES = [
  { Icon: Leaf, top: '100%', bottom: 'Natural' },
  { Icon: Ban, top: 'No', bottom: 'Chemicals' },
  { Icon: HeartHandshake, top: 'Homemade', bottom: 'with Love' },
  { Icon: Sprout, top: 'Traditional', bottom: 'Recipes' },
]

/* The closing trust bar - supported claims only. */
const TRUST_STRIP = [
  { Icon: Leaf, label: 'Real Ingredients' },
  { Icon: Sprout, label: 'Traditional Methods' },
  { Icon: HeartHandshake, label: 'Trusted by Families' },
]

/* Out-of-focus herbs that frame the far left and far right edges. */
const CANOPY = [
  { src: herbCurryLeaves, className: 'footer__herb--tl', size: 420, opacity: 0.16, blur: 34, rot: '-16deg' },
  { src: herbVetiver, className: 'footer__herb--bl', size: 360, opacity: 0.13, blur: 36, rot: '12deg' },
  { src: herbHibiscus, className: 'footer__herb--tr', size: 320, opacity: 0.14, blur: 30, rot: '18deg' },
  { src: oilStillLife, className: 'footer__herb--br', size: 400, opacity: 0.2, blur: 26, rot: '-8deg' },
]

/* Tiny leaves loose in the margins - pure CSS drift. */
const PARTICLES = [
  { left: '6%', top: '18%', size: 15, tone: '#8fb98a', dx: 8, dy: -14, rot: -14, duration: 19, delay: 0 },
  { left: '14%', top: '74%', size: 12, tone: '#b6cfa8', dx: -7, dy: -16, rot: 18, duration: 23, delay: 3.1 },
  { left: '94%', top: '26%', size: 14, tone: '#9ec98f', dx: -9, dy: -12, rot: 22, duration: 21, delay: 1.2 },
  { left: '88%', top: '68%', size: 11, tone: '#c3d6ae', dx: 7, dy: -15, rot: -18, duration: 25, delay: 4.4 },
  { left: '48%', top: '8%', size: 10, tone: '#c3d6ae', dx: 6, dy: -11, rot: 12, duration: 27, delay: 2.2 },
  { left: '30%', top: '92%', size: 12, tone: '#c3d6ae', dx: -6, dy: -12, rot: -9, duration: 24, delay: 5.3 },
]

/** Light 15px lift so the closing scene never bounces in aggressively. */
function Lift({ children, className = '', delay = 0, duration = 0.6, amount = 0.2 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Footer() {
  const reduce = useReducedMotion()

  return (
    <footer className="footer">
      <Marquee
        items={['100% Natural', 'Chemical Free', 'Organic', 'Homemade', 'No Preservatives', 'Made in Tamil Nadu']}
        speed={30}
        className="marquee--gold"
      />

      {/* ---------------- forest canopy background ---------------- */}
      <div className="footer__bg" aria-hidden="true">
        <span className="footer__glow footer__glow--top" />
        <span className="footer__glow footer__glow--bottom" />
        <span className="footer__vignette" />

        <Branch className="footer__branch footer__branch--left" width={320} tone="#1c4b31" />
        <Branch className="footer__branch footer__branch--right" width={300} flip tone="#1c4b31" />

        {CANOPY.map((herb) => (
          <span
            key={herb.className}
            className={`footer__herb ${herb.className}`}
            style={{
              width: herb.size,
              height: herb.size,
              opacity: herb.opacity,
              filter: `blur(${herb.blur}px)`,
              transform: `rotate(${herb.rot})`,
            }}
          >
            <img src={herb.src} alt="" loading="lazy" decoding="async" />
          </span>
        ))}

        <span className="footer__particles">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="footer__particle"
              style={{
                left: p.left,
                top: p.top,
                '--ft-dx': `${p.dx}px`,
                '--ft-dy': `${p.dy}px`,
                '--ft-rot': `${p.rot}deg`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${-p.delay}s`,
              }}
            >
              <LeafShape size={p.size} tone={p.tone} />
            </span>
          ))}
        </span>
      </div>

      <div className="footer__inner">
        <div className="footer__grid">
          {/* ---------------------- 1. brand ---------------------- */}
          <Lift className="footer__brand">
            <span className="footer__logo">
              <LeafMark size={74} spin={!reduce} />
            </span>

            <h3 className="footer__wordmark">
              Keerthika <em>Sai</em>
            </h3>
            <p className="footer__tamil tamil">{site.tamilName}</p>

            <p className="footer__script">
              Pure Herbs
              <br />
              Happier You
            </p>

            <p className="footer__text">
              Organic, homemade herbal care for skin and hair. Ground by hand, packed fresh, delivered
              with love.
            </p>

            <a className="footer__cta" href={orderLink('General enquiry')} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={19} />
              <span>Chat with us</span>
              <ArrowRight size={16} className="footer__cta-arrow" aria-hidden="true" />
            </a>

            <ul className="footer__badges">
              {TRUST_BADGES.map(({ Icon, top, bottom }, i) => (
                <motion.li
                  key={`${top}-${bottom}`}
                  className="footer__badge"
                  initial={reduce ? undefined : { opacity: 0, scale: 0.82 }}
                  whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="footer__badge-ring" aria-hidden="true">
                    <Icon size={15} strokeWidth={1.6} />
                  </span>
                  <span className="footer__badge-text">
                    {top}
                    <br />
                    {bottom}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Lift>

          {/* ---------------------- 2. explore -------------------- */}
          <Lift className="footer__cell" delay={0.08}>
            <nav className="footer__col footer__col--explore" aria-label="Footer navigation">
              <h4>Explore</h4>
              <ul>
                {navLinks.slice(0, 5).map((link) => (
                  <li key={link.id}>
                    <button type="button" onClick={() => scrollToId(link.id)}>
                      <span>{link.label}</span>
                      <ArrowRight size={14} className="footer__link-arrow" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </Lift>

          {/* ---------------------- 3. products ------------------- */}
          <Lift className="footer__cell" delay={0.14}>
            <div className="footer__col footer__col--products">
              <h4>Products</h4>
              <ul className="footer__products">
                {PRODUCT_LINKS.map((p) => (
                  <li key={p}>
                    <a href={orderLink(p)} target="_blank" rel="noreferrer">
                      <Leaf size={14} className="footer__leaf-icon" aria-hidden="true" />
                      <span>{p}</span>
                      <ArrowRight size={14} className="footer__link-arrow" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Lift>

          {/* ---------------------- 4. contact -------------------- */}
          <Lift className="footer__cell" delay={0.2}>
            <div className="footer__col footer__col--contact">
              <h4>Contact</h4>

              <a className="footer__phone" href={whatsappLink()} target="_blank" rel="noreferrer">
                <span className="footer__phone-icon" aria-hidden="true">
                  <WhatsAppIcon size={20} />
                </span>
                <span>{site.phoneDisplay}</span>
              </a>

              <p className="footer__muted">{site.hours}</p>
              <p className="footer__muted">
                Follow the journey: ask us for our latest photos &amp; videos on WhatsApp
              </p>

              <p className="footer__script footer__script--contact" aria-hidden="true">
                Natural
                <br />
                Care
                <br />
                Always
                <br />
                Near
              </p>
            </div>
          </Lift>
        </div>

        {/* ---------------- central brand message ---------------- */}
        <Lift className="footer__coda" delay={0.1}>
          <span className="footer__coda-art" aria-hidden="true">
            <LeafShape size={38} tone="#2f6440" />
            <Branch className="footer__coda-branch" width={220} tone="#245236" />
          </span>
          <p className="footer__coda-text">
            Handmade
            <br />
            Herbal Care
            <br />
            for a Healthier You
          </p>
        </Lift>

        {/* -------------------- trust strip --------------------- */}
        <Lift className="footer__strip-wrap" delay={0.12} amount={0.3}>
          <ul className="footer__strip">
            {TRUST_STRIP.map(({ Icon, label }, i) => (
              <li key={label} className="footer__strip-item">
                {i > 0 && <span className="footer__strip-sep" aria-hidden="true" />}
                <span className="footer__strip-icon" aria-hidden="true">
                  <Icon size={15} strokeWidth={1.7} />
                </span>
                <span className="footer__strip-label">{label}</span>
              </li>
            ))}
          </ul>
        </Lift>

        {/* ------------------------ divider ---------------------- */}
        <div className="footer__rule">
          <span className="footer__rule-line" aria-hidden="true" />
          <span className="footer__rule-leaf" aria-hidden="true">
            <LeafShape size={13} tone="#c89d3c" />
          </span>
          <span className="footer__rule-line footer__rule-line--end" aria-hidden="true" />
        </div>

        {/* ----------------------- copyright --------------------- */}
        <div className="footer__bottom">
          <p className="footer__bottom-tamil tamil">
            ஆரோக்கியமான, அழகான கூந்தலை மீண்டும் கண்டறியுங்கள் — {site.tamilName}
          </p>
          <p>
            &copy; {new Date().getFullYear()} {site.brand} {site.brandLine2}. All rights reserved.
          </p>
        </div>
      </div>

      <motion.button
        className="to-top"
        onClick={() => scrollToId('home')}
        aria-label="Back to top"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        whileHover={reduce ? undefined : { y: -4 }}
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  )
}
