<script setup lang="ts">
import {
  ListOrganizationsDocument,
  OrganizationModel,
} from '../../graphql/generated/graphql-operations'
import { useQuery } from '@vue/apollo-composable'
import { useAuth } from 'src/state/auth.state'
import { useRouter } from 'vue-router'
import { QTable } from 'quasar'
import { ref } from 'vue'
import SelectOrganizationTable from '../table/SelectOrganizationTable.vue'

const { SET_ORGANIZATION } = useAuth()

const emit = defineEmits<(event: 'update:model-value', v: boolean) => void>()

const router = useRouter()

const accessUserPanel: QTable['onRowClick'] = (_e, row) => {
  SET_ORGANIZATION((row as OrganizationModel).id)

  emit('update:model-value', false)

  router.push({ name: 'cliente' }).catch(() => null)
}

const showSelectOrgDialog = ref(false)
const filter = ref('')

const { loading, result } = useQuery(ListOrganizationsDocument)
</script>

<template>
  <q-dialog v-model="showSelectOrgDialog">
    <q-card>
      <q-card-section class="flex items-center q-py-sm">
        <div class="text-h6">
          <q-icon size="25px" class="q-mr-sm" name="fa fa-building" />
          Selecione o cliente a acessar o painel
        </div>

        <q-space />

        <q-btn
          v-close-popup
          icon="fa fa-times"
          size="sm"
          fab
          flat
          @click="$emit('update:model-value', false)"
        />
      </q-card-section>

      <q-input
        v-model="filter"
        label="Busca por nome/email"
        class="full-width"
        filled
        square
      />

      <SelectOrganizationTable
        :rows="result?.organizations || []"
        :loading="loading"
        :filter="filter"
        @row-click="accessUserPanel"
      />
    </q-card>
  </q-dialog>
</template>
