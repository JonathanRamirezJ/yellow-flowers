import { motion, useReducedMotion } from 'motion/react'
import { HEADS, HEAD_X, HEAD_Y } from './flowerShapes'

/**
 * Ramo de la portada: las 4 flores atadas por un lazo, con los tallos
 * saliendo del mismo punto. Solo aparece en la pantalla de inicio.
 */

const STALKS = [
  {
    type: 'daisy',
    stem: 'M210 318C192 262 152 202 130 148',
    head: { x: 128, y: 98, scale: 0.68 },
    delay: 0.1,
  },
  {
    type: 'poppy',
    stem: 'M210 318C228 262 268 198 290 142',
    head: { x: 292, y: 94, scale: 0.68 },
    delay: 0.2,
  },
  {
    type: 'tulip',
    stem: 'M210 318C202 250 204 180 206 124',
    head: { x: 210, y: 62, scale: 0.62 },
    delay: 0,
  },
  {
    type: 'pompon',
    stem: 'M210 318C210 282 208 248 206 206',
    head: { x: 208, y: 166, scale: 0.56 },
    delay: 0.3,
  },
]

const LEAVES = [
  'M196 284C166 270 144 284 140 306C164 320 188 308 196 284Z',
  'M224 294C252 278 274 290 278 310C256 326 232 316 224 294Z',
]

export default function Bouquet() {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    visible: { transition: { delayChildren: 0.15 } },
  }

  const stem = (delay) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, delay, ease: 'easeOut' },
    },
  })

  const head = (delay) => ({
    hidden: { scale: 0, rotate: -30 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 120, damping: 13, delay: delay + 0.7 },
    },
  })

  const detail = (delay) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay, ease: 'backOut' },
    },
  })

  return (
    <motion.svg
      className="bouquet"
      viewBox="0 0 420 360"
      fill="none"
      role="presentation"
      aria-hidden="true"
      variants={container}
      initial={reduceMotion ? 'visible' : 'hidden'}
      animate="visible"
    >
      <g className="bouquet__sway">
        {STALKS.map((stalk) => (
          <motion.path
            key={`stem-${stalk.type}`}
            className="flower__stem"
            d={stalk.stem}
            variants={stem(stalk.delay)}
          />
        ))}

        {LEAVES.map((leaf, index) => (
          <motion.path
            key={`leaf-${index}`}
            className="flower__leaf bouquet__leaf"
            d={leaf}
            variants={detail(0.9 + index * 0.1)}
          />
        ))}

        {STALKS.map((stalk) => (
          <g
            key={`head-${stalk.type}`}
            transform={`translate(${stalk.head.x} ${stalk.head.y}) scale(${stalk.head.scale}) translate(${-HEAD_X} ${-HEAD_Y})`}
          >
            <motion.g className="flower__head" variants={head(stalk.delay)}>
              {HEADS[stalk.type]}
            </motion.g>
          </g>
        ))}

        <motion.g className="bouquet__tie" variants={detail(1.15)}>
          <path d="M184 304C202 318 218 318 236 304" />
          <path d="M187 318C203 330 217 330 233 318" />
        </motion.g>
      </g>
    </motion.svg>
  )
}
