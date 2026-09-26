import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * 3D tilt-on-hover card with a soft light that follows the pointer.
 */
export default function TiltCard({ children, className = '', intensity = 10, glare = true }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), { stiffness: 180, damping: 18 })
  const glareX = useTransform(mx, (v) => `${v * 100}%`)
  const glareY = useTransform(my, (v) => `${v * 100}%`)

  const handleMove = (event) => {
    if (reduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((event.clientX - rect.left) / rect.width)
    my.set((event.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    >
      {children}
      {glare && !reduce && (
        <motion.span
          className="tilt__glare"
          aria-hidden="true"
          style={{ '--gx': glareX, '--gy': glareY }}
        />
      )}
    </motion.div>
  )
}
