<script setup lang="ts">
import {
  CurrentUserSimpleDocument,
  OrganizationByIdDocument,
  OrganizationByIdQuery,
} from 'src/graphql/generated/graphql-operations'
import AccessClientPanelDialog from 'src/components/dialog/AccessClientPanelDialog.vue'
import { useApolloClient, useQuery } from '@vue/apollo-composable'
import { useAuth } from 'src/state/auth.state'
import { computed, ref, watch } from 'vue'

defineProps({
  /**
   * If the sidebar containing the user section is in the 'mini' state
   */
  mini: {
    type: Boolean,
    default: false,
  },
})

const { state: authState } = useAuth()

const { result: currentUser } = useQuery(CurrentUserSimpleDocument, undefined, {
  fetchPolicy: 'cache-only',
})

const showMessage = computed(
  () =>
    currentUser.value?.me.__typename === 'MasterUserModel' &&
    authState.organizationId
)

const { client } = useApolloClient()

const showSelectOrgDialog = ref(false)

const loading = ref(false)
const org = ref<OrganizationByIdQuery['organization'] | null>(null)

watch(
  () => authState.organizationId,
  (v) => {
    if (!v) return

    loading.value = true

    client
      .query({
        query: OrganizationByIdDocument,
        variables: { id: v },
      })
      .then((res) => {
        if (res.data.organization) org.value = res.data.organization
      })
      .catch(() => null)
      .finally(() => {
        loading.value = false
      })
  },
  { immediate: true }
)
</script>

<template>
  <q-item v-if="showMessage" class="bg-blue-2 flex-center">
    <div v-show="!mini" class="row">
      Acessando o painel do cliente
      <span class="text-bold">
        {{ loading ? '...' : org?.name }}
      </span>

      <q-btn
        size="12px"
        dense
        flat
        class="full-width q-mt-sm"
        @click="showSelectOrgDialog = !showSelectOrgDialog"
      >
        Trocar
      </q-btn>
    </div>

    <AccessClientPanelDialog v-model="showSelectOrgDialog" />
  </q-item>
</template>
