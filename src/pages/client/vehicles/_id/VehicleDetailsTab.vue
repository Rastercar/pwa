<script setup lang="ts">
import SingleImageFilePicker from 'src/components/input/SingleImageFilePicker.vue'
import { getUniqueViolationsFromGraphqlErrors } from 'src/graphql/graphql.utils'
import VehicleBrandInput from 'src/components/input/VehicleBrandInput.vue'
import VehiclePlateInput from 'src/components/input/VehiclePlateInput.vue'
import YearTextInput from 'src/components/input/YearTextInput.vue'
import RenavamInput from 'src/components/input/RenavamInput.vue'
import { computed, nextTick, PropType, Ref, ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { ApolloError } from '@apollo/client'
import useVuelidate from '@vuelidate/core'
import { useQuasar } from 'quasar'

import {
  UpdateVehicleDocument,
  FullVehicleQuery,
  UpdateVehicleDto,
} from 'src/graphql/generated/graphql-operations'

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

const DUMMY_FILENAME = '.'

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

const initialFormValue = ref<Form>(createFormDefault())
const formState = ref<Form>(createFormDefault())

/**
 * If any of the form fields or the vehicle photo differs from the initial form state
 */
const formHasChanged = computed(() => {
  const photoHasChanged = photo.value !== props.vehicle.photo
  const photoIsDummyFile = photo.value?.name === DUMMY_FILENAME

  if (photoHasChanged && !photoIsDummyFile) return true

  const someFormFieldHasChanged = Object.keys(initialFormValue.value).some(
    (field) => {
      const f = field as unknown as keyof Form
      return formState.value[f] !== initialFormValue.value[f]
    }
  )

  return someFormFieldHasChanged
})

const platesInUse: Ref<string[]> = ref([])

const photo: Ref<null | File> = ref(
  // If the vehicle already has a photo, create a dummy file so the filepicker contains some data
  props.vehicle.photo ? new File([], DUMMY_FILENAME) : null
)

const newPhotoPreview = ref<string>('')

const vehiclePhotoToDisplay = computed(() => {
  // If null then the user removed the photo
  // If non empty string the user selected a new photo
  if (newPhotoPreview.value !== '') return newPhotoPreview.value

  const vehiclePhoto = props.vehicle?.photo

  return vehiclePhoto && typeof vehiclePhoto === 'string'
    ? `${process.env.RASTERCAR_UPLOADS_URL}/${vehiclePhoto}`
    : null
})

const { mutate } = useMutation(UpdateVehicleDocument)

const loading = ref(false)

const resetForm = () => {
  photo.value = props.vehicle.photo ? new File([], DUMMY_FILENAME) : null

  /**
   * Bandaid fix:
   * In order to keep the QFile picker in sync with the vehicle photo and a new selected photo
   * a dummy file is created and set to `photo` whenever loading the page or after updating the
   * vehicle, like in the line above
   *
   * Unfortunately if the file has been set to a dummy file, the `SingleImageFilePicker` will react
   * to it and try to display a preview of the dummy file, we can override this by removing the preview
   * on the next tick, but this also means that after updating the vehicle the file will be replaced
   * twice, firstly for the preview of the DummyFile and secondly with the current vehicle photo, giving
   * the QImage a buggy looking "flash" effect after reseting the form
   */
  nextTick(() => {
    newPhotoPreview.value = ''
  }).catch(() => null)

  platesInUse.value = []

  formState.value = createFormDefault()
}

const submit = () => {
  const toIntWithNullFallback = (v?: string) => {
    if (!v) return null
    const int = parseInt(v)
    return isNaN(int) ? null : int
  }

  const shouldMaintainOriginalPhoto = photo.value?.name === DUMMY_FILENAME
  const shouldRemovePhoto = photo.value === null

  const photoToSend = shouldMaintainOriginalPhoto ? null : photo.value

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

  if (shouldRemovePhoto) data.removePhoto = true

  loading.value = true

  mutate({ id: props.vehicle.id, photo: photoToSend, data })
    .then(() => {
      initialFormValue.value = createFormDefault()

      resetForm()

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
      :src="
        vehiclePhotoToDisplay ||
        require('../../../../assets/placeholders/car.png')
      "
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
          :disable="v.$invalid || !formHasChanged"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>
