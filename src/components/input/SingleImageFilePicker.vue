<script setup lang="ts">
import { computed, PropType, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<File | null>,
    default: null,
  },
  preview: {
    type: String,
    default: '',
  },
  /**
   * If the selected image should be displayed bellow the input whenever a image gets selected
   */
  showPreview: {
    type: Boolean,
    default: true,
  },
})

const photoSrc = computed(() =>
  props.modelValue ? URL.createObjectURL(props.modelValue) : null
)

const emit = defineEmits(['update:preview'])

watch(photoSrc, (v) => {
  emit('update:preview', v)
})
</script>

<template>
  <q-file
    v-bind="({ ...$props, ...$attrs } as any)"
    label="Foto"
    accept=".jpg, image/*"
  >
    <template #prepend>
      <q-icon name="fa fa-upload" />
    </template>
  </q-file>

  <q-img v-if="photoSrc && showPreview" :src="photoSrc" />
</template>
