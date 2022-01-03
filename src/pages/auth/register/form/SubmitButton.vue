<script lang="ts">
import { RegisterUserMutationDocument } from 'src/graphql/generated/graphql-operations';
import { isApiErrorResponse } from 'src/apollo/links/error-handler.link';
import { ERROR_CODES } from 'src/constants/rastercar-api-error-codes';
import { useMutation } from '@vue/apollo-composable';
import { defineComponent, PropType } from 'vue';
import { useAuth } from 'src/state/auth.state';
import { useRouter } from 'vue-router';

interface RegistrationForm {
  username: string;
  password: string;
  email: string;
}

export default defineComponent({
  name: 'RegistrationSubmitButton',

  props: {
    formValue: {
      type: Object as PropType<RegistrationForm>,
      required: true,
    },
  },

  emits: ['validation-error'],

  setup(props, { emit }) {
    const { mutate: register, onError } = useMutation(
      RegisterUserMutationDocument,
      {
        variables: { user: props.formValue },
        fetchPolicy: 'network-only',
      }
    );

    const { AUTH_LOGIN } = useAuth();
    const router = useRouter();

    const submit = () => {
      register()
        .then((res) => {
          if (!res?.data) return;

          AUTH_LOGIN(res.data.register);

          router.push('/').catch(() => null);
        })
        .catch(() => null);
    };

    onError(({ graphQLErrors }) => {
      const error = graphQLErrors[0]?.extensions?.response;

      if (!isApiErrorResponse(error)) return;

      if (error.message === ERROR_CODES.EMAIL_IN_USE) {
        emit('validation-error', ERROR_CODES.EMAIL_IN_USE);
      }
    });

    return { submit };
  },
});
</script>

<template>
  <q-btn
    class="q-ml-auto"
    label="Cadastrar"
    type="submit"
    color="primary"
    @click="submit"
  />
</template>
