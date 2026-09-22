import { motion, useReducedMotion } from 'motion/react'

/**
 * Aparición compartida por el título, el subtítulo y los pensamientos:
 * suben un poco, se enfocan y entran en opacidad al llegar al viewport.
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  immediate = false,
  className,
  children,
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] ?? motion.div

  const variants = {
    hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const trigger = immediate
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, amount: 0.35 } }

  return (
    <Component
      className={className}
      variants={variants}
      initial={reduceMotion ? 'visible' : 'hidden'}
      {...trigger}
      {...rest}
    >
      {children}
    </Component>
  )
}
