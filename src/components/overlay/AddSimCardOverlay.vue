<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import {
  CreateSimCardDtoOrId,
  TrackerModel,
} from 'src/graphql/generated/graphql-operations'
import { ComponentPublicInstance, nextTick, PropType, ref } from 'vue'
import AddSimCardForm from '../form/AddSimCardForm.vue'

defineProps({
  trackerToInstallSims: {
    type: Object as PropType<TrackerModel>,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'update:model-value', payload: boolean): void
}>()

const newSim = ref<CreateSimCardDtoOrId | null>(null)

const addSimCardForm = ref<ComponentPublicInstance<{ resetForm: () => void }>>()

const v = useVuelidate({ $autoDirty: true })

const resetAndClose = () => {
  addSimCardForm.value?.resetForm()

  nextTick(() => {
    v.value.$reset()
  }).catch(() => null)

  emit('update:model-value', false)
}
</script>

<template>
  <q-drawer
    :width="350"
    side="right"
    bordered
    overlay
    class="bg-grey-2 q-pa-lg"
    elevated
  >
    <div class="row flex-center q-mb-lg">
      <div class="col-10 text-body2 q-pr-sm">
        Instalando novo sim card no rastreador
        <strong>{{ trackerToInstallSims.identifier }}</strong>
      </div>

      <div class="col-2 justify-end">
        <q-btn
          push
          size="sm"
          round
          icon="fa fa-arrow-right"
          class="q-mr-md"
          color="red"
          style="font-size: 12px"
          @click="resetAndClose"
        />
      </div>
    </div>

    <AddSimCardForm
      ref="addSimCardForm"
      v-model="newSim"
      @new-tracker-instaled="$emit('update:model-value', false)"
      @existing-tracker-installed="$emit('update:model-value', false)"
    />

    <div class="flex q-mt-md">
      <q-space />
      <q-btn color="green" :disable="v.$invalid" label="Instalar Sim Card" />
    </div>
  </q-drawer>
</template>
