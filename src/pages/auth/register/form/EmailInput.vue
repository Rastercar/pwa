<script lang="ts">
import { IsEmailInUseQueryDocument } from 'src/graphql/generated/graphql-operations';
import { getVuelidateErrorMsg } from 'src/utils/validation.utils';
import { helpers, email, required } from '@vuelidate/validators';
import { useApolloClient } from '@vue/apollo-composable';
import { defineComponent, PropType, ref, Ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { debounce } from 'quasar';

export default defineComponent({
  name: 'RegistrationEmailInput',

  props: {
    modelValue: {
      type: String,
      required: true,
    },

    /**
     * Notifies the field value will be checked for validity and the input
     * can be invalid after this, therefore a form should cannot be submited
     * while this is true.
     */
    willCheckEmail: {
      type: Boolean,
      default: false,
    },

    /**
     * List of emails that are in use or cannot be accepted for other reasons
     */
    invalidEmails: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    /**
     * If were waiting for a request to check for the email on the input
     * to be valid
     */
    isCheckingEmail: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:isCheckingEmail', 'update:willCheckEmail'],

  setup(props, { emit }) {
    const { withMessage } = helpers;

    const internalInvalidEmails: Ref<string[]> = ref([]);

    const rules = {
      modelValue: {
        required: withMessage('Campo obrigatório', required),
        email: withMessage('Email inválido', email),
        isNotInUse: withMessage(
          'Endereço de email indisponível',
          (v: string) =>
            !props.invalidEmails.includes(v) &&
            !internalInvalidEmails.value.includes(v)
        ),
      },
    };

    const v = useVuelidate(rules, props, { $autoDirty: true });

    const apollo = useApolloClient();

    const checkEmailInUse = () => {
      const { required, email, isNotInUse } = v.value.modelValue;

      // If the email address is already invalid dont bother checking
      if (email.$invalid || required.$invalid || isNotInUse.$invalid) return;

      emit('update:isCheckingEmail', true);

      apollo.client
        .query({
          query: IsEmailInUseQueryDocument,
          variables: { email: props.modelValue },
          fetchPolicy: 'network-only',
        })
        .then(({ data }) => {
          if (!data.isEmailInUse) return;
          internalInvalidEmails.value.push(props.modelValue);
        })
        .catch(() => null)
        .finally(() => {
          emit('update:isCheckingEmail', false);
          emit('update:willCheckEmail', false);
        });
    };

    const checkEmailUsage = debounce(checkEmailInUse, 500);

    const onInput = () => {
      emit('update:willCheckEmail', true);
      checkEmailUsage();
    };

    return { rules, getVuelidateErrorMsg, v, onInput };
  },
});
</script>

<template>
  <q-input
    v-bind="{ ...$props, ...$attrs }"
    :error="v.modelValue.$error"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    :no-error-icon="isCheckingEmail"
    :loading="$props.loading || isCheckingEmail"
    label="Email *"
    outlined
    @update:model-value="onInput"
  />
</template>
