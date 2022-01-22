<script setup lang="ts">
const loginWithGoogle = () => {
  // TODO-PROD: UNMOCK ME
  window.location.href = 'http://localhost:3000/auth/google/login'
}
</script>

<template>
  <q-btn
    v-bind="({ ...$props, ...$attrs } as any)"
    unelevated
    color="grey-7"
    size="lg"
    class="full-width q-mt-md"
    label="Login with Google"
    @click="loginWithGoogle"
  />
</template>
