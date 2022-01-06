<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { LoginByTokenMutationDocument } from 'src/graphql/generated/graphql-operations';
import { useAuth } from 'src/state/auth.state';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'AutoLoginPage',

  setup() {
    const route = useRoute();
    const router = useRouter();

    const { AUTH_LOGIN } = useAuth();

    // The temporary JWT used to login as
    const token = route.query.token as string;

    // TODO: fail if token is not set (route guard ?)

    const { mutate: login } = useMutation(LoginByTokenMutationDocument, {
      variables: { token },
    });

    const attemptLogin = () => {
      login()
        .then((res) => {
          if (!res?.data) throw new Error('Invalid login response');

          AUTH_LOGIN(res.data.loginWithToken);

          router.push('/').catch(() => null);
        })
        .catch(console.warn);
    };

    setTimeout(attemptLogin, 2000);

    return {};
  },
});
</script>

<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <!-- TODO: find better msg -->
      <div class="text-h1">acessando</div>
      <div class="text-h3" style="opacity: 0.5">aguarde um minuto...</div>
    </div>
  </div>
</template>
