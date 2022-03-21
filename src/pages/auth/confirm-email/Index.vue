<script setup lang="ts">
import { CurrentUserSimpleDocument } from 'src/graphql/generated/graphql-operations'
import { apiConfirmEmailAddress } from 'src/api/auth.api'
import { useApolloClient } from '@vue/apollo-composable'
import { HTTP_STATUS } from 'src/constants/http-status'
import { useAuth } from 'src/state/auth.state'
import { computed, Ref, ref } from 'vue'
import { AxiosError } from 'axios'

type reqStatus =
  | 'wontSend'
  | 'waiting'
  | 'success'
  | 'unauthorized'
  | 'unknowError'

const props = defineProps({
  /**
   * The email confirmation token
   */
  token: {
    type: String,
    default: '',
  },
})

const requestStatus: Ref<reqStatus> = ref(props.token ? 'waiting' : 'wontSend')

const { client } = useApolloClient()

const confirmEmail = () => {
  apiConfirmEmailAddress(props.token)
    .then(() => {
      requestStatus.value = 'success'
      client
        .query({
          query: CurrentUserSimpleDocument,
          fetchPolicy: 'network-only',
        })
        .catch(() => null)
    })
    .catch((error: AxiosError) => {
      requestStatus.value =
        error.response?.status === HTTP_STATUS.UNAUTHORIZED
          ? 'unauthorized'
          : 'unknowError'
    })
}

if (props.token) setTimeout(confirmEmail, 500)

const messageDict: Record<reqStatus, { title: string; description: string }> = {
  success: {
    title: 'sucesso !',
    description: 'seu email foi confirmado, esta guia pode ser fechada',
  },
  waiting: {
    title: 'acessando',
    description: 'Aguarde um minuto...',
  },
  unauthorized: {
    title: '401',
    description: 'Token expirado ou inválido',
  },
  wontSend: {
    title: 'erro',
    description: 'token de confirmação não encontrado',
  },
  unknowError: {
    title: 'oops',
    description: 'Algo deu errado',
  },
}

const message = computed(() => messageDict[requestStatus.value])

const { isLoggedIn } = useAuth()
</script>

<template>
  <div
    class="fullscreen bg-blue text-white text-center flex flex-center"
    padding
  >
    <div style="max-width: 700px">
      <div class="text-h2">{{ message.title }}</div>
      <div class="text-h4 q-my-md" style="opacity: 0.5">
        {{ message.description }}
      </div>

      <q-linear-progress
        v-show="requestStatus === 'waiting'"
        indeterminate
        color="white"
        class="q-mt-md"
      />

      <q-btn
        v-show="requestStatus !== 'waiting'"
        class="full-width q-mt-md"
        color="grey-7"
        style="max-width: 300px"
        :label="`Voltar para ${isLoggedIn ? 'pagina principal' : 'login'}`"
        @click="$router.push(isLoggedIn ? '/' : { name: 'login' })"
      />
    </div>
  </div>
</template>
