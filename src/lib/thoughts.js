/** Límite de contenido por pensamiento. */
export const MAX_THOUGHT_LENGTH = 500

/**
 * Normaliza el JSON de pensamientos: descarta entradas vacías, garantiza
 * un id estable y avisa en desarrollo si alguien se pasa de 500 caracteres.
 */
export function readGarden(data) {
  const thoughts = (data?.thoughts ?? [])
    .filter((item) => typeof item?.text === 'string' && item.text.trim() !== '')
    .map((item, index) => ({
      id: String(item.id ?? index + 1),
      text: item.text.trim(),
    }))

  if (import.meta.env.DEV) {
    for (const thought of thoughts) {
      if (thought.text.length > MAX_THOUGHT_LENGTH) {
        console.warn(
          `[pensamientos] El pensamiento "${thought.id}" tiene ${thought.text.length} caracteres ` +
            `y el máximo es ${MAX_THOUGHT_LENGTH}.`,
        )
      }
    }
  }

  return {
    title: data?.title ?? '',
    subtitle: data?.subtitle ?? '',
    dedication: data?.dedication ?? '',
    thoughts,
  }
}
