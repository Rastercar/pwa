<script setup lang="ts">
import MapControl from '../../../../components/google-maps/MapControl.vue'
</script>

<template>
  <MapControl position="TOP_CENTER" :style="{ margin: '10px' }">
    <q-card>
      <q-btn icon="fa fa-car" label="Teste"></q-btn>
    </q-card>
  </MapControl>
</template>
