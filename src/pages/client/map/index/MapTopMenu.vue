<script setup lang="ts">
import SelectTrackerDialog from './dialogs/select-tracker-dialog/SelectTrackerDialog.vue'
import MapControl from '../../../../components/google-maps/MapControl.vue'
import MapOptionsDialog from './dialogs/MapOptionsDialog.vue'
import { useTrackedMap } from 'src/state/tracked-map.state'
import { computed, onBeforeUnmount, ref } from 'vue'
import { useLayout } from 'src/state/layout.state'

const { TOGGLE_SIDEBAR } = useLayout()

const mapIsFullScreen = ref(false)

const onFullScreenChange = () => {
  mapIsFullScreen.value = !!document.fullscreenElement
}

document.addEventListener('fullscreenchange', onFullScreenChange)

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', onFullScreenChange)
})

const { state: trackedMapState } = useTrackedMap()

const showSelectTrackerDialog = ref(false)
const showMapOptionsDialog = ref(false)

const selectTrackerDialogLabel = computed(() => {
  const selectedTrackerQtd = trackedMapState.selectedTrackerIds.length

  if (selectedTrackerQtd === 0) return 'Selecionar Rastreadores'
  if (selectedTrackerQtd === 1) return 'Vendo 1 Rastreador'

  return `Vendo ${selectedTrackerQtd} Rastreadores`
})
</script>

<template>
  <MapControl position="TOP_LEFT" :style="{ margin: '10px' }">
    <div v-show="!mapIsFullScreen" class="flex">
      <q-card class="shadow-1 q-mr-md" square>
        <q-btn icon="fa fa-bars" class="q-px-sm" flat @click="TOGGLE_SIDEBAR" />
      </q-card>

      <q-card class="shadow-1 q-mr-md" square>
        <q-btn
          icon="fa fa-cog"
          class="q-px-sm"
          flat
          @click="showMapOptionsDialog = !showMapOptionsDialog"
        />
        <MapOptionsDialog v-model="showMapOptionsDialog" />
      </q-card>

      <q-card class="shadow-1" square>
        <q-btn
          icon="fa fa-car"
          :label="selectTrackerDialogLabel"
          flat
          @click="showSelectTrackerDialog = !showSelectTrackerDialog"
        />
        <SelectTrackerDialog v-model="showSelectTrackerDialog" />
      </q-card>
    </div>
  </MapControl>
</template>
