<script setup lang="ts">
import SidebarUserSection from './SidebarUserSection.vue'
import { useAuth } from 'src/state/auth.state'

const { isLoggedIn } = useAuth()
</script>

<template>
  <div>
    <h2>CONTENT</h2>
    IS LOGGED IN: {{ isLoggedIn }}
    <SidebarUserSection v-if="isLoggedIn" />
  </div>
</template>
