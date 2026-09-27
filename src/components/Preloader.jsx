import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { BrandSeal, LeftBotanicalFlank, RightBotanicalFlank } from './art/SplashArt.jsx'

/*
 * The intro runs on plain declarative transitions - each stage carries its own
 * delay, so nothing has to be driven from an animation controller keep-alive.
 *  0ms        dark forest ground
 *  0-500ms    atmosphere fades in
 *  300-900ms  KS seal scales 0.85 -> 1
 *  500-1200ms brand name rises
 *  700-1400ms HERBAL PRODUCTS (the rules fade with it)
 *  900-1600ms progress capsule reveals
 *  1100-1800ms tagline fades in
 */
const EASE = [0.22, 1, 0.36, 1]

/* 8 floating leaves - gentle breeze, different depths, slow rotation */
const DRIFT_LEAVES = [
  {
    id: 'l1',
    left: '8%',
    top: '12%',
    size: 22,
    delay: 0.1,
    dur: 8,
    rotation: { from: 0, to: 15 },
    dx: 12,
    dy: -20,
    opacity: [0.3, 0.5, 0.3],
    zIndex: [1, 2, 1],
  },
  {
    id: 'l2',
    left: '85%',
    top: '65%',
    size: 18,
    delay: 0.5,
    dur: 7.5,
    rotation: { from: 0, to: -10 },
    dx: -10,
    dy: 18,
    opacity: [0.25, 0.45, 0.25],
    zIndex: [1, 2, 1],
  },
  {
    id: 'l3',
    left: '15%',
    top: '25%',
    size: 28,
    delay: 0.3,
    dur: 8.5,
    rotation: { from: 0, to: 12 },
    dx: 8,
    dy: -25,
    opacity: [0.35, 0.55, 0.35],
    zIndex: [1, 2, 1],
  },
  {
    id: 'l4',
    left: '82%',
    top: '78%',
    size: 24,
    delay: 0.7,
    dur: 9,
    rotation: { from: 0, to: -8 },
    dx: -12,
    dy: 22,
    opacity: [0.28, 0.48, 0.28],
    zIndex: [1, 2, 1],
  },
  {
    id: 'l5',
    left: '25%',
    top: '35%',
    size: 16,
    delay: 1.2,
    dur: 7,
    rotation: { from: 0, to: 18 },
    dx: 15,
    dy: -15,
    opacity: [0.3, 0.5, 0.3],
    zIndex: [1, 2, 1],
  },
  {
    id: 'l6',
    left: '78%',
    top: '45%',
    size: 20,
    delay: 0.4,
    dur: 8.2,
    rotation: { from: 0, to: -12 },
    dx: -14,
    dy: 20,
    opacity: [0.32, 0.52, 0.32],
    zIndex: [1, 2, 1],
  },
  {
    id: 'l7',
    left: '22%',
    top: '55%',
    size: 14,
    delay: 1.5,
    dur: 7.8,
    rotation: { from: 0, to: 16 },
    dx: 10,
    dy: -12,
    opacity: [0.27, 0.47, 0.27],
    zIndex: [1, 2, 1],
  },
  {
    id: 'l8',
    left: '88%',
    top: '60%',
    size: 26,
    delay: 0.9,
    dur: 8.8,
    rotation: { from: 0, to: -15 },
    dx: -16,
    dy: 25,
    opacity: [0.3, 0.5, 0.3],
    zIndex: [1, 2, 1],
  },
]

