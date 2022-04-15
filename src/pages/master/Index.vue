<script setup lang="ts">
import { useAuth } from '../../state/auth.state'

const { LOGOUT, isLoggedIn } = useAuth()

const attemptLogout = () => {
  LOGOUT()
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
