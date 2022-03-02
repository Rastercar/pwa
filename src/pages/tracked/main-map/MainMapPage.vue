<script setup lang="ts">
import GoogleMap from 'src/components/google-maps/GoogleMap.vue'
import { useGeolocation } from 'src/composables/use-geolocation'
import Marker from 'src/components/google-maps/Marker.vue'
import MapTopMenu from './MapTopMenu.vue'
import { toRaw } from 'vue'

const { coords: userCoordinates } = useGeolocation({
  initialCoordinates: { lat: 20.4643395, lng: -54.579342 },
})

// If we do not remove the reactivity the map center will change if the user is moving IRL
const center = toRaw(userCoordinates)
</script>

<template>
  <q-page class="bg-grey">
    <GoogleMap :center="center">
      <Marker :options="{ position: { lat: -20, lng: -54 } }" />

      <MapTopMenu />
    </GoogleMap>
  </q-page>
</template>
