<script lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils';
import { email, helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginEmailInput',

  props: {
    modelValue: {
      type: String,
      required: true,
    },
    /**
     * Indicates that the search for a user with the current
     * email address in the modelValue prop failed
     */
    userWithEmailNotFound: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { withMessage } = helpers;

    const rules = {
      modelValue: {
        required: withMessage('Campo obrigatório', required),
        email: withMessage('Email inválido', email),
        isNotMarkedAsNotFound: withMessage(
          'Email não encontrado',
          () => !props.userWithEmailNotFound
        ),
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
    outlined
    type="email"
    label="Email"
  />
</template>
