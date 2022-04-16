<script setup lang="ts">
import {
  ListOrganizationsDocument,
  OrganizationModel,
} from '../../../graphql/generated/graphql-operations'
import SelectOrganizationTable from '../../../components/table/SelectOrganizationTable.vue'
import { useQuery } from '@vue/apollo-composable'
import { useAuth } from 'src/state/auth.state'
import { useRouter } from 'vue-router'
import { QTable } from 'quasar'
import { ref } from 'vue'

const { SET_ORGANIZATION } = useAuth()

const emit = defineEmits<(event: 'update:model-value', v: boolean) => void>()

const router = useRouter()

const accessUserPanel: QTable['onRowClick'] = (_e, row) => {
  SET_ORGANIZATION((row as OrganizationModel).id)

  emit('update:model-value', false)

  router.push({ name: 'cliente' }).catch(() => null)
}

const filter = ref('')

const { loading, result } = useQuery(ListOrganizationsDocument)
</script>

<template>
  <!-- This cant be a QPage for some reason -->
  <div class="fullscreen bg-blue text-center flex flex-center">
    <q-card style="max-width: 600px">
      <q-card-section class="flex items-center q-py-sm bg-warning text-bold">
        Erro ao acessar o painel do cliente, nenhum cliente selecionado !
      </q-card-section>

      <q-card-section class="flex items-center q-py-sm">
        <div class="text-h5">
          <q-icon size="25px" class="q-mr-sm" name="fa fa-building" />
          Selecione o cliente a acessar o painel
        </div>
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
        hide-bottom
        @row-click="accessUserPanel"
      />
    </q-card>
  </div>
</template>
