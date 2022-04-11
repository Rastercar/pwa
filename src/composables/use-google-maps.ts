import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'

const api = ref<typeof google['maps'] | null>(null)
const loading = ref(false)

type onSuccess = (gmapsApi: typeof google) => void
type onError = (error: Error) => void

/**
 * Loads the google maps API, if its not already loaded providing a loading
 * ref and a onSuccess, onError hooks
 *
 * **NOTE:** This assumes only a single google maps API can be loaded,
 * if you use the hook multiple times with different keys, only the
 * first key will be used to load the api
 *
 * @example
 * ```ts
 * const { api: googleMapsApi, onSuccess } = useGoogleMaps(myApiKey)
 *
 * onSuccess(() => {
 *   console.log('Google maps api loaded !')
 * })
 * ```
 */
export function useGoogleMaps(key?: string) {
  const apiKey = key || process.env.GMAPS_API_KEY

  let onSuccessHook: onSuccess | null = null
  let onErrorHook: onError | null = null

  if (!api.value) {
    loading.value = true

    new Loader({ apiKey })
      .load()
      .then((gmapsApi) => {
        api.value = gmapsApi.maps
        if (onSuccessHook) onSuccessHook(gmapsApi)
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.error('[GMAPS-ERROR] couldnt load google maps API', error)
        if (onErrorHook) onErrorHook(error)
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    api,
    loading,
    onError: (hook: onError) => {
      onErrorHook = hook
    },
    onSuccess: (hook: onSuccess) => {
      onSuccessHook = hook
    },
  }
}
