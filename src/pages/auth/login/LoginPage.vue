<script lang="ts">
import { LoginMutationDocument } from 'src/graphql/generated/graphql-operations';
import { isApiErrorResponse } from 'src/apollo/links/error-handler.link';
import { HTTP_STATUS } from 'src/constants/http-status';
import { defineComponent, reactive, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import LoginCardFooter from './LoginCardFooter.vue';
import PasswordInput from './PasswordInput.vue';
import { useAuth } from 'src/state/auth.state';
import { useVuelidate } from '@vuelidate/core';
import GoogleButton from './GoogleButton.vue';
import MainButton from './MainButton.vue';
import EmailInput from './EmailInput.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginPage',

  components: {
    EmailInput,
    MainButton,
    GoogleButton,
    PasswordInput,
    LoginCardFooter,
  },

  setup() {
    const formState = reactive({ password: '', email: '' });

    const userWithEmailNotFound = ref(false);
    const passwordIsInvalid = ref(false);

    const {
      mutate: login,
      onError,
      loading: isLoggingIn,
    } = useMutation(LoginMutationDocument, { fetchPolicy: 'network-only' });

    onError(({ graphQLErrors }) => {
      const error = graphQLErrors[0]?.extensions?.response;

      if (!isApiErrorResponse(error)) return;

      if (error.statusCode === HTTP_STATUS.NOT_FOUND) {
        userWithEmailNotFound.value = true;
      } else if (error.statusCode === HTTP_STATUS.UNAUTHORIZED) {
        passwordIsInvalid.value = true;
      }
    });

    const v = useVuelidate({ $autoDirty: true });
    const router = useRouter();

    const { AUTH_LOGIN } = useAuth();

    const attemptLogin = async () => {
      const isFormValid = await v.value.$validate().catch(() => false);

      if (!isFormValid) return;

      login({ input: formState })
        .then((res) => {
          if (!res?.data) throw new Error('Invalid login response');

          userWithEmailNotFound.value = false;
          passwordIsInvalid.value = false;

          AUTH_LOGIN(res.data.login);

          router.push('/').catch(() => null);
        })
        .catch(() => null);
    };

    return {
      v,
      formState,
      isLoggingIn,
      attemptLogin,
      passwordIsInvalid,
      userWithEmailNotFound,
    };
  },
});
</script>

<template>
  <q-page
    class="bg-light-blue window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <q-card bordered class="q-pa-md shadow-1">
          <q-card-section>
            <div class="text-h5 text-center">
              <span class="text-grey-7">Bem vindo a </span>
              <span class="text-blue-7">Rastercar </span>
              <span class="text-grey-7">!</span>
            </div>
          </q-card-section>

          <q-card-section>
            <q-form class="q-gutter-md" greedy>
              <EmailInput
                v-model="formState.email"
                :disable="isLoggingIn"
                :user-with-email-not-found="userWithEmailNotFound"
                @update:modelValue="userWithEmailNotFound = false"
              />

              <PasswordInput
                v-model="formState.password"
                :disable="isLoggingIn"
                :is-invalid="passwordIsInvalid"
                @update:modelValue="passwordIsInvalid = false"
              />
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-md">
            <MainButton
              :loading="isLoggingIn"
              :disable="v.$invalid"
              @click="attemptLogin"
            />

            <GoogleButton :disable="isLoggingIn" />
          </q-card-actions>

          <LoginCardFooter />
        </q-card>
      </div>
    </div>
  </q-page>
</template>
