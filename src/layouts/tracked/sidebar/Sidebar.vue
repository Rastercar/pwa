<script setup lang="ts">
import SidebarUserSection from './user-section/SidebarUserSection.vue'
import SidebarRoutes from './SidebarRoutes.vue'
import { ref } from 'vue'

const mini = ref(false)
</script>

<template>
  <q-drawer
    model-value
    :mini="mini"
    :mini-width="80"
    :width="250"
    behavior="desktop"
    side="left"
    bordered
  >
    <SidebarUserSection :mini="mini" />

    <SidebarRoutes />

    <q-item v-ripple clickable class="absolute-bottom" @click="mini = !mini">
      <q-item-section avatar>
        <q-icon
          :name="mini ? 'fa fa-angle-right' : 'fa fa-angle-left'"
          size="1.4rem"
        />
      </q-item-section>
    </q-item>
  </q-drawer>
</template>
