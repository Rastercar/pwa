/**
 * Type guard to check if is a LatLngLiteral
 */
export const isLatLng = (x: unknown): x is google.maps.LatLngLiteral => {
  if (!x || Array.isArray(x) || typeof x !== 'object') return false

  const casted = x as google.maps.LatLngLiteral
  return typeof casted.lat === 'number' && typeof casted.lng === 'number'
}
