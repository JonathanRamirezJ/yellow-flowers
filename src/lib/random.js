/**
 * PRNG determinista: la misma `seed` siempre produce la misma secuencia.
 * Así el jardín se ve igual entre renders (y entre recargas) en vez de
 * saltar de posición cada vez que React vuelve a pintar.
 */
export function createRandom(seed) {
  let state = typeof seed === 'number' ? seed : hashString(String(seed))

  return function random() {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(value) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** Número real dentro de un rango. */
export function between(random, min, max) {
  return min + random() * (max - min)
}

/** Elemento al azar de una lista. */
export function pick(random, items) {
  return items[Math.floor(random() * items.length)]
}
