import { motion, useReducedMotion } from 'framer-motion'

/* ------------------------------------------------------------------ *
 * Hand drawn SVG artwork for each product - keeps the site free of
 * stock photos while still looking tactile and natural.
 * ------------------------------------------------------------------ */

/** Big wooden bowl of green herbal powder with a scoop. */
export function PowderBowl({ className = '', size = 420 }) {
  const reduce = useReducedMotion()
  return (
    <motion.svg className={className} width={size} viewBox="0 0 420 380" fill="none" role="img" aria-label="Bowl of herbal bath podi">
      <defs>
        <radialGradient id="pb-powder" cx="45%" cy="30%" r="75%">
          <stop offset="0" stopColor="#cbd9a2" />
          <stop offset="55%" stopColor="#9db472" />
          <stop offset="100%" stopColor="#6d8a4c" />
        </radialGradient>
        <linearGradient id="pb-wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c58f52" />
          <stop offset="50%" stopColor="#a9713c" />
          <stop offset="100%" stopColor="#7d4f26" />
        </linearGradient>
        <linearGradient id="pb-wood2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d8a86a" />
          <stop offset="100%" stopColor="#8a5a31" />
        </linearGradient>
      </defs>

      <ellipse cx="210" cy="318" rx="150" ry="26" fill="#2f3a24" opacity="0.16" />
      <ellipse cx="210" cy="290" rx="140" ry="34" fill="url(#pb-wood)" />
      <path d="M70 288c0 44 62 66 140 66s140-22 140-66c0 0-30 22-140 22S70 288 70 288Z" fill="url(#pb-wood2)" />
      <ellipse cx="210" cy="272" rx="132" ry="30" fill="#6a4222" />
      <ellipse cx="210" cy="268" rx="124" ry="26" fill="url(#pb-powder)" />
      {!reduce && (
        <motion.g animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 6, repeat: Infinity }}>
          <ellipse cx="168" cy="262" rx="52" ry="11" fill="#e8f0cd" opacity="0.35" />
          <ellipse cx="262" cy="270" rx="34" ry="8" fill="#e8f0cd" opacity="0.25" />
        </motion.g>
      )}

      {/* scoop */}
      <motion.g
        style={{ originX: '300px', originY: '120px' }}
        animate={reduce ? undefined : { rotate: [-5, 3, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="292" y="60" width="16" height="120" rx="8" fill="url(#pb-wood2)" transform="rotate(14 300 120)" />
        <path d="M250 250c-8-26 6-52 34-52s40 22 32 50c-4 14-18 22-34 22s-28-8-32-20Z" fill="url(#pb-wood)" />
        <ellipse cx="284" cy="228" rx="28" ry="14" fill="#e6eec7" opacity="0.55" />
      </motion.g>
      <ellipse cx="284" cy="222" rx="26" ry="13" fill="url(#pb-powder)" />

      {/* scattered herbs */}
      <circle cx="86" cy="326" r="15" fill="#8fa85c" />
      <circle cx="72" cy="316" r="11" fill="#a7bd72" />
      <path d="M330 320c14-18 34-22 48-14-8 16-30 24-48 14Z" fill="#4d7a4a" opacity="0.75" />
    </motion.svg>
  )
}

/** Glass bottle of golden herbal hair oil with a twine bow. */
export function OilBottle({ className = '', size = 420 }) {
  const reduce = useReducedMotion()
  return (
    <motion.svg className={className} width={size} viewBox="0 0 420 380" fill="none" role="img" aria-label="Bottle of herbal hair oil">
      <defs>
        <linearGradient id="ob-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#f6efd7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#cbb98a" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="ob-oil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0c95f" />
          <stop offset="55%" stopColor="#d9a234" />
          <stop offset="100%" stopColor="#a86f18" />
        </linearGradient>
        <linearGradient id="ob-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#efdca6" />
          <stop offset="100%" stopColor="#b98a2e" />
        </linearGradient>
      </defs>

      <ellipse cx="210" cy="332" rx="104" ry="22" fill="#2f3a24" opacity="0.16" />
      <rect x="168" y="86" width="84" height="26" rx="10" fill="#8d6b34" />
      <rect x="160" y="52" width="100" height="42" rx="14" fill="url(#ob-cap)" />
      <rect x="188" y="112" width="44" height="26" rx="8" fill="#6f5227" opacity="0.65" />
      <path
        d="M164 136h92c10 26 26 42 26 84v76c0 18-14 30-34 30h-76c-20 0-34-12-34-30v-76c0-42 16-58 26-84Z"
        fill="url(#ob-glass)"
        stroke="#e6d8ac"
        strokeWidth="1.4"
      />
      <path
        d="M142 226c0-40 14-56 24-80h88c10 24 24 40 24 80v70c0 16-12 26-30 26h-76c-18 0-30-10-30-26Z"
        fill="url(#ob-oil)"
        opacity="0.95"
      />
      <rect x="196" y="196" width="60" height="92" rx="6" fill="#f7f0d8" opacity="0.9" />
      <text x="226" y="220" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="12" fill="#a4761f">
        KEERTHIKA
      </text>
      <text x="226" y="238" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="15" letterSpacing="1" fill="#8a5f16">
        HERBAL
      </text>
      <text x="226" y="260" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="14" letterSpacing="2" fill="#6d4a10">
        HAIR OIL
      </text>
      <text x="226" y="276" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="8" letterSpacing="1" fill="#8a5f16">
        100% NATURAL
      </text>
      <path d="M150 148c-6 10-8 16-4 22" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />

      {/* twine bow */}
      <path d="M164 176c26 20 100 20 126 0" stroke="#c2a06a" strokeWidth="3" fill="none" />
      <path d="M186 180c-16 12-22 26-12 32 8 4 18-6 22-20" stroke="#c2a06a" strokeWidth="3" fill="none" />
      <path d="M268 180c16 12 22 26 12 32-8 4-18-6-22-20" stroke="#c2a06a" strokeWidth="3" fill="none" />
      {!reduce && (
        <motion.ellipse
          cx="226"
          cy="200"
          rx="30"
          ry="56"
          fill="#ffe9a8"
          opacity="0.3"
          animate={{ opacity: [0.18, 0.42, 0.18] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      )}
    </motion.svg>
  )
}

/** Small bowl of brown seekakai powder with whole pods beside it. */
export function SeekakaiBowl({ className = '', size = 420 }) {
  const reduce = useReducedMotion()
  return (
    <motion.svg className={className} width={size} viewBox="0 0 420 380" fill="none" role="img" aria-label="Bowl of seekakai podi">
      <defs>
        <radialGradient id="sk-powder" cx="42%" cy="28%" r="75%">
          <stop offset="0" stopColor="#c99a63" />
          <stop offset="60%" stopColor="#a4713c" />
          <stop offset="100%" stopColor="#6f4720" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="320" rx="132" ry="24" fill="#2f3a24" opacity="0.16" />
      <ellipse cx="200" cy="292" rx="116" ry="30" fill="#8a5a31" />
      <path d="M84 290c0 40 52 60 116 60s116-20 116-60c0 0-26 20-116 20S84 290 84 290Z" fill="#a9713c" />
      <ellipse cx="200" cy="276" rx="110" ry="26" fill="#633d1c" />
      <ellipse cx="200" cy="272" rx="102" ry="22" fill="url(#sk-powder)" />
      {!reduce && (
        <motion.ellipse
          cx="172"
          cy="268"
          rx="44"
          ry="9"
          fill="#e6c79b"
          opacity="0.3"
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      )}
      <g transform="translate(28 258) rotate(-16)">
        <path d="M0 0c34-14 70-10 92 6-22 16-58 18-92 6-6-2-6-10 0-12Z" fill="#7a4a22" />
        <path d="M6 4c30-8 62-6 82 6" stroke="#b6804a" strokeWidth="2" opacity="0.7" />
      </g>
      <g transform="translate(300 268) rotate(12)">
        <path d="M0 0c34-14 70-10 92 6-22 16-58 18-92 6-6-2-6-10 0-12Z" fill="#6f421c" />
        <path d="M6 4c30-8 62-6 82 6" stroke="#a97545" strokeWidth="2" opacity="0.6" />
      </g>
      <path d="M112 336c22-16 52-16 70 2-20 14-50 14-70-2Z" fill="#5c7f45" opacity="0.7" />
    </motion.svg>
  )
}

/** Ceramic bowl of green hair-pack paste with a wooden spoon. */
export function HairPackBowl({ className = '', size = 420 }) {
  const reduce = useReducedMotion()
  return (
    <motion.svg className={className} width={size} viewBox="0 0 420 380" fill="none" role="img" aria-label="Bowl of herbal hair pack">
      <defs>
        <radialGradient id="hp-paste" cx="40%" cy="30%" r="70%">
          <stop offset="0" stopColor="#a8c184" />
          <stop offset="55%" stopColor="#6f9350" />
          <stop offset="100%" stopColor="#43602f" />
        </radialGradient>
        <linearGradient id="hp-bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4efe0" />
          <stop offset="100%" stopColor="#cfc4a9" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="322" rx="140" ry="24" fill="#2f3a24" opacity="0.16" />
      <path d="M86 250h248c-6 62-58 92-124 92s-118-30-124-92Z" fill="url(#hp-bowl)" />
      <ellipse cx="210" cy="250" rx="124" ry="30" fill="#ded4bb" />
      <motion.ellipse
        cx="210"
        cy="246"
        rx="112"
        ry="26"
        fill="url(#hp-paste)"
        animate={reduce ? undefined : { rx: [112, 116, 112] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path d="M150 240c22-14 60-16 84-4-18 12-56 14-84 4Z" fill="#cfe0ab" opacity="0.45" />
      <path d="M262 250c22-8 44-6 58 4-16 10-40 10-58-2Z" fill="#3f5c2c" opacity="0.4" />
      <motion.g
        style={{ originX: '280px', originY: '140px' }}
        animate={reduce ? undefined : { rotate: [-3, 4, -3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="272" y="34" width="17" height="150" rx="8" fill="#c08b52" transform="rotate(20 280 110)" />
        <ellipse cx="300" cy="216" rx="30" ry="18" fill="#c99a63" transform="rotate(18 300 216)" />
        <ellipse cx="300" cy="212" rx="24" ry="12" fill="url(#hp-paste)" opacity="0.85" transform="rotate(18 300 212)" />
      </motion.g>
      <path d="M96 300c14-10 34-10 44 2-14 10-32 10-44-2Z" fill="#a9713c" opacity="0.7" />
    </motion.svg>
  )
}

/** Picks the right artwork for a catalogue entry. */
export function ProductArt({ art, className = '', size }) {
  if (art === 'oil') return <OilBottle className={className} size={size} />
  if (art === 'seekakai') return <SeekakaiBowl className={className} size={size} />
  if (art === 'hairpack') return <HairPackBowl className={className} size={size} />
  return <PowderBowl className={className} size={size} />
}
