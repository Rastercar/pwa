<script lang="ts">
import { LoginMutationDocument } from 'src/graphql/generated/graphql-operations';
import { isApiErrorResponse } from 'src/apollo/links/error-handler.link';
import { defineComponent, reactive, ref, Ref } from 'vue';
import { HTTP_STATUS } from 'src/constants/http-status';
import { useMutation } from '@vue/apollo-composable';
import PasswordInput from './PasswordInput.vue';
import { useAuth } from 'src/state/auth.state';
import EmailInput from './EmailInput.vue';
import { QForm } from 'quasar';

export default defineComponent({
  name: 'LoginPage',

  components: { EmailInput, PasswordInput },

  setup() {
    const { AUTH_LOGIN } = useAuth();
    const formState = reactive({ password: '', email: '' });

    const userWithEmailNotFound = ref(false);
    const passwordIsInvalid = ref(false);
    const loginForm: Ref<null | QForm> = ref(null);

    const {
      mutate: login,
      onError,
      loading,
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

    const attemptLogin = async () => {
      // This should be impossible
      if (!loginForm.value) return;

      const isFormValid = await loginForm.value.validate().catch(() => false);

      if (!isFormValid) return;

      login({ input: formState })
        .then((res) => {
          if (!res?.data) throw new Error('Invalid login response');

          userWithEmailNotFound.value = false;
          passwordIsInvalid.value = false;

          AUTH_LOGIN(res.data.login);
        })
        .catch(() => null);
    };

    return {
      xd: (x: unknown) => console.log('xd!!!', x),
      loading,
      formState,
      loginForm,
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
            <q-form
              ref="loginForm"
              class="q-gutter-md"
              greedy
              @validation-error="xd"
            >
              <EmailInput
                v-model="formState.email"
                :disable="loading"
                :user-with-email-not-found="userWithEmailNotFound"
                @update:modelValue="userWithEmailNotFound = false"
              />

              <PasswordInput
                v-model="formState.password"
                :disable="loading"
                :is-invalid="passwordIsInvalid"
              />
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn
              :loading="loading"
              unelevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="Login"
              @click="attemptLogin"
            />

            <q-btn
              unelevated
              color="grey-7"
              size="lg"
              class="full-width q-mt-md"
              label="Login with Google"
            />
          </q-card-actions>

          <q-card-section class="text-center q-pa-none q-mt-sm">
            <p class="text-grey-6">Não é registrado? Crie uma conta</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
