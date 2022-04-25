<script setup lang="ts">
import type { TrackerModel } from 'src/graphql/generated/graphql-operations'
import SimCardCard from './SimCardCard.vue'
import { PropType } from 'vue'

defineEmits<{
  (event: 'add-btn-click'): void
  (event: 'remove-btn-click'): void
}>()

defineProps({
  tracker: {
    type: Object as PropType<TrackerModel>,
    required: true,
  },
  slotIndex: {
    type: Number,
    required: true,
  },
  showAddTrackerBtn: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <q-card class="q-pa-none bg-grey-1" flat bordered>
    <q-card-section class="flex ext-center q-py-md items-center">
      <span class="text-grey-8">Rastreador {{ slotIndex }} - Modelo:</span>
      <strong class="q-ml-sm">{{ tracker.model }}</strong>

      <q-space />

      <!-- TODO: FINISH MY FUNCTIONALITY -->
      <q-btn
        v-if="showAddTrackerBtn"
        push
        color="green"
        size="sm"
        round
        icon="fa fa-plus"
        class="q-mr-md"
        @click="$emit('add-btn-click')"
      />

      <q-btn
        push
        color="red"
        size="sm"
        round
        icon="fa fa-trash"
        @click="$emit('remove-btn-click')"
      />
    </q-card-section>

    <q-separator />

    <q-card-section class="q-px-none q-py-sm">
      <q-list dense>
        <q-item class="items-center">
          <div class="text-grey-8 q-mr-sm">ID:</div>
          <strong>{{ tracker.identifier }}</strong>
        </q-item>

        <q-item v-if="tracker.lastPosition" class="items-center">
          <div class="text-grey-8 q-mr-sm">Ultima posição:</div>
          <div>
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
              v-for="(sim, i) in tracker.simCards"
              :key="`sim-${sim.id}`"
              :sim-card="sim"
              :slot-index="i + 1"
              :class="{ 'q-mb-md': i + 1 !== tracker.simCards.length }"
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
