<script lang="ts">
import { LoginMutationDocument } from 'src/graphql/generated/graphql-operations';
import { useMutation } from '@vue/apollo-composable';
import { useAuth } from 'src/state/auth.state';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TestPage',

  setup() {
    const { mutate: login } = useMutation(LoginMutationDocument, {
      variables: {
        input: { email: 'admin.user@gmail.com', password: '12345' },
      },
    });

    const { AUTH_LOGIN, AUTH_LOGOUT } = useAuth();

    const attemptLogin = () => {
      login()
        .then((res) => {
          if (res?.data?.login) AUTH_LOGIN(res.data.login);
        })
        .catch(console.error);
    };

    const attemptLogout = () => {
      AUTH_LOGOUT();
    };

    return { attemptLogin, attemptLogout };
  },
});
</script>

<template>
  <div>
    <button @click="attemptLogin">LOGIN</button>
    <button @click="attemptLogout">LOGOUT</button>
  </div>
</template>
