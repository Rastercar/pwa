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
    return { isDrawerOpen };
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
