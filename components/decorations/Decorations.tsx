import React from 'react'

import TL from './TL.svg'
import TL1 from './TL-1.svg'
import TL2 from './TL-2.svg'

import TR from './TR.svg'
import TR1 from './TR-1.svg'
import TR2 from './TR-2.svg'

import BR from './BR.svg'
import BR1 from './BR-1.svg'
import BR2 from './BR-2.svg'

import BL from './BL.svg'
import BL1 from './BL-1.svg'
import BL2 from './BL-2.svg'

export type Corner = 'tl' | 'tr' | 'br' | 'bl'

type Props = {
  children?: React.ReactNode
  className?: string
  /** show or hide decorations (useful for printing or small screens) */
  show?: boolean
  /** which corners to render (defaults to all) */
  positions?: Corner[]
  /** scale factor applied to max sizes (1 = default) */
  sizeScale?: number
  /** optional seed (number or string) to deterministically randomize which variant shows */
  seed?: number | string
}

/**
 * Decorations wrapper
 * - Wraps content in a relatively positioned container
 * - Renders SVG decorations absolutely positioned (corners / side)
 * - Uses overflow:hidden on the wrapper so decorations never cause scrollbars
 */
export default function Decorations({ children, className, show = true, positions, sizeScale = 1, seed }: Props) {
  if (!show) return <div className={className}>{children}</div>

  // allow overflow so decorations can extend beyond parent bounds and sit visually on top
  const wrapperStyle: React.CSSProperties = {
    overflow: 'visible',
  }

  const decoBase: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    userSelect: 'none',
    display: 'block',
    // ensure images scale down but don't grow to absurd size
    maxWidth: '40%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    opacity: 0.95,
  }

  const decos: { src: string; style: React.CSSProperties; key: string; pos: Corner }[] = [
    // Top-left
    {
      src: TL,
      style: {
        ...decoBase,
        top: 0,
        left: 0,
        transform: 'translate(-8%, -8%)',
        maxWidth: `${18 * sizeScale}%`,
        maxHeight: `${220 * sizeScale}px`,
      } as React.CSSProperties,
      key: 'tl',
      pos: 'tl',
    },
    // Top-right
    {
      src: TR,
      style: {
        ...decoBase,
        top: 0,
        right: 0,
        transform: 'translate(8%, -10%)',
        maxWidth: `${18 * sizeScale}%`,
        maxHeight: `${220 * sizeScale}px`,
      } as React.CSSProperties,
      key: 'tr',
      pos: 'tr',
    },
    // Bottom-right
    {
      src: BR,
      style: {
        ...decoBase,
        bottom: 0,
        right: 0,
        transform: 'translate(12%, 12%)',
        maxWidth: `${26 * sizeScale}%`,
        maxHeight: `${320 * sizeScale}px`,
      } as React.CSSProperties,
      key: 'br',
      pos: 'br',
    },
    // Bottom-left
    {
      src: BL,
      style: {
        ...decoBase,
        bottom: 0,
        left: 0,
        transform: 'translate(-10%, 10%)',
        maxWidth: `${20 * sizeScale}%`,
        maxHeight: `${260 * sizeScale}px`,
      } as React.CSSProperties,
      key: 'bl',
      pos: 'bl',
    },
  ]

  // Filter by requested positions if provided
  const visible = decos.filter((d) => positions.includes(d.pos));

  // seeded RNG (mulberry32) for deterministic selection
  const seedNumber = typeof seed === 'string' ? hashStringToNumber(seed) : typeof seed === 'number' ? seed : 0
  const rng = mulberry32(seedNumber)

  // group variants per corner (base + numbered variants)
  const variantsMap: Record<Corner, string[]> = {
    tl: [TL, TL1, TL2],
    tr: [TR, TR1, TR2],
    br: [BR, BR1, BR2],
    bl: [BL, BL1, BL2],
  }

  return (
    <div className={className} style={wrapperStyle}>
      {children}

      {/* Decorations are decorative only */}
      {visible.map((d) => {
        const variants = variantsMap[d.pos] || [d.src]
        const pick = seedNumber ? Math.floor(rng() * variants.length) : 0
        const src = variants[pick] || d.src
        const style = { ...d.style, position: 'absolute', zIndex: 50 }
        // eslint-disable-next-line react/jsx-no-img-element
        return <img key={d.key} src={src} alt="" role="presentation" aria-hidden style={style} />
      })}
    </div>
  )
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashStringToNumber(s: string) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}
