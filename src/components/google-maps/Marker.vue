<script lang="ts">
import { useMapComponent } from 'src/composables/use-map-component'
import { defineComponent, PropType, toRef } from 'vue'

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
    const marker = useMapComponent({
      componentName: 'Marker',
      events: markerEvents,
      options,
      emit,
    })

    return { marker }
  },

  // This component cannot use the <script setup> syntax because it doesnt suppor renderless components
  render: () => null,
})
</script>
