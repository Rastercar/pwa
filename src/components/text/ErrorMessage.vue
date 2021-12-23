<script lang="ts">
import { computed, defineComponent, toRefs, Ref, PropType } from 'vue';
import { Validation } from '@vuelidate/core';

// TODO-PROD: CHECK IF IM USED
export default defineComponent({
  name: 'ErrorMessage',

  props: {
    message: {
      type: String,
      default: '',
    },
    /**
     * A vuelidate validation state
     *
     * @example
     *
     * ```ts
     * const v$ = useVuelidate({ email: { isValidEmail } }, formState)
     *
     * // template
     * // <ErrorMessage :model="v$.email" />
     * ```
     */
    model: {
      type: Object as PropType<Validation>,
      default: () => ({}),
    },
  },

  setup(props) {
    const { model, message } = toRefs(props);

    const errorMessage = computed((): string | null | Ref<string> => {
      if (message.value) return message.value;

      if (
        !model.value ||
        !model.value.$dirty ||
        model.value.$errors.length === 0
      ) {
        return null;
      }

      return model.value.$errors[0].$message;
    });

    const hasMessage = computed((): boolean => errorMessage.value !== null);

    return { errorMessage, hasMessage };
  },
});
</script>

<template>
  <div>
    <small class="text-red z-error-message">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style lang="sass" scoped>
.z-error-message
    font-size: 12px
</style>
