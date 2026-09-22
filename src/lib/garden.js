import { between, createRandom, pick } from './random'

/** Los 4 tipos de flor que se dibujan en <Flower />. */
export const FLOWER_TYPES = ['daisy', 'poppy', 'tulip', 'pompon']

/**
 * Reparte flores dentro de una sección. Las posiciones son porcentajes
 * relativos a la sección, así que todo escala solo en responsive.
 *
 * layout:
 *  - 'sides'  → columnas izquierda y derecha, libres de texto
 *  - 'crown'  → cuelgan del borde superior (tallo hacia arriba)
 *  - 'ground' → crecen desde el borde inferior
 */
export function buildField({ seed, layout = 'sides', count = 6, compact = false }) {
  const random = createRandom(`${seed}:${layout}`)
  const total = compact ? Math.max(2, Math.round(count * 0.6)) : count

  const flowers = []
  for (let i = 0; i < total; i++) {
    const base = {
      key: `${seed}-${layout}-${i}`,
      type: pick(random, FLOWER_TYPES),
      scale: between(random, 0.78, 1.22),
      flip: random() > 0.5,
      delay: between(random, 0, 0.45),
      sway: between(random, 5, 9.5),
      swayDelay: between(random, -6, 0),
      depth: between(random, 0.82, 1),
    }

    flowers.push({ ...base, ...place(layout, random, i, total, compact) })
  }

  return flowers
}

function place(layout, random, index, total, compact) {
  if (layout === 'crown') {
    return {
      left: between(random, 2, 98),
      top: between(random, -12, 6),
      rotation: between(random, 155, 205),
    }
  }

  if (layout === 'ground') {
    // Tres filas: las de atrás son más chicas y tenues, las de adelante mandan.
    const rows = 3
    const row = index % rows
    const column = Math.floor(index / rows)
    const perRow = Math.ceil(total / rows)

    return {
      left: ((column + between(random, 0.1, 0.9)) / perRow) * 112 - 6,
      top: [54, 69, 85][row] + between(random, -4, 4),
      rotation: between(random, -16, 16),
      scale: [0.58, 0.82, 1.14][row] * between(random, 0.86, 1.14),
      depth: [0.6, 0.8, 1][row],
    }
  }

  // 'sides': mitad a la izquierda, mitad a la derecha, repartidas en vertical.
  const isLeft = index % 2 === 0
  const lane = ((Math.floor(index / 2) + between(random, 0.1, 0.9)) / Math.ceil(total / 2)) * 100
  const edge = compact ? between(random, -3, 7) : between(random, 1, 13)

  return {
    left: isLeft ? edge : 100 - edge,
    top: Math.min(96, Math.max(4, lane)),
    rotation: isLeft ? between(random, -30, 4) : between(random, -4, 30),
  }
}
