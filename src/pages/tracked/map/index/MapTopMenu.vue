<script setup lang="ts">
import SelectTrackerDialog from './dialogs/select-tracker-dialog/SelectTrackerDialog.vue'
import MapControl from '../../../../components/google-maps/MapControl.vue'
import { useLayout } from 'src/state/layout.state'
import { onBeforeUnmount, ref } from 'vue'

const { TOGGLE_SIDEBAR } = useLayout()

const mapIsFullScreen = ref(false)

const onFullScreenChange = () => {
  mapIsFullScreen.value = !!document.fullscreenElement
}

document.addEventListener('fullscreenchange', onFullScreenChange)

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', onFullScreenChange)
})

const showSelectTrackerDialog = ref(false)
</script>

<template>
  <MapControl position="TOP_LEFT" :style="{ margin: '10px' }">
    <q-card v-show="!mapIsFullScreen" class="shadow-1" square>
      <q-btn icon="fa fa-bars" class="q-px-sm" flat @click="TOGGLE_SIDEBAR" />
    </q-card>
  </MapControl>

  <MapControl position="TOP_CENTER" :style="{ margin: '10px' }">
    <q-card v-show="!mapIsFullScreen" class="shadow-1" square>
      <q-btn
        icon="fa fa-car"
        label="Selecionar Rastreadores"
        flat
        @click="showSelectTrackerDialog = !showSelectTrackerDialog"
      />
      <SelectTrackerDialog v-model="showSelectTrackerDialog" />
    </q-card>
  </MapControl>
</template>
