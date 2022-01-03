<script lang="ts">
import RegistrationForm from './form/RegistrationForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegistrationPage',
  components: {
    RegistrationForm,
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

          <RegistrationForm />
        </q-card>
      </div>
    </div>
  </q-page>
</template>
