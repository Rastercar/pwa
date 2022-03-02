<script setup lang="ts">
import Sidebar from './sidebar/Sidebar.vue'
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <Sidebar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
