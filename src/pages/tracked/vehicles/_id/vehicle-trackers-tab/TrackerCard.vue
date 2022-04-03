<script setup lang="ts">
import type { TrackerModel } from 'src/graphql/generated/graphql-operations'
import { PropType } from 'vue'
import SimCardCard from './SimCardCard.vue'

defineProps({
  tracker: {
    type: Object as PropType<TrackerModel>,
    required: true,
  },
})
</script>

<template>
  <q-card flat style="border: 2px solid black">
    <q-card-section class="text-center q-pa-sm">
      <span class="text-grey-8">Modelo: </span>
      <strong>{{ tracker.model }}</strong>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-px-none q-py-sm">
      <q-item>
        <div class="text-grey-8 q-mr-sm">Ultima posição:</div>
        <div v-if="tracker.lastPosition">
          <span>
            LAT:
            <strong> {{ tracker.lastPosition.lat.toFixed(3) }}</strong>
          </span>
          <span>
            LNG:
            <strong> {{ tracker.lastPosition.lng.toFixed(3) }}</strong>
          </span>
        </div>
      </q-item>

      <q-item>
        <div class="flex">
          <div class="text-grey-8 q-mr-sm">Sim Cards Instalados:</div>
          <div v-if="tracker.simCards">
            <SimCardCard
              v-for="sim in tracker.simCards"
              :key="`sim-${sim.id}`"
              :sim-card="sim"
            />
          </div>
          <!-- TODO: LIDAR COM CASO DE SIM NAO INSTALADO AQUI, FAZER PROMPT PARA INSTALAR SIM CARDS ! -->
        </div>
      </q-item>
    </q-card-section>
  </q-card>
</template>
