<script lang="ts">
import isEmail from 'validator/es/lib/isEmail';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginEmailInput',

  props: {
    /**
     * Indicates that the search for a user with the current
     * email address in the modelValue prop failed
     */
    userWithEmailNotFound: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const rules = [(v: string) => isEmail(v) || 'Email inválido'];

    return { rules };
  },
});
</script>

<template>
  <q-input
    v-bind="{ ...$props, ...$attrs }"
    :rules="rules"
    :error="!!userWithEmailNotFound"
    :error-message="userWithEmailNotFound ? 'Usuário não encontrado' : null"
    outlined
    type="email"
    label="Email"
  />
</template>
