<script setup lang="ts">
import { useTrackedMap } from 'src/state/tracked-map.state'

const { state, SET_MAP_OPTIONS } = useTrackedMap()
</script>

<template>
  <q-dialog>
    <q-card style="width: 350px">
      <q-card-section class="flex items-center q-py-sm">
        <div class="text-h6">
          <q-icon size="25px" class="q-mr-sm" name="fa fa-cog" />
          Opções
        </div>

        <q-space />

        <q-btn v-close-popup icon="fa fa-times" size="sm" fab flat />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-body1 q-mb-sm">Ajustar mapa quando:</div>

        <q-toggle
          :model-value="state.options.fitMapOnTrackerSelection"
          label="Selecionar rastreadores"
          @update:model-value="
            (v) => SET_MAP_OPTIONS({ fitMapOnTrackerSelection: v })
          "
        />

        <q-toggle
          :model-value="state.options.fitMapOnTrackerPosition"
          label="Receber posições"
          @update:model-value="
            (v) => SET_MAP_OPTIONS({ fitMapOnTrackerPosition: v })
          "
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
