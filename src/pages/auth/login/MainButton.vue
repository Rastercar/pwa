<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginMainButton',
});
</script>

<template>
  <q-btn
    v-bind="{ ...$props, ...$attrs }"
    unelevated
    color="light-green-7"
    size="lg"
    class="full-width"
    label="Login"
  />
</template>
