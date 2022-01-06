<script lang="ts">
import { useApolloClient } from '@vue/apollo-composable';
import { useAuth } from 'src/state/auth.state';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TestPage',

  setup() {
    const { AUTH_LOGOUT } = useAuth();
    const { client } = useApolloClient();

    const attemptLogout = () => {
      AUTH_LOGOUT();
      client.clearStore().catch(() => null);
    };

    return { attemptLogout };
  },
});
</script>

<template>
  <div class="q-pa-lg">
    <button class="q-mr-lg" @click="$router.push('/login')">LOGIN</button>
    <button class="q-mr-lg" @click="$router.push('/register')">REGISTER</button>
    <button class="q-mr-lg" @click="attemptLogout">LOGOUT</button>
  </div>
</template>
