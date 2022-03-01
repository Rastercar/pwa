import { watch, ref, Ref, inject, InjectionKey } from 'vue'

type mapComponent =
  | google.maps.Marker
  | google.maps.Circle
  | google.maps.Polygon
  | google.maps.Polyline
  | google.maps.Rectangle

type mapComponentOptions =
  | google.maps.MarkerOptions
  | google.maps.CircleOptions
  | google.maps.PolygonOptions
  | google.maps.PolylineOptions
  | google.maps.RectangleOptions

type mapComponentName =
  | 'Marker'
  | 'Polyline'
  | 'Polygon'
  | 'Rectangle'
  | 'Circle'

/**
 * Global injection key for the global google map
 */
export const MapSymbol: InjectionKey<Ref<google.maps.Map | null>> = Symbol('map') // prettier-ignore

/**
 * Global injection key for the google map
 */
export const ApiSymbol: InjectionKey<Ref<typeof google.maps | null>> = Symbol('api') // prettier-ignore

/**
 * Indicates the map **and its tiles** have been loaded
 */
export const MapWasLoadedSymbol: InjectionKey<Ref<boolean>> = Symbol('mapwasloaded') // prettier-ignore

interface UseMapComponentArgs {
  events: string[]
  options: Ref<mapComponentOptions>
  componentName: mapComponentName
  emit: (event: string, ...args: unknown[]) => void
}

interface UseMapComponentRet {
  component: Ref<mapComponent | null>
}

/**
 * Creates a component for use inside the `GoogleMap` component
 *
 * @param args.componentName
 * @param args.events same name as in google maps docs
 * @param args.options options to pass on the component creation
 * @param args.emit vue emmit fn for event registering
 */
export const useMapComponent = (
  args: UseMapComponentArgs
): UseMapComponentRet => {
  const { componentName, events, options, emit } = args

  let _component: mapComponent | null = null
  const component = ref<mapComponent | null>(null)

  const map = inject(MapSymbol, ref(null))
  const api = inject(ApiSymbol, ref(null))

  watch(
    [map, options],
    (_, __, onInvalidate) => {
      // If the map is loaded
      if (map.value && api.value) {
        const opts = { ...options.value, map: map.value }

        // Create a new component instance passing the map ref and the init options
        _component = new api.value[componentName](opts)
        component.value = _component

        events.forEach((eventName) => {
          _component?.addListener(eventName, (e: unknown) => emit(eventName, e))
        })
      }

      onInvalidate(() => {
        if (_component) {
          api.value?.event.clearInstanceListeners(_component)
          _component.setMap(null)
        }
      })
    },
    { immediate: true }
  )

  return { component }
}
