<script lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils';
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegistrationPasswordConfirmationInput',

  props: {
    modelValue: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:visible'],

  setup(props) {
    // TODO: make me better
    const rules = {
      modelValue: {
        required: helpers.withMessage('Campo obrigatório', required),
      },
    };

    const v = useVuelidate(rules, props, { $autoDirty: true });

    return { rules, getVuelidateErrorMsg, v };
  },
});
</script>

<template>
  <q-input
    v-bind="{ ...$props, ...$attrs }"
    :error="v.modelValue.$error"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    label="Confirmação de senha *"
    outlined
  >
    <template #append>
      <q-icon
        :name="visible ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="$emit('update:visible', !visible)"
      />
    </template>
  </q-input>
</template>
