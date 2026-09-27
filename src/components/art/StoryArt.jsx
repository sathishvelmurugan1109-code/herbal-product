/* ------------------------------------------------------------------ *
 * "Our Story" artwork - the hand drawn herbal still-life that fills the
 * arched frame, plus the small ornaments that sit around it.
 *
 * Kept in SVG on purpose: it is crisp at every size, weighs a couple of
 * kB instead of a megabyte, and needs no stock photography (the same
 * approach as ProductArt.jsx and Ornaments.jsx).
 * ------------------------------------------------------------------ */

/**
 * A pinnate sprig: one stem with paired leaflets.
 * `x`/`y` is the base of the stem, the sprig grows upwards and is then
 * rotated by `angle` degrees.
 */
export function Sprig({
  x = 0,
  y = 0,
  angle = 0,
  length = 220,
  leaves = 5,
  tone = '#4d7a4a',
  scale = 1,
  opacity = 1,
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`} opacity={opacity}>
      <path
        d={`M0 0 C 9 ${-length * 0.32} -7 ${-length * 0.66} 2 ${-length}`}
        stroke={tone}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      {Array.from({ length: leaves }).map((_, i) => {
        const t = (i + 0.9) / (leaves + 0.6)
        const ly = -length * t
        const side = i % 2 === 0 ? 1 : -1
        const ex = Math.sin(t * 4) * 5 + side * 22
        const ey = ly - 8
        return (
          <ellipse
            key={i}
            cx={ex}
            cy={ey}
            rx="23"
            ry="8.6"
            fill={tone}
            opacity={0.92 - t * 0.22}
            transform={`rotate(${side * 32} ${ex} ${ey})`}
          />
        )
      })}
    </g>
  )
}

/** One amla (gooseberry) with its six soft ridges. */
function Amla({ cx, cy, r }) {
  const dimples = Array.from({ length: 6 })
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="url(#sl-amla)" />
      <g opacity="0.22" stroke="#7d8b46" strokeWidth="1.4" fill="none">
        {dimples.map((_, i) => (
          <path key={i} d={`M${cx} ${cy - r} Q ${cx + r * 0.5} ${cy} ${cx} ${cy + r}`} transform={`rotate(${i * 30} ${cx} ${cy})`} />
        ))}
      </g>
      <path
        d={`M${cx - r * 0.55} ${cy - r * 0.35} q ${r * 0.3} ${-r * 0.35} ${r * 0.75} ${-r * 0.3}`}
        stroke="#ffffff"
        strokeOpacity="0.42"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={cx} cy={cy - r + 2} r="3.2" fill="#7d8b46" />
    </g>
  )
}

/** The hibiscus bloom with its long stamen. */
function Hibiscus({ cx = 118, cy = 516, scale = 0.82 }) {
  const petal = 'M0 0 C-28-20 -42-58 -34-92 C-28-118 -10-134 0-146 C10-134 28-118 34-92 C42-58 28-20 0 0 Z'
  return (
    <g transform={`translate(${cx} ${cy}) rotate(-16) scale(${scale})`}>
      <path d="M4-2c-34-26-58-16-70 12 26 14 56 8 70-12Z" fill="url(#sl-leaf)" opacity="0.92" />
      <path d="M-2 10c-30 20-60 16-74-8 24-18 56-16 74 8Z" fill="url(#sl-leaf2)" opacity="0.86" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`rotate(${i * 72})`} opacity={0.96 - (i % 3) * 0.06}>
          <path d={petal} fill={i === 2 ? 'url(#sl-petal2)' : 'url(#sl-petal)'} />
          <path d="M0-18 L0-130" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="2.4" />
          <path d="M0-30 C-14-52 -18-78 -12-104 C0-78 4-52 0-30Z" fill="#ffffff" opacity="0.13" />
        </g>
      ))}
      <circle r="18" fill="#a01830" />
      <circle r="10" fill="#7c1128" />
      <path d="M14 4c30-4 56-2 80 8" stroke="#e9cdac" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M16 8c26 6 44 14 58 26" stroke="#efd7b8" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      {[
        [94, 12, 4],
        [86, 26, 3.4],
        [70, 26, 3.4],
        [88, 2, 3.4],
        [74, 14, 3.4],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#f2cf57" />
      ))}
    </g>
  )
}
/**
 * The still-life: a wooden bowl of green podi with a scoop, a stone mortar
 * and pestle, hibiscus, turmeric, amla and fresh herb sprigs, all standing
 * on a grinding stone. Drawn for a 620 x 780 arch (the frame's ratio).
 */
export function HerbStillLife({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 620 780"
      width="620"
      height="780"
      fill="none"
      role="img"
      aria-label="Wooden bowl of green herbal powder with a scoop, a stone mortar and pestle, hibiscus, turmeric, amla and fresh herbs on a grinding stone"
    >
      <defs>
        <radialGradient id="sl-haze" cx="46%" cy="12%" r="74%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.62" />
          <stop offset="52%" stopColor="#eaf3dd" stopOpacity="0.46" />
          <stop offset="100%" stopColor="#dfeacd" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sl-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#20361f" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#20361f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sl-stoneTop" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#f5f1e5" />
          <stop offset="55%" stopColor="#ded6c4" />
          <stop offset="100%" stopColor="#c1b8a3" />
        </linearGradient>
        <linearGradient id="sl-stoneSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cdc4af" />
          <stop offset="100%" stopColor="#a2997f" />
        </linearGradient>
        <linearGradient id="sl-mortar" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#f1ebdd" />
          <stop offset="48%" stopColor="#d9d1bd" />
          <stop offset="100%" stopColor="#b0a68f" />
        </linearGradient>
        <linearGradient id="sl-wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#cb975c" />
          <stop offset="52%" stopColor="#a9713c" />
          <stop offset="100%" stopColor="#7a4a21" />
        </linearGradient>
        <linearGradient id="sl-wood2" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#dcaa6c" />
          <stop offset="100%" stopColor="#8a5a31" />
        </linearGradient>
        <radialGradient id="sl-powder" cx="42%" cy="26%" r="80%">
          <stop offset="0" stopColor="#dde8b9" />
          <stop offset="52%" stopColor="#9db472" />
          <stop offset="100%" stopColor="#6d8a4c" />
        </radialGradient>
        <linearGradient id="sl-petal" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#ff9d90" />
          <stop offset="42%" stopColor="#ee4a52" />
          <stop offset="100%" stopColor="#b81f36" />
        </linearGradient>
        <linearGradient id="sl-petal2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb3a6" />
          <stop offset="100%" stopColor="#c92341" />
        </linearGradient>
        <linearGradient id="sl-turmeric" x1="0.1" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#f2b848" />
          <stop offset="55%" stopColor="#d4932c" />
          <stop offset="100%" stopColor="#a9711f" />
        </linearGradient>
        <radialGradient id="sl-amla" cx="36%" cy="30%" r="74%">
          <stop offset="0" stopColor="#e3e9b2" />
          <stop offset="60%" stopColor="#bbca7c" />
          <stop offset="100%" stopColor="#8fa152" />
        </radialGradient>
        <linearGradient id="sl-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a3cd74" />
          <stop offset="100%" stopColor="#3f6f3d" />
        </linearGradient>
        <linearGradient id="sl-leaf2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#6b9a4f" />
          <stop offset="100%" stopColor="#a9cf7d" />
        </linearGradient>
      </defs>

      {/* arch interior light */}
      <rect width="620" height="780" fill="url(#sl-haze)" />

      {/* greenery behind everything - the two tall sprigs lean inwards so their
          crowns land in the upper middle of the arch instead of the corners
          (the seal badge covers the top left, the note the top right) */}
      <Sprig x={194} y={548} angle={7} length={392} leaves={7} tone="#8ab873" scale={1.1} opacity={0.78} />
      <Sprig x={438} y={536} angle={-8} length={372} leaves={7} tone="#7ba05c" scale={1.06} opacity={0.72} />
      <Sprig x={322} y={470} angle={-3} length={250} leaves={5} tone="#9ec97f" scale={0.95} opacity={0.5} />
      {/* grinding stone */}
      <ellipse cx="310" cy="702" rx="252" ry="48" fill="url(#sl-shadow)" />
      <ellipse cx="310" cy="656" rx="236" ry="58" fill="url(#sl-stoneSide)" />
      <ellipse cx="310" cy="638" rx="236" ry="58" fill="url(#sl-stoneTop)" />
      <g fill="#b3a992" opacity="0.32">
        {[
          [162, 620, 7, 3],
          [232, 660, 9, 3.4],
          [318, 610, 6, 2.6],
          [388, 664, 8, 3],
          [452, 618, 6, 2.4],
          [120, 650, 5, 2.2],
          [510, 652, 6, 2.6],
        ].map(([x, y, rx, ry], i) => (
          <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(${i * 17} ${x} ${y})`} />
        ))}
      </g>

      {/* stone mortar */}
      <ellipse cx="470" cy="588" rx="40" ry="12" fill="#a2997f" opacity="0.75" />
      <path d="M390 452 c4 78 32 130 80 130 s76-52 80-130 Z" fill="url(#sl-mortar)" />
      <path d="M404 470 c8 62 28 104 62 108" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M540 480 c-6 54-24 92-52 100" stroke="#8f8674" strokeOpacity="0.3" strokeWidth="8" strokeLinecap="round" fill="none" />
      <ellipse cx="470" cy="452" rx="80" ry="24" fill="url(#sl-mortar)" />
      <ellipse cx="470" cy="456" rx="64" ry="17" fill="#8f8674" />
      <ellipse cx="470" cy="452" rx="80" ry="24" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.6" fill="none" />

      {/* wooden pestle standing in the mortar */}
      <g transform="rotate(-13 470 452)">
        <rect x="452" y="252" width="36" height="232" rx="18" fill="url(#sl-wood)" />
        <path d="M462 268 v190" stroke="#7a4a21" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" />
        <path d="M478 274 v182" stroke="#dcaa6c" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="470" cy="264" rx="20" ry="15" fill="url(#sl-wood2)" />
        <ellipse cx="470" cy="470" rx="28" ry="21" fill="url(#sl-wood2)" />
        <ellipse cx="462" cy="462" rx="9" ry="6" fill="#e2b378" opacity="0.5" />
      </g>
      <Sprig x={62} y={520} angle={-20} length={190} leaves={4} tone="#6f9b62" scale={0.9} opacity={0.5} />
{/* wooden bowl of green podi */}
      <path d="M168 548 c0 66 50 108 132 108 s132-42 132-108 Z" fill="url(#sl-wood)" />
      <path d="M186 572 c10 48 48 76 104 80" stroke="#dcaa6c" strokeOpacity="0.32" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M400 570 c-8 44-40 72-92 78" stroke="#7a4a21" strokeOpacity="0.22" strokeWidth="8" strokeLinecap="round" fill="none" />
      <ellipse cx="300" cy="548" rx="132" ry="42" fill="#8a5a31" />
      <ellipse cx="300" cy="546" rx="120" ry="36" fill="#6a4222" />
      <ellipse cx="300" cy="540" rx="112" ry="30" fill="url(#sl-powder)" />
      <path d="M206 534 c20-24 66-34 110-24 -44 2-84 10-110 24Z" fill="#e5efc6" opacity="0.42" />
      <ellipse cx="256" cy="530" rx="52" ry="11" fill="#e5efc6" opacity="0.3" />
      <ellipse cx="352" cy="546" rx="34" ry="8" fill="#e5efc6" opacity="0.22" />
      <g fill="#d7e3ae" opacity="0.5">
        <ellipse cx="212" cy="548" rx="9" ry="3.4" />
        <ellipse cx="366" cy="556" rx="11" ry="3.6" />
        <ellipse cx="290" cy="566" rx="13" ry="3.8" />
      </g>

      {/* wooden scoop resting in the powder */}
      <g transform="rotate(-16 352 512)">
        <ellipse cx="352" cy="512" rx="31" ry="18" fill="url(#sl-wood2)" />
        <ellipse cx="352" cy="508" rx="25" ry="12" fill="#8a5a31" />
        <ellipse cx="352" cy="508" rx="22" ry="9.5" fill="url(#sl-powder)" />
        <path d="M379 500 c14-22 24-44 28-64" stroke="url(#sl-wood)" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M383 494 c12-20 21-40 25-58" stroke="#dcaa6c" strokeOpacity="0.35" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      </g>

      {/* hibiscus at the front left */}
      <Hibiscus cx={118} cy={516} scale={0.82} />

      {/* turmeric rhizomes */}
      <g>
        <path d="M128 692 c-6-26 8-48 32-52 22-4 38 10 42 30 4 20-4 40-20 48-18 10-40 6-50-10-3-5-4-11-4-16Z" fill="url(#sl-turmeric)" />
        <ellipse cx="112" cy="708" rx="17" ry="11" transform="rotate(-32 112 708)" fill="url(#sl-turmeric)" opacity="0.95" />
        <path d="M140 652 c14-6 30-2 42 10" stroke="#f8d489" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M162 700 c10 6 14 16 12 26" stroke="#8a5a31" strokeOpacity="0.35" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
      <g transform="rotate(24 246 704) scale(0.82)">
        <path d="M128 692 c-6-26 8-48 32-52 22-4 38 10 42 30 4 20-4 40-20 48-18 10-40 6-50-10-3-5-4-11-4-16Z" fill="url(#sl-turmeric)" opacity="0.96" />
        <path d="M140 652 c14-6 30-2 42 10" stroke="#f8d489" strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>

      {/* amla */}
      <Amla cx={416} cy={678} r={34} />
      <Amla cx={470} cy={700} r={27} />
      <Amla cx={432} cy={726} r={23} />

      {/* dried petals + seeds scattered over the stone */}
      <path d="M320 664 c18-9 42-7 56 6-17 11-42 8-56-6Z" fill="#b3243c" opacity="0.86" />
      <path d="M366 682 c14-7 32-5 43 5-13 8-32 6-43-5Z" fill="#c22b3f" opacity="0.7" />
      <path d="M186 636 c14-8 34-6 46 5-14 9-35 7-46-5Z" fill="#a81f36" opacity="0.72" />
      <g fill="#a9713c" opacity="0.85">
        <ellipse cx="286" cy="672" rx="6" ry="4" />
        <ellipse cx="304" cy="682" rx="5" ry="3.4" />
        <ellipse cx="342" cy="700" rx="5.6" ry="3.6" />
        <ellipse cx="372" cy="716" rx="4.6" ry="3" />
        <ellipse cx="258" cy="700" rx="5" ry="3.4" />
        <ellipse cx="500" cy="668" rx="5.4" ry="3.4" />
      </g>
      <g fill="#6f9b62" opacity="0.7">
        <ellipse cx="240" cy="720" rx="14" ry="5.4" transform="rotate(-18 240 720)" />
        <ellipse cx="392" cy="658" rx="12" ry="4.6" transform="rotate(12 392 658)" />
        <ellipse cx="516" cy="712" rx="13" ry="5" transform="rotate(-24 516 712)" />
      </g>

      {/* sprigs leaning on the stone at the sides */}
      <Sprig x={86} y={712} angle={-66} length={150} leaves={4} tone="#4d7a4a" scale={0.95} opacity={0.9} />
      <Sprig x={556} y={700} angle={-74} length={138} leaves={4} tone="#3f6f3d" scale={0.9} opacity={0.85} />

      {/* floating powder motes */}
      <g fill="#ffffff" opacity="0.5">
        <circle cx="196" cy="470" r="3.4" />
        <circle cx="176" cy="428" r="2.2" />
        <circle cx="232" cy="452" r="2.6" />
        <circle cx="418" cy="404" r="2.8" />
        <circle cx="392" cy="372" r="2" />
      </g>
    </svg>
  )
}
/**
 * The round "100% natural goodness" stamp that overlaps the arch.
 */
