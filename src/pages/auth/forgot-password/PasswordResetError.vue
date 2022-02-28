<script setup lang="ts">
import ForgotPasswordButton from 'src/pages/tracked/profile/form/ForgotPasswordButton.vue'
import { useAuth } from 'src/state/auth.state'

const { isLoggedIn } = useAuth()

defineProps({
  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <q-card-section class="q-ma-lg">
    <div class="text-h5 q-mb-md">
      <q-icon name="fa fa-times-circle" color="red" size="md" class="q-mr-sm" />
      {{ title }}
    </div>

    <div class="text-subtitle1 q-mb-xl">
      {{ message }}
    </div>

    <ForgotPasswordButton
      v-if="isLoggedIn"
      :max-email-requests="1"
      :flat="false"
      :no-caps="false"
      class="q-mb-md"
      style="border-radius: none; width: 400px"
      initial-label="Enviar novo email de recuperação de senha"
    />

    <q-btn
      v-else
      style="max-width: 400px"
      class="full-width q-mb-md"
      color="blue-5"
      label="Requisitar novo email"
      @click="$router.push('/enviar-email-recuperacao-senha')"
    />

    <q-btn
      style="max-width: 400px"
      class="full-width"
      color="green-5"
      label="Voltar"
      @click="$router.push('/')"
    />
  </q-card-section>
</template>
