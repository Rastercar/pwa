<script setup lang="ts">
import {
  ListOrganizationsDocument,
  OrganizationModel,
} from '../../../../graphql/generated/graphql-operations'
import SelectOrganizationTable from './SelectOrganizationTable.vue'
import { useQuery } from '@vue/apollo-composable'
import { useAuth } from 'src/state/auth.state'
import { ref } from 'vue'
import { QTable } from 'quasar'
import { useRouter } from 'vue-router'

const { SET_ORGANIZATION } = useAuth()

const router = useRouter()

const accessUserPanel: QTable['onRowClick'] = (_e, row) => {
  SET_ORGANIZATION((row as OrganizationModel).id)
  router.push({ name: 'cliente' }).catch(() => null)
}

const showSelectOrgDialog = ref(false)
const filter = ref('')

const { loading, result } = useQuery(ListOrganizationsDocument)
</script>

<template>
  <div class="flex flex-center">
    <q-btn
      color="primary"
      class="q-my-sm"
      label="Painel do cliente"
      icon="fa fa-users"
      @click="showSelectOrgDialog = !showSelectOrgDialog"
    />

    <q-dialog v-model="showSelectOrgDialog">
      <q-card>
        <q-card-section class="flex items-center q-py-sm">
          <div class="text-h6">
            <q-icon size="25px" class="q-mr-sm" name="fa fa-building" />
            Selecione o cliente a acessar o painel
          </div>

          <q-space />

          <q-btn v-close-popup icon="fa fa-times" size="sm" fab flat />
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
  </div>
</template>
