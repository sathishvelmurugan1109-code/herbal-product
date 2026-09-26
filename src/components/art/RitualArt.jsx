/* ------------------------------------------------------------------ *
 * "How To Use" (The Ritual) artwork.
 *
 * RitualStillLife  - the large herbal still-life on the left plate: a
 *                    heaped bowl of green podi with a scoop, a second
 *                    vessel of dried herbs, hibiscus, amla, turmeric,
 *                    curry leaf sprigs, linen and a grinding stone.
 * RitualLineArt    - the drawn botanical line work that sits *behind*
 *                    the plate.
 * ScoopArt / MassageArt / RinseArt - the three step illustrations.
 * LeafLineArt      - the faint leaf texture stamped inside a step card.
 * BathTipGlyph / SeekkaiTipGlyph / HairTipGlyph - the tip strip icons.
 *
 * Same reasoning as StoryArt.jsx and ProductArt.jsx: hand drawn SVG stays
 * crisp at every size, weighs a few kB and needs no stock photography.
 * Every component owns a unique gradient prefix (rsl-, rsa-, rma-, rri-)
 * so two pieces of art can share a page without clashing ids.
 * ------------------------------------------------------------------ */

/**
 * A leafy sprig: one stem with paired leaflets, growing upwards from
 * (x, y) and then rotated by `angle` degrees.
 */
function SprigLine({
  x = 0,
  y = 0,
  angle = 0,
  length = 200,
  leaves = 5,
  tone = '#4d7a4a',
  stem = 4,
  leafRx = 20,
  leafRy = 8,
  opacity = 1,
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
      <path
        d={`M0 0 C ${stem * 2.2} ${-length * 0.34} ${-stem * 1.9} ${-length * 0.68} ${stem * 0.4} ${-length}`}
        stroke={tone}
        strokeWidth={stem}
        strokeLinecap="round"
        fill="none"
      />
      {Array.from({ length: leaves }).map((_, i) => {
        const t = (i + 0.9) / (leaves + 0.6)
        const side = i % 2 === 0 ? 1 : -1
        const ex = side * leafRx * 0.94
        const ey = -length * t - 6
        return (
          <ellipse
            key={i}
            cx={ex}
            cy={ey}
            rx={leafRx}
            ry={leafRy}
            fill={tone}
            opacity={0.92 - t * 0.24}
            transform={`rotate(${side * 30} ${ex} ${ey})`}
          />
        )
      })}
    </g>
  )
}

/** One amla (gooseberry) with its six soft ridges and a leafy stem. */
function Amla({ cx, cy, r }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="url(#rsl-amla)" />
      <g opacity="0.2" stroke="#7d8b46" strokeWidth={r * 0.05} fill="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <path
            key={i}
            d={`M${cx} ${cy - r} Q ${cx + r * 0.5} ${cy} ${cx} ${cy + r}`}
            transform={`rotate(${i * 30} ${cx} ${cy})`}
          />
        ))}
      </g>
      <path
        d={`M${cx - r * 0.55} ${cy - r * 0.4} q ${r * 0.32} ${-r * 0.34} ${r * 0.78} ${-r * 0.28}`}
        stroke="#ffffff"
        strokeOpacity="0.42"
        strokeWidth={r * 0.11}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={cx} cy={cy - r + r * 0.1} r={r * 0.1} fill="#7d8b46" />
    </g>
  )
}

/** The hibiscus bloom with its long stamen. */
function Hibiscus({ cx = 120, cy = 660, scale = 0.8 }) {
  const petal = 'M0 0 C-28-20 -42-58 -34-92 C-28-118 -10-134 0-146 C10-134 28-118 34-92 C42-58 28-20 0 0 Z'
  return (
    <g transform={`translate(${cx} ${cy}) rotate(-15) scale(${scale})`}>
      <path d="M4-2c-34-26-58-16-70 12 26 14 56 8 70-12Z" fill="#3f6f3d" opacity="0.92" />
      <path d="M-2 10c-30 20-60 16-74-8 24-18 56-16 74 8Z" fill="#4d7a4a" opacity="0.86" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`rotate(${i * 72})`} opacity={0.96 - (i % 3) * 0.06}>
          <path d={petal} fill={i === 2 ? 'url(#rsl-petal2)' : 'url(#rsl-petal)'} />
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
      ].map(([x, yy, r], i) => (
        <circle key={i} cx={x} cy={yy} r={r} fill="#f2cf57" />
      ))}
    </g>
  )
}

