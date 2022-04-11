<script setup lang="ts">
import { onBeforeUnmount, PropType, watch, ref, inject, Ref } from 'vue'
import { useGoogleMaps } from 'src/composables/use-google-maps'
import { MapSymbol, MapWasLoadedSymbol } from './map/GoogleMap'

type ControlPosition = keyof typeof google.maps.ControlPosition
type ControlRef = HTMLElement & { index: number }

const props = defineProps({
  /**
   * The position it will be displayed on the map
   *
   * @see google.maps.ControlPosition
   */
  position: {
    type: String as PropType<ControlPosition>,
    required: true,
  },
  /**
   * Controller z-index
   */
  index: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['content:loaded'])

const controlRef = ref<HTMLElement | null>(null)

const mapWasLoaded = inject(MapWasLoadedSymbol, ref(false))
const map = inject(MapSymbol, ref(null))

const { api } = useGoogleMaps()

const showContent = ref(false)

// To avoid rendering the content outside the map we need to wait for the map AND the api to fully load
const stopWatchingOnMapLoad = watch(
  [mapWasLoaded, api, controlRef],
  ([newMapLoadedStatus, newApi, newControlRef]) => {
    const contentRef = newControlRef as unknown as Ref<HTMLElement | null>
    const mapLoadedStatus = newMapLoadedStatus
    const api = newApi

    if (api && mapLoadedStatus && contentRef) {
      addControl(props.position)

      showContent.value = true

      emit('content:loaded')

      // Since the watcher is immediate, his stop handler might not be created yet, so
      // we must delay its call to the next tick on the event loop to guarentee it exists
      setTimeout(stopWatchingOnMapLoad, 0)
    }
  },
  { immediate: true }
)

// prettier-ignore
watch(() => props.position, (newPosition, oldPosition) => {
  removeControl(oldPosition)
  addControl(newPosition)
})

const addControl = (controlPosition: ControlPosition) => {
  if (!map.value || !api.value || !controlRef.value) return

  const position = api.value.ControlPosition[controlPosition]
  map.value.controls[position].push(controlRef.value)
}

const removeControl = (controlPosition: ControlPosition) => {
  if (map.value && api.value) {
    let contentControlIndex: number | null = null

    const position = api.value.ControlPosition[controlPosition]

    // @see https://developers.google.com/maps/documentation/javascript/reference/event?hl=en#MVCArray
    map.value.controls[position].forEach((node, i) => {
      if (node === controlRef.value) contentControlIndex = i
    })

    // Remove the found position
    if (contentControlIndex !== null) {
      map.value.controls[position].removeAt(contentControlIndex)
    }
  }
}

onBeforeUnmount(() => removeControl(props.position))

// prettier-ignore
watch(() => props.index, (newIndex) => {
  if (newIndex && controlRef.value) (controlRef.value as ControlRef).index = props.index
})
</script>

<template>
  <div v-show="showContent" ref="controlRef">
    <slot></slot>
  </div>
</template>
