<script setup lang="ts">
import { apiRequestEmailAddressConfirmationEmail } from 'src/api/auth.api'
import { CurrentUserQuery } from 'src/graphql/generated/graphql-operations'
import { PropType, ref } from 'vue'
import ProfileOauthIntegrationsList from './ProfileOauthIntegrationsList.vue'

const props = defineProps({
  /**
   * The user to be shown
   */
  user: {
    type: Object as PropType<CurrentUserQuery['me']>,
    required: true,
  },
})

const isLoading = ref(false)

// TODO: finish me
const reqApi = () => {
  isLoading.value = true
  apiRequestEmailAddressConfirmationEmail()
    .catch(() => null)
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <q-card-section class="q-gutter-md items-start">
    <q-btn
      v-if="!props.user.emailVerified"
      icon="fa fa-exclamation-circle"
      class="text-primary"
      round
      dense
      flat
      :loading="isLoading"
      @click="reqApi"
    >
      <q-tooltip
        style="font-size: 15px"
        anchor="top middle"
        self="center middle"
        :offset="[0, 10]"
      >
        Endereco de email não foi verificado
      </q-tooltip>
    </q-btn>

    <q-separator />

    <ProfileOauthIntegrationsList :user="user" />
  </q-card-section>
</template>