export function NaturalGoodnessSeal({ className = '', size = 112 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      role="img"
      aria-label="100% natural goodness"
    >
      <defs>
        <linearGradient id="sl-seal-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6cd8c" />
          <stop offset="45%" stopColor="#c8a24a" />
          <stop offset="100%" stopColor="#a8801f" />
        </linearGradient>
        <linearGradient id="sl-seal-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a8c79b" />
          <stop offset="100%" stopColor="#1f4a30" />
        </linearGradient>
      </defs>
      <circle cx="70" cy="70" r="68.5" fill="#fdfaf1" opacity="0.97" />
      <circle cx="70" cy="70" r="68.5" stroke="url(#sl-seal-gold)" strokeWidth="1.6" />
      <circle cx="70" cy="70" r="58.5" stroke="url(#sl-seal-gold)" strokeWidth="0.7" strokeDasharray="2 3" opacity="0.85" />
      <text
        x="70"
        y="45"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Times New Roman, serif"
        fontSize="17"
        letterSpacing="0.6"
        fill="#8a6a22"
      >
        100%
      </text>
      <g transform="translate(70 78)">
        <svg x="-16" y="-17" width="32" height="32" viewBox="0 0 32 32">
          <path d="M28 3C14 5 5 12 4 25c0 2 2 4 4 4 13-1 21-11 20-26Z" fill="url(#sl-seal-leaf)" />
          <path d="M26 6C19 12 13 19 8 27" stroke="#fbf7ee" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
        </svg>
      </g>
      <text
        x="70"
        y="112"
        textAnchor="middle"
        fontFamily="Outfit, Segoe UI, sans-serif"
        fontSize="8.6"
        fontWeight="600"
        letterSpacing="2.4"
        fill="#8a6a22"
      >
        NATURAL
      </text>
      <text
        x="70"
        y="125"
        textAnchor="middle"
        fontFamily="Outfit, Segoe UI, sans-serif"
        fontSize="8.6"
        fontWeight="600"
        letterSpacing="2.4"
        fill="#8a6a22"
      >
        GOODNESS
      </text>
      <circle cx="15" cy="70" r="2" fill="url(#sl-seal-gold)" />
      <circle cx="125" cy="70" r="2" fill="url(#sl-seal-gold)" />
    </svg>
  )
}

