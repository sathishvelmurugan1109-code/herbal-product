import React from 'react'

/**
 * Editorial Botanical KS Seal:
 * 104px diameter, thin gold concentric double-rim, transparent forest core,
 * botanical leaf sprig integrated across perimeter, elegant serif KS monogram.
 */
export function BrandSeal({ size = 104, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 104 104"
      fill="none"
      role="img"
      aria-label="Keerthika Sai Seal"
    >
      <defs>
        <radialGradient id="ps-seal-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#123822" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#082014" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#05160d" stopOpacity="0.96" />
        </radialGradient>
        <linearGradient id="ps-gold-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7e5b5" />
          <stop offset="45%" stopColor="#cfa24b" />
          <stop offset="75%" stopColor="#ebd69b" />
          <stop offset="100%" stopColor="#9a6e24" />
        </linearGradient>
        <linearGradient id="ps-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9ec98f" />
          <stop offset="50%" stopColor="#558a4d" />
          <stop offset="100%" stopColor="#255230" />
        </linearGradient>
        <filter id="ps-seal-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <circle cx="52" cy="52" r="48" fill="url(#ps-seal-bg)" />
      <circle
        cx="52"
        cy="52"
        r="47.5"
        stroke="url(#ps-gold-rim)"
        strokeWidth="1.2"
        strokeDasharray="180 3 4 3"
        opacity="0.95"
      />
      <circle
        cx="52"
        cy="52"
        r="42.5"
        stroke="url(#ps-gold-rim)"
        strokeWidth="0.8"
        strokeOpacity="0.45"
      />

      <path
        d="M74 16C58 17 44 26 39 42C37 49 42 56 49 56C66 56 78 36 74 16Z"
        fill="url(#ps-leaf-grad)"
        opacity="0.92"
      />
      <path
        d="M71 21C61 28 51 38 45 50"
        stroke="#f7f1e1"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M58 29c-4-1-8 0-11 3M64 36c-4-1-7 1-10 4"
        stroke="#f7f1e1"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M36 28c4 3 6 8 4 12-4-2-7-6-6-10 1-1 2-2 2-2Z"
        fill="url(#ps-gold-rim)"
        opacity="0.8"
      />

      <text
        x="52"
        y="68"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="38"
        fontWeight="600"
        letterSpacing="2.5"
        fill="url(#ps-gold-rim)"
        filter="url(#ps-seal-glow)"
      >
        KS
      </text>

      <polygon
        points="52,87 54.5,90 52,93 49.5,90"
        fill="url(#ps-gold-rim)"
        opacity="0.8"
      />
    </svg>
  )
}


/**
 * Botanical Still-Life Left Garnish:
 * Stone mortar bowl filled with herbal bath powder, golden turmeric,
 * red hibiscus bloom, amla berries, and curry leaves on a slate base.
 */
export function LeftBotanicalFlank() {
  return (
    <svg
      className="preloader__flank preloader__flank--left"
      viewBox="0 0 380 440"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pfl-stone-base" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#253527" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#142217" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#08140c" stopOpacity="0.98" />
        </radialGradient>
        <linearGradient id="pfl-mortar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a5e4b" />
          <stop offset="45%" stopColor="#2f4233" />
          <stop offset="100%" stopColor="#152418" />
        </linearGradient>
        <radialGradient id="pfl-powder" cx="45%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#d5e3a8" />
          <stop offset="40%" stopColor="#a9c279" />
          <stop offset="78%" stopColor="#75934f" />
          <stop offset="100%" stopColor="#4c672f" />
        </radialGradient>
        <radialGradient id="pfl-gold-pow" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fbe282" />
          <stop offset="50%" stopColor="#e5b338" />
          <stop offset="100%" stopColor="#9a6e19" />
        </radialGradient>
        <radialGradient id="pfl-amla" cx="35%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#e5edb8" />
          <stop offset="55%" stopColor="#bbcc7d" />
          <stop offset="100%" stopColor="#697f39" />
        </radialGradient>
        <linearGradient id="pfl-petal" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ff7b88" />
          <stop offset="38%" stopColor="#d8243b" />
          <stop offset="100%" stopColor="#7a0d1f" />
        </linearGradient>
      </defs>

      <ellipse cx="180" cy="390" rx="170" ry="32" fill="url(#pfl-stone-base)" />
      <path
        d="M20 390c0 14 65 28 160 28s160-14 160-28c-20 22-90 32-160 32S40 412 20 390Z"
        fill="#0b170e"
        opacity="0.9"
      />

      <ellipse cx="160" cy="310" rx="120" ry="30" fill="#18271b" />
      <path
        d="M45 308c4 48 48 76 115 76s111-28 115-76c0 0-24 22-115 22S45 308 45 308Z"
        fill="url(#pfl-mortar)"
        stroke="#455d47"
        strokeWidth="1.2"
      />
      <ellipse cx="160" cy="296" rx="114" ry="26" fill="#1b2a1e" />
      <ellipse cx="160" cy="292" rx="106" ry="23" fill="url(#pfl-powder)" />

      <ellipse cx="80" cy="365" rx="52" ry="16" fill="url(#pfl-gold-pow)" opacity="0.95" />
      <ellipse cx="78" cy="362" rx="36" ry="10" fill="#ffeaa2" opacity="0.5" />

      <g transform="translate(260 340) rotate(-18) scale(0.68)">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            transform={`rotate(${i * 72})`}
            d="M0 0 C-24-18 -36-50 -28-80 C-22-104 -8-118 0-128 C8-118 22-104 28-80 C36-50 24-18 0 0 Z"
            fill="url(#pfl-petal)"
            opacity={0.94}
          />
        ))}
        <circle r="14" fill="#690918" />
        <circle r="8" fill="#4d0510" />
        <path d="M6 3c26-3 48-1 68 8" stroke="#ffe5b8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="74" cy="11" r="3.5" fill="#fbd350" />
      </g>

      <circle cx="215" cy="360" r="17" fill="url(#pfl-amla)" />
      <circle cx="215" cy="344" r="2.5" fill="#586d2b" />
      <path d="M208 350q7-7 14 0" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
      <circle cx="238" cy="372" r="14" fill="url(#pfl-amla)" />
      <circle cx="238" cy="359" r="2" fill="#586d2b" />

      <path
        d="M10 250c40 18 85 45 110 75"
        stroke="#396637"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {[
        { x: 26, y: 260, a: -20, s: 0.9 },
        { x: 50, y: 275, a: 30, s: 1.0 },
        { x: 74, y: 292, a: -15, s: 1.1 },
        { x: 96, y: 310, a: 35, s: 0.95 },
      ].map((lf, i) => (
        <path
          key={i}
          transform={`translate(${lf.x} ${lf.y}) rotate(${lf.a}) scale(${lf.s})`}
          d="M0 0c14-6 28-5 40 4-10 12-26 14-40-4Z"
          fill="#4f854a"
          opacity="0.88"
        />
      ))}
    </svg>
  )
}

