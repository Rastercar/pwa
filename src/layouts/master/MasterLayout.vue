<script setup lang="ts">
import MasterSidebar from './sidebar/MasterSidebar.vue'

/**
 | The master layout, is the layout for pages meant 
 | by master users only, master users are users that
 | manage the plataform
 |
 | For the moment this layout does not need to be
 | responsive as it is not meant to be used by the final
 | customer, only plataform managers that surely wont
 | manage it on a mobile device...
 */
</script>

<template>
  <q-layout view="lhh LpR lFf">
    <MasterSidebar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
