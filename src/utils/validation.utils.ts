import { ErrorObject } from '@vuelidate/core'

export const getVuelidateErrorMsg = (errors: ErrorObject[], defMsg = '') => {
  const firstErrorMsg = errors[0]?.$message

  if (firstErrorMsg) {
    const message =
      typeof firstErrorMsg === 'string' ? firstErrorMsg : firstErrorMsg.value

    return message || defMsg
  }
}
