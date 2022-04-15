<script setup lang="ts">
import { CurrentUserDocument } from 'src/graphql/generated/graphql-operations'
import { apiRequestForgotPasswordEmail } from 'src/api/auth.api'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'

const emit = defineEmits([
  'reset-password-mail-sending:success',
  'reset-password-mail-sending:failure',
])

const props = defineProps({
  /**
   * The email address to send the forgot password email, if falsy
   * will attempt to send it to the email address of the current
   * logged user
   *
   * **NOTE:** If a email address is not supplied and theres no logged
   * in user the button will stay disabled as there is nowhere to send
   * the email to
   */
  emailAddress: {
    type: String,
    default: '',
  },

  showTooltip: {
    type: Boolean,
    default: true,
  },

  disable: {
    type: Boolean,
    default: false,
  },

  /**
   * The maximun amount of time the user can click on this
   * button to request a forgot password email to be sent
   */
  maxEmailRequests: {
    type: Number,
    default: 2,
  },

  /**
   * The label for when the reset password email was not sent
   */
  initialLabel: {
    type: String,
    default: 'esqueceu sua senha ?',
  },
})

const { result: currentUser, loading: fetchingCurrentUser } =
  useQuery(CurrentUserDocument)

const timesEmailWasSent = ref(0)

const loading = ref(false)

const requestEmail = () => {
  const emailToSendTo = props.emailAddress || currentUser.value?.me.email

  if (!emailToSendTo || timesEmailWasSent.value >= props.maxEmailRequests) {
    return
  }

  loading.value = true

  apiRequestForgotPasswordEmail(emailToSendTo)
    .then(() => {
      timesEmailWasSent.value++
      emit('reset-password-mail-sending:success')
    })
    .catch(() => {
      emit('reset-password-mail-sending:failure')
    })
    .finally(() => {
      loading.value = false
    })
}

const tooltipText = computed(() => {
  if (loading.value) return 'Enviando...'

  const email = currentUser.value?.me.email

  if (timesEmailWasSent.value === 0) {
    const emailTxt = email ?? 'seu email'
    return `Enviar um email de redefinição de senha para ${emailTxt}`
  }

  const sentTxt = timesEmailWasSent.value === 1 ? 'enviado' : 'reenviado'

  const canSendAgain = timesEmailWasSent.value < props.maxEmailRequests

  const msg = email
    ? `Email de recuperação de senha foi ${sentTxt} para ${email}`
    : `Email de recuperação de senha foi ${sentTxt} para seu endereço`

  return canSendAgain ? `${msg}. clique para reenviar` : msg
})

const label = computed(() =>
  timesEmailWasSent.value === 0
    ? props.initialLabel
    : timesEmailWasSent.value > 1
    ? 'email de recuperação de senha reenviado'
    : 'email de recuperação de senha enviado'
)
</script>

<template>
  <!-- Only makes sense to show this component if we have a email address to send emails to -->
  <q-btn
    class="text-justify"
    :disable="
      disable ||
      fetchingCurrentUser ||
      (!currentUser?.me.email && !emailAddress)
    "
    :color="
      timesEmailWasSent >= maxEmailRequests
        ? 'grey'
        : timesEmailWasSent === 0
        ? 'blue'
        : 'green'
    "
    :loading="loading"
    :label="label"
    style="border-radius: 10px"
    flat
    no-caps
    @click="requestEmail"
  >
    <q-tooltip
      v-if="showTooltip"
      max-width="400px"
      class="text-center"
      type="a"
      style="font-size: 15px"
    >
      {{ tooltipText }}
    </q-tooltip>
  </q-btn>
</template>
