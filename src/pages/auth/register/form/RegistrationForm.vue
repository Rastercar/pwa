<script lang="ts">
import { UnregisteredUserQueryDocument } from 'src/graphql/generated/graphql-operations';
import PasswordConfirmationInput from './PasswordConfirmationInput.vue';
import { defineComponent, reactive, ref, computed, Ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import UsernameInput from './UsernameInput.vue';
import PasswordInput from './PasswordInput.vue';
import { useVuelidate } from '@vuelidate/core';
import EmailInput from './EmailInput.vue';
import { useRoute } from 'vue-router';
import SubmitButton from './SubmitButton.vue';
import { ERROR_CODES } from 'src/constants/rastercar-api-error-codes';

export default defineComponent({
  name: 'RegistrationPage',

  components: {
    EmailInput,
    SubmitButton,
    PasswordInput,
    UsernameInput,
    PasswordConfirmationInput,
  },

  setup() {
    const route = useRoute();

    // The uuid of unregistered user to finish the registration for
    const uuid = route.query.finishFor as string;
    const enabled = typeof uuid === 'string' && !!uuid;

    const formState = reactive({
      email: '',
      username: '',
      password: '',
      refersToUnregisteredUser: uuid ?? null,
    });

    const { loading: isFetchingUser, onResult } = useQuery(
      UnregisteredUserQueryDocument,
      { uuid },
      { enabled, fetchPolicy: 'network-only' }
    );

    onResult(({ data }) => {
      if (data?.unregisteredUser) {
        formState.email = data.unregisteredUser.email;
        formState.username = data.unregisteredUser.username ?? '';
      }
    });

    const isCheckingEmail = ref(false);
    const willCheckEmail = ref(false);

    const passwordConfirmation = ref('');
    const invalidEmails: Ref<string[]> = ref([]);

    const isPasswordVisible = ref(false);

    const v = useVuelidate({ $autoDirty: true });

    const canSubmit = computed(() => {
      const can =
        !isCheckingEmail.value &&
        !v.value.$invalid &&
        !isFetchingUser.value &&
        !willCheckEmail.value;

      return can;
    });

    const onValidationError = (errorCode: string) => {
      if (errorCode === ERROR_CODES.EMAIL_IN_USE) {
        invalidEmails.value.push(formState.email);
      }
    };

    return {
      canSubmit,
      formState,
      invalidEmails,
      willCheckEmail,
      isFetchingUser,
      isCheckingEmail,
      isPasswordVisible,
      onValidationError,
      passwordConfirmation,
    };
  },
});
</script>

<template>
  <div>
    <q-card-section>
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
          :invalid-emails="invalidEmails"
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
    </q-card-section>

    <q-card-actions class="q-px-md">
      <SubmitButton
        :form-value="formState"
        :disable="!canSubmit"
        @validation-error="onValidationError"
      />
    </q-card-actions>
  </div>
</template>
