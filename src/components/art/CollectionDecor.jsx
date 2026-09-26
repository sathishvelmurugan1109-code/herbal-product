/*
 * Decor that belongs to the "Our Collection" band only - thin botanical line
 * art for the section corners, a leaf that rests on each card photo and the
 * dust motes drifting behind the grid.  Living in its own file keeps every
 * other section (which shares Ornaments.jsx) untouched.
 */

/** Slim sprig for the section corners. Line art: a hairline stem with paired leaflets. */
export function CornerSprig({ className = '', width = 250, flip = false, tone = 'currentColor' }) {
  /* points sampled along the stem curve, so the leaflets sit on the line */
  const nodes = [
    { x: 39, y: 206, a: 8, s: 1 },
    { x: 70, y: 172, a: 4, s: 1 },
    { x: 96, y: 134, a: -2, s: 0.94 },
    { x: 118, y: 92, a: -14, s: 0.86 },
    { x: 139, y: 42, a: -40, s: 0.74 },
  ]

  return (
    <svg
      className={className}
      width={width}
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M6 236C52 200 92 150 118 92c18-40 28-66 32-86"
        stroke={tone}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.85"
      />
      {nodes.map((n) => (
        <g key={`${n.x}-${n.y}`} transform={`translate(${n.x} ${n.y})`}>
          {[n.a, n.a - 112].map((angle) => (
            <g key={angle} transform={`rotate(${angle}) scale(${n.s})`}>
              <path
                d="M1 0c9-7 21-10 32-6-7 9-21 13-33 6Z"
                fill={tone}
                fillOpacity="0.12"
                stroke={tone}
                strokeWidth="1.1"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M5 0c9-1 18-2 26-4"
                stroke={tone}
                strokeWidth="0.9"
                opacity="0.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </g>
      ))}
      <circle cx="152" cy="4" r="2.4" fill={tone} opacity="0.5" />
      <circle cx="163" cy="16" r="1.6" fill={tone} opacity="0.35" />
    </svg>
  )
}

/** Single leaf with veins, used as a small accent on and around the cards. */
export function CardLeaf({ className = '', flip = false, size = 44, tone = '#7f9f6a', style }) {
  return (
    <svg
      className={className}
      width={size}
      height={Math.round(size * 1.35)}
      viewBox="0 0 34 46"
      fill="none"
      aria-hidden="true"
      style={{ ...(flip ? { transform: 'scaleX(-1)' } : null), ...style }}
    >
      <path
        d="M17 44C8 38 3 30 3 21 3 11 9 3 17 0c8 3 14 11 14 21 0 9-5 17-14 23Z"
        fill={tone}
        fillOpacity="0.14"
        stroke={tone}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M17 43V5" stroke={tone} strokeWidth="1" opacity="0.75" strokeLinecap="round" />
      <path
        d="M17 15c-4-2-7-4-9-8M17 25c-3-2-6-3-8-6M17 15c4-2 7-4 9-8M17 25c3-2 6-3 8-6"
        stroke={tone}
        strokeWidth="0.9"
        opacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* kept out of the way of the copy - every mote sits near a section edge */
const MOTES = [
  { left: '3.5%', top: '18%', size: 5, delay: 0, tone: 'gold' },
  { left: '8.5%', top: '62%', size: 4, delay: 2.4, tone: 'sage' },
  { left: '16%', top: '88%', size: 3, delay: 4.1, tone: 'gold' },
  { left: '88%', top: '12%', size: 5, delay: 1.2, tone: 'sage' },
  { left: '94%', top: '52%', size: 4, delay: 3.3, tone: 'gold' },
  { left: '81%', top: '92%', size: 6, delay: 5, tone: 'sage' },
]

const DUST_LEAVES = [
  { left: '2%', top: '40%', size: 20, delay: 0.6, flip: false },
  { left: '96%', top: '28%', size: 18, delay: 3.9, flip: true },
  { left: '90%', top: '74%', size: 22, delay: 1.9, flip: false },
]

/** Almost invisible drifting leaves + gold dust. Never intercepts the pointer. */
export function DustMotes() {
  return (
    <div className="products__motes" aria-hidden="true">
      {MOTES.map((m) => (
        <span
          key={`${m.left}-${m.top}`}
          className={`products__mote products__mote--${m.tone}`}
          style={{ left: m.left, top: m.top, '--s': `${m.size}px`, animationDelay: `${m.delay}s` }}
        />
      ))}
      {DUST_LEAVES.map((l) => (
        <CardLeaf
          key={`${l.left}-${l.top}`}
          className="products__mote products__mote--leaf"
          size={l.size}
          tone="#6d8f5f"
          style={{ left: l.left, top: l.top, animationDelay: `${l.delay}s`, rotate: l.flip ? '-9deg' : '9deg' }}
        />
      ))}
    </div>
  )
}
