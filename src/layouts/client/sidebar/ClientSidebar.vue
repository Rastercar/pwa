<script setup lang="ts">
import ClientSidebarRoutes from './ClientSidebarRoutes.vue'
import { ref } from 'vue'
import SidebarUserSection from 'src/components/sidebar/sidebar-user-section/SidebarUserSection.vue'

const mini = ref(false)
</script>

<template>
  <q-drawer :width="250" :mini="mini" :mini-width="80" elevated>
    <SidebarUserSection :mini="mini" />

    <ClientSidebarRoutes :mini="mini" />

    <q-item
      v-ripple
      clickable
      class="absolute-bottom q-pa-none desktop-only"
      @click="mini = !mini"
    >
      <q-item-section
        avatar
        class="q-pr-none content-center"
        style="width: 80px"
      >
        <q-icon
          :name="mini ? 'fa fa-angle-right' : 'fa fa-angle-left'"
          size="1.4rem"
        />
      </q-item-section>
    </q-item>
  </q-drawer>
</template>
