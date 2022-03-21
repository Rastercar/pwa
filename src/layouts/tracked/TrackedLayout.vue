<script setup lang="ts">
import { useLayout } from 'src/state/layout.state'
import TrackedHeader from './header/Header.vue'
import Sidebar from './sidebar/Sidebar.vue'

const { state, TOGGLE_SIDEBAR, SET_SIDEBAR } = useLayout()
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <TrackedHeader
      v-if="$route.meta.layout?.hideHeader !== true"
      @toggle:sidebar="TOGGLE_SIDEBAR"
    />

    <Sidebar
      :model-value="state.sidebarOpen"
      @update:model-value="SET_SIDEBAR"
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