/**
 * Botanical Still-Life Right Garnish:
 * Amber herbal oil bottle with wooden cap, hibiscus flower,
 * green amla, dried roots, and herbal branches.
 */
export function RightBotanicalFlank() {
  return (
    <svg
      className="preloader__flank preloader__flank--right"
      viewBox="0 0 380 440"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pfr-stone-base" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#253527" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#142217" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#08140c" stopOpacity="0.98" />
        </radialGradient>
        <linearGradient id="pfr-amber-oil" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffdb78" />
          <stop offset="42%" stopColor="#e5a932" />
          <stop offset="85%" stopColor="#b47716" />
          <stop offset="100%" stopColor="#6e4407" />
        </linearGradient>
        <linearGradient id="pfr-wood-cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c5965f" />
          <stop offset="60%" stopColor="#8d6232" />
          <stop offset="100%" stopColor="#553617" />
        </linearGradient>
        <linearGradient id="pfr-glass-spec" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="85%" stopColor="#faeaae" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id="pfr-amla" cx="35%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#e5edb8" />
          <stop offset="55%" stopColor="#bbcc7d" />
          <stop offset="100%" stopColor="#697f39" />
        </radialGradient>
        <linearGradient id="pfr-petal" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ff7b88" />
          <stop offset="38%" stopColor="#d8243b" />
          <stop offset="100%" stopColor="#7a0d1f" />
        </linearGradient>
      </defs>

      <ellipse cx="200" cy="390" rx="160" ry="30" fill="url(#pfr-stone-base)" />

      <g transform="translate(200 130)">
        <ellipse cx="0" cy="244" rx="46" ry="12" fill="#08140b" opacity="0.6" />
        <rect x="-18" y="0" width="36" height="28" rx="6" fill="url(#pfr-wood-cap)" />
        <rect x="-12" y="28" width="24" height="14" rx="3" fill="#4d3215" />

        <path
          d="M-26 56h52c10 20 18 34 18 64v102c0 14-10 22-26 22h-36c-16 0-26-8-26-22v-102c0-30 8-44 18-64Z"
          fill="url(#pfr-amber-oil)"
          stroke="#e8ca82"
          strokeWidth="1.2"
        />
        <path
          d="M-26 56h52c10 20 18 34 18 64v102c0 14-10 22-26 22h-36c-16 0-26-8-26-22v-102c0-30 8-44 18-64Z"
          fill="url(#pfr-glass-spec)"
        />
        <line
          x1="-16"
          y1="75"
          x2="-16"
          y2="225"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />

        <rect x="-24" y="112" width="48" height="68" rx="4" fill="#faf5e7" stroke="#cca554" strokeWidth="0.8" opacity="0.94" />
        <text x="0" y="132" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="8" fontWeight="600" fill="#7d5917" letterSpacing="0.8">
          KEERTHIKA
        </text>
        <text x="0" y="146" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="10" fontStyle="italic" fill="#583f12">
          Sai
        </text>
        <line x1="-16" y1="152" x2="16" y2="152" stroke="#cca554" strokeWidth="0.6" />
        <text x="0" y="164" textAnchor="middle" fontFamily="sans-serif" fontSize="6" letterSpacing="1" fill="#7d5917">
          HERBAL OIL
        </text>
      </g>

      <g transform="translate(110 345) rotate(22) scale(0.64)">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            transform={`rotate(${i * 72})`}
            d="M0 0 C-24-18 -36-50 -28-80 C-22-104 -8-118 0-128 C8-118 22-104 28-80 C36-50 24-18 0 0 Z"
            fill="url(#pfr-petal)"
            opacity={0.92}
          />
        ))}
        <circle r="14" fill="#690918" />
        <circle r="8" fill="#4d0510" />
      </g>

      <circle cx="85" cy="372" r="16" fill="url(#pfr-amla)" />
      <circle cx="85" cy="357" r="2.2" fill="#586d2b" />
      <path d="M78 363q7-7 14 0" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.45" fill="none" strokeLinecap="round" />

      <path
        d="M130 388c30-10 65-8 90 2M140 395c25-6 50-2 80 4"
        stroke="#8b6537"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.8"
      />

      <path
        d="M340 220c-30 40-50 85-65 140"
        stroke="#396637"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {[
        { x: 330, y: 240, a: -35, s: 0.9 },
        { x: 308, y: 275, a: 25, s: 1.05 },
        { x: 292, y: 315, a: -20, s: 1.1 },
      ].map((lf, i) => (
        <path
          key={i}
          transform={`translate(${lf.x} ${lf.y}) rotate(${lf.a}) scale(${lf.s})`}
          d="M0 0c14-6 28-5 40 4-10 12-26 14-40-4Z"
          fill="#4f854a"
          opacity="0.85"
        />
      ))}
    </svg>
  )
}
