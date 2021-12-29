<script lang="ts">
import { useAuth } from 'src/state/auth.state';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TestPage',

  setup() {
    const { AUTH_LOGOUT } = useAuth();

    const attemptLogout = () => {
      AUTH_LOGOUT();
    };

    return { attemptLogout };
  },
});
</script>

<template>
  <div>
    <button @click="$router.push('/login')">LOGIN</button>
    <button @click="attemptLogout">LOGOUT</button>
  </div>
</template>
