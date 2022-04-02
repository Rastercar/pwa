<script setup lang="ts">
import { FullVehicleDocument } from 'src/graphql/generated/graphql-operations'
import VehicleDetailsTab from './VehicleDetailsTab.vue'
import { useQuery } from '@vue/apollo-composable'
import { Ref, ref } from 'vue'
import VehicleTrackersTab from './VehicleTrackersTab.vue'

type tabs = 'details' | 'trackers' | 'history'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const tab: Ref<tabs> = ref('details')

const { result } = useQuery(FullVehicleDocument, { id: props.id })
</script>

<template>
  <q-page padding class="row justify-center" style="background-color: #fafafa">
    <div class="column">
      <div class="row">
        <q-card style="max-width: 650px">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="details" label="Detalhes" />
            <q-tab name="trackers" label="Rastreadores" />
            <q-tab name="history" label="Histórico" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-if="result?.vehicle" v-model="tab" animated>
            <q-tab-panel class="q-pa-none" name="details">
              <VehicleDetailsTab :vehicle="result.vehicle" />
            </q-tab-panel>

            <q-tab-panel name="trackers">
              <VehicleTrackersTab :vehicle="result.vehicle" />
            </q-tab-panel>

            <q-tab-panel name="history">
              <div class="text-h6">Histórico</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
