<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import RegistrationForm from './form/RegistrationForm.vue';

export default defineComponent({
  name: 'RegistrationPage',

  components: {
    RegistrationForm,
  },

  setup() {
    const route = useRoute();

    const userToFinishRegistrationForUuid = route.query.finishFor;

    console.log({ userToFinishRegistrationForUuid });

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
            <RegistrationForm />
          </q-card-section>

          <q-card-actions class="q-px-md">
            <q-btn
              class="q-ml-auto"
              label="Submit"
              type="submit"
              color="primary"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
