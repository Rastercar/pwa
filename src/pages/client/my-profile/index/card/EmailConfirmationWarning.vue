<script setup lang="ts">
import { apiRequestEmailAddressConfirmationEmail } from 'src/api/auth.api'
import { ref } from 'vue'

defineProps({
  email: {
    type: String,
    required: true,
  },
})

const timesConfirmationEmailWasSent = ref(0)
const isSendingConfirmationEmail = ref(false)

const requestConfirmationEmail = () => {
  if (isSendingConfirmationEmail.value) return

  isSendingConfirmationEmail.value = true

  apiRequestEmailAddressConfirmationEmail()
    .then(() => {
      timesConfirmationEmailWasSent.value++
    })
    .catch(() => null)
    .finally(() => {
      isSendingConfirmationEmail.value = false
    })
}
</script>

<template>
  <q-btn
    v-if="timesConfirmationEmailWasSent === 0"
    label="não verificado"
    :loading="isSendingConfirmationEmail"
    color="secondary"
    icon-right="fa fa-exclamation-circle"
    @click="requestConfirmationEmail"
  >
    <q-tooltip
      v-show="!isSendingConfirmationEmail"
      style="font-size: 15px"
      anchor="top middle"
      self="center middle"
      :offset="[0, 10]"
    >
      {{
        isSendingConfirmationEmail
          ? 'enviando email de confirmação'
          : `Clique aqui para enviar um email de verificação para ${email}`
      }}
    </q-tooltip>
  </q-btn>

  <div v-else class="text-green-9">
    <span v-if="!isSendingConfirmationEmail">
      Um email de confirmação foi
      {{ timesConfirmationEmailWasSent === 1 ? 'enviado' : 'reenviado' }} para
      seu endereço de email
    </span>
    <span v-else>Reenviando email de confirmação</span>

    <span
      v-if="timesConfirmationEmailWasSent === 1 && !isSendingConfirmationEmail"
      class="text-blue-8"
      style="cursor: pointer"
      @click="requestConfirmationEmail"
    >
      enviar novamente
    </span>

    <q-circular-progress
      v-show="isSendingConfirmationEmail"
      indeterminate
      size="sm"
      color="lime"
      class="q-ml-md"
    />
  </div>
</template>
