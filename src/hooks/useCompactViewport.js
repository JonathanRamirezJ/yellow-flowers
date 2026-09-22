import { useSyncExternalStore } from 'react'

const QUERY = '(max-width: 720px)'

function subscribe(onChange) {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot() {
  return false
}

/** `true` en pantallas de móvil: el jardín se aclara para no tapar el texto. */
export function useCompactViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
