<script setup lang="ts">
import PasswordConfirmationInput from '../../../../components/input/PasswordConfirmationInput.vue'
import { checkGraphqlErrorsContainErrorCode } from 'src/graphql/graphql.utils'
import PasswordInput from '../../../../components/input/PasswordInput.vue'
import { ERROR_CODES } from 'src/constants/rastercar-api-error-codes'
import EmailInput from '../../../../components/input/EmailInput.vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { reactive, ref, computed, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UsernameInput from './UsernameInput.vue'
import { useVuelidate } from '@vuelidate/core'
import { useAuth } from 'src/state/auth.state'
import {
  UnregisteredUserByUuidDocument,
  RegisterUserDocument,
} from 'src/graphql/generated/graphql-operations'

const route = useRoute()

// The uuid of unregistered user to finish the registration for
const uuid = route.query.finishFor as string
const shouldFetchUnregisteredUser = typeof uuid === 'string' && !!uuid

const formState = reactive({
  email: '',
  username: '',
  password: '',
  refersToUnregisteredUser: uuid ?? null,
})

const { loading: isFetchingUser, onResult } = useQuery(
  UnregisteredUserByUuidDocument,
  { uuid },
  { enabled: shouldFetchUnregisteredUser, fetchPolicy: 'network-only' }
)

onResult(({ data }) => {
  if (!data?.unregisteredUser) return

  formState.email = data.unregisteredUser.email
  formState.username = data.unregisteredUser.username ?? ''
})

const isCheckingEmail = ref(false)
const willCheckEmail = ref(false)

const invalidEmails: Ref<string[]> = ref([])

const passwordConfirmation = ref('')
const isPasswordVisible = ref(false)

const v = useVuelidate({ $autoDirty: true })

const canSubmit = computed(
  () =>
    !isCheckingEmail.value &&
    !isFetchingUser.value &&
    !willCheckEmail.value &&
    !v.value.$invalid
)

const {
  mutate: register,
  onError,
  loading,
} = useMutation(RegisterUserDocument, {
  variables: { user: formState },
  fetchPolicy: 'network-only',
})

const { LOGIN } = useAuth()
const router = useRouter()

const submitForm = () => {
  register()
    .then((res) => {
      if (!res?.data) {
        v.value.$touch()
        return
      }

      const { token, user } = res.data.register

      LOGIN({
        bearerToken: token.value,
        organizationId:
          user.__typename === 'UserModel' ? user.organization.id : null,
      })

      router.push('/').catch(() => null)
    })
    .catch(() => null)
}

onError(({ graphQLErrors }) => {
  const failedBecauseEmailInUse = checkGraphqlErrorsContainErrorCode(
    graphQLErrors,
    ERROR_CODES.EMAIL_IN_USE
  )

  if (failedBecauseEmailInUse) invalidEmails.value.push(formState.email)
})
</script>

<template>
  <q-card-section @keypress.enter="canSubmit ? submitForm() : v.$touch()">
    <q-form class="q-gutter-md" :style="{ minWidth: '300px' }">
      <UsernameInput
        v-model="formState.username"
        :loading="isFetchingUser"
        :disable="isFetchingUser"
      />

      <EmailInput
        v-model="formState.email"
        v-model:willCheckEmail="willCheckEmail"
        v-model:isCheckingEmail="isCheckingEmail"
        :loading="isFetchingUser"
        :disable="isFetchingUser"
        :emails-in-use="invalidEmails"
      />

      <PasswordInput
        v-model="formState.password"
        v-model:visible="isPasswordVisible"
      />

      <PasswordConfirmationInput
        v-model="passwordConfirmation"
        :visible="isPasswordVisible"
        :password-to-match="formState.password"
      />
    </q-form>
  </q-card-section>

  <q-card-actions class="q-px-md">
    <q-btn
      label="Voltar"
      class="q-mr-auto"
      color="green"
      icon="fa fa-angle-left"
      @click="$router.push('/')"
    />
    <q-btn
      :loading="loading"
      :disable="!canSubmit"
      label="Cadastrar"
      type="submit"
      color="primary"
      @click="submitForm"
    />
  </q-card-actions>
</template>