/**
 * The left plate still-life: a heaped wooden bowl of green podi with a
 * scoop, a smaller bowl of dried herbs, hibiscus, amla, turmeric, curry
 * leaf sprigs and folded linen on a stone grinding slab.
 * Drawn for a 620 x 780 frame (the plate's ratio).
 */
export function RitualStillLife({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 620 780"
      width="620"
      height="780"
      fill="none"
      role="img"
      aria-label="Wooden bowl heaped with green herbal powder and a scoop, a smaller bowl of dried herbs, hibiscus, amla, turmeric, curry leaf sprigs and folded linen on a stone grinding slab"
    >
      <defs>
        <radialGradient id="rsl-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#20361f" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#20361f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rsl-stoneTop" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#f6f2e6" />
          <stop offset="55%" stopColor="#e0d8c6" />
          <stop offset="100%" stopColor="#c2b9a4" />
        </linearGradient>
        <linearGradient id="rsl-stoneSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfc6b1" />
          <stop offset="100%" stopColor="#9c9479" />
        </linearGradient>
        <linearGradient id="rsl-linen" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset="52%" stopColor="#efe3cd" />
          <stop offset="100%" stopColor="#d8c7a6" />
        </linearGradient>
        <linearGradient id="rsl-bowl" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#e2c39a" />
          <stop offset="45%" stopColor="#c99a62" />
          <stop offset="100%" stopColor="#9a6636" />
        </linearGradient>
        <linearGradient id="rsl-bowlRim" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#f0d6ad" />
          <stop offset="60%" stopColor="#d2a874" />
          <stop offset="100%" stopColor="#ad7c46" />
        </linearGradient>
        <linearGradient id="rsl-bowlInner" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#a9784a" />
          <stop offset="100%" stopColor="#7c5130" />
        </linearGradient>
        <radialGradient id="rsl-powder" cx="38%" cy="20%" r="86%">
          <stop offset="0" stopColor="#e3ecc2" />
          <stop offset="48%" stopColor="#a3b877" />
          <stop offset="100%" stopColor="#6c894b" />
        </radialGradient>
        <linearGradient id="rsl-wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d5a469" />
          <stop offset="52%" stopColor="#ad7742" />
          <stop offset="100%" stopColor="#7f4f24" />
        </linearGradient>
        <linearGradient id="rsl-wood2" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#e0b179" />
          <stop offset="100%" stopColor="#8f5f33" />
        </linearGradient>
        <linearGradient id="rsl-petal" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#ff9d90" />
          <stop offset="42%" stopColor="#ee4a52" />
          <stop offset="100%" stopColor="#b81f36" />
        </linearGradient>
        <linearGradient id="rsl-petal2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb3a6" />
          <stop offset="100%" stopColor="#c92341" />
        </linearGradient>
        <radialGradient id="rsl-amla" cx="34%" cy="28%" r="82%">
          <stop offset="0" stopColor="#cfe08e" />
          <stop offset="52%" stopColor="#9cb75a" />
          <stop offset="100%" stopColor="#6f8c3c" />
        </radialGradient>
        <linearGradient id="rsl-turmeric" x1="0.1" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#f4ce76" />
          <stop offset="52%" stopColor="#e0a83c" />
          <stop offset="100%" stopColor="#b97c1f" />
        </linearGradient>
        <linearGradient id="rsl-vessel" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#d9b587" />
          <stop offset="100%" stopColor="#8d5f34" />
        </linearGradient>
      </defs>

      {/* grinding stone slab - a complete slab, no hard edge at the frame */}
      <ellipse cx="310" cy="596" rx="296" ry="92" fill="url(#rsl-stoneTop)" />
      <path
        d="M14 596 C14 688 148 738 310 738 C472 738 606 688 606 596 L606 628 C606 720 470 770 310 770 C150 770 14 720 14 628 Z"
        fill="url(#rsl-stoneSide)"
      />
      <g fill="#b2a992" opacity="0.5">
        <ellipse cx="122" cy="632" rx="14" ry="4.4" />
        <ellipse cx="204" cy="678" rx="10" ry="3.2" />
        <ellipse cx="430" cy="666" rx="12" ry="3.8" />
        <ellipse cx="520" cy="632" rx="9" ry="3" />
        <ellipse cx="296" cy="736" rx="17" ry="5" />
        <ellipse cx="140" cy="742" rx="12" ry="4" />
      </g>
      <path d="M84 586 C146 610 214 622 282 618" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <ellipse cx="310" cy="614" rx="240" ry="46" fill="url(#rsl-shadow)" />

      {/* folded linen at the front left */}
      <g>
        <path d="M2 590 C74 558 172 572 224 620 C184 670 74 688 2 662 Z" fill="url(#rsl-linen)" />
        <path d="M30 610 C86 594 156 602 196 634" stroke="#d3c1a0" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
        <path d="M22 638 C74 630 130 628 172 642" stroke="#d3c1a0" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.6" />
      </g>

      {/* smaller vessel of dried herbs, behind at the right */}
      <g>
        <ellipse cx="508" cy="470" rx="74" ry="48" fill="url(#rsl-vessel)" />
        <ellipse cx="508" cy="450" rx="74" ry="40" fill="url(#rsl-wood2)" />
        <ellipse cx="508" cy="454" rx="62" ry="30" fill="#6b4526" />
        <g fill="#8a5a31">
          <ellipse cx="488" cy="448" rx="14" ry="8" transform="rotate(-16 488 448)" />
          <ellipse cx="518" cy="442" rx="16" ry="9" transform="rotate(10 518 442)" />
          <ellipse cx="540" cy="454" rx="13" ry="7" transform="rotate(-6 540 454)" />
          <ellipse cx="470" cy="460" rx="10" ry="6" transform="rotate(14 470 460)" />
        </g>
        <path d="M440 482 C458 506 558 506 576 482" stroke="#6f4a27" strokeOpacity="0.5" strokeWidth="3" fill="none" />
      </g>

      {/* the main wooden bowl with a heaped mound of podi */}
      <g>
        <ellipse cx="300" cy="540" rx="194" ry="96" fill="url(#rsl-bowl)" />
        <ellipse cx="300" cy="628" rx="106" ry="24" fill="url(#rsl-wood2)" />
        <ellipse cx="300" cy="498" rx="196" ry="78" fill="url(#rsl-bowlRim)" />
        <ellipse cx="300" cy="503" rx="172" ry="60" fill="url(#rsl-bowlInner)" />

        <path
          d="M156 496 C174 460 226 444 300 444 C374 444 426 460 444 496 C444 518 380 534 300 534 C220 534 156 518 156 496 Z"
          fill="url(#rsl-powder)"
        />
        <path d="M172 492 C192 462 236 450 288 448 C244 458 212 476 200 500 Z" fill="#ffffff" opacity="0.22" />
        <path d="M446 486 C436 456 392 442 340 440 C392 450 424 470 434 494 Z" fill="#55703a" opacity="0.32" />
        <g fill="#7d9a55" opacity="0.55">
          <ellipse cx="228" cy="474" rx="5" ry="2.4" />
          <ellipse cx="262" cy="464" rx="4.4" ry="2.2" />
          <ellipse cx="300" cy="458" rx="5.4" ry="2.4" />
          <ellipse cx="342" cy="466" rx="4.6" ry="2.2" />
          <ellipse cx="374" cy="478" rx="5" ry="2.4" />
          <ellipse cx="206" cy="488" rx="4.2" ry="2" />
          <ellipse cx="396" cy="492" rx="4.4" ry="2" />
        </g>

        {/* the front lip of the bowl closes over the podi */}
        <path d="M104 498 A196 78 0 0 0 496 498 Z" fill="url(#rsl-bowl)" />
        <path d="M104 498 A196 78 0 0 0 496 498" stroke="#f3dcb6" strokeOpacity="0.7" strokeWidth="3.4" fill="none" />
        <path d="M130 524 A172 60 0 0 0 470 524" stroke="#7c5130" strokeOpacity="0.18" strokeWidth="4" fill="none" />

        {/* podi dusting the lip and the stone */}
        <g fill="#9db472" opacity="0.85">
          <ellipse cx="184" cy="512" rx="18" ry="5.6" transform="rotate(-8 184 512)" />
          <ellipse cx="416" cy="516" rx="15" ry="4.6" transform="rotate(9 416 516)" />
          <ellipse cx="344" cy="534" rx="22" ry="6.6" transform="rotate(-4 344 534)" />
          <ellipse cx="258" cy="530" rx="13" ry="4.4" />
        </g>
        <g fill="#ffffff" opacity="0.5">
          <circle cx="232" cy="408" r="3.8" />
          <circle cx="204" cy="362" r="2.6" />
          <circle cx="272" cy="386" r="3" />
          <circle cx="424" cy="374" r="3.2" />
          <circle cx="392" cy="326" r="2.4" />
        </g>

        {/* wooden scoop resting in the podi */}
        <g transform="rotate(-17 356 452)">
          <ellipse cx="356" cy="452" rx="34" ry="20" fill="url(#rsl-wood2)" />
          <ellipse cx="356" cy="448" rx="27" ry="13" fill="#8a5a31" />
          <ellipse cx="356" cy="448" rx="23" ry="10.4" fill="url(#rsl-powder)" />
          <path d="M386 440 c16-24 26-46 30-68" stroke="url(#rsl-wood)" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M390 434 c14-22 23-42 27-62" stroke="#e0b179" strokeOpacity="0.35" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </g>

        {/* a small spoon and a spilled line of podi on the stone */}
        <g transform="rotate(8 264 706)">
          <ellipse cx="264" cy="706" rx="23" ry="14" fill="url(#rsl-wood2)" />
          <ellipse cx="264" cy="703" rx="17" ry="8.6" fill="#8a5a31" />
          <ellipse cx="264" cy="703" rx="14" ry="6.4" fill="url(#rsl-powder)" />
          <path d="M286 700 c22-8 46-10 66-6" stroke="url(#rsl-wood)" strokeWidth="9" strokeLinecap="round" fill="none" />
        </g>
        <path d="M300 724 c24-8 50-10 70-4-18 12-50 14-70 4Z" fill="#9db472" opacity="0.8" />
        <path d="M212 736 c16-6 36-8 50-3-14 9-36 10-50 3Z" fill="#8fa763" opacity="0.7" />
      </g>


      {/* hibiscus at the front left */}
      <Hibiscus cx={106} cy={608} scale={0.86} />

      {/* fruit + roots (the roots keep their drawing, lifted onto the stone) */}
      <Amla cx={194} cy={658} r={34} />
      <Amla cx={244} cy={686} r={25} />
      <g transform="translate(-10 -66)">
        <path
          d="M394 704 c-6-24 8-44 30-48 20-4 35 9 39 28 4 18-4 37-19 44-17 9-37 5-46-9-3-5-4-10-4-15Z"
          fill="url(#rsl-turmeric)"
        />
        <path d="M406 668 c13-6 28-2 39 9" stroke="#f8d489" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      <g transform="rotate(22 448 640) scale(0.78)">
        <path
          d="M394 704 c-6-24 8-44 30-48 20-4 35 9 39 28 4 18-4 37-19 44-17 9-37 5-46-9-3-5-4-10-4-15Z"
          fill="url(#rsl-turmeric)"
          opacity="0.94"
        />
        <path d="M406 668 c13-6 28-2 39 9" stroke="#f8d489" strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      <Amla cx={492} cy={622} r={36} />
      <Amla cx={548} cy={588} r={26} />
      <Amla cx={446} cy={672} r={22} />

      {/* dried petals + seeds scattered over the stone */}
      <g transform="translate(0 -58)">
        <path d="M320 690 c18-9 42-7 56 6-17 11-42 8-56-6Z" fill="#b3243c" opacity="0.86" />
        <path d="M366 712 c14-7 32-5 43 5-13 8-32 6-43-5Z" fill="#c22b3f" opacity="0.7" />
        <path d="M172 660 c14-8 34-6 46 5-14 9-35 7-46-5Z" fill="#a81f36" opacity="0.72" />
        <path d="M498 620 c12-6 28-4 37 4-11 8-27 6-37-4Z" fill="#b3243c" opacity="0.62" />
        <g fill="#a9713c" opacity="0.85">
          <ellipse cx="286" cy="700" rx="6" ry="4" />
          <ellipse cx="304" cy="712" rx="5" ry="3.4" />
          <ellipse cx="342" cy="726" rx="5.6" ry="3.6" />
          <ellipse cx="372" cy="742" rx="4.6" ry="3" />
          <ellipse cx="258" cy="726" rx="5" ry="3.4" />
          <ellipse cx="520" cy="694" rx="5.4" ry="3.4" />
          <ellipse cx="150" cy="612" rx="5" ry="3.2" />
        </g>
        <g fill="#6f9b62" opacity="0.72">
          <ellipse cx="240" cy="744" rx="14" ry="5.4" transform="rotate(-18 240 744)" />
          <ellipse cx="392" cy="678" rx="12" ry="4.6" transform="rotate(12 392 678)" />
          <ellipse cx="540" cy="612" rx="13" ry="5" transform="rotate(-24 540 612)" />
          <ellipse cx="176" cy="636" rx="11" ry="4.2" transform="rotate(8 176 636)" />
        </g>
      </g>

      {/* curry leaf sprays hugging the sides, plus a few hanging in from above */}
      <SprigLine x={44} y={766} angle={9} length={386} leaves={6} tone="#4d7a4a" stem={4.2} opacity={0.92} />
      <SprigLine x={126} y={566} angle={52} length={186} leaves={4} tone="#5c8a52" stem={3.2} opacity={0.85} />
      <SprigLine x={572} y={754} angle={4} length={304} leaves={5} tone="#3f6f3d" stem={4} opacity={0.88} />
      <SprigLine x={612} y={560} angle={-12} length={214} leaves={4} tone="#6f9b62" stem={3.2} opacity={0.75} />
      <SprigLine x={544} y={32} angle={208} length={214} leaves={4} tone="#4d7a4a" stem={3.6} opacity={0.85} />
      <SprigLine x={468} y={10} angle={152} length={152} leaves={3} tone="#6f9b62" stem={3} opacity={0.75} />

      {/* loose leaves drifting in */}
      <g opacity="0.9">
        <ellipse cx="520" cy="300" rx="26" ry="10" fill="#6f9b62" transform="rotate(-38 520 300)" />
        <ellipse cx="466" cy="196" rx="22" ry="8.6" fill="#8fb98a" transform="rotate(24 466 196)" />
        <ellipse cx="566" cy="402" rx="19" ry="7.4" fill="#4d7a4a" transform="rotate(-12 566 402)" />
        <ellipse cx="156" cy="320" rx="21" ry="8" fill="#7c9885" transform="rotate(30 156 320)" />
        <ellipse cx="74" cy="452" rx="18" ry="7" fill="#a8c79b" transform="rotate(-20 74 452)" />
        <ellipse cx="604" cy="508" rx="20" ry="7.6" fill="#3f6b41" transform="rotate(14 604 508)" />
      </g>


    </svg>
  )
}

