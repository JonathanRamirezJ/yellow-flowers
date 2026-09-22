import Hero from './components/Hero'
import Thought from './components/Thought'
import FlowerField from './components/FlowerField'
import Reveal from './components/Reveal'
import garden from './data/thoughts.json'
import { readGarden } from './lib/thoughts'
import './App.css'

const { title, subtitle, dedication, thoughts } = readGarden(garden)

function App() {
  return (
    <main className="page">
      <Hero title={title} subtitle={subtitle} dedication={dedication} />

      {thoughts.map((thought, index) => (
        <Thought
          key={thought.id}
          id={thought.id}
          index={index + 1}
          text={thought.text}
        />
      ))}

      <footer className="closing">
        <FlowerField seed="closing" layout="ground" count={33} />
        <Reveal as="p" className="closing__text">
          Y así, hasta la próxima flor.
        </Reveal>
      </footer>
    </main>
  )
}

export default App
