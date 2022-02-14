<script setup lang="ts">
const menuList = [
  {
    icon: 'fas fa-map-marker-alt',
    label: 'Mapa',
    route: '/tracked/mapa',
  },
  {
    icon: 'fas fa-calendar-alt',
    label: 'Histórico de posições',
  },
  {
    icon: 'fas fa-trash-alt',
    label: 'Trash',
  },
  {
    icon: 'fas fa-exclamation-circle',
    label: 'Eventos',
    separator: true,
  },
  {
    icon: 'fas fa-cog',
    label: 'Configurações',
  },
  {
    icon: 'fas fa-mail-bulk',
    label: 'Feedback',
  },
  {
    icon: 'fas fa-question-circle',
    label: 'Ajuda',
  },
]
</script>

<template>
  <q-scroll-area style="height: calc(100% - 100px); margin-top: 100px">
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
