import { motion, useReducedMotion } from 'motion/react'
import { SHAPES } from './flowerShapes'

/**
 * Una flor amarilla dibujada a mano en SVG. Hay 4 tipos y todos comparten
 * el mismo lienzo: la corola vive alrededor de (100, 92) y el tallo baja
 * hasta el borde inferior del viewBox.
 */

export default function Flower({
  type = 'daisy',
  left = 50,
  top = 50,
  scale = 1,
  rotation = 0,
  flip = false,
  delay = 0,
  sway = 7,
  swayDelay = 0,
  depth = 1,
}) {
  const reduceMotion = useReducedMotion()
  const shape = SHAPES[type] ?? SHAPES.daisy

  const container = {
    hidden: { opacity: 0, rotate: rotation - 12 },
    grown: {
      opacity: depth,
      rotate: rotation,
      transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const stem = {
    hidden: { pathLength: 0, opacity: 0 },
    grown: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.2, delay: delay + 0.05, ease: 'easeOut' },
    },
  }

  const head = {
    hidden: { scale: 0, rotate: -35 },
    grown: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 130, damping: 13, delay: delay + 0.55 },
    },
  }

  const leaf = {
    hidden: { scale: 0, opacity: 0 },
    grown: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, delay: delay + 0.85, ease: 'backOut' },
    },
  }

  return (
    <div
      className="flower"
      aria-hidden="true"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        '--flower-scale': scale,
        '--flower-sway': `${sway}s`,
        '--flower-sway-delay': `${swayDelay}s`,
      }}
    >
      <motion.div
        className="flower__grow"
        variants={container}
        initial={reduceMotion ? 'grown' : 'hidden'}
        whileInView="grown"
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      >
        <div className="flower__sway">
          <svg
            className={`flower__svg${flip ? ' is-flipped' : ''}`}
            viewBox="0 0 200 340"
            fill="none"
            role="presentation"
          >
            <motion.path className="flower__stem" d={shape.stem} variants={stem} />
            {shape.leaf && (
              <motion.path className="flower__leaf" d={shape.leaf} variants={leaf} />
            )}
            <motion.g className="flower__head" variants={head}>
              {shape.head}
            </motion.g>
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
