<script setup lang="ts">
import SidebarUserSection from './user-section/SidebarUserSection.vue'
import MasterSidebarRoutes from './MasterSidebarRoutes.vue'
</script>

<template>
  <!-- TODO: REMOVE BG COLOR -->
  <q-drawer
    model-value
    :width="250"
    elevated
    style="background-color: antiquewhite"
  >
    <SidebarUserSection />

    <MasterSidebarRoutes />
  </q-drawer>
</template>
