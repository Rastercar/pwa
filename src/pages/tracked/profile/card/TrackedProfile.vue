<script setup lang="ts">
import ProfileOauthIntegrationsList from './ProfileOauthIntegrationsList.vue'
import { CurrentUserQuery } from 'src/graphql/generated/graphql-operations'
import EmailConfirmationWarning from './EmailConfirmationWarning.vue'
import { PropType } from 'vue'

defineProps({
  user: {
    type: Object as PropType<CurrentUserQuery['me']>,
    required: true,
  },
})
</script>

<template>
  <q-card-section class="q-gutter-md items-start">
    <div class="text-subtitle1 text-grey-8 q-mt-none">Nome de usuário</div>
    <div class="text-h6 q-mt-none">{{ user.username }}</div>

    <div class="text-subtitle1 text-grey-8 q-mt-lg">Email</div>
    <div class="text-h6 q-mt-none">
      {{ user.email }}
    </div>

    <EmailConfirmationWarning
      v-if="!user.emailVerified"
      :email="user.email"
      class="q-mt-sm q-mb-md"
    />

    <q-separator />

    <ProfileOauthIntegrationsList :user="user" />
  </q-card-section>
</template>
