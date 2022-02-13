<script setup lang="ts">
import Sidebar from './sidebar/Sidebar.vue'
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <Sidebar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
