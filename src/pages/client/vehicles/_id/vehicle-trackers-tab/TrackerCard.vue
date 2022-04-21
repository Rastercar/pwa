<script setup lang="ts">
import type { TrackerModel } from 'src/graphql/generated/graphql-operations'
import SimCardCard from './SimCardCard.vue'
import { PropType } from 'vue'

defineProps({
  tracker: {
    type: Object as PropType<TrackerModel>,
    required: true,
  },
})
</script>

<template>
  <q-card flat style="border: 2px solid #a6a6a6">
    <q-card-section class="text-center q-px-sm q-py-md">
      <span class="text-grey-8">Rastreador 1 - Modelo: </span>
      <strong>{{ tracker.model }}</strong>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-px-none q-py-sm">
      <q-list dense>
        <q-item class="items-center">
          <div class="text-grey-8 q-mr-sm">ID:</div>
          <strong>{{ tracker.identifier }}</strong>
        </q-item>

        <q-item class="items-center">
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
      </q-list>

      <q-item>
        <div v-if="tracker.simCards.length > 0">
          <div class="text-grey-8 q-mb-sm">Sim Cards Instalados:</div>
          <div v-if="tracker.simCards" class="flex">
            <SimCardCard
              v-for="sim in tracker.simCards"
              :key="`sim-${sim.id}`"
              :sim-card="sim"
            />
          </div>
        </div>

        <q-card v-else class="bg-orange-4" flat style="max-width: 400px">
          <q-card-section>
            <q-icon
              name="fa fa-exclamation-triangle"
              size="18px"
              class="q-mr-sm"
            />
            Este rastreador não tem nenhum SIM Card instalado

            <q-separator class="q-my-sm" />

            <!-- TODO: FINISH ME ?! -->
            <div>
              Para que seja possível receber posições e enviar comandos, instale
              o sim card no equipamento e assimile o sim card instalado ao
              equipamento, clicando
              <span class="text-blue-8" style="cursor: pointer">aqui</span>
            </div>
          </q-card-section>
        </q-card>
      </q-item>
    </q-card-section>
  </q-card>
</template>
