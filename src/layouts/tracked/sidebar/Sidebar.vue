<script setup lang="ts">
import SidebarUserSection from './user-section/SidebarUserSection.vue'
import SidebarRoutes from './SidebarRoutes.vue'
import { ref } from 'vue'

const mini = ref(false)
</script>

<template>
  <q-drawer :width="250" :mini="mini" :mini-width="80" elevated model-value>
    <SidebarUserSection :mini="mini" />

    <SidebarRoutes :mini="mini" />

    <q-item
      v-ripple
      clickable
      class="absolute-bottom q-pa-none"
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
