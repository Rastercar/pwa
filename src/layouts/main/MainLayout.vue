<script lang="ts">
import Sidebar from './sidebar/Sidebar.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    Sidebar,
  },

  setup() {
    const isDrawerOpen = ref(true);

    // TODO: USE ME
    const toggleDrawer = () => {
      isDrawerOpen.value = !isDrawerOpen.value;
    };

    return { isDrawerOpen, toggleDrawer };
  },
});
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer v-model="isDrawerOpen" behavior="desktop" side="left" bordered>
      <Sidebar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
