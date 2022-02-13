<script setup lang="ts">
import { useApolloClient } from '@vue/apollo-composable'
import { useAuth } from 'src/state/auth.state'

const { AUTH_LOGOUT } = useAuth()
const { client } = useApolloClient()

const attemptLogout = () => {
  AUTH_LOGOUT()
  client.clearStore().catch(console.error)
}
</script>

<template>
  <div class="q-pa-lg">
    <button class="q-mr-lg" @click="$router.push('/login')">LOGIN</button>
    <button class="q-mr-lg" @click="$router.push('/register')">REGISTER</button>
    <button class="q-mr-lg" @click="attemptLogout">LOGOUT</button>
  </div>
</template>
