<script lang="ts">
import SidebarUserSection from './SidebarUserSection.vue';
import { useAuth } from 'src/state/auth.state';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Sidebar',

  components: {
    SidebarUserSection,
  },

  setup() {
    const { isLoggedIn } = useAuth();
    return { isLoggedIn };
  },
});
</script>

<template>
  <div>
    <h2>SIDEBAR CONTENT</h2>
    IS LOGGED IN: {{ isLoggedIn }}
    <SidebarUserSection v-if="isLoggedIn" />
  </div>
</template>
