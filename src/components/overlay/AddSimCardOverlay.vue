<script setup lang="ts">
import { getUniqueViolationsFromGraphqlErrors } from 'src/graphql/graphql.utils'
import { maskedPhoneNumberToE164 } from 'src/utils/string/phone-number.utils'
import { ComponentPublicInstance, nextTick, PropType, ref } from 'vue'
import AddSimCardForm from '../form/AddSimCardForm.vue'
import { useMutation } from '@vue/apollo-composable'
import { ApolloError } from '@apollo/client'
import useVuelidate from '@vuelidate/core'
import { cloneDeep } from 'lodash-es'
import { useQuasar } from 'quasar'
import {
  InstallNewSimCardOnTrackerDocument,
  SetTrackerSimCardsDocument,
  CreateSimCardDtoOrId,
  CreateSimCardDto,
  TrackerModel,
} from 'src/graphql/generated/graphql-operations'

const props = defineProps({
  trackerToInstallSims: {
    type: Object as PropType<TrackerModel>,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'update:model-value', payload: boolean): void
}>()

const quasar = useQuasar()

const simCardSsnsInUse = ref<string[]>([])
const simCardPhoneNumbersInUse = ref<string[]>([])

const newSim = ref<CreateSimCardDtoOrId | null>(null)

const addSimCardForm = ref<ComponentPublicInstance<{ resetForm: () => void }>>()

const v = useVuelidate({ $autoDirty: true })

const { mutate: setTrackerSimCards, loading: settingTrackerSims } = useMutation(
  SetTrackerSimCardsDocument
)
const { mutate: installNewSimOnTracker, loading: installingNewSim } =
  useMutation(InstallNewSimCardOnTrackerDocument)

const setTrackerSim = (simId: number) => {
  const { id: trackerId, simCards: currentlyInstalledSims } =
    props.trackerToInstallSims

  setTrackerSimCards({
    id: trackerId,
    simCardIds: [...currentlyInstalledSims.map((s) => s.id), simId],
  })
    .then(resetAndClose)
    .catch(() => {
      quasar.notify({
        type: 'negative',
        message: 'Erro ao configurar sim card do rastreador',
      })
    })
}

const installNewSim = (dto: CreateSimCardDto) => {
  const { id: trackerId } = props.trackerToInstallSims

  const simCard = cloneDeep(dto)
  simCard.phoneNumber = maskedPhoneNumberToE164(simCard.phoneNumber)

  installNewSimOnTracker({ trackerId, simCard })
    .then(resetAndClose)
    .catch(({ graphQLErrors }: ApolloError) => {
      const uniqueViolations =
        getUniqueViolationsFromGraphqlErrors(graphQLErrors)

      if (uniqueViolations.length === 0) {
        quasar.notify({
          type: 'negative',
          message: 'Erro ao instalar sim card no rastreador',
        })
      }

      if (uniqueViolations.includes('ssn')) {
        simCardSsnsInUse.value.push(simCard.ssn)
      }
      if (uniqueViolations.includes('phoneNumber')) {
        simCardPhoneNumbersInUse.value.push(simCard.phoneNumber)
      }
    })
}

const submit = () => {
  if (v.value.$invalid) return

  if (newSim.value?.id) {
    setTrackerSim(newSim.value.id)
  } else if (newSim.value?.dto) {
    installNewSim(newSim.value.dto)
  }
}

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
      :ssns-in-use="simCardSsnsInUse"
      :phone-numbers-in-use="simCardPhoneNumbersInUse"
    />

    <div class="flex q-mt-md">
      <q-space />
      <q-btn
        color="green"
        :loading="settingTrackerSims || installingNewSim"
        :disable="v.$invalid"
        label="Instalar Sim Card"
        @click="submit"
      />
    </div>
  </q-drawer>
</template>
