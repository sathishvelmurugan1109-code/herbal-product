import { motion } from 'framer-motion'

/** The Keerthika Sai seal: circle + leaf + KS monogram. */
export function LeafMark({ size = 56, className = '', spin = false }) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Keerthika Sai logo"
      animate={spin ? { rotate: [0, 4, -3, 0] } : undefined}
      transition={spin ? { duration: 9, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <defs>
        <linearGradient id="ksleaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a8c79b" />
          <stop offset="1" stopColor="#1f4a30" />
        </linearGradient>
        <linearGradient id="ksgold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6cd8c" />
          <stop offset="1" stopColor="#b98a2e" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" stroke="url(#ksgold)" strokeWidth="1.2" opacity="0.9" />
      <path d="M50 8c-12 2-21 8-24 20-1 5 2 10 7 10 13 0 19-15 17-30Z" fill="url(#ksleaf)" opacity="0.95" />
      <path d="M47 13c-7 6-13 13-18 23" stroke="#f6f1e2" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="24"
        letterSpacing="1"
        fill="url(#ksgold)"
      >
        KS
      </text>
    </motion.svg>
  )
}

/** Gold leaf divider used under section titles. */
export function LeafDivider({ width = 190 }) {
  return (
    <svg className="leaf-divider" width={width} height="20" viewBox="0 0 190 20" fill="none" aria-hidden="true">
      <path d="M2 10h62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
      <path d="M126 10h62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
      <path d="M95 4c6 3 10 4 16 6-6 2-10 3-16 6-6-3-10-4-16-6 6-2 10-3 16-6Z" fill="currentColor" opacity="0.85" />
      <circle cx="72" cy="10" r="1.6" fill="currentColor" opacity="0.7" />
      <circle cx="118" cy="10" r="1.6" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

/** Decorative branch, used as a background ornament on several sections. */
export function Branch({ className = '', width = 240, flip = false, tone = '#4d7a4a' }) {
  return (
    <svg
      className={className}
      width={width}
      viewBox="0 0 240 200"
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M16 196C64 150 120 96 224 22" stroke={tone} strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
      {Array.from({ length: 7 }).map((_, i) => {
        const t = i / 6
        const x = 16 + (224 - 16) * t
        const y = 196 - (196 - 22) * t
        return (
          <g key={i} opacity={0.85 - t * 0.25}>
            <ellipse cx={x - 22} cy={y + 6} rx="24" ry="9" fill={tone} transform={`rotate(${-38 - i * 2} ${x - 22} ${y + 6})`} opacity="0.42" />
            <ellipse cx={x + 20} cy={y - 4} rx="22" ry="8" fill={tone} transform={`rotate(${32 + i * 2} ${x + 20} ${y - 4})`} opacity="0.32" />
          </g>
        )
      })}
    </svg>
  )
}

/** Single leaf shape, reused by the leaf-rain animation. */
export function LeafShape({ size = 26, tone = '#4d7a4a', className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M28 3C14 5 5 12 4 25c0 2 2 4 4 4 13-1 21-11 20-26Z" fill={tone} opacity="0.85" />
      <path d="M26 6C19 12 13 19 8 27" stroke="#fbf7ee" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

/** Hanging vine used at the top of the hero. */
export function Vine({ className = '', width = 300, tone = '#3f6b41' }) {
  return (
    <svg className={className} width={width} viewBox="0 0 300 320" fill="none" aria-hidden="true">
      <path d="M150 0c-6 60 8 100 -18 160-14 32-6 70 12 100" stroke={tone} strokeWidth="2" opacity="0.75" />
      {Array.from({ length: 8 }).map((_, i) => {
        const y = 26 + i * 36
        const x = 150 + Math.sin(i * 0.8) * 26 - i * 1.4
        const side = i % 2 === 0 ? 1 : -1
        return (
          <g key={i}>
            <path
              d={`M${x} ${y}c${20 * side} 4 ${30 * side} 14 ${34 * side} 30`}
              stroke={tone}
              strokeWidth="1.5"
              opacity="0.6"
            />
            <ellipse
              cx={x + 34 * side}
              cy={y + 34}
              rx="15"
              ry="6.5"
              fill={tone}
              opacity="0.5"
              transform={`rotate(${18 * side} ${x + 34 * side} ${y + 34})`}
            />
          </g>
        )
      })}
    </svg>
  )
}
