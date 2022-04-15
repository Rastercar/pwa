<script setup lang="ts">
import AccessClientPanelBtn from './access-client-panel-btn/AccessClientPanelBtn.vue'
const menuList = [
  {
    icon: 'fa fa-home',
    label: 'Home',
    route: { name: 'master-home' },
    separator: false,
  },
]

if (process.env.NODE_ENV === 'development') {
  menuList.unshift({
    icon: 'fa fa-microchip',
    label: 'dev',
    route: { name: 'test' },
    separator: true,
  })
}
</script>

<template>
  <q-scroll-area style="height: calc(100% - 80px); margin-top: 80px">
    <q-separator />

    <AccessClientPanelBtn />

    <q-separator />

    <q-list>
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          v-ripple
          class="q-pa-none"
          clickable
          :to="menuItem.route"
          :disable="!menuItem.route"
        >
          <q-item-section
            avatar
            style="width: 80px"
            class="q-pr-none content-center"
          >
            <q-icon :name="menuItem.icon" size="22px" />
          </q-item-section>

          <q-item-section v-text="menuItem.label" />
        </q-item>

        <q-separator v-if="menuItem.separator" />
      </template>
    </q-list>
  </q-scroll-area>
</template>