/**
 * The checklist icon: a leaf with a tick cut into it.
 */
export function LeafCheck({ size = 22, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M28 3C14 5 5 12 4 25c0 2 2 4 4 4 13-1 21-11 20-26Z" fill="#3f6b41" />
      <path d="M28 3C14 5 5 12 4 25c0 0 2 2 4 2 12-4 18-13 20-24Z" fill="#6f9b62" opacity="0.55" />
      <path d="M9.4 17.6l4.4 4.4L23.6 11" stroke="#fbf7ee" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * The little hand drawn arrow under the "Pure Herbs for Healthy You" note.
 */
export function NoteArrow({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 96" fill="none" aria-hidden="true">
      <path d="M112 6C104 46 78 74 30 80" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M46 67 28 81l20 7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 *  Gold line glyphs for the statistics bar.
 *
 *  Drawn in the same thin botanical language as the still-life above
 *  instead of borrowing generic UI icons, and stroked with
 *  `currentColor` so the stylesheet stays in charge of the colour.
 * ------------------------------------------------------------------ */

function StatGlyph({ size = 22, className = '', children }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

/** A young shoot - the signature herbal products we make. */
export function StatSprout(props) {
  return (
    <StatGlyph {...props}>
      <path d="M16 28.4V15" />
      <path d="M16 18.2c0-5 3.3-8.9 8.2-9.7.8 5.3-3 9.5-8.2 9.7Z" />
      <path d="M16 22.6c0-4.2-2.6-7.6-6.8-8.3-.7 4.4 2.5 8.1 6.8 8.3Z" />
      <path d="M10.6 28.4h10.8" />
    </StatGlyph>
  )
}

/** One veined leaf - the natural, chemical free claim. */
export function StatLeaf(props) {
  return (
    <StatGlyph {...props}>
      <path d="M26.6 4.2C14.4 5.4 6.6 11.9 5.8 24.3c-.1 2.2 1.6 3.9 3.8 3.9C21.7 27 28 18.3 26.6 4.2Z" />
      <path d="M25.2 6.8C18.8 12.2 12.9 18.7 8.6 26" />
      <path d="M14.2 15.5 10.4 13.6" />
      <path d="M19.4 10.6 15.6 8.7" />
    </StatGlyph>
  )
}

/** Stone mortar and pestle - nothing is heated, nothing is preserved. */
export function StatMortar(props) {
  return (
    <StatGlyph {...props}>
      <path d="M4.2 13.4h23.6" />
      <path d="M5.8 13.4c.5 6.2 4.7 10.5 10.2 10.5s9.7-4.3 10.2-10.5" />
      <path d="M12.2 23.9h7.6" />
      <path d="M19.6 13.2 24.6 6.2" />
      <circle cx="25.5" cy="5" r="2.1" />
    </StatGlyph>
  )
}

/** A message bubble holding a leaf - the WhatsApp order messages. */
export function StatMessage(props) {
  return (
    <StatGlyph {...props}>
      <path d="M27 14.2c0 5.5-5.1 10-11.4 10-1.4 0-2.8-.2-4.1-.7L5.6 26l1.9-4.5a9.7 9.7 0 0 1-3.6-7.3C3.9 8.7 8.9 4.2 15.3 4.2S27 8.7 27 14.2Z" />
      <path d="M21 9.6c-3.2.4-5.4 2.2-5.9 5.1 3.3.4 5.6-1.6 5.9-5.1Z" />
      <path d="M20.3 10.5c-1.4 1.2-2.7 2.6-3.8 4.3" />
    </StatGlyph>
  )
}