export default function Preloader({ onDone, minDuration = 1700 }) {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [closing, setClosing] = useState(false)
  const [finished, setFinished] = useState(false)
  const doneRef = useRef(onDone)

  useEffect(() => {
    doneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    if (reduce) {
      setFinished(true)
      doneRef.current?.()
      return
    }

    const started = performance.now()
    let raf
    let hold

    const tick = (now) => {
      /* the first rAF timestamp can predate the performance.now() above, which
         would paint a negative percentage - clamp it to zero */
      const elapsed = Math.max(0, now - started)
      setProgress(Math.min(100, Math.round((elapsed / minDuration) * 100)))
      if (elapsed < minDuration) {
        raf = requestAnimationFrame(tick)
      } else {
        setClosing(true)
        doneRef.current?.()
        hold = setTimeout(() => setFinished(true), 260)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(hold)
    }
  }, [minDuration, reduce])

  /* -----------------------------------------------------------
     Memoised scenery — no re-renders on progress state updates
     ----------------------------------------------------------- */
  const atmosphere = useMemo(
    () => (
      <div className="preloader__atmos" aria-hidden="true">
        <span className="preloader__sunbeam" />
        <span className="preloader__emerald" />
        <span className="preloader__vignette" />
        <span className="preloader__lines" />
        <span className="preloader__grain" />
      </div>
    ),
    [],
  )

  const flanks = useMemo(
    () => (
      <div className="preloader__flanks" aria-hidden="true">
        <div className="preloader__side preloader__side--left">
          <LeftBotanicalFlank />
        </div>
        <div className="preloader__side preloader__side--right">
          <RightBotanicalFlank />
        </div>
      </div>
    ),
    [],
  )

  const leaves = useMemo(
    () => (
      <div className="preloader__leaves" aria-hidden="true">
        {DRIFT_LEAVES.map((leaf) => (
          <motion.span
            key={leaf.id}
            className="preloader__leaf"
            style={{
              left: leaf.left,
              top: leaf.top,
              width: leaf.size,
              height: leaf.size,
              zIndex: leaf.zIndex,
            }}
            initial={{ opacity: 0, rotate: leaf.rotation.from }}
            animate={{
              opacity: leaf.opacity,
              rotate: leaf.rotation.to,
              x: [0, leaf.dx, 0],
              y: [0, leaf.dy, 0],
              transition: {
                duration: leaf.dur,
                delay: leaf.delay,
                repeat: Infinity,
                ease: 'ease-in-out',
              },
            }}
            role="img"
            aria-label="Floating leaf"
          >
            <svg viewBox="0 0 32 32" fill="none" width="100%" height="100%">
              <path
                d="M16 2C8 9 4 17 6 25c6 3 14 0 20-9C26 7 21 3 16 2Z"
                fill="#75aa68"
                fillOpacity="0.4"
                stroke="#a6d899"
                strokeWidth="0.5"
              />
              <path d="M16 4c-2 7-2 15 3 21" stroke="#dbf2d2" strokeWidth="0.8" opacity="0.5" />
            </svg>
          </motion.span>
        ))}
      </div>
    ),
    [],
  )

  if (reduce) return null

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className={`preloader${closing ? ' is-closing' : ''}`}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          aria-busy="true"
          aria-label="Loading Keerthika Sai"
        >
          {/* ---------------- atmosphere ---------------- */}
          {atmosphere}

          {/* ---------------- botanical flanks ---------------- */}
          {flanks}

          {/* ---------------- drifting leaves ---------------- */}
          {leaves}

          {/* ---------------- center brand composition ---------------- */}
          <div className="preloader__inner">
            <motion.div
              className="preloader__logo-wrap"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            >
              <span className="preloader__gold-halo" aria-hidden="true" />
              <BrandSeal size={104} className="preloader__seal" />
              <motion.div
                className="preloader__logo-text"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              >
                <span className="preloader__keerthika">KEERTHIKA</span>
                <span className="preloader__sai">Sai</span>
              </motion.div>
            </motion.div>

            <motion.p
              className="preloader__category"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85, ease: EASE }}
            >
              <span className="preloader__category-text">Herbal Products</span>
            </motion.p>

            <motion.div
              className="preloader__progress-wrapper"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
            >
              <div
                className="preloader__bar"
                role="progressbar"
                aria-label="Loading progress"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span className="preloader__fill" style={{ width: `${progress}%` }}>
                  <span className="preloader__gleam" aria-hidden="true" />
                </span>
              </div>
              <p className="preloader__pct" style={{ opacity: progress > 0 ? 1 : 0 }}>
                {progress}%
              </p>
            </motion.div>

            <motion.div
              className="preloader__tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25, ease: EASE }}
            >
              <span>Pure Herbs</span>
              <span className="preloader__dot" aria-hidden="true">&#10022;</span>
              <span>Natural Care</span>
              <span className="preloader__dot" aria-hidden="true">&#10022;</span>
              <span>Happier You</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}