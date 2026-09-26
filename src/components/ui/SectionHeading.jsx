import Reveal from './Reveal.jsx'
import { LeafDivider } from '../art/Ornaments.jsx'

/**
 * Section heading with the gold divider used all over the site.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  tamil,
  text,
  align = 'center',
  light = false,
}) {
  return (
    <div className={`section-heading section-heading--${align} ${light ? 'is-light' : ''}`}>
      {eyebrow && (
        <Reveal direction="down" duration={0.7}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2 className="section-title">
          {title} {highlight && <em className="title-accent">{highlight}</em>}
        </h2>
      </Reveal>

      {tamil && (
        <Reveal delay={0.14}>
          <p className="section-tamil tamil">{tamil}</p>
        </Reveal>
      )}

      <Reveal direction="zoom" delay={0.18}>
        <LeafDivider />
      </Reveal>

      {text && (
        <Reveal delay={0.24}>
          <p className="section-text">{text}</p>
        </Reveal>
      )}
    </div>
  )
}
