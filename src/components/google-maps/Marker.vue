<script lang="ts">
import { useGoogleMaps } from 'src/composables/use-google-maps'
import {
  defineComponent,
  onBeforeUnmount,
  PropType,
  inject,
  watch,
  toRef,
  ref,
  Ref,
  WatchCallback,
} from 'vue'
import { MapSymbol } from './map/GoogleMap'

const markerEvents = [
  'animation_changed',
  'click',
  'dblclick',
  'rightclick',
  'dragstart',
  'dragend',
  'drag',
  'mouseover',
  'mousedown',
  'mouseout',
  'mouseup',
  'draggable_changed',
  'clickable_changed',
  'contextmenu',
  'cursor_changed',
  'flat_changed',
  'rightclick',
  'zindex_changed',
  'icon_changed',
  'position_changed',
  'shape_changed',
  'title_changed',
  'visible_changed',
]

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<google.maps.MarkerOptions>,
      required: true,
    },
  },

  emits: markerEvents,

  setup(props, { emit }) {
    const options = toRef(props, 'options')

    let marker: google.maps.Marker | null = null
    const markerRef: Ref<google.maps.Marker | null> = ref(null)

    const map = inject(MapSymbol, ref(null))

    const { api } = useGoogleMaps()

    const removeMarkerIfSet = () => {
      if (!marker) return

      api.value?.event.clearInstanceListeners(marker)
      marker.setMap(null)
    }

    const addListenerToMarkerEvents = () => {
      markerEvents.forEach((event) => {
        marker?.addListener(event, (e: unknown) => emit(event, e))
      })
    }

    const createMarker = (options: google.maps.ReadonlyMarkerOptions) => {
      marker = new google.maps.Marker(options)
      addListenerToMarkerEvents()
    }

    const onMarkerOptionsChange: WatchCallback<
      google.maps.MarkerOptions,
      google.maps.MarkerOptions | undefined
    > = () => {
      if (!map.value || !api.value) return

      marker
        ? marker.setOptions(options.value)
        : createMarker({ ...options.value, map: map.value })

      markerRef.value = marker
    }

    watch(options, onMarkerOptionsChange, { immediate: true })

    onBeforeUnmount(removeMarkerIfSet)

    return { component: markerRef.value }
  },

  render: () => null,
})
</script>
