<script setup lang="ts">
const loginWithGoogle = () => {
  window.location.href = `${process.env.API_BASE_URL}/auth/google/login`
}
</script>

<template>
  <q-btn
    v-bind="({ ...$props, ...$attrs } as any)"
    unelevated
    color="grey-7"
    size="lg"
    class="full-width q-mt-md"
    label="Login com Google"
    @click="loginWithGoogle"
  />
</template>