/** One outlined leaf, drawn from (x, y) and pointing along `angle`. */
function OutlineLeaf({ x = 0, y = 0, length = 44, angle = 0, opacity = 0.8 }) {
  const w = length * 0.3
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
      <path
        d={`M0 0 C ${length * 0.3} ${-w} ${length * 0.72} ${-w} ${length} 0 C ${length * 0.72} ${w} ${length * 0.3} ${w} 0 0 Z`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d={`M4 0 H ${length - 5}`} stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
    </g>
  )
}

/**
 * The botanical line work that sits *behind* the still-life plate: two
 * sweeping branches and a loose ring of drawn leaves. Strokes only, so
 * the CSS tints it with `color` and fades it with `opacity`.
 */
export function RitualLineArt({ className = '' }) {
  const leaves = [
    [30, 300, 52, -152, 0.8],
    [16, 372, 44, -140, 0.65],
    [52, 236, 40, -158, 0.7],
    [128, 258, 38, -120, 0.5],
    [150, 62, 46, 22, 0.72],
    [236, 34, 40, 10, 0.6],
    [326, 22, 36, 2, 0.5],
    [432, 42, 42, -18, 0.55],
    [560, 176, 46, 32, 0.72],
    [592, 244, 40, 22, 0.6],
    [604, 328, 36, 8, 0.52],
    [598, 420, 42, -6, 0.45],
    [566, 700, 46, -28, 0.7],
    [592, 636, 38, -18, 0.55],
    [40, 716, 46, 158, 0.62],
    [96, 754, 38, 172, 0.5],
  ]

  return (
    <svg className={className} viewBox="0 0 620 780" fill="none" aria-hidden="true">
      <g style={{ color: '#c8a24a' }} opacity="0.7">
        <path
          d="M26 752 C70 726 120 690 160 646 C204 598 232 552 250 500 C266 452 282 404 320 340 C356 280 400 220 470 176 C510 152 546 132 574 118"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M22 470 C60 424 96 372 118 308 C136 254 142 190 132 128"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="6 8"
          fill="none"
        />
        <path
          d="M602 470 C580 516 568 566 568 620"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="5 9"
          fill="none"
        />
      </g>

      <g style={{ color: '#8fb98a' }}>
        {leaves.map(([x, y, length, angle, opacity]) => (
          <OutlineLeaf key={`${x}-${y}`} x={x} y={y} length={length} angle={angle} opacity={opacity} />
        ))}
      </g>
    </svg>
  )
}

