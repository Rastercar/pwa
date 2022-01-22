<script setup lang="ts">
import Sidebar from './sidebar/Sidebar.vue'
import { ref } from 'vue'

const isDrawerOpen = ref(true)
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
