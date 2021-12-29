<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import PasswordInput from './PasswordInput.vue';
import PasswordConfirmationInput from './PasswordConfirmationInput.vue';

export default defineComponent({
  name: 'RegistrationPage',

  components: {
    PasswordInput,
    PasswordConfirmationInput,
  },

  setup() {
    const formState = reactive({ password: '', email: '' });

    const isPasswordVisible = ref(false);

    return {
      formState,
      isPasswordVisible,
    };
  },
});
</script>

<template>
  <q-form class="q-gutter-md">
    <q-input outlined label="Nome de usuário *" />
    <q-input outlined label="Email *" />

    <PasswordInput
      v-model="formState.password"
      v-model:visible="isPasswordVisible"
    />

    <PasswordConfirmationInput v-model:visible="isPasswordVisible" />
  </q-form>
</template>
