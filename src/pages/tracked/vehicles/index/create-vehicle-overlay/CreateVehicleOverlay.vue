<script setup lang="ts">
import SingleImageFilePicker from 'src/components/input/SingleImageFilePicker.vue'
import { getUniqueViolationsFromGraphqlErrors } from 'src/graphql/graphql.utils'
import VehicleBrandInput from 'src/components/input/VehicleBrandInput.vue'
import VehiclePlateInput from 'src/components/input/VehiclePlateInput.vue'
import YearTextInput from 'src/components/input/YearTextInput.vue'
import RenavamInput from 'src/components/input/RenavamInput.vue'
import { useMutation } from '@vue/apollo-composable'
import { ApolloError } from '@apollo/client'
import useVuelidate from '@vuelidate/core'
import { useQuasar } from 'quasar'
import { Ref, ref } from 'vue'
import {
  CreateVehicleDocument,
  CreateVehicleDto,
} from 'src/graphql/generated/graphql-operations'

const emit = defineEmits(['update:model-value', 'vehicle:created'])

const quasar = useQuasar()
const v = useVuelidate()

const createFormDefault = () => ({
  plate: '',
  brand: '',
  model: '',
  color: '',
  renavam: '',
  chassisNumber: '',
  modelYear: '',
  fabricationYear: '',
})

const formState = ref(createFormDefault())

const { mutate } = useMutation(CreateVehicleDocument)

const platesInUse: Ref<string[]> = ref([])
const photo: Ref<null | File> = ref(null)

const loading = ref(false)

const resetForm = () => {
  formState.value = createFormDefault()
  photo.value = null
  platesInUse.value = []
}

const submit = () => {
  const toIntWithNullFallback = (v?: string) => {
    if (!v) return null

    const int = parseInt(v)
    return isNaN(int) ? null : int
  }

  const data: CreateVehicleDto = {
    plate: formState.value.plate,
    brand: formState.value.brand || null,
    model: formState.value.model || null,
    color: formState.value.color || null,
    renavam: formState.value.renavam || null,
    chassisNumber: formState.value.chassisNumber || null,
    modelYear: toIntWithNullFallback(formState.value.modelYear),
    fabricationYear: toIntWithNullFallback(formState.value.fabricationYear),
  }

  loading.value = true

  mutate({ photo: photo.value, data })
    .then((res) => {
      resetForm()

      emit('vehicle:created', res?.data?.createVehicle)

      quasar.notify({ type: 'positive', message: 'Veículo criado' })
    })
    .catch(({ graphQLErrors }: ApolloError) => {
      const unqViolations = getUniqueViolationsFromGraphqlErrors(graphQLErrors)

      if (unqViolations.includes('plate')) platesInUse.value.push(data.plate)

      quasar.notify({ type: 'negative', message: 'Erro ao criar veículo' })
    })
    .finally(() => {
      loading.value = false
    })
}

const closeAndReset = () => {
  resetForm()
  v.value.$reset()

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
    <div class="row q-mb-lg">
      <div class="text-h5">novo veículo</div>

      <q-space />

      <q-btn
        label="Cancelar"
        icon-right="fa fa-arrow-right"
        type="reset"
        color="red"
        class="q-ml-sm"
        size="sm"
        style="font-size: 12px"
        :disable="loading"
        @click="closeAndReset"
      />
    </div>

    <VehiclePlateInput
      v-model="formState.plate"
      :plates-in-use="platesInUse"
      label="Placa"
      filled
    />

    <SingleImageFilePicker
      v-model="photo"
      class="q-mt-sm"
      color="teal"
      filled
      clearable
      :disable="loading"
    />

    <div class="text-subtitle1 q-mt-lg q-mb-sm">Informações opcionais</div>

    <VehicleBrandInput v-model="formState.brand" class="q-mb-md" dense filled />

    <q-input
      v-model="formState.model"
      label="Modelo"
      class="q-mb-lg"
      dense
      filled
      maxlength="40"
    />

    <q-input
      v-model="formState.color"
      label="Cor"
      class="q-mb-lg"
      dense
      filled
      maxlength="20"
    />

    <RenavamInput v-model="formState.renavam" dense filled />

    <YearTextInput
      v-model="formState.modelYear"
      label="Ano Modelo"
      dense
      filled
    />

    <YearTextInput
      v-model="formState.fabricationYear"
      label="Ano Fabricação"
      dense
      filled
    />

    <q-input v-model="formState.chassisNumber" label="N Chassi" dense filled />

    <q-space />

    <div class="bottom row q-mt-xl justify-end">
      <q-btn
        label="Enviar"
        type="submit"
        color="green"
        :loading="loading"
        :disable="v.$invalid"
        @click="submit"
      />
    </div>
  </q-drawer>
</template>
