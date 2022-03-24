<script lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  provide,
  watch,
  toRef,
  ref,
} from 'vue'
import {
  MapWasLoadedSymbol,
  ApiSymbol,
  MapSymbol,
} from 'src/composables/use-map-component'

const mapEvents = [
  'bounds_changed',
  'center_changed',
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'heading_changed',
  'idle',
  'maptypeid_changed',
  'mousemove',
  'mouseout',
  'mouseover',
  'resize',
  'rightclick',
  'tilesloaded',
  'tilt_changed',
  'zoom_changed',
  'projection_changed',
]

export default defineComponent({
  inheritAttrs: false,

  /**
   * Map options with undefined as default is ok, as they will not be applied
   *
   * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
   */
  props: {
    apiKey: {
      type: String,
      default: process.env.GMAPS_API_KEY ?? '',
    },
    backgroundColor: {
      type: String,
      default: 'grey',
    },
    center: {
      type: Object as PropType<google.maps.LatLng | google.maps.LatLngLiteral>,
      default: () => ({ lat: 0, lng: 0 }),
    },
    clickableIcons: {
      type: Boolean,
      default: true,
    },
    controlSize: {
      type: Number,
      default: undefined,
    },
    disableDefaultUi: {
      type: Boolean,
    },
    disableDoubleClickZoom: {
      type: Boolean,
      default: undefined,
    },
    draggableCursor: {
      type: String,
      default: undefined,
    },
    draggingCursor: {
      type: String,
      default: undefined,
    },
    fullscreenControl: {
      type: Boolean,
      default: undefined,
    },
    fullscreenControlOptions: {
      type: String as PropType<google.maps.FullscreenControlOptions>,
      default: undefined,
    },
    gestureHandling: {
      type: String as PropType<'cooperative' | 'greedy' | 'none' | 'auto'>,
      default: undefined,
    },
    heading: {
      type: Number,
      default: undefined,
    },
    keyboardShortcuts: {
      type: Boolean,
      default: undefined,
    },
    mapTypeControl: {
      type: Boolean,
      default: undefined,
    },
    mapTypeControlOptions: {
      type: Object as PropType<google.maps.MapTypeControlOptions>,
      default: undefined,
    },
    mapTypeId: {
      type: [Number, String] as PropType<google.maps.MapTypeId | string>,
      default: undefined,
    },
    maxZoom: {
      type: Number,
      default: undefined,
    },
    minZoom: {
      type: Number,
      default: undefined,
    },
    noClear: {
      type: Boolean,
      default: undefined,
    },
    panControl: {
      type: Boolean,
      default: undefined,
    },
    restriction: {
      type: Object as PropType<google.maps.MapRestriction>,
      default: undefined,
    },
    rotateControl: {
      type: Boolean,
      default: undefined,
    },
    scaleControl: {
      type: Boolean,
      default: undefined,
    },
    scrollwheel: {
      type: Boolean,
      default: undefined,
    },
    streetView: {
      type: Object as PropType<google.maps.StreetViewPanorama>,
      default: undefined,
    },
    streetViewControl: {
      type: Boolean,
      default: undefined,
    },
    styles: {
      type: Array as PropType<google.maps.MapTypeStyle[]>,
      default: undefined,
    },
    tilt: {
      type: Number,
      default: undefined,
    },
    zoom: {
      type: Number,
      default: 7,
    },
    zoomControl: {
      type: Boolean,
      default: undefined,
    },
  },

  emits: [...mapEvents, 'ready'],

  setup(props, { emit }) {
    const api = ref<typeof google.maps | null>(null)
    const map = ref<google.maps.Map | null>(null)
    const mapRef = ref<HTMLElement | null>(null)
    const mapWasLoaded = ref(false)

    provide(MapSymbol, map)
    provide(ApiSymbol, api)
    provide(MapWasLoadedSymbol, mapWasLoaded)

    const resolveOptions = () => {
      const opts: google.maps.MapOptions = { ...props }

      // Clean undefined keys, this avoid a lot of bugs
      const keys = Object.keys(opts) as (keyof google.maps.MapOptions)[]

      keys.forEach((key) => {
        if (opts[key] === undefined) delete opts[key]
      })

      return opts
    }

    onMounted(async () => {
      if (window.isGoogleMapsScriptLoaded !== true) {
        await new Loader({ apiKey: props.apiKey }).load()
        window.isGoogleMapsScriptLoaded = true
      }

      api.value = google.maps
      map.value = new google.maps.Map(mapRef.value as HTMLElement, resolveOptions()) // prettier-ignore

      // For each event the map fires when it occours we emmit it
      mapEvents.forEach((event) => {
        map.value?.addListener(event, (e: unknown) => emit(event, e))
      })

      const propsKeys = Object.keys(props) as (keyof typeof props)[]
      const otherPropsAsRefs = propsKeys
        .filter((key) => !['center', 'zoom'].includes(key))
        .map((key) => toRef(props, key))

      // prettier-ignore
      watch(() => props.center, (newCenter, oldCenter) => {

        const centerHasChanged =
          !oldCenter ||
           newCenter.lng !== oldCenter.lng ||
           newCenter.lat !== oldCenter.lat

        if (newCenter && centerHasChanged) map.value?.panTo(newCenter)
      })

      // prettier-ignore
      watch(() => props.zoom, (newZoom, oldZoom) => {
        if (newZoom !== undefined && newZoom !== oldZoom) map.value?.setZoom(newZoom)
      })

      watch(otherPropsAsRefs, () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { center: _, zoom: __, ...otherOptions } = resolveOptions()
        map.value?.setOptions(otherOptions)
      })

      // Signals the parent component the map is ready for use and pass him the map ref
      emit('ready', map.value)
    })

    // Watch the map and the api until it loads then set the mapWasLoadedFlag as true
    // prettier-ignore
    const stopWatchingMapApiAndRef = watch([api, map], ([newApi, newMap]) => {
        if (newApi && newMap) {
          newApi.event.addListenerOnce(newMap, 'tilesloaded', () => {
            mapWasLoaded.value = true
          })

          setTimeout(stopWatchingMapApiAndRef, 0)
        }
      },
      { immediate: true }
    )

    onBeforeUnmount(() => {
      if (map.value) api.value?.event.clearInstanceListeners(map.value)
    })

    return { mapRef, map, api, mapWasLoaded }
  },
})
</script>

<template>
  <div style="min-height: inherit">
    <!-- The div the map will be injected onto -->
    <div v-bind="$attrs" ref="mapRef" style="min-height: inherit"></div>
    <slot v-if="mapWasLoaded"></slot>
  </div>
</template>
