import FlowerField from './FlowerField'
import Reveal from './Reveal'

/** Una sección de pensamiento: número, texto y su propio grupo de flores. */
export default function Thought({ id, index, text }) {
  return (
    <section className="thought">
      <FlowerField seed={`thought-${id}`} layout="sides" count={5} />
      <div className="thought__inner">
        <Reveal as="span" className="thought__index" delay={0}>
          {String(index).padStart(2, '0')}
        </Reveal>
        <Reveal as="p" className="thought__text" delay={0.12}>
          {text}
        </Reveal>
      </div>
    </section>
  )
}
