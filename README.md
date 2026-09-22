# Flores amarillas

Web app responsive (React + Vite) que muestra pensamientos cortos sobre fondo
negro, mientras flores amarillas van floreciendo alrededor a medida que bajas
con el scroll.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # build de producción en dist/
npm run lint     # oxlint
```

## Agregar pensamientos

Todo el contenido vive en [`src/data/thoughts.json`](src/data/thoughts.json).
La página se arma sola a partir de ese archivo: agregar un objeto al arreglo
`thoughts` crea una sección nueva, con su animación de entrada y su propio
grupo de flores.

```json
{
  "title": "Flores amarillas",
  "subtitle": "Un jardín de pensamientos que florecen al bajar",
  "thoughts": [
    { "id": "1", "text": "Un pensamiento de máximo 500 caracteres." },
    { "id": "4", "text": "Otro más, y la sección aparece sola." }
  ]
}
```

- `id`: identificador único y estable (también define la semilla del jardín de
  esa sección, así que cada pensamiento tiene siempre las mismas flores).
- `text`: máximo **500 caracteres**. Si se pasa, aparece un aviso en la consola
  durante el desarrollo (`src/lib/thoughts.js`).

No hay límite de pensamientos: la numeración (`01`, `02`, …) se calcula sola.

## Cómo está armado

```
src/
  data/thoughts.json      contenido editable
  lib/thoughts.js         normaliza el JSON y valida el largo
  lib/garden.js           reparte las flores por sección (layouts sides/crown/ground)
  lib/random.js           PRNG con semilla: el jardín no salta entre renders
  components/flowerShapes.jsx  los trazos SVG de los 4 tipos de flor
  components/Flower.jsx   una flor suelta + su animación de crecer
  components/FlowerField.jsx  capa decorativa de flores de una sección
  components/Reveal.jsx   aparición compartida de los textos
  components/Bouquet.jsx  el ramo de las 4 flores de la portada
  components/Hero.jsx     portada con el título palabra por palabra
  components/Thought.jsx  una sección de pensamiento
```

### Detalles

- **Animaciones**: [`motion`](https://motion.dev) (Framer Motion). Los textos y
  las flores entran con `whileInView`, una sola vez, al acercarse al viewport.
  El tallo se dibuja animando `pathLength` y la corola crece con un `spring`.
- **Los 4 tipos de flor** (`daisy`, `poppy`, `tulip`, `pompon`) se eligen al
  azar, igual que tamaño, rotación, balanceo y retardo. En la portada aparecen
  los cuatro juntos, atados como ramo, sobre el título.
- **El cierre** usa el layout `ground` en tres filas (atrás más chicas y
  tenues, adelante más grandes) para que se lea como un campo florido.
- **Responsive**: las flores se posicionan en porcentajes y se reducen en
  pantallas chicas (`useCompactViewport`) para no estorbar la lectura.
- **Accesibilidad**: las flores son decorativas (`aria-hidden`) y todo el
  movimiento se desactiva si el sistema pide `prefers-reduced-motion`.

### Cambiar la paleta

Las variables están en `src/index.css` (`--petal`, `--petal-edge`,
`--petal-core`, `--stem`, `--bg`, `--ink`).
