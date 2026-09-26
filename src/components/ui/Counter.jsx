import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/**
 * Counts up to `value` the first time it scrolls into view.
 */
export default function Counter({ value = 0, suffix = '', duration = 2, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduce])

  const rounded = Number.isInteger(value) ? Math.round(display) : display.toFixed(1)

  return (
    <span ref={ref} className={className}>
      {rounded}
      {suffix}
    </span>
  )
}
