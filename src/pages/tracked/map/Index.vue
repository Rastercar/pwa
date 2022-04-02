<script setup lang="ts">
import { MapOverlayComponents } from './index/overlays/map-overlay-commons'
import { TrackerModel } from 'src/graphql/generated/graphql-operations'
import TrackerMarkers from './index/map-items/TrackerMarkers.vue'
import GoogleMap from 'src/components/google-maps/GoogleMap.vue'
import { useGeolocation } from 'src/composables/use-geolocation'
import MapRightOverlay from './index/MapRightOverlay.vue'
import MapTopMenu from './index/MapTopMenu.vue'
import { Ref, ref, toRaw } from 'vue'

const { coords: userCoordinates } = useGeolocation({
  initialCoordinates: { lat: 20.4643395, lng: -54.579342 },
})

// If we do not remove the reactivity the map center will change if the user is moving IRL
const center = toRaw(userCoordinates)

const showMapRightOverlay = ref(false)
const overlayProps: Ref<{ tracker: TrackerModel } | undefined> = ref(undefined)
const overlayToDisplay: Ref<MapOverlayComponents> = ref('none')

const showTrackerOverlay = (tracker: TrackerModel) => {
  overlayProps.value = { tracker }
  overlayToDisplay.value = 'tracker'
  showMapRightOverlay.value = !showMapRightOverlay.value
}
</script>

<template>
  <q-page class="bg-grey">
    <GoogleMap
      :center="center"
      :fullscreen-control="false"
      :street-view-control="false"
      :map-type-control-options="{
        style: 1,
        position: 6,
        mapTypeIds: ['roadmap', 'satellite'],
      }"
    >
      <TrackerMarkers @tracker:selected="showTrackerOverlay" />

      <MapTopMenu />

      <MapRightOverlay
        v-model="showMapRightOverlay"
        :overlay-props="overlayProps"
        :overlay-to-display="overlayToDisplay"
      />
    </GoogleMap>
  </q-page>
</template>

<style lang="sass">
/* Disable google logo on map bottom [start] */
a[href^="http://maps.google.com/maps"]
  display: none !important


a[href^="https://maps.google.com/maps"]
  display: none !important

.gmnoprint a,
.gmnoprint span,
.gm-style-cc
  display: none
</style>
