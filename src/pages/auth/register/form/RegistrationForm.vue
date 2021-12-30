<script lang="ts">
import { UnregisteredUserQueryDocument } from 'src/graphql/generated/graphql-operations';
import PasswordConfirmationInput from './PasswordConfirmationInput.vue';
import { defineComponent, reactive, ref, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import UsernameInput from './UsernameInput.vue';
import PasswordInput from './PasswordInput.vue';
import { useVuelidate } from '@vuelidate/core';
import EmailInput from './EmailInput.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'RegistrationPage',

  components: {
    EmailInput,
    PasswordInput,
    UsernameInput,
    PasswordConfirmationInput,
  },

  emits: ['update:canSubmit'],

  setup(_props, { emit }) {
    const formState = reactive({ username: '', password: '', email: '' });

    const route = useRoute();

    // The uuid of unregistered user to finish the registration for
    const uuid = route.query.finishFor as string;
    const enabled = typeof uuid === 'string' && !!uuid;

    const { loading: isFetchingUser, onResult } = useQuery(
      UnregisteredUserQueryDocument,
      { uuid },
      { enabled, fetchPolicy: 'network-only' }
    );

    onResult(({ data }) => {
      if (data.unregisteredUser) {
        formState.email = data.unregisteredUser.email;
        formState.username = data.unregisteredUser.username ?? '';
      }
    });

    const isCheckingEmail = ref(false);
    const willCheckEmail = ref(false);

    const passwordConfirmation = ref('');
    const isPasswordVisible = ref(false);

    const v = useVuelidate({ $autoDirty: true });

    watchEffect(() => {
      const can =
        !isCheckingEmail.value &&
        !v.value.$invalid &&
        !isFetchingUser.value &&
        !willCheckEmail.value;

      emit('update:canSubmit', can);
    });

    return {
      formState,
      willCheckEmail,
      isFetchingUser,
      isCheckingEmail,
      isPasswordVisible,
      passwordConfirmation,
    };
  },
});
</script>

<template>
  <q-form class="q-gutter-md" :style="{ minWidth: '300px' }">
    <UsernameInput
      v-model="formState.username"
      :loading="isFetchingUser"
      :disable="isFetchingUser"
    />

    <EmailInput
      v-model="formState.email"
      v-model:isCheckingEmail="isCheckingEmail"
      v-model:willCheckEmail="willCheckEmail"
      :loading="isFetchingUser"
      :disable="isFetchingUser"
    />

    <PasswordInput
      v-model="formState.password"
      v-model:visible="isPasswordVisible"
    />

    <PasswordConfirmationInput
      v-model="passwordConfirmation"
      v-model:visible="isPasswordVisible"
      :password="formState.password"
    />
  </q-form>
</template>
