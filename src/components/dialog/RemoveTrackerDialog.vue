<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import {
  RemoveTrackerFromVehicleDocument,
  TrackerModel,
  VehicleModel,
} from 'src/graphql/generated/graphql-operations'
import { PropType, ref } from 'vue'

const props = defineProps({
  /**
   * The vehicle having the tracker removed
   */
  vehicle: {
    type: Object as PropType<VehicleModel>,
    required: true,
  },
  /**
   * The tracker to be removed from the vehicle
   */
  tracker: {
    type: Object as PropType<TrackerModel>,
    required: true,
  },
})

const loading = ref(false)

const removeSimsFromTrackerOnTrackerRemoval = ref(false)

const emit = defineEmits<{
  (event: 'removal:success'): void
  (event: 'removal:failure', payload: Error): void
  (event: 'update:model-value', payload: boolean): void
}>()

const { mutate } = useMutation(RemoveTrackerFromVehicleDocument)

const removeTrackerFromVehicle = () => {
  loading.value = true

  mutate({
    trackerId: props.tracker.id,
    removeSimsFromTracker: removeSimsFromTrackerOnTrackerRemoval.value,
  })
    .then((xd) => {
      console.log(xd)
      emit('removal:success')
      emit('update:model-value', false)
    })
    .catch((error) => {
      emit('removal:failure', error)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <q-dialog>
    <q-card style="width: 450px">
      <q-card-section>
        <div class="text-h6">
          <q-icon size="25px" class="q-mr-sm" name="fa fa-trash" />
          Desinstalar rastreador do veículo ?
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none text-body2">
        Após marcar o rastreador como removido, qualquer posição recebida pelo
        equipamento não será associada ao veículo !
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-separator class="q-mb-md" />

        <q-toggle
          v-model="removeSimsFromTrackerOnTrackerRemoval"
          label="Remover sim cards do rastreador"
        />
        <div class="text-grey-8 q-mt-sm">
          Ao marcar essa opção os sim cards serão desinstalados do rastreador e
          liberados para uso em outros rastreadores
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary q-pa-md">
        <q-btn
          v-close-popup
          color="green"
          label="Cancelar"
          :loading="loading"
        />
        <q-btn
          :loading="loading"
          color="red"
          label="Desinstalar"
          @click="removeTrackerFromVehicle"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
