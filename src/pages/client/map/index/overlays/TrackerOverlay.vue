<script setup lang="ts">
import { TrackerModel } from 'src/graphql/generated/graphql-operations'
import { computed, PropType } from 'vue'

const props = defineProps({
  tracker: {
    type: Object as PropType<TrackerModel>,
    default: () => ({
      vehicle: {},
    }),
  },
})

defineEmits(['close'])

const photoSrc = computed(() => {
  return props.tracker.vehicle.photo &&
    typeof props.tracker.vehicle.photo === 'string'
    ? `${process.env.RASTERCAR_UPLOADS_URL}/${props.tracker.vehicle.photo}`
    : null
})
</script>

<template>
  <q-card class="full-height">
    <q-img
      :src="photoSrc || require('../../../../../assets/placeholders/car.png')"
      style="height: 150px"
      fit="cover"
    />

    <q-separator />

    {{ tracker }}

    <q-card-section class="text-center q-pa-sm">
      <span class="text-grey-8">placa: </span>
      <strong>{{ tracker.vehicle.plate }}</strong>
    </q-card-section>

    <q-separator />

    <div class="absolute-bottom row q-mt-xl justify-end q-pa-md">
      <q-btn
        label="Fechar"
        icon-right="fa fa-arrow-right"
        type="reset"
        class="q-ml-sm"
        color="primary"
        size="sm"
        style="font-size: 12px"
        @click="$emit('close')"
      />
    </div>
  </q-card>
</template>
