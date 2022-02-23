<script setup lang="ts">
import { LoginByTokenMutationDocument } from 'src/graphql/generated/graphql-operations'
import { isApiErrorResponse } from 'src/apollo/links/error-handler.link'
import { HTTP_STATUS } from 'src/constants/http-status'
import { useMutation } from '@vue/apollo-composable'
import { useAuth } from 'src/state/auth.state'
import { useRouter } from 'vue-router'
import { Ref, ref } from 'vue'

const props = defineProps({
  /**
   * The JWT token used to login
   */
  token: {
    type: String,
    default: '',
  },
})

const router = useRouter()

const { AUTH_LOGIN } = useAuth()

const autoLoginErrorType: Ref<null | 'unauthorized' | 'other'> = ref(null)
const willLoginSoon = ref(true)

const {
  mutate: login,
  onError,
  loading: isLoggingIn,
} = useMutation(LoginByTokenMutationDocument, {
  variables: { token: props.token },
  fetchPolicy: 'network-only',
})

onError(({ graphQLErrors }) => {
  const error = graphQLErrors[0]?.extensions?.response

  if (!isApiErrorResponse(error)) return

  autoLoginErrorType.value =
    error.statusCode === HTTP_STATUS.UNAUTHORIZED ? 'unauthorized' : 'other'
})

const attemptLogin = () => {
  login()
    .then((res) => {
      if (!res?.data) throw new Error('Invalid login response')

      AUTH_LOGIN(res.data.loginWithToken.token)

      router.push('/').catch(() => null)
    })
    .catch(() => null)
    .finally(() => {
      willLoginSoon.value = false
    })
}

if (props.token) setTimeout(attemptLogin, 500)
</script>

<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div v-if="!token || autoLoginErrorType === 'unauthorized'">
      <div class="text-h1">401</div>
      <div class="text-h3" style="opacity: 0.5">não autorizado</div>
      <q-btn
        color="grey-7"
        class="full-width q-mt-md"
        label="Voltar para login"
        @click="$router.push('/login')"
      />
    </div>

    <div v-else-if="autoLoginErrorType === 'other'">
      <div class="text-h1">Oops</div>
      <div class="text-h3" style="opacity: 0.5">algo deu errado</div>
      <q-btn
        color="grey-7"
        class="full-width q-mt-md"
        label="Voltar para login"
        @click="$router.push('/login')"
      />
    </div>

    <div v-else>
      <div class="text-h1">acessando</div>
      <div class="text-h3" style="opacity: 0.5">aguarde um minuto...</div>
      <q-linear-progress
        v-show="isLoggingIn || willLoginSoon"
        indeterminate
        color="white"
        class="q-mt-md"
      />
    </div>
  </div>
</template>
