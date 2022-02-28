<script setup lang="ts">
import { useAuth } from 'src/state/auth.state'

const { AUTH_LOGOUT, isLoggedIn } = useAuth()

const attemptLogout = () => {
  AUTH_LOGOUT()
}
</script>

<template>
  <div class="q-pa-lg">
    <button v-if="!isLoggedIn" class="q-mr-lg" @click="$router.push('/login')">
      LOGIN
    </button>

    <button v-else class="q-mr-lg" @click="attemptLogout">LOGOUT</button>
    <button class="q-mr-lg" @click="$router.push('/register')">REGISTER</button>
  </div>
</template>
