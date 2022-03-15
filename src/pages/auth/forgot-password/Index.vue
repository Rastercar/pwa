<script setup lang="ts">
import ForgotPasswordButton from '../../../components/button/ForgotPasswordButton.vue'
import EmailInput from '../../../components/input/EmailInput.vue'
import useVuelidate from '@vuelidate/core'
import { ref } from 'vue'

const isCheckingEmail = ref(false)
const willCheckEmail = ref(false)

const v = useVuelidate()

const email = ref('')
</script>

<template>
  <q-page
    class="bg-light-blue window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <q-card bordered class="shadow-1" style="max-width: 500px">
          <q-card-section>
            <div class="text-h5">Esqueceu sua senha ?</div>
            <div class="text-subtitle2 text-grey-9 q-mt-sm">
              Informe seu endereço de email e te enviaremos um email de
              redefinição de senha
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <EmailInput
              v-model="email"
              v-model:willCheckEmail="willCheckEmail"
              v-model:isCheckingEmail="isCheckingEmail"
              valid-if="email-in-use"
            />
          </q-card-section>

          <q-card-section>
            <ForgotPasswordButton
              :flat="false"
              :email-address="email"
              :disable="willCheckEmail || isCheckingEmail || v.$invalid"
              :show-tooltip="false"
              initial-label="Enviar email"
              class="full-width"
              style="border-radius: none"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
