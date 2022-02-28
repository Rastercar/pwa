<script setup lang="ts">
import PasswordConfirmationInput from 'src/pages/auth/register/form/PasswordConfirmationInput.vue'
import { checkGraphqlErrorsContainErrorCode } from 'src/graphql/graphql.utils'
import PasswordInput from 'src/pages/auth/register/form/PasswordInput.vue'
import UsernameInput from 'src/pages/auth/register/form/UsernameInput.vue'
import { ERROR_CODES } from 'src/constants/rastercar-api-error-codes'
import EmailInput from 'src/components/input/EmailInput.vue'
import { computed, PropType, reactive, Ref, ref } from 'vue'
import OldPasswordInput from './OldPasswordInput.vue'
import { useMutation } from '@vue/apollo-composable'
import useVuelidate from '@vuelidate/core'
import {
  UpdateMyProfileDocument,
  CurrentUserQuery,
  UpdateUserDto,
} from 'src/graphql/generated/graphql-operations'
import { useQuasar } from 'quasar'
import ForgotPasswordButton from '../../../../components/button/ForgotPasswordButton.vue'

const props = defineProps({
  /**
   * The user to be edited
   */
  user: {
    type: Object as PropType<CurrentUserQuery['me']>,
    required: true,
  },
})

const invalidEmails: Ref<string[]> = ref([])
const isCheckingEmail = ref(false)
const willCheckEmail = ref(false)

const invalidOldPasswords: Ref<string[]> = ref([])
const isPasswordVisible = ref(false)
const passwordConfirmation = ref('')

const formState = reactive({
  email: props.user.email,
  username: props.user.username,
  password: '',
  oldPassword: '',
})

const v = useVuelidate({ $autoDirty: true })

const canSubmit = computed(() => {
  return !isCheckingEmail.value && !willCheckEmail.value && !v.value.$invalid
})

const {
  loading: waitingServerResponse,
  mutate: updateProfile,
  onError,
} = useMutation(UpdateMyProfileDocument)

onError(({ graphQLErrors }) => {
  const failedBecauseEmailInUse = checkGraphqlErrorsContainErrorCode(
    graphQLErrors,
    ERROR_CODES.EMAIL_IN_USE
  )

  const oldPasswordWasInvalid = checkGraphqlErrorsContainErrorCode(
    graphQLErrors,
    ERROR_CODES.OLD_PASSWORD_INVALID
  )

  if (failedBecauseEmailInUse && formState.email) {
    invalidEmails.value.push(formState.email)
  }

  if (oldPasswordWasInvalid) {
    invalidOldPasswords.value.push(formState.oldPassword)
  }
})

const quasar = useQuasar()

const saveProfile = () => {
  const profileData: UpdateUserDto = { ...formState }
  if (!profileData.password) delete profileData.password

  updateProfile({ profileData })
    .then((res) => {
      if (!res?.data) {
        v.value.$touch()
      } else {
        quasar.notify({ type: 'positive', message: 'Perfil atualizado' })
      }
    })
    .catch(() => {
      v.value.$touch()
    })
}
</script>

<template>
  <q-form>
    <q-card-section>
      <EmailInput
        v-model="formState.email"
        v-model:isCheckingEmail="isCheckingEmail"
        v-model:willCheckEmail="willCheckEmail"
        :emails-in-use="invalidEmails"
        :allowed-emails="[props.user.email]"
        class="q-mb-md"
      />

      <UsernameInput v-model="formState.username" />
    </q-card-section>

    <q-card-section class="q-gutter-md">
      <div class="q-mb-lg text-h5 flex justify-between items-center no-wrap">
        <div class="col-10 q-pr-lg">
          <q-icon name="fa fa-shield-alt" class="q-mr-md" />
          <span>Acesso e credenciais</span>
        </div>

        <ForgotPasswordButton class="text-subtitle1 text-blue-7" />
      </div>

      <OldPasswordInput
        v-model="formState.oldPassword"
        :invalid-old-passwords="invalidOldPasswords"
      />
      <PasswordInput
        v-model="formState.password"
        v-model:visible="isPasswordVisible"
        :required="false"
        label="Nova senha"
      />

      <PasswordConfirmationInput
        v-model="passwordConfirmation"
        :visible="isPasswordVisible"
        :password-to-match="formState.password"
        label="Confirme a nova senha"
      />
    </q-card-section>
  </q-form>

  <q-card-actions class="q-ma-xs">
    <q-btn
      :disable="!canSubmit"
      :loading="waitingServerResponse"
      class="bg-green text-white q-ml-auto q-px-sm"
      @click="saveProfile"
    >
      Salvar
    </q-btn>
  </q-card-actions>
</template>
