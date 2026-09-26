import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { BrandSeal, LeftBotanicalFlank, RightBotanicalFlank } from './art/SplashArt.jsx'

/* A gentle breeze - 8 leaves, low opacity, never near the central copy */
const DRIFT_LEAVES = [
  { id: 'l1', left: '7%', top: '14%', size: 26, delay: 0.2, dur: 7.2, from: -15, to: 20, dx: 16, dy: -26 },
  { id: 'l2', left: '15%', top: '70%', size: 22, delay: 1.1, dur: 8.5, from: 30, to: -10, dx: -14, dy: 20 },
  { id: 'l3', left: '86%', top: '20%', size: 24, delay: 0.6, dur: 7.8, from: 12, to: -24, dx: -16, dy: -20 },
  { id: 'l4', left: '83%', top: '74%', size: 28, delay: 1.4, dur: 9, from: -25, to: 15, dx: 18, dy: 22 },
  { id: 'l5', left: '26%', top: '32%', size: 16, delay: 2, dur: 6.8, from: 45, to: 10, dx: 12, dy: -16 },
  { id: 'l6', left: '72%', top: '42%', size: 18, delay: 0.9, dur: 8.2, from: -35, to: 5, dx: -14, dy: 18 },
  { id: 'l7', left: '11%', top: '46%', size: 15, delay: 1.7, dur: 7.5, from: 10, to: 40, dx: 12, dy: -18 },
  { id: 'l8', left: '90%', top: '56%', size: 17, delay: 2.3, dur: 8.8, from: -18, to: 22, dx: -12, dy: 20 },
]

/**
 * Cinematic herbal splash: deep forest environment, herbal still-life flanks,
 * the gold KS seal, editorial brand type and a luminous gold progress capsule.
 *
 * Behaviour is unchanged from the previous loader - the progress bar is driven
 * by real elapsed time, onDone fires as soon as it reaches 100%, and visitors
 * who prefer reduced motion skip the splash entirely.
 */
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
      const elapsed = now - started
      setProgress(Math.min(100, Math.round((elapsed / minDuration) * 100)))
      if (elapsed < minDuration) {
        raf = requestAnimationFrame(tick)
      } else {
        // brief seal glow at 100%, then straight out of the way
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

  /* the scenery never changes, so it is memoised once - that keeps the
     per-frame progress updates from re-rendering the large SVG artwork */
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
      <>
        <motion.div
          className="preloader__side preloader__side--left"
          initial={{ opacity: 0, x: -34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <LeftBotanicalFlank />
        </motion.div>

        <motion.div
          className="preloader__side preloader__side--right"
          initial={{ opacity: 0, x: 34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <RightBotanicalFlank />
        </motion.div>
      </>
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
            style={{ left: leaf.left, top: leaf.top, width: leaf.size, height: leaf.size }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.22, 0.55, 0.22],
              x: [0, leaf.dx, 0],
              y: [0, leaf.dy, 0],
              rotate: [leaf.from, leaf.to, leaf.from],
            }}
            transition={{ duration: leaf.dur, delay: leaf.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 32 32" fill="none" width="100%" height="100%">
              <path
                d="M16 2C8 9 4 17 6 25c6 3 14 0 20-9C26 7 21 3 16 2Z"
                fill="#75aa68"
                fillOpacity="0.5"
                stroke="#a6d899"
                strokeWidth="1"
              />
              <path d="M16 4c-2 7-2 15 3 21" stroke="#dbf2d2" strokeWidth="0.8" opacity="0.6" />
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
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          aria-busy="true"
          aria-label="Loading Keerthika Sai"
        >
          {/* ---------------- atmosphere ---------------- */}
          {atmosphere}

          {/* ---------------- botanical flanks ---------------- */}
          {flanks}

          {/* ---------------- drifting leaves ---------------- */}
          {leaves}

          {/* ---------------- brand composition ---------------- */}
          <div className="preloader__inner">
            <motion.div
              className="preloader__seal-wrap"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="preloader__halo" aria-hidden="true" />
              <BrandSeal size={104} className="preloader__seal" />
            </motion.div>

            <motion.h1
              className="preloader__brand"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Keerthika <span>Sai</span>
            </motion.h1>

            <motion.div
              className="preloader__sub"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <span className="preloader__rule" aria-hidden="true" />
              <span>Herbal Products</span>
              <span className="preloader__rule preloader__rule--flip" aria-hidden="true" />
            </motion.div>

            <motion.div
              className="preloader__mark"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <svg width="58" height="14" viewBox="0 0 58 14" fill="none" aria-hidden="true">
                <path d="M0 7h18" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
                <path d="M40 7h18" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
                <path
                  d="M29 2.5c2.8 1.9 4.8 2.9 7.6 4.5-2.8 1.6-4.8 2.6-7.6 4.5-2.8-1.9-4.8-2.9-7.6-4.5 2.8-1.6 4.8-2.6 7.6-4.5Z"
                  fill="currentColor"
                  opacity="0.85"
                />
              </svg>
            </motion.div>

            <motion.div
              className="preloader__progress"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
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
              <p className="preloader__pct">{progress}%</p>
            </motion.div>

            <motion.p
              className="preloader__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.7 }}
            >
              <span>Pure Herbs</span>
              <span className="preloader__dot" aria-hidden="true">
                &#10022;
              </span>
              <span>Natural Care</span>
              <span className="preloader__dot" aria-hidden="true">
                &#10022;
              </span>
              <span>Happier You</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
