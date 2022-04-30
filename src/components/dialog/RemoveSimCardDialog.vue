<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import {
  RemoveSimCardFromTrackerDocument,
  SimCardModel,
} from 'src/graphql/generated/graphql-operations'
import { PropType, ref } from 'vue'

const props = defineProps({
  /**
   * The simCard to be removed from the tracker
   */
  simCard: {
    type: Object as PropType<SimCardModel>,
    required: true,
  },
})

const loading = ref(false)

const emit = defineEmits<{
  (event: 'removal:success'): void
  (event: 'removal:failure', payload: Error): void
  (event: 'update:model-value', payload: boolean): void
}>()

const { mutate } = useMutation(RemoveSimCardFromTrackerDocument)

const removeTrackerFromVehicle = () => {
  loading.value = true

  mutate({
    simCardId: props.simCard.id,
  })
    .then(() => {
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
          Remover sim card do rastreador ?
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none text-body2">
        Aviso: Remover o sim card no sistema sem remove-lo físicamente do
        rastreador fara com que posições ainda sejam recebidas e cobranças ainda
        sejam geradas
      </q-card-section>

      <q-card-actions align="right" class="text-primary q-pa-md">
        <q-btn
          color="green"
          label="Cancelar"
          :loading="loading"
          @click="$emit('update:model-value', false)"
        />
        <q-btn
          :loading="loading"
          color="red"
          label="Remover"
          @click="removeTrackerFromVehicle"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
