<script setup lang="ts">
defineProps({
  /**
   * If the sidebar containing the user section is in the 'mini' state
   */
  mini: {
    type: Boolean,
    default: false,
  },
})

const menuList = [
  {
    icon: 'fa fa-map-marker-alt',
    label: 'Mapa',
    route: { name: 'mapa' },
    separator: false,
  },
  {
    icon: 'fa fa-car',
    label: 'Meus veículos',
    route: { name: 'veiculos' },
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
    <q-list>
      <q-separator />

      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          v-ripple
          class="q-pa-none"
          clickable
          :to="menuItem.route"
          :disable="!menuItem.route"
        >
          <!--
            Size must be the same as mini-with of the sidebard otherwise 
            we have a discreancy on the icon position when toggling mini
          -->
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