/** The faint drawn-leaf texture stamped inside a step card. */
export function LeafLineArt({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 90 140" fill="none" aria-hidden="true">
      <path d="M14 138 C34 104 54 72 74 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <OutlineLeaf x={34} y={104} length={40} angle={-34} opacity={0.9} />
      <OutlineLeaf x={52} y={80} length={34} angle={-140} opacity={0.8} />
      <OutlineLeaf x={62} y={52} length={36} angle={-38} opacity={0.75} />
      <OutlineLeaf x={72} y={28} length={28} angle={-136} opacity={0.62} />
      <OutlineLeaf x={76} y={10} length={24} angle={-40} opacity={0.55} />
    </svg>
  )
}



/* ------------------------- step 01: scoop & mix ---------------------- */

/** A bowl of podi with a wooden spoon standing in it. */
export function ScoopArt({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="rsa-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#20361f" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#20361f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rsa-bowl" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#f6e6cd" />
          <stop offset="55%" stopColor="#e2c69e" />
          <stop offset="100%" stopColor="#b98f5c" />
        </linearGradient>
        <linearGradient id="rsa-rim" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#fdf3e2" />
          <stop offset="60%" stopColor="#e6caa2" />
          <stop offset="100%" stopColor="#c39a66" />
        </linearGradient>
        <radialGradient id="rsa-cavity" cx="40%" cy="30%" r="76%">
          <stop offset="0" stopColor="#a9784a" />
          <stop offset="100%" stopColor="#7c5130" />
        </radialGradient>
        <radialGradient id="rsa-powder" cx="36%" cy="18%" r="86%">
          <stop offset="0" stopColor="#e6efc8" />
          <stop offset="48%" stopColor="#a5ba79" />
          <stop offset="100%" stopColor="#6c894b" />
        </radialGradient>
        <linearGradient id="rsa-wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d8a86d" />
          <stop offset="55%" stopColor="#ad7742" />
          <stop offset="100%" stopColor="#7f4f24" />
        </linearGradient>
      </defs>

      <ellipse cx="56" cy="99" rx="44" ry="10" fill="url(#rsa-shadow)" />

      <path d="M16 62 C16 84 32 97 54 97 C76 97 92 84 92 62 Z" fill="url(#rsa-bowl)" />
      <ellipse cx="54" cy="62" rx="38" ry="13" fill="url(#rsa-rim)" />
      <ellipse cx="54" cy="63" rx="32" ry="9" fill="url(#rsa-cavity)" />

      {/* heaped podi */}
      <path
        d="M24 62 C28 45 40 37 54 37 C68 37 80 45 84 62 C84 68 70 74 54 74 C38 74 24 68 24 62 Z"
        fill="url(#rsa-powder)"
      />
      <path d="M30 58 C34 48 42 43 52 42 C42 46 36 52 33 60 Z" fill="#ffffff" opacity="0.22" />
      <path d="M16 62 A38 13 0 0 0 92 62 Z" fill="url(#rsa-rim)" />
      <path d="M16 62 A38 13 0 0 0 92 62" stroke="#fdf3e2" strokeOpacity="0.7" strokeWidth="1.6" fill="none" />

      {/* wooden spoon standing in the podi */}
      <path d="M84 48 C96 38 104 24 108 8" stroke="url(#rsa-wood)" strokeWidth="6.5" strokeLinecap="round" fill="none" />
      <g transform="rotate(-34 72 54)">
        <ellipse cx="72" cy="54" rx="15" ry="10" fill="url(#rsa-wood)" />
        <ellipse cx="72" cy="52" rx="10.5" ry="6" fill="#8a5a31" />
        <ellipse cx="72" cy="52" rx="8.5" ry="4.4" fill="url(#rsa-powder)" />
      </g>

      {/* a dusting of podi and a sprig */}
      <g fill="#9db472" opacity="0.85">
        <ellipse cx="40" cy="88" rx="12" ry="4" transform="rotate(-8 40 88)" />
        <ellipse cx="76" cy="90" rx="9" ry="3" transform="rotate(7 76 90)" />
        <circle cx="98" cy="80" r="2.4" />
        <circle cx="14" cy="84" r="2" />
      </g>
      <SprigLine x={14} y={108} angle={-44} length={64} leaves={3} tone="#4d7a4a" stem={3} leafRx={10} leafRy={4} opacity={0.95} />
      <g fill="#ffffff" opacity="0.55">
        <circle cx="30" cy="42" r="2.6" />
        <circle cx="96" cy="34" r="2" />
      </g>
    </svg>
  )
}

