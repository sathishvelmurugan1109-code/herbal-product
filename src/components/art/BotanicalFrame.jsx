/*
 * Decor that belongs to the Tamil hair-care band only - the layered foliage
 * frame around the section, the tiny leaf particles drifting across it and
 * the delicate line art that sits inside each card.  Living in its own file
 * keeps every other section (which shares Ornaments.jsx) untouched.
 */

import curryLeaves from '../../assets/herbs/curry-leaves.jpg'
import hibiscus from '../../assets/herbs/hibiscus.jpg'
import vetiver from '../../assets/herbs/vetiver.jpg'
import amla from '../../assets/herbs/amla.jpg'
import { LeafShape } from './Ornaments.jsx'

/**
 * Out-of-focus leaves around the edges of the section.  Real photographs,
 * thrown far out of focus so they read as depth rather than as pictures.
 */
const BLURRED = [
  { src: curryLeaves, className: 'tb-leaf--tl', size: 520, opacity: 0.2, blur: 44, x: '-20%', y: '-20%', rot: '-18deg' },
  { src: amla, className: 'tb-leaf--tr', size: 420, opacity: 0.16, blur: 40, x: '108%', y: '-16%', rot: '22deg' },
  { src: vetiver, className: 'tb-leaf--bl', size: 460, opacity: 0.14, blur: 46, x: '-22%', y: '106%', rot: '14deg' },
  { src: hibiscus, className: 'tb-leaf--br', size: 440, opacity: 0.12, blur: 48, x: '106%', y: '102%', rot: '-12deg' },
]

/** Barely there botanical outlines that live behind everything else. */
function Silhouettes() {
  return (
    <div className="tb-silhouettes" aria-hidden="true">
      <svg className="tb-silhouette tb-silhouette--a" viewBox="0 0 240 200" fill="none">
        <path d="M16 196C64 150 120 96 224 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {Array.from({ length: 6 }).map((_, i) => {
          const t = i / 5
          const x = 16 + 208 * t
          const y = 196 - 174 * t
          return (
            <ellipse
              key={i}
              cx={x - 20}
              cy={y + 6}
              rx="22"
              ry="8"
              fill="currentColor"
              transform={`rotate(${-36 - i * 2} ${x - 20} ${y + 6})`}
            />
          )
        })}
      </svg>
      <svg className="tb-silhouette tb-silhouette--b" viewBox="0 0 240 200" fill="none">
        <path d="M16 196C64 150 120 96 224 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {Array.from({ length: 6 }).map((_, i) => {
          const t = i / 5
          const x = 16 + 208 * t
          const y = 196 - 174 * t
          return (
            <ellipse
              key={i}
              cx={x + 19}
              cy={y - 4}
              rx="20"
              ry="7.5"
              fill="currentColor"
              transform={`rotate(${31 + i * 2} ${x + 19} ${y - 4})`}
            />
          )
        })}
      </svg>
    </div>
  )
}


/**
 * The natural frame: blurred photographs in the foreground, sharp drawn
 * herbs in the middle, faint silhouettes furthest back.  The centre of the
 * section is left completely empty so the copy always reads first.
 */
export function FoliageFrame() {
  return (
    <div className="tb-frame" aria-hidden="true">
      <Silhouettes />

      {BLURRED.map((leaf) => (
        <span
          key={leaf.className}
          className={`tb-leaf ${leaf.className}`}
          style={{
            width: leaf.size,
            height: leaf.size,
            left: leaf.x,
            top: leaf.y,
            opacity: leaf.opacity,
            filter: `blur(${leaf.blur}px)`,
            transform: `rotate(${leaf.rot})`,
          }}
        >
          <img src={leaf.src} alt="" loading="lazy" decoding="async" />
        </span>
      ))}

      {/* middle depth: the sharp herbs that frame the copy */}
      <span className="tb-sprig tb-sprig--tr">
        <LeafShape size={78} tone="#5f8f5a" />
      </span>
      <span className="tb-sprig tb-sprig--tr2">
        <LeafShape size={54} tone="#7fae74" />
      </span>
      <span className="tb-sprig tb-sprig--bl">
        <LeafShape size={64} tone="#6d9a63" />
      </span>
      <span className="tb-sprig tb-sprig--br">
        <LeafShape size={46} tone="#8bb47e" />
      </span>
    </div>
  )
}

/* Tiny leaves loose in the margins - pure CSS drift, never in the copy column. */
const PARTICLES = [
  { left: '4%', top: '22%', size: 17, tone: '#8fb98a', dx: 9, dy: -13, rot: -12, duration: 17, delay: 0 },
  { left: '11%', top: '72%', size: 13, tone: '#b6cfa8', dx: -7, dy: -16, rot: 16, duration: 21, delay: 2.6 },
  { left: '95%', top: '30%', size: 15, tone: '#8fb98a', dx: -9, dy: -12, rot: 22, duration: 19, delay: 1.1 },
  { left: '90%', top: '78%', size: 12, tone: '#a8c79b', dx: 7, dy: -15, rot: -18, duration: 23, delay: 3.4 },
  { left: '62%', top: '6%', size: 11, tone: '#c3d6ae', dx: 6, dy: -10, rot: 12, duration: 25, delay: 4.2 },
  { left: '34%', top: '95%', size: 12, tone: '#c3d6ae', dx: -6, dy: -11, rot: -9, duration: 24, delay: 5.1 },
]

export function LeafParticles() {
  return (
    <div className="tb-particles" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="tb-particle"
          style={{
            left: p.left,
            top: p.top,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--rot': `${p.rot}deg`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${-p.delay}s`,
          }}
        >
          <LeafShape size={p.size} tone={p.tone} />
        </span>
      ))}
    </div>
  )
}

/** Hairline sprig that rests in the corner of a card, like a pressed plant. */
export function CardLineArt({ className = '', flip = false }) {
  const nodes = [
    { x: 22, y: 96, a: 14, s: 1 },
    { x: 36, y: 74, a: 6, s: 0.92 },
    { x: 48, y: 50, a: -8, s: 0.84 },
    { x: 57, y: 26, a: -26, s: 0.72 },
  ]

  return (
    <svg
      className={className}
      viewBox="0 0 80 110"
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M10 108C28 88 44 62 56 22c4-13 7-17 8-20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {nodes.map((n) => (
        <g key={`${n.x}-${n.y}`} transform={`translate(${n.x} ${n.y})`}>
          {[n.a, n.a - 108].map((angle) => (
            <path
              key={angle}
              d="M1 0c7-6 17-8 26-5-6 7-17 10-27 5Z"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              transform={`rotate(${angle}) scale(${n.s})`}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}
