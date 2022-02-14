<script setup lang="ts">
import SidebarUserSection from './SidebarUserSection.vue'
import SidebarRoutes from './SidebarRoutes.vue'
</script>

<template>
  <q-drawer model-value behavior="desktop" side="left" bordered>
    <SidebarUserSection />

    <SidebarRoutes />
  </q-drawer>
</template>
