<script setup lang="ts">
import { LoginMutationDocument } from 'src/graphql/generated/graphql-operations'
import { isApiErrorResponse } from 'src/apollo/links/error-handler.link'
import { HTTP_STATUS } from 'src/constants/http-status'
import { useMutation } from '@vue/apollo-composable'
import LoginCardFooter from './index/LoginCardFooter.vue'
import LoginEmailInput from './index/LoginEmailInput.vue'
import PasswordInput from './index/PasswordInput.vue'
import { useAuth } from 'src/state/auth.state'
import { useVuelidate } from '@vuelidate/core'
import GoogleButton from './index/GoogleButton.vue'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

const formState = reactive({ password: '', email: '' })

const userWithEmailNotFound = ref(false)
const passwordIsInvalid = ref(false)

const {
  mutate: login,
  onError,
  loading: isLoggingIn,
} = useMutation(LoginMutationDocument, { fetchPolicy: 'network-only' })

onError(({ graphQLErrors }) => {
  const error = graphQLErrors[0]?.extensions?.response

  if (!isApiErrorResponse(error)) return

  if (error.statusCode === HTTP_STATUS.NOT_FOUND) {
    userWithEmailNotFound.value = true
  } else if (error.statusCode === HTTP_STATUS.UNAUTHORIZED) {
    passwordIsInvalid.value = true
  }
})

const v = useVuelidate({ $autoDirty: true })
const router = useRouter()

const { AUTH_LOGIN } = useAuth()

const attemptLogin = async () => {
  const isFormValid = await v.value.$validate().catch(() => false)

  if (!isFormValid) return

  login({ credentials: formState })
    .then((res) => {
      if (!res?.data) throw new Error('Invalid login response')

      userWithEmailNotFound.value = false
      passwordIsInvalid.value = false

      AUTH_LOGIN(res.data.login.token)

      router.push('/').catch(() => null)
    })
    .catch(() => null)
}
</script>

<template>
  <q-page
    class="bg-light-blue window-height window-width row justify-center items-center"
    padding
  >
    <div class="column">
      <div class="row">
        <q-card bordered class="q-pa-md shadow-1">
          <q-card-section>
            <div class="text-h5 text-center">
              <span class="text-grey-7">Bem vindo a </span>
              <span class="text-blue-7">Rastercar </span>
              <span class="text-grey-7">!</span>
            </div>
          </q-card-section>

          <q-card-section>
            <q-form class="q-gutter-md" greedy>
              <LoginEmailInput
                v-model="formState.email"
                :disable="isLoggingIn"
                :user-with-email-not-found="userWithEmailNotFound"
                @update:modelValue="userWithEmailNotFound = false"
              />

              <PasswordInput
                v-model="formState.password"
                :disable="isLoggingIn"
                :is-invalid="passwordIsInvalid"
                @update:modelValue="passwordIsInvalid = false"
              />
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn
              :loading="isLoggingIn"
              :disable="v.$invalid"
              unelevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="Login"
              @click="attemptLogin"
            />

            <GoogleButton
              label="Login com Google"
              unelevated
              color="grey-7"
              size="lg"
              class="full-width q-mt-md"
              :disable="isLoggingIn"
            />
          </q-card-actions>

          <LoginCardFooter />
        </q-card>
      </div>
    </div>
  </q-page>
</template>
