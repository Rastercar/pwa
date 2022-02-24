<script setup lang="ts">
import { ref } from 'vue'

const redirecting = ref(false)

const loginWithGoogle = () => {
  redirecting.value = true

  window.location.href = `${process.env.API_BASE_URL}/auth/google/login`
}
</script>

<template>
  <q-btn
    v-bind="({ ...$props, ...$attrs } as any)"
    :loading="redirecting"
    unelevated
    color="grey-7"
    size="lg"
    class="full-width q-mt-md"
    label="Login com Google"
    @click="loginWithGoogle"
  />
</template>
