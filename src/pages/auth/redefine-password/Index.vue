<script setup lang="ts">
import PasswordResetSuccess from './index/PasswordResetSuccess.vue'
import PasswordResetError from './index/PasswordResetError.vue'
import { apiResetPasswordByToken } from 'src/api/auth.api'
import { HTTP_STATUS } from 'src/constants/http-status'
import useVuelidate from '@vuelidate/core'
import { AxiosError } from 'axios'
import { Ref, ref } from 'vue'
import PasswordInput from 'src/components/input/PasswordInput.vue'
import PasswordConfirmationInput from 'src/components/input/PasswordConfirmationInput.vue'

type requestStatus =
  | 'loading'
  | 'success'
  | 'not-sent'
  | 'unauthorized'
  | 'unknown-error'

const props = defineProps({
  token: {
    type: String,
    default: '',
  },
})

const newPasswordConfirmation = ref('')
const passwordVisibility = ref(false)
const newPassword = ref('')

const v = useVuelidate()

const reqStatus: Ref<requestStatus> = ref('not-sent')

const resetPassword = () => {
  if (reqStatus.value === 'loading') return

  reqStatus.value = 'loading'

  apiResetPasswordByToken({
    password: newPassword.value,
    passwordResetToken: props.token,
  })
    .then(() => {
      reqStatus.value = 'success'
    })
    .catch((error: AxiosError) => {
      reqStatus.value =
        error.response?.status === HTTP_STATUS.UNAUTHORIZED
          ? 'unauthorized'
          : 'unknown-error'
    })
}
</script>

<template>
  <div
    class="fullscreen bg-green-1 text-grey-9 text-center q-pa-md flex flex-center"
  >
    <q-card style="width: 500px">
      <q-card-section
        v-if="reqStatus === 'loading' || reqStatus === 'not-sent'"
        class="q-mt-lg"
      >
        <div class="text-h5 q-mb-sm">REDEFINIÇÃO DE SENHA</div>
        <div class="text-subtitle2">Digite e confirme sua nova senha.</div>
      </q-card-section>

      <q-card-section
        v-if="reqStatus === 'loading' || reqStatus === 'not-sent'"
        class="q-mx-lg q-mb-lg"
      >
        <PasswordInput
          v-model="newPassword"
          v-model:visible="passwordVisibility"
          required
          label="Nova senha *"
        />

        <PasswordConfirmationInput
          v-model="newPasswordConfirmation"
          v-model:visible="passwordVisibility"
          class="q-my-md"
          :password-to-match="newPassword"
        />

        <q-btn
          :loading="reqStatus === 'loading'"
          :disable="v.$invalid"
          class="full-width"
          color="green-5"
          label="Alterar senha"
          @click="resetPassword"
        />
      </q-card-section>

      <PasswordResetSuccess
        v-else-if="reqStatus === 'success'"
        class="q-ma-lg"
      />

      <PasswordResetError
        v-else
        class="q-ma-lg"
        :title="
          reqStatus === 'unauthorized'
            ? '401 - Não autorizado'
            : '500 - Oops algo deu errado'
        "
        :message="
          reqStatus === 'unauthorized'
            ? 'Parece que seu token expirou ou é invalido, por favor requisite um novo email de redefinição de senha'
            : 'Erro interno do sistema, por favor requisite um novo email de redefinição de senha'
        "
      />
    </q-card>
  </div>
</template>
