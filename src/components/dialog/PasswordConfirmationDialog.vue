<script setup lang="ts">
import { apiCheckCurrentUserPassword } from 'src/api/auth.api'
import { Ref, ref } from 'vue'

const invalidPasswords: Ref<string[]> = ref([])
const passwordConfirmation = ref('')
const loading = ref(false)

defineProps({
  headerIcon: {
    type: String,
    default: 'fa fa-exclamation-circle',
  },
  headerText: {
    type: String,
    default: 'Alerta',
  },
  message: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['confirmation:success', 'confirmation:failure'])

const confirmPassword = () => {
  loading.value = true

  apiCheckCurrentUserPassword(passwordConfirmation.value)
    .then((isValid) => {
      emit(isValid ? 'confirmation:success' : 'confirmation:failure')
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <q-dialog v-bind="({ ...$props, ...$attrs } as any)">
    <q-card style="width: 450px">
      <q-card-section>
        <slot name="header">
          <div class="text-h6">
            <q-icon
              size="25px"
              class="q-mr-sm"
              color="red"
              :name="headerIcon"
            />
            {{ headerText }}
          </div>
        </slot>
      </q-card-section>

      <q-card-section class="q-pt-none text-body1">
        <slot name="message">
          {{ message }}
        </slot>
      </q-card-section>

      <q-card-section class="q-pt-none text-subtitle1">
        Digite sua <b>senha</b> para continuar
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="passwordConfirmation"
          :error="invalidPasswords.includes(passwordConfirmation)"
          error-message="Senha inválida"
          dense
          autofocus
          type="password"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          v-close-popup
          color="green"
          label="Cancelar"
          @click="passwordConfirmation = ''"
        />
        <q-btn
          :disable="passwordConfirmation.length < 4"
          :loading="loading"
          color="red"
          label="Remover"
          @click="confirmPassword"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