/* ---------------------- step 02: apply & massage --------------------- */

/** A serene head with hands at the temples inside a dashed motion ring. */
export function MassageArt({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="rma-skin" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#f8dcc0" />
          <stop offset="60%" stopColor="#eec5a0" />
          <stop offset="100%" stopColor="#d9a67c" />
        </linearGradient>
        <linearGradient id="rma-hair" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#4a3a2c" />
          <stop offset="55%" stopColor="#33261c" />
          <stop offset="100%" stopColor="#241a13" />
        </linearGradient>
        <linearGradient id="rma-hand" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#f6d6b6" />
          <stop offset="100%" stopColor="#dda87e" />
        </linearGradient>
      </defs>

      {/* the circular massage motion */}
      <circle cx="60" cy="58" r="46" stroke="#c8a24a" strokeWidth="1.8" strokeDasharray="9 11" fill="none" opacity="0.6" />
      <path d="M96 26 L104 20 M96 26 L103 33" stroke="#c8a24a" strokeWidth="2.4" strokeLinecap="round" />

      {/* long hair behind the face */}
      <path d="M38 50 C30 70 30 92 36 108 C46 100 50 82 50 62 Z" fill="url(#rma-hair)" />
      <path d="M82 50 C90 70 90 92 84 108 C74 100 70 82 70 62 Z" fill="url(#rma-hair)" />

      {/* face */}
      <ellipse cx="60" cy="58" rx="21" ry="26" fill="url(#rma-skin)" />
      <ellipse cx="60" cy="86" rx="9" ry="7" fill="url(#rma-skin)" />
      <path
        d="M36 54 C34 28 46 14 60 14 C74 14 86 28 84 54 C82 40 74 30 60 30 C46 30 38 40 36 54 Z"
        fill="url(#rma-hair)"
      />

      {/* closed eyes, cheeks and a soft smile */}
      <path d="M47 57 c2.4 4 6.6 4 9 0" stroke="#5a4630" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M64 57 c2.4 4 6.6 4 9 0" stroke="#5a4630" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="45" cy="67" rx="5.6" ry="3.4" fill="#efa48c" opacity="0.4" />
      <ellipse cx="75" cy="67" rx="5.6" ry="3.4" fill="#efa48c" opacity="0.4" />
      <path d="M55 73 c2.6 2.6 7.4 2.6 10 0" stroke="#bf6a60" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* hands resting on the temples */}
      <g transform="rotate(16 26 62)">
        <ellipse cx="26" cy="62" rx="11.5" ry="16" fill="url(#rma-hand)" />
        <path d="M20 54 c4 0 8 0 12 0" stroke="#c99372" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" fill="none" />
        <path d="M19 61 c5 0 9 0 14 0" stroke="#c99372" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" fill="none" />
        <path d="M21 68 c4 0 8 0 11 0" stroke="#c99372" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" fill="none" />
      </g>
      <g transform="rotate(-16 94 62)">
        <ellipse cx="94" cy="62" rx="11.5" ry="16" fill="url(#rma-hand)" />
        <path d="M88 54 c4 0 8 0 12 0" stroke="#c99372" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" fill="none" />
        <path d="M87 61 c5 0 9 0 14 0" stroke="#c99372" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" fill="none" />
        <path d="M88 68 c4 0 8 0 11 0" stroke="#c99372" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" fill="none" />
      </g>

      {/* herbal accents */}
      <ellipse cx="22" cy="98" rx="11" ry="4.4" fill="#6f9b62" transform="rotate(-28 22 98)" />
      <ellipse cx="100" cy="96" rx="10" ry="4" fill="#8fb98a" transform="rotate(26 100 96)" />
      <ellipse cx="106" cy="46" rx="8" ry="3.4" fill="#4d7a4a" transform="rotate(-16 106 46)" opacity="0.8" />
    </svg>
  )
}



