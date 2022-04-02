<script setup lang="ts">
import SingleImageFilePicker from 'src/components/input/SingleImageFilePicker.vue'
import {
  UpdateVehicleDocument,
  FullVehicleQuery,
  UpdateVehicleDto,
} from 'src/graphql/generated/graphql-operations'
import { getUniqueViolationsFromGraphqlErrors } from 'src/graphql/graphql.utils'
import VehicleBrandInput from 'src/components/input/VehicleBrandInput.vue'
import VehiclePlateInput from 'src/components/input/VehiclePlateInput.vue'
import YearTextInput from 'src/components/input/YearTextInput.vue'
import RenavamInput from 'src/components/input/RenavamInput.vue'
import { useMutation } from '@vue/apollo-composable'
import { computed, PropType, Ref, ref } from 'vue'
import { ApolloError } from '@apollo/client'
import useVuelidate from '@vuelidate/core'
import { useQuasar } from 'quasar'

interface Form {
  plate: string
  brand: string
  model: string
  color: string
  renavam: string
  chassisNumber: string
  modelYear: string
  fabricationYear: string
}

const props = defineProps({
  vehicle: {
    type: Object as PropType<NonNullable<FullVehicleQuery['vehicle']>>,
    required: true,
  },
})

const quasar = useQuasar()
const v = useVuelidate()

const createFormDefault = (): Form => ({
  plate: props.vehicle?.plate ?? '',
  brand: props.vehicle?.brand ?? '',
  model: props.vehicle?.model ?? '',
  color: props.vehicle?.color ?? '',
  renavam: props.vehicle?.renavam ?? '',
  chassisNumber: props.vehicle?.chassisNumber ?? '',
  modelYear: `${props.vehicle?.modelYear ?? ''}`,
  fabricationYear: `${props.vehicle?.fabricationYear ?? ''}`,
})

// Must be a ref so changes can be tracked
const initialFormValue = ref<Form>(createFormDefault())

const formState = ref<Form>(createFormDefault())

const formHasChanged = computed(() => {
  if (photo.value) return true

  return Object.keys(initialFormValue.value).some((field) => {
    const f = field as unknown as keyof Form
    return formState.value[f] !== initialFormValue.value[f]
  })
})

const platesInUse: Ref<string[]> = ref([])

const photo: Ref<null | File> = ref(null)
const newPhotoPreview = ref('')

const photoSrc = computed(() => {
  if (newPhotoPreview.value) return newPhotoPreview.value

  const vehiclePhoto = props.vehicle?.photo

  return vehiclePhoto && typeof vehiclePhoto === 'string'
    ? `${process.env.RASTERCAR_UPLOADS_URL}/${vehiclePhoto}`
    : null
})

const { mutate } = useMutation(UpdateVehicleDocument)

const loading = ref(false)

const resetForm = () => {
  formState.value = createFormDefault()
  newPhotoPreview.value = ''
  photo.value = null
  platesInUse.value = []
}

const submit = () => {
  const toIntWithNullFallback = (v?: string) => {
    if (!v) return null
    const int = parseInt(v)
    return isNaN(int) ? null : int
  }

  const data: UpdateVehicleDto = {
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

  mutate({ id: props.vehicle.id, photo: photo.value, data })
    .then((res) => {
      console.log(res?.data)
      quasar.notify({ type: 'positive', message: 'Veículo atualizado' })
    })
    .catch(({ graphQLErrors }: ApolloError) => {
      const unqViolations = getUniqueViolationsFromGraphqlErrors(graphQLErrors)

      if (unqViolations.includes('plate') && data.plate) {
        platesInUse.value.push(data.plate)
      }

      quasar.notify({ type: 'negative', message: 'Erro ao atualizar veículo' })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div>
    <q-img
      :src="photoSrc || require('../../../../assets/placeholders/car.png')"
      style="height: 250px"
      fit="cover"
    />

    <q-separator />

    <div class="q-pa-md">
      <SingleImageFilePicker
        v-model="photo"
        v-model:preview="newPhotoPreview"
        :show-preview="false"
        class="col q-mb-lg"
        color="teal"
        clearable
        filled
      />

      <div class="row q-col-gutter-md q-mb-sm">
        <VehiclePlateInput
          v-model="formState.plate"
          :plates-in-use="platesInUse"
          label="Placa"
          class="col"
          filled
        />

        <VehicleBrandInput
          v-model="formState.brand"
          class="q-mb-md col"
          filled
        />
      </div>

      <div class="row q-col-gutter-md q-mb-sm">
        <q-input
          v-model="formState.model"
          class="q-mb-lg col"
          label="Modelo"
          maxlength="40"
          filled
        />

        <q-input
          v-model="formState.color"
          class="q-mb-lg col"
          maxlength="20"
          label="Cor"
          filled
        />
      </div>

      <div class="row q-col-gutter-md q-mb-sm">
        <RenavamInput v-model="formState.renavam" filled class="col" />

        <YearTextInput
          v-model="formState.modelYear"
          label="Ano Modelo"
          class="col"
          filled
        />
      </div>

      <div class="row q-col-gutter-md q-mb-sm">
        <YearTextInput
          v-model="formState.fabricationYear"
          label="Ano Fabricação"
          class="col"
          filled
        />

        <q-input
          v-model="formState.chassisNumber"
          label="N Chassi"
          class="col"
          filled
        />
      </div>

      <div class="bottom row q-mt-sm justify-end">
        <q-btn
          v-show="formHasChanged"
          label="Cancelar Alterações"
          color="grey"
          @click="resetForm"
        />

        <q-space />

        <q-btn
          label="Atualizar"
          type="submit"
          color="primary"
          :loading="loading"
          :disable="v.$invalid"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>
