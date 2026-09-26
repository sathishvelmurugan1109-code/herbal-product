import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * A soft glowing herbal cursor that trails the pointer.
 * Only rendered for fine pointers (mouse/trackpad) - never on touch.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 })

  useEffect(() => {
    const fine =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine)
    if (!fine) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const el = e.target
      setHovering(Boolean(el?.closest?.('a, button, .tilt, input, textarea, select')))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className={`cursor-glow ${visible ? 'is-visible' : ''}`}
        style={{ x: sx, y: sy }}
        animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.85 : 0.5 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        aria-hidden="true"
      />
      <motion.div
        className={`cursor-dot ${visible ? 'is-visible' : ''}`}
        style={{ x, y }}
        animate={{ scale: hovering ? 0.4 : 1 }}
        aria-hidden="true"
      />
    </>
  )
}
