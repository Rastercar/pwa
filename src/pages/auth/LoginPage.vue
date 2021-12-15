<script lang="ts">
import { LoginMutationDocument } from 'src/graphql/generated/graphql-operations';
import { useMutation } from '@vue/apollo-composable';
import { useAuth } from 'src/state/auth.state';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const password = ref('');
    const email = ref('');

    const { AUTH_LOGIN } = useAuth();

    const { mutate: login, error } = useMutation(LoginMutationDocument, {
      fetchPolicy: 'no-cache',
    });

    const attemptLogin = () => {
      login({ input: { email: email.value, password: password.value } })
        .then((res) => {
          if (res?.data) AUTH_LOGIN(res.data.login);
        })
        .catch(() => null);
    };

    return { email, password, attemptLogin, error };
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
                v-model="email"
                filled
                clearable
                type="email"
                label="Email"
              />
              <q-input
                v-model="password"
                filled
                clearable
                type="password"
                label="Senha"
              />
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn
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
