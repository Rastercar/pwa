<script lang="ts">
import RegistrationForm from './form/RegistrationForm.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'RegistrationPage',

  components: {
    RegistrationForm,
  },

  setup() {
    const canSubmit = ref(false);
    return { canSubmit };
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
              <span class="text-grey-7">Registrar-se</span>
            </div>
          </q-card-section>

          <q-card-section>
            <RegistrationForm v-model:canSubmit="canSubmit" />
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn
              :disable="!canSubmit"
              class="q-ml-auto"
              label="Cadastrar"
              type="submit"
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
