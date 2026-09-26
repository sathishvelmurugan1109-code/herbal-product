import { motion, useReducedMotion } from 'framer-motion'
import { LeafShape } from './art/Ornaments.jsx'

const LEAVES = [
  { left: '4%', size: 30, tone: '#3f6b41', delay: 0, duration: 17, drift: 90, opacity: 0.5 },
  { left: '14%', size: 20, tone: '#6f9b62', delay: 3, duration: 21, drift: -70, opacity: 0.42 },
  { left: '26%', size: 34, tone: '#2f5c3a', delay: 1.4, duration: 19, drift: 60, opacity: 0.36 },
  { left: '38%', size: 22, tone: '#89ad72', delay: 5, duration: 24, drift: -110, opacity: 0.4 },
  { left: '52%', size: 28, tone: '#3f6b41', delay: 2.2, duration: 18, drift: 80, opacity: 0.34 },
  { left: '64%', size: 18, tone: '#6f9b62', delay: 6.4, duration: 22, drift: -60, opacity: 0.46 },
  { left: '76%', size: 32, tone: '#2f5c3a', delay: 0.8, duration: 20, drift: 100, opacity: 0.32 },
  { left: '88%', size: 24, tone: '#4d7a4a', delay: 4.2, duration: 23, drift: -80, opacity: 0.44 },
  { left: '95%', size: 20, tone: '#89ad72', delay: 7, duration: 26, drift: 70, opacity: 0.3 },
]

/**
 * CSS animated leaves drifting down the screen.
 * Pure transform animation so it stays cheap, and it is disabled
 * automatically for visitors who prefer reduced motion.
 */
export default function LeafRain({ count = LEAVES.length, className = '' }) {
  const reduce = useReducedMotion()
  const leaves = LEAVES.slice(0, count)

  if (reduce) return null

  return (
    <div className={`leaf-rain ${className}`} aria-hidden="true">
      {leaves.map((leaf, i) => (
        <motion.span
          key={i}
          className="leaf-rain__leaf"
          style={{ left: leaf.left, opacity: leaf.opacity }}
          initial={{ y: '-12vh', x: 0, rotate: 0 }}
          animate={{
            y: ['-12vh', '112vh'],
            x: [0, leaf.drift, leaf.drift * -0.4, leaf.drift * 0.6],
            rotate: [0, 180, 340, 520],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.35, 0.7, 1],
          }}
        >
          <LeafShape size={leaf.size} tone={leaf.tone} />
        </motion.span>
      ))}
    </div>
  )
}
