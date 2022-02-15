<script setup lang="ts">
import { CurrentUserQuery } from 'src/graphql/generated/graphql-operations'
import { PropType } from 'vue'

defineProps({
  user: {
    type: Object as PropType<CurrentUserQuery['me']>,
    required: true,
  },
})
</script>

<template>
  <div class="text-h6">
    <span>Integrações: </span>
  </div>

  <div
    v-if="user.__typename === 'UserModel' && user.googleProfileId"
    class="text-grey-7 q-mt-sm"
  >
    <q-btn class="q-mr-sm" icon="fab fa-google" round flat>
      <q-badge floating style="background-color: transparent">
        <q-icon name="fa fa-check" color="green" />
      </q-badge>

      <q-tooltip
        :offset="[105, 0]"
        style="font-size: 15px"
        anchor="center right"
        self="center middle"
      >
        Ver detalhes da integração
      </q-tooltip>
    </q-btn>
    <span class="text-h6">conectada com o google</span>
  </div>
</template>