/* ------------------------ step 03: rinse & glow ---------------------- */

/** A teardrop of water. */
function Drop({ x, y, s = 1, opacity = 0.9 }) {
  return (
    <path
      d={`M${x} ${y} c ${4.6 * s} ${6.6 * s} ${4.6 * s} ${11.4 * s} 0 ${15.6 * s} c ${-4.6 * s} ${-4.2 * s} ${-4.6 * s} ${-9 * s} 0 ${-15.6 * s} Z`}
      fill="#8fc0d8"
      opacity={opacity}
    />
  )
}

/** A shower head with falling water, leaves and a little glow. */
export function RinseArt({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="rri-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dfe6e8" />
          <stop offset="55%" stopColor="#b3bfc4" />
          <stop offset="100%" stopColor="#85939a" />
        </linearGradient>
      </defs>

      <path d="M84 24 C94 20 100 14 100 4" stroke="url(#rri-metal)" strokeWidth="6.5" strokeLinecap="round" fill="none" />
      <path d="M42 38 h40 l-7 -14 h-26 Z" fill="url(#rri-metal)" />
      <rect x="38" y="38" width="48" height="8" rx="4" fill="#8f9ca2" />
      <rect x="40" y="39" width="44" height="2.6" rx="1.3" fill="#ffffff" opacity="0.5" />
      <g fill="#6d7a80">
        {[46, 54, 62, 70, 78].map((x) => (
          <circle key={x} cx={x} cy="49.6" r="1.7" />
        ))}
      </g>

      {/* the water */}
      <g opacity="0.95">
        <path d="M46 52 v7 M54 52 v9 M62 52 v6 M70 52 v9 M78 52 v7" stroke="#a8d4e6" strokeWidth="2.2" strokeLinecap="round" />
        <Drop x={48} y={60} s={1.05} opacity={0.9} />
        <Drop x={62} y={54} s={1.15} opacity={0.95} />
        <Drop x={76} y={60} s={1.05} opacity={0.9} />
        <Drop x={55} y={82} s={0.95} opacity={0.8} />
        <Drop x={70} y={84} s={0.95} opacity={0.8} />
        <Drop x={62} y={100} s={0.8} opacity={0.6} />
      </g>

      {/* leaves + glow */}
      <ellipse cx="26" cy="66" rx="13" ry="5.4" fill="#6f9b62" transform="rotate(-36 26 66)" />
      <ellipse cx="30" cy="84" rx="10" ry="4.2" fill="#8fb98a" transform="rotate(-14 30 84)" />
      <ellipse cx="96" cy="88" rx="11" ry="4.4" fill="#4d7a4a" transform="rotate(26 96 88)" opacity="0.85" />
      <path d="M92 74 l2.6 6.6 6.6 2.6 -6.6 2.6 -2.6 6.6 -2.6-6.6 -6.6-2.6 6.6-2.6Z" fill="#e6cd8c" />
      <path d="M28 104 l1.8 4.6 4.6 1.8 -4.6 1.8 -1.8 4.6 -1.8-4.6 -4.6-1.8 4.6-1.8Z" fill="#e6cd8c" opacity="0.85" />
    </svg>
  )
}


