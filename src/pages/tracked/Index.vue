<script setup lang="ts">
import { useAuth } from 'src/state/auth.state'

const { AUTH_LOGOUT, isLoggedIn } = useAuth()

const attemptLogout = () => {
  AUTH_LOGOUT()
}
</script>

<template>
  <q-page padding>
    <button
      v-if="!isLoggedIn"
      class="q-mr-lg"
      @click="$router.push({ name: 'login' })"
    >
      LOGIN
    </button>

    <button v-else class="q-mr-lg" @click="attemptLogout">LOGOUT</button>
    <button
      v-if="!isLoggedIn"
      class="q-mr-lg"
      @click="$router.push({ name: 'registrar' })"
    >
      REGISTER
    </button>
  </q-page>
</template>
