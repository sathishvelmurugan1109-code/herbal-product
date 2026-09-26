import { motion } from 'framer-motion'
import heroStage from '../assets/hero-stage.jpg'
import { products } from '../data/products.js'

/**
 * The hero display: one real photograph of all four signature products staged
 * together on a wooden platter (composited in _tmp_build/build.ps1), with the
 * product labels floating on top of it.
 *
 * x / y are percentages measured on the 1600 x 1466 composite, so every label
 * stays glued to its product at any size. `dir` is the side the chip sits on,
 * the small dot marks the product itself.
 */
const LABELS = [
  { id: 'hair-oil', x: 41.5, y: 44, dir: 'left', short: 'Hair Oil', delay: 0 },
  { id: 'seekakai-podi', x: 76.5, y: 62, dir: 'up', short: 'Seekakai Podi', delay: 0.45 },
  { id: 'bath-podi', x: 24.5, y: 64, dir: 'up', short: 'Bath Podi', delay: 0.9 },
  { id: 'hair-pack', x: 76.5, y: 80, dir: 'down', short: 'Hair Pack', delay: 1.35 },
]

const EASE = [0.22, 1, 0.36, 1]

export default function HeroStage({ reduce = false, yArt, scaleArt }) {
  return (
    <motion.figure
      className="stage"
      style={yArt || scaleArt ? { y: yArt, scale: scaleArt } : undefined}
      initial={{ opacity: 0, y: 34, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.05, ease: EASE, delay: 0.3 }}
    >
      <div className="stage__photo">
        <motion.img
          className="stage__img"
          src={heroStage}
          alt="Herbal bath podi, cold-infused hair oil, seekakai podi and hair pack on a wooden platter, surrounded by fresh turmeric, neem, hibiscus and amla"
          width={1600}
          height={1466}
          draggable="false"
          fetchPriority="high"
          animate={reduce ? undefined : { scale: [1.012, 1.055, 1.012] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* daylight slowly drifting across the scene */}
        <motion.span
          className="stage__light"
          aria-hidden="true"
          animate={
            reduce
              ? undefined
              : { x: ['-16%', '14%', '-16%'], y: ['-10%', '9%', '-10%'], opacity: [0.3, 0.55, 0.3] }
          }
          transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="stage__gloss" aria-hidden="true" />

        <motion.span
          className="stage__count"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
        >
          <strong>4</strong>
          <span>
            Signature
            <em>Products</em>
          </span>
        </motion.span>
      </div>
      <ul className="stage__labels">
        {LABELS.map((item) => {
          const product = products.find((p) => p.id === item.id)
          return (
            <motion.li
              key={item.id}
              className="stage__label"
              data-dir={item.dir}
              style={{ '--x': `${item.x}%`, '--y': `${item.y}%`, '--accent': product.accent }}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.9 + item.delay * 0.22 }}
            >
              <motion.span
                className="stage__label-dot"
                aria-hidden="true"
                animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.62, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: item.delay * 0.7 }}
              />
              <span className="stage__label-chip">
                <span className="stage__label-full">{product.name}</span>
                <span className="stage__label-short">{item.short}</span>
              </span>
            </motion.li>
          )
        })}
      </ul>

      <motion.div
        className="stage__seal"
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
          <defs>
            <path id="sealpath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <circle cx="60" cy="60" r="56" fill="#14301f" opacity="0.94" />
          <circle cx="60" cy="60" r="48" fill="none" stroke="#d8b968" strokeWidth="0.8" opacity="0.7" />
          <motion.g animate={reduce ? undefined : { rotate: 360 }} style={{ originX: '60px', originY: '60px' }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
            <text fill="#e8d79f" fontSize="11" fontFamily="Outfit, sans-serif" letterSpacing="2.6">
              <textPath href="#sealpath" startOffset="0%">
                100% NATURAL &nbsp;•&nbsp; CHEMICAL FREE &nbsp;•&nbsp; ORGANIC &nbsp;•&nbsp; HOMEMADE &nbsp;•&nbsp;
              </textPath>
            </text>
          </motion.g>
          <text x="60" y="66" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#f3e6bd">
            KS
          </text>
        </motion.svg>
      </motion.div>
    </motion.figure>
  )
}
