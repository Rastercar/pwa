<script setup lang="ts">
const menuList = [
  {
    icon: 'fa fa-map-marker-alt',
    label: 'Mapa',
    route: '/cliente/mapa',
  },
  {
    icon: 'fa fa-calendar-alt',
    label: 'Histórico de posições',
  },
  {
    icon: 'fa fa-trash-alt',
    label: 'Trash',
  },
  {
    icon: 'fa fa-exclamation-circle',
    label: 'Eventos',
    separator: true,
  },
  {
    icon: 'fa fa-cog',
    label: 'Configurações',
  },
  {
    icon: 'fa fa-mail-bulk',
    label: 'Feedback',
  },
  {
    icon: 'fa fa-question-circle',
    label: 'Ajuda',
  },
]
</script>

<template>
  <q-scroll-area style="height: calc(100% - 80px); margin-top: 80px">
    <q-list>
      <q-separator />

      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          v-ripple
          clickable
          :to="menuItem.route"
          :disable="!menuItem.route"
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" size="1.4rem" />
          </q-item-section>
          <q-item-section v-text="menuItem.label" />
        </q-item>

        <q-separator v-if="menuItem.separator" :key="'sep' + index" />
      </template>
    </q-list>
  </q-scroll-area>
</template>
