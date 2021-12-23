<script lang="ts">
import isLength from 'validator/es/lib/isLength';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPasswordInput',

  props: {
    /**
     * Indicates that there was a failed attempt to login with the
     * password on the modelValue prop
     */
    isInvalid: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const rules = [
      (v: string) =>
        isLength(v, { min: 5, max: 200 }) ||
        'Senha deve ter entre 5 a 200 caractéres',
    ];

    return { rules };
  },
});
</script>

<template>
  <q-input
    v-bind="{ ...$props, ...$attrs }"
    :rules="rules"
    :error="!!isInvalid"
    :error-message="isInvalid ? 'Senha inválida' : null"
    outlined
    type="password"
    label="Senha"
  />
</template>
