<script setup lang="ts">
import { QSelectProps } from 'quasar'
import { ref } from 'vue'

const brands = [
  'Aston Martin',
  'Audi',
  'Bentley',
  'BMW',
  'BMW Motorrad',
  'BYD',
  'Caoa Chery',
  'Chevrolet',
  'Chrysler',
  'Citroën',
  'Dodge',
  'Ferrari',
  'Fiat',
  'Ford',
  'Honda',
  'Husqvarna',
  'Hyundai',
  'JAC',
  'Jaguar',
  'Jeep',
  'Kia',
  'Lamborghini',
  'Land Rover',
  'Lexus',
  'Lifan',
  'Maserati',
  'McLaren',
  'Mercedes-Benz',
  'Mini',
  'Mitsubishi',
  'Nissan',
  'Peugeot',
  'Porsche',
  'Ram',
  'Renault',
  'Rolls Royce',
  'Royal Enfield',
  'Smart',
  'Subaru',
  'Suzuki',
  'Toyota',
  'Triumph',
  'Troller',
  'Volkswagen',
  'Volvo',
  'Yamaha',
]

const filterOptions = ref(brands)

const model = ref(null)

const createValue: NonNullable<QSelectProps['onNewValue']> = (val, done) => {
  if (val.length > 0) done(val, 'toggle')
}

const filterFn: NonNullable<QSelectProps['onFilter']> = (val, update) => {
  update(() => {
    if (val === '') filterOptions.value = brands
    else {
      const needle = val.toLowerCase()
      filterOptions.value = brands.filter((v) => v.toLowerCase().indexOf(needle) > -1) // prettier-ignore
    }
  })
}
</script>

<template>
  <q-select
    v-model="model"
    label="Marca"
    filled
    input-debounce="0"
    use-input
    :options="filterOptions"
    @new-value="createValue"
    @filter="filterFn"
  />
</template>
