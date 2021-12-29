import { ErrorObject } from '@vuelidate/core';

export const getVuelidateErrorMsg = (errors: ErrorObject[], defMsg = '') => {
  return errors[0] ? errors[0].$message || '' : defMsg;
};
