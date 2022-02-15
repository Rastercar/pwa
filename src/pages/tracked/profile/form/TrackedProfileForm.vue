<script setup lang="ts">
import { CurrentUserQuery } from 'src/graphql/generated/graphql-operations'
import UsernameInput from 'src/pages/auth/register/form/UsernameInput.vue'
import EmailInput from 'src/pages/auth/register/form/EmailInput.vue'
import { PropType, reactive, Ref, ref } from 'vue'
import PasswordInput from 'src/pages/auth/register/form/PasswordInput.vue'
import PasswordConfirmationInput from 'src/pages/auth/register/form/PasswordConfirmationInput.vue'
import OldPasswordInput from './OldPasswordInput.vue'

const props = defineProps({
  /**
   * The user to be edited
   */
  user: {
    type: Object as PropType<CurrentUserQuery['me']>,
    required: true,
  },
})

const invalidEmails: Ref<string[]> = ref([])
const isCheckingEmail = ref(false)
const willCheckEmail = ref(false)

const passwordConfirmation = ref('')
const isPasswordVisible = ref(false)

const formState = reactive({
  email: props.user.email,
  username: props.user.username,
  newPassword: '',
  oldPassword: '',
})
</script>

<template>
  <q-form>
    <q-card-section>
      <EmailInput
        v-model="formState.email"
        v-model:isCheckingEmail="isCheckingEmail"
        v-model:willCheckEmail="willCheckEmail"
        :invalid-emails="invalidEmails"
        :allowed-emails="[props.user.email]"
        class="q-mb-md"
      />

      <UsernameInput v-model="formState.username" />
    </q-card-section>

    <q-separator />

    <q-card-section class="q-gutter-md">
      <div class="text-h5 q-mb-lg">
        <q-icon name="fa fa-shield-alt" class="q-mr-md" />
        <span>Acesso e credenciais</span>
      </div>

      <OldPasswordInput v-model="formState.oldPassword" />

      <PasswordInput
        v-model="formState.newPassword"
        v-model:visible="isPasswordVisible"
        label="Nova senha"
      />

      <PasswordConfirmationInput
        v-model="passwordConfirmation"
        :visible="isPasswordVisible"
        :password-to-match="formState.newPassword"
        label="Confirme a nova senha"
      />
    </q-card-section>
  </q-form>

  <q-separator />

  <q-card-actions class="q-ma-xs">
    <q-btn class="bg-green text-white q-ml-auto q-px-sm">Salvar</q-btn>
  </q-card-actions>
</template>
