<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginGoogleButton',

  setup() {
    const loginWithGoogle = () => {
      // TODO-PROD: UNMOCK ME
      window.location.href = 'http://localhost:3000/auth/google/login';
    };

    return { loginWithGoogle };
  },
});
</script>

<template>
  <q-btn
    v-bind="{ ...$props, ...$attrs }"
    unelevated
    color="grey-7"
    size="lg"
    class="full-width q-mt-md"
    label="Login with Google"
    @click="loginWithGoogle"
  />
</template>
