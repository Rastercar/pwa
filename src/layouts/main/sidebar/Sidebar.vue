<script setup lang="ts">
import SidebarUserSection from './SidebarUserSection.vue'
// import { useAuth } from 'src/state/auth.state'

// const { isLoggedIn } = useAuth()

const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true,
  },
  {
    icon: 'send',
    label: 'Outbox',
  },
  {
    icon: 'delete',
    label: 'Trash',
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true,
  },
  {
    icon: 'settings',
    label: 'Settings',
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
  },
]
</script>

<template>
  <!-- <SidebarUserSection v-if="isLoggedIn" /> -->
  <q-drawer model-value behavior="desktop" side="left" bordered>
    <q-scroll-area
      style="
        height: calc(100% - 100px);
        margin-top: 100px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item v-ripple clickable :active="menuItem.label === 'Outbox'">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" :key="'sep' + index" />
        </template>
      </q-list>
    </q-scroll-area>

    <SidebarUserSection />
  </q-drawer>
</template>
