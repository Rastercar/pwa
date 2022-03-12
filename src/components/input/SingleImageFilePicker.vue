<script setup lang="ts">
import { PropType, Ref, ref } from 'vue'

defineProps({
  modelValue: { type: Object as PropType<File | null>, default: null },
})

const photoSrc: Ref<null | string> = ref(null)

const onPhotoChange = (file: File | null) => {
  photoSrc.value = file ? URL.createObjectURL(file) : null
}
</script>

<template>
  <q-file
    v-bind="({ ...$props, ...$attrs } as any)"
    label="Foto"
    accept=".jpg, image/*"
    @update:model-value="onPhotoChange"
  >
    <template #prepend>
      <q-icon name="fa fa-upload" />
    </template>
  </q-file>

  <q-img v-if="photoSrc" :src="photoSrc" />
</template>
