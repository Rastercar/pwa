<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({ name: 'LoginCardFooter' });
</script>

<template>
  <q-card-section class="text-center q-pa-none q-mt-sm">
    <p class="text-grey-6">
      Não é registrado?
      <a
        class="text-blue-6"
        :style="{ cursor: 'pointer' }"
        @click="$router.push('/register')"
      >
        crie uma conta
      </a>
    </p>
  </q-card-section>
</template>
