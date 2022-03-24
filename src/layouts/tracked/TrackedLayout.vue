<script setup lang="ts">
import { useLayout } from 'src/state/layout.state'
import TrackedHeader from './header/Header.vue'
import Sidebar from './sidebar/Sidebar.vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const { state, TOGGLE_SIDEBAR, SET_SIDEBAR } = useLayout()
const { platform } = useQuasar()
const { meta } = useRoute()

const visibilityDict = {
  never: false,
  always: true,
  'mobile-only': !!platform.is.mobile,
  'desktop-only': !!platform.is.desktop,
}

const headerVisible = visibilityDict[meta.layout?.showHeader ?? 'mobile-only']

if (platform.is.desktop) SET_SIDEBAR(true)
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <!--
      use v-if here, v-show would cause the rendered but 
      invisible header to impact other layout elements height
    -->
    <TrackedHeader v-if="headerVisible" @toggle:sidebar="TOGGLE_SIDEBAR" />

    <Sidebar
      :model-value="state.sidebarOpen"
      @update:model-value="SET_SIDEBAR"
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
