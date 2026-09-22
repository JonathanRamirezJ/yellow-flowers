import { useMemo } from 'react'
import Flower from './Flower'
import { buildField } from '../lib/garden'
import { useCompactViewport } from '../hooks/useCompactViewport'

/**
 * Capa decorativa de flores para una sección. Se posiciona en absoluto
 * sobre la sección y nunca intercepta clics ni lectores de pantalla.
 */
export default function FlowerField({ seed, layout = 'sides', count = 6 }) {
  const compact = useCompactViewport()
  const flowers = useMemo(
    () => buildField({ seed, layout, count, compact }),
    [seed, layout, count, compact],
  )

  return (
    <div className="flower-field" aria-hidden="true">
      {flowers.map(({ key, ...flower }) => (
        <Flower key={key} {...flower} />
      ))}
    </div>
  )
}
