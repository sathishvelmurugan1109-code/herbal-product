import { motion, useReducedMotion } from 'framer-motion'

const variants = {
  up: { hidden: { opacity: 0, y: 46 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -36 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 64 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -64 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: 'blur(14px)', y: 26 }, show: { opacity: 1, filter: 'blur(0px)', y: 0 } },
}

/**
 * Scroll-triggered reveal wrapper.
 * <Reveal direction="up" delay={0.2}><h2>...</h2></Reveal>
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.85,
  amount = 0.25,
  className = '',
  as = 'div',
  once = true,
  style,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants[direction] || variants.up}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
