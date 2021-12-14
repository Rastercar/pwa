<script lang="ts">
import { apiLoginWithEmailAndPassword } from '../../api/auth.api';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const email = ref('');
    const password = ref('');

    apiLoginWithEmailAndPassword({ email: '', password: '' }).catch(
      console.error
    );

    return { email, password };
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
