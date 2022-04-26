<script setup lang="ts">
import { FullVehicleDocument } from 'src/graphql/generated/graphql-operations'
import VehicleTrackersTab from './vehicle-trackers-tab/VehicleTrackersTab.vue'
import VehicleDetailsTab from './VehicleDetailsTab.vue'
import { useQuery } from '@vue/apollo-composable'
import { Ref, ref } from 'vue'
import NotFoundFiller from 'src/components/fillers/NotFoundFiller.vue'

type tabs = 'details' | 'trackers' | 'history'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const tab: Ref<tabs> = ref('details')

const { result, loading, refetch } = useQuery(FullVehicleDocument, {
  id: props.id,
})
</script>

<template>
  <NotFoundFiller
    v-if="!result?.vehicle && !loading"
    error-message="Veículo não encontrado"
  />

  <q-page
    v-else
    padding
    class="row justify-center"
    style="background-color: #fafafa"
  >
    <div class="column">
      <div class="row">
        <q-card v-if="result?.vehicle" style="width: 650px">
          <q-tabs
            v-model="tab"
            class="text-grey-8 w-100"
            active-color="primary"
            indicator-color="primary"
          >
            <q-tab name="details" label="Detalhes" />
            <q-tab name="trackers" label="Rastreadores" />
            <q-tab name="history" label="Histórico" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel class="q-pa-none" name="details">
              <VehicleDetailsTab :vehicle="result.vehicle" />
            </q-tab-panel>

            <q-tab-panel name="trackers">
              <VehicleTrackersTab
                :vehicle="result.vehicle"
                @tracker-removed="refetch({ id })"
              />
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
