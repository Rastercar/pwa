<script setup lang="ts">
import { computed, PropType } from 'vue'

const props = defineProps({
  modelValue: { type: Object as PropType<File | null>, default: null },
})

const photoSrc = computed(() =>
  props.modelValue ? URL.createObjectURL(props.modelValue) : null
)
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

  <q-img v-if="photoSrc" :src="photoSrc" />
</template>
