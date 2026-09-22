# Yellow Flowers

A responsive web app (React + Vite) that shows short thoughts on a dark
background while yellow flowers bloom around them as you scroll down.

## Development

```bash
npm install
npm run dev      # local server
npm run build    # production build in dist/
npm run lint     # oxlint
```

## Adding thoughts

All the content lives in [`src/data/thoughts.json`](src/data/thoughts.json).
The page builds itself from that file: adding an object to the `thoughts`
array creates a new section, with its own entrance animation and its own
group of flowers.

```json
{
  "title": "Flores amarillas",
  "subtitle": "Un jardín de pensamientos que florecen al bajar",
  "dedication": "Con amor y cariño para Sandy mi prometida",
  "thoughts": [
    { "id": "1", "text": "A thought, 500 characters max." },
    { "id": "4", "text": "Another one, and the section shows up on its own." }
  ]
}
```

- `title`, `subtitle`, `dedication`: the three lines of the cover. Leave
  `dedication` out (or empty) and it simply isn't rendered.
- `id`: unique, stable identifier. It also seeds that section's garden, so a
  thought always gets the same flowers.
- `text`: **500 characters max**. Going over logs a warning in the console
  during development (`src/lib/thoughts.js`).

There is no limit on how many thoughts you add — the numbering (`01`, `02`, …)
is computed automatically.

## How it's put together

```
src/
  data/thoughts.json           editable content
  lib/thoughts.js              normalizes the JSON and checks the length
  lib/garden.js                lays the flowers out per section (sides/crown/ground)
  lib/random.js                seeded PRNG, so the garden doesn't jump between renders
  components/flowerShapes.jsx  the SVG strokes of the 4 flower types
  components/Flower.jsx        a single flower and its growing animation
  components/FlowerField.jsx   a section's decorative flower layer
  components/Reveal.jsx        the shared entrance animation for text
  components/Bouquet.jsx       the 4-flower bouquet on the cover
  components/Hero.jsx          cover, with the title arriving word by word
  components/Thought.jsx       one thought section
```

### Details

- **Animation**: [`motion`](https://motion.dev) (Framer Motion). Text and
  flowers come in with `whileInView`, once, as they approach the viewport.
  Stems are drawn by animating `pathLength` and the blossom pops with a
  `spring`.
- **The 4 flower types** (`daisy`, `poppy`, `tulip`, `pompon`) are picked at
  random, along with size, rotation, sway and delay. On the cover all four
  appear together, tied as a bouquet above the title.
- **The closing section** uses the `ground` layout in three rows — smaller and
  dimmer at the back, larger up front — so it reads as a field in bloom.
- **Responsive**: flowers are positioned in percentages and scale down on
  small screens (`useCompactViewport`) so they never get in the way of the
  text.
- **Accessibility**: flowers are decorative (`aria-hidden`) and every bit of
  motion is turned off when the system asks for `prefers-reduced-motion`.

### Changing the palette

The variables live in `src/index.css` (`--petal`, `--petal-edge`,
`--petal-core`, `--stem`, `--bg`, `--ink`).
