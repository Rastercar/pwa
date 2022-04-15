<script setup lang="ts">
import MasterSidebarRoutes from './MasterSidebarRoutes.vue'
import SidebarUserSection from 'src/components/sidebar/sidebar-user-section/SidebarUserSection.vue'
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
