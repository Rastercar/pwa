<script setup lang="ts">
import { MapOverlayComponents } from './overlays/map-overlay-commons'
import { computed, defineAsyncComponent, PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  overlayProps: {
    type: Object,
    default: () => ({}),
  },
  overlayToDisplay: {
    type: String as PropType<MapOverlayComponents>,
    default: null,
  },
})

defineEmits(['update:modelValue'])

const overlayComponents = {
  none: () => '',
  tracker: defineAsyncComponent(() => import('./overlays/TrackerOverlay.vue')),
}

const component = computed(() => overlayComponents[props.overlayToDisplay])
</script>

<template>
  <q-drawer
    :model-value="modelValue"
    :width="300"
    side="right"
    bordered
    overlay
    elevated
    @update:model-value="(v) => $emit('update:modelValue', v)"
  >
    <component
      v-bind="overlayProps"
      :is="component"
      @close="$emit('update:modelValue', false)"
    />
  </q-drawer>
</template>
