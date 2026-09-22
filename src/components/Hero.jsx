import { motion, useReducedMotion } from 'motion/react'
import Bouquet from './Bouquet'
import FlowerField from './FlowerField'
import Reveal from './Reveal'

/** Portada: el título entra palabra por palabra en la primera carga. */
export default function Hero({ title, subtitle, dedication }) {
  const reduceMotion = useReducedMotion()
  const words = title.split(' ').filter(Boolean)
  const subtitleDelay = 0.3 + words.length * 0.13

  return (
    <header className="hero">
      <FlowerField seed="hero-crown" layout="crown" count={7} />
      <FlowerField seed="hero-sides" layout="sides" count={6} />

      <div className="hero__inner">
        <Bouquet />

        <h1 className="hero__title">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="hero__word"
              initial={reduceMotion ? false : { opacity: 0, y: '0.55em', filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 1.2,
                delay: 0.25 + index * 0.13,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <Reveal as="p" className="hero__subtitle" delay={subtitleDelay} immediate>
          {subtitle}
        </Reveal>

        {dedication && (
          <Reveal
            as="p"
            className="hero__dedication"
            delay={subtitleDelay + 0.25}
            immediate
          >
            {dedication}
          </Reveal>
        )}
      </div>

      <Reveal className="hero__cue" delay={subtitleDelay + 0.5} immediate>
        <span className="hero__cue-label">baja despacio</span>
        <span className="hero__cue-line" />
      </Reveal>
    </header>
  )
}
