import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { isLatLng } from 'src/utils/google-maps.utils'

interface UseGeolocationOpts {
  initialCoordinates?: google.maps.LatLngLiteral
  /**
   * When the user coords change save it on the local storage
   */
  saveCoordsOnLocalStorage?: boolean
  /**
   * If true will attempt to load the initial coordinates from the
   * last know coordinates saved in the localstorage
   */
  loadInitialCoordsFromLastUserCoords?: boolean
}

const defaultOpts = {
  initialCoordinates: { lat: 0, lng: 0 },
  saveCoordsOnLocalStorage: true,
  loadInitialCoordsFromLastUserCoords: true,
}

export function useGeolocation(opts?: UseGeolocationOpts) {
  const options = { ...defaultOpts, ...opts }

  let initCoords = options.initialCoordinates

  if (options.loadInitialCoordsFromLastUserCoords) {
    const lastUserCoordsStr = localStorage.getItem('userLastCoords')

    if (lastUserCoordsStr) {
      const lastUserCoords: unknown = JSON.parse(lastUserCoordsStr)
      if (isLatLng(lastUserCoords)) initCoords = lastUserCoords
    }
  }

  const coords: Ref<google.maps.LatLngLiteral> = ref(initCoords)
  const isSupported = 'navigator' in window && 'geolocation' in navigator

  let watcherId: number | null = null

  onMounted(() => {
    if (!isSupported) return

    watcherId = navigator.geolocation.watchPosition(({ coords: c }) => {
      const latLng = { lat: c.latitude, lng: c.longitude }
      if (options.saveCoordsOnLocalStorage) {
        localStorage.setItem('userLastCoords', JSON.stringify(latLng))
      }
      coords.value = latLng
    })
  })

  onUnmounted(() => {
    if (watcherId) navigator.geolocation.clearWatch(watcherId)
  })

  return { coords, isSupported }
}
