import { motion, useReducedMotion } from 'framer-motion'
import { LeafShape } from './art/Ornaments.jsx'

/**
 * Infinite scrolling ribbon of brand promises.
 */
export default function Marquee({ items, speed = 34, reverse = false, className = '' }) {
  const reduce = useReducedMotion()
  const row = [...items, ...items]

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <motion.div
        className="marquee__row"
        animate={reduce ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((item, i) => (
          <span key={i} className="marquee__item">
            <LeafShape size={16} tone="currentColor" className="marquee__leaf" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
