import { ArrowUp } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { navLinks, site } from '../data/site.js'
import { orderLink, scrollToId, whatsappLink } from '../lib/links.js'
import WhatsAppIcon from '../components/ui/WhatsAppIcon.jsx'
import { LeafMark } from '../components/art/Ornaments.jsx'
import Marquee from '../components/Marquee.jsx'

export default function Footer() {
  const reduce = useReducedMotion()

  return (
    <footer className="footer">
      <Marquee
        items={['100% Natural', 'Chemical Free', 'Organic', 'Homemade', 'No Preservatives', 'Made in Tamil Nadu']}
        speed={30}
        className="marquee--gold"
      />

      <div className="container footer__grid">
        <div className="footer__brand">
          <LeafMark size={62} spin />
          <h3>
            Keerthika <em>Sai</em>
          </h3>
          <p className="footer__tamil tamil">{site.tamilName}</p>
          <p className="footer__text">
            Organic, homemade herbal care for skin and hair. Ground by hand, packed fresh, delivered
            with love.
          </p>
          <a className="btn btn--whatsapp" href={orderLink('General enquiry')} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} />
            <span>Chat with us</span>
          </a>
        </div>

        <nav className="footer__col" aria-label="Footer navigation">
          <h4>Explore</h4>
          <ul>
            {navLinks.slice(0, 5).map((link) => (
              <li key={link.id}>
                <button onClick={() => scrollToId(link.id)}>{link.label}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h4>Products</h4>
          <ul className="footer__products">
            {['Herbal Bath Podi', 'Herbal Hair Oil', 'Seekakai Podi', 'Herbal Hair Pack'].map((p) => (
              <li key={p}>
                <a href={orderLink(p)} target="_blank" rel="noreferrer">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} /> {site.phoneDisplay}
              </a>
            </li>
            <li className="footer__muted">{site.hours}</li>
            <li className="footer__muted">Follow the journey: ask us for our latest photos &amp; videos on WhatsApp</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="tamil">
          ஆரோக்கியமான, அழகான கூந்தலை மீண்டும் கண்டறியுங்கள் — {site.tamilName}
        </p>
        <p>
          &copy; {new Date().getFullYear()} {site.brand} {site.brandLine2}. All rights reserved.
        </p>
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