/* ---------------------------- tip glyphs ---------------------------- */

/** A bowl of bath podi with a little steam of three dots. */
export function BathTipGlyph({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8 20 C8 30 13 35 20 35 C27 35 32 30 32 20 Z" fill="#cfe0bd" />
      <path d="M8 20 C8 30 13 35 20 35 C27 35 32 30 32 20" stroke="#4d7a4a" strokeWidth="1.7" fill="none" />
      <path d="M5 19 h30" stroke="#4d7a4a" strokeWidth="2" strokeLinecap="round" />
      <g fill="#8fb98a">
        <circle cx="14" cy="13" r="2.4" />
        <circle cx="20" cy="8" r="2.8" />
        <circle cx="26" cy="13" r="2.4" />
      </g>
    </svg>
  )
}

/** A drawn seekkai leaf. */
export function SeekkaiTipGlyph({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M35 5 C17 8 6 17 5 32 c0 2 2 4 4 4 15-1 25-12 26-31Z" fill="#8fb98a" />
      <path d="M35 5 C17 8 6 17 5 32" stroke="#4d7a4a" strokeWidth="1.6" fill="none" />
      <path d="M31 9 C22 16 15 24 10 33" stroke="#fbf7ee" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" fill="none" />
    </svg>
  )
}

/** A bottle of herbal oil with a leaf. */
export function HairTipGlyph({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M24 34 C19 30 12 30 8 26 c-3-3-3-9 2-11 5-2 11 1 14 5 2 3 2 8 0 14Z" fill="#8fb98a" opacity="0.9" />
      <rect x="18" y="12" width="13" height="24" rx="5" fill="#cfe0bd" />
      <rect x="18" y="12" width="13" height="24" rx="5" stroke="#4d7a4a" strokeWidth="1.7" fill="none" />
      <rect x="21.5" y="5" width="6" height="8" rx="2" fill="#8fb98a" />
      <rect x="20" y="22" width="9" height="3" rx="1.5" fill="#4d7a4a" opacity="0.45" />
      <path d="M34 6 c1.6 3 1.6 5.4 0 7.4 -1.6-2 -1.6-4.4 0-7.4Z" fill="#c8a24a" />
    </svg>
  )
}
