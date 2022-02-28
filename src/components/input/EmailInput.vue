<script setup lang="ts">
import { CheckEmailInUseDocument } from 'src/graphql/generated/graphql-operations'
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { helpers, email, required } from '@vuelidate/validators'
import { useApolloClient } from '@vue/apollo-composable'
import { computed, PropType, ref, Ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { debounce } from 'quasar'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },

  /**
   * If this component should consider emails that are in use as valid or the contrary
   */
  validIf: {
    type: String as PropType<'email-in-use' | 'email-not-in-use'>,
    default: 'email-not-in-use',
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
   * If were waiting for a request to check for the email on the input
   * to be valid
   */
  isCheckingEmail: {
    type: Boolean,
    default: false,
  },

  /**
   * List of emails that are in use by another user, master user or organization
   */
  emailsInUse: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  /**
   * List of emails that will not trigger the emailInUse error regardless
   * if theyre in use or not.
   *
   * example: The original email of the user, master user or organization
   * being edited
   */
  allowedEmails: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  /**
   * The loading state for the button
   *
   * **NOTE:** Loading will always be true if the component is checking if a email is in use
   */
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'update:isCheckingEmail',
  'update:willCheckEmail',
])

const { withMessage } = helpers

const internalEmailsInUse: Ref<string[]> = ref([])

const rules = computed(() => {
  const validIfInUse = props.validIf === 'email-in-use'

  const usageIsValidErrorMsg = validIfInUse
    ? 'Usuário com email não encontrado'
    : 'Email em uso'

  const validIfNotInUseFn = (v: string) => {
    if (props.allowedEmails.includes(v)) return true
    return (
      !props.emailsInUse.includes(v) && !internalEmailsInUse.value.includes(v)
    )
  }

  const validIfInUseFn = (v: string) => {
    // If we are still checking we cant consider the email as invalid
    // we rely on the component parent to disallow the form to be submitted
    // in the meantime
    if (props.isCheckingEmail || props.willCheckEmail) return true
    return (
      props.emailsInUse.includes(v) || internalEmailsInUse.value.includes(v)
    )
  }

  return {
    modelValue: {
      required: withMessage('Campo obrigatório', required),
      email: withMessage('Email inválido', email),
      usageIsValid: withMessage(
        usageIsValidErrorMsg,
        validIfInUse ? validIfInUseFn : validIfNotInUseFn
      ),
    },
  }
})

const vuelidate = useVuelidate(rules, props, { $autoDirty: true })

const { client } = useApolloClient()

const checkEmailInUse = () => {
  const { required, email } = vuelidate.value.modelValue

  // Dont bother checking invalid emails
  if (email.$invalid || required.$invalid) return

  const isAllowed =
    props.validIf === 'email-not-in-use' &&
    props.allowedEmails.includes(props.modelValue)

  // If checking if the email is not in use and the email is allowed dont bother checking
  if (isAllowed) return

  emit('update:isCheckingEmail', true)

  client
    .query({
      query: CheckEmailInUseDocument,
      variables: { email: props.modelValue },
      // Must be network only, as emails can be registered all the time we cannot trust the cache
      fetchPolicy: 'network-only',
    })
    .then(({ data }) => {
      if (data.isEmailInUse) internalEmailsInUse.value.push(props.modelValue)
    })
    .catch(() => null)
    .finally(() => {
      emit('update:isCheckingEmail', false)
      emit('update:willCheckEmail', false)
    })
}

const checkEmailUsage = debounce(checkEmailInUse, 500)

const onInput = (v: unknown) => {
  emit('update:modelValue', v)
  emit('update:willCheckEmail', true)
  checkEmailUsage()
}
</script>

<template>
  <q-input
    :model-value="modelValue"
    :error="vuelidate.modelValue.$error"
    :error-message="getVuelidateErrorMsg(vuelidate.modelValue.$errors)"
    :no-error-icon="isCheckingEmail"
    :loading="loading || isCheckingEmail"
    label="Email *"
    outlined
    @update:model-value="onInput"
  />
</template>
