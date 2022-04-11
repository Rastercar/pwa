import { MapSymbol } from 'src/components/google-maps/map/GoogleMap'
import { watch, ref, Ref, inject } from 'vue'
import { useGoogleMaps } from './use-google-maps'

type mapComponent =
  | google.maps.Circle
  | google.maps.Polygon
  | google.maps.Polyline
  | google.maps.Rectangle

type mapComponentOptions =
  | google.maps.CircleOptions
  | google.maps.PolygonOptions
  | google.maps.PolylineOptions
  | google.maps.RectangleOptions

type mapComponentName = 'Circle' | 'Polygon' | 'Polyline' | 'Rectangle'

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
 * **NOTE:** What this does is basically create a new instance of google.maps.<Component> for the given map
 * and recreate the component if the map or the component options change, if you want more fine grained reactivity
 * without reinstantiating the component than do not use this. Make your own implementation and observe/react to the
 * <Component> options changes properly
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

  const { api } = useGoogleMaps()

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

  // Return the instantiated google maps component (Marker, Line, etc) for debbuging,
  // this return should not be used and the components should appear on the map automatically
  return { component }
}
