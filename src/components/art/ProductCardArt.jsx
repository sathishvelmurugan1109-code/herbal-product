import bathPodiShot from '../../assets/products/bath-card.jpg'
import hairOilShot from '../../assets/products/oil-card.jpg'
import seekakaiShot from '../../assets/products/see-card.jpg'
import hairPackShot from '../../assets/products/pack-card.jpg'

/*
 * Product photography for the "Our Collection" cards.
 *
 * The four JPEGs in src/assets/products/ are 3:4 crops of the brand's own
 * product posters (the same photographs the printed packs use), taken well to
 * the right of the printed copy so no poster text ever appears on a card.
 * They are produced by `_tmp_build/card-lab.ps1` - open one of the posters,
 * move the x/y/w/h numbers there and re-run it to reframe a shot.
 *
 * `art` is the key already stored on every product in src/data/products.js.
 */
const SHOTS = {
  powder: bathPodiShot,
  oil: hairOilShot,
  seekakai: seekakaiShot,
  hairpack: hairPackShot,
}

export const hasShot = (art) => Boolean(SHOTS[art])

/** The card photograph for a catalogue entry (750 x 1000, lazy loaded). */
export default function ProductCardArt({ art, alt = '', className = '' }) {
  return (
    <img
      className={className}
      src={SHOTS[art] ?? SHOTS.powder}
      alt={alt}
      width={750}
      height={1000}
      loading="lazy"
      decoding="async"
    />
  )
}
