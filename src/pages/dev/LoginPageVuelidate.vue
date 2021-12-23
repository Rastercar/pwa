<script lang="ts">
import {
  email as isValidEmail,
  minLength,
  required,
  helpers,
} from '@vuelidate/validators';
import { LoginMutationDocument } from 'src/graphql/generated/graphql-operations';
import ErrorMessage from '../../components/text/ErrorMessage.vue';
import { defineComponent, computed, reactive, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { useAuth } from 'src/state/auth.state';
import useVuelidate from '@vuelidate/core';

export default defineComponent({
  name: 'LoginPage',

  components: {
    ErrorMessage,
  },

  setup() {
    const { AUTH_LOGIN } = useAuth();
    const formState = reactive({ password: '', email: '' });

    const invalidPassword = ref(false);
    const emailNotFound = ref(false);

    const { withMessage, withParams } = helpers;

    const rules = computed(() => ({
      email: {
        required: withMessage('Campo Obrigatório', required),
        isValidEmail: withMessage('Email inválido', isValidEmail),
        isFound: withMessage(
          'Usuário não encontrado com esse email',
          withParams(
            { type: 'isFound', value: emailNotFound.value },
            () => !emailNotFound.value
          )
        ),
      },
      password: {
        required: withMessage('Campo Obrigatório', required),
        hasMinLength: withMessage('Mínimo 8 caracteres', minLength(8)),
        isValid: withMessage(
          'Senha inválida',
          withParams(
            { type: 'isValid', value: invalidPassword.value },
            () => !invalidPassword.value
          )
        ),
      },
    }));

    const v$ = useVuelidate(rules, formState, { $autoDirty: true });

    v$.value.email;

    const {
      error: loginError,
      mutate: login,
      loading,
    } = useMutation(LoginMutationDocument, { fetchPolicy: 'network-only' });

    const attemptLogin = () => {
      login({ input: formState })
        .then((res) => {
          if (res?.data) AUTH_LOGIN(res.data.login);
        })
        .catch(() => null);
    };

    const error = computed(() => {
      return loginError.value?.message
        ? `Message: ${loginError.value?.message}`
        : 'No message';
    });

    return { formState, attemptLogin, error, loading, v$ };
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
            <div class="text-h5">Rastercar</div>
            {{ error }}
          </q-card-section>

          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                v-model="formState.email"
                :disable="loading"
                outlined
                type="email"
                label="Email"
              />
              <ErrorMessage :model="v$.email" />

              <q-input
                v-model="formState.password"
                :disable="loading"
                outlined
                type="password"
                label="Senha"
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
