<script setup lang="ts">
import {
  RegisterUserMutationDocument,
  UnregisteredUserQueryDocument,
} from 'src/graphql/generated/graphql-operations'
import { isApiErrorResponse } from 'src/apollo/links/error-handler.link'
import PasswordConfirmationInput from './PasswordConfirmationInput.vue'
import { ERROR_CODES } from 'src/constants/rastercar-api-error-codes'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { reactive, ref, computed, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UsernameInput from './UsernameInput.vue'
import PasswordInput from './PasswordInput.vue'
import { useVuelidate } from '@vuelidate/core'
import { useAuth } from 'src/state/auth.state'
import EmailInput from './EmailInput.vue'

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
  UnregisteredUserQueryDocument,
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

const passwordConfirmation = ref('')
const invalidEmails: Ref<string[]> = ref([])

const isPasswordVisible = ref(false)

const v = useVuelidate({ $autoDirty: true })

const canSubmit = computed(
  () =>
    !isCheckingEmail.value &&
    !isFetchingUser.value &&
    !willCheckEmail.value &&
    !v.value.$invalid
)

const { mutate: register, onError } = useMutation(
  RegisterUserMutationDocument,
  { variables: { user: formState }, fetchPolicy: 'network-only' }
)

const { AUTH_LOGIN } = useAuth()
const router = useRouter()

const submitForm = () => {
  register()
    .then((res) => {
      if (!res?.data) return

      AUTH_LOGIN(res.data.register)

      router.push('/').catch(() => null)
    })
    .catch(() => null)
}

onError(({ graphQLErrors }) => {
  const error = graphQLErrors[0]?.extensions?.response

  if (!isApiErrorResponse(error)) return

  if (error.message === ERROR_CODES.EMAIL_IN_USE) {
    invalidEmails.value.push(formState.email)
  }
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
        v-model:isCheckingEmail="isCheckingEmail"
        v-model:willCheckEmail="willCheckEmail"
        :loading="isFetchingUser"
        :invalid-emails="invalidEmails"
        :disable="isFetchingUser"
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
      class="q-ml-auto"
      label="Cadastrar"
      type="submit"
      color="primary"
      @click="submitForm"
    />
  </q-card-actions>
</template>
