<script lang="ts">
import SidebarContent from './SidebarContent.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    SidebarContent,
  },

  setup() {
    const isDrawerOpen = ref(true);

    const toggleDrawer = () => {
      isDrawerOpen.value = !isDrawerOpen.value;
    };

    return { isDrawerOpen, toggleDrawer };
  },
});
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      v-model="isDrawerOpen"
      behavior="desktop"
      side="left"
      overlay
      bordered
    >
      <SidebarContent />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
