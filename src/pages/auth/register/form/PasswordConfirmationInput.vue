<script lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils';
import { helpers } from '@vuelidate/validators';
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
    passwordToMatch: {
      type: String,
      required: true,
    },
  },

  emits: ['update:visible'],

  setup(props) {
    const rules = {
      modelValue: {
        equalsPassword: helpers.withMessage(
          'Confirmação inválida',
          (v: string) => v === props.passwordToMatch
        ),
      },
    };

    const v = useVuelidate(rules, props, { $autoDirty: true });

    return { getVuelidateErrorMsg, v };
  },
});
</script>

<template>
  <q-input
    v-bind="{ ...$props, ...$attrs }"
    :error="v.modelValue.$error"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    :type="!visible ? 'password' : 'text'"
    label="Confirmação de senha *"
    no-error-icon
    outlined
  />
</template>
