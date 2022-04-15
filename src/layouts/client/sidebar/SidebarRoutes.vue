<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { CurrentUserDocument } from 'src/graphql/generated/graphql-operations'
import { computed } from 'vue'

defineProps({
  /**
   * If the sidebar containing the user section is in the 'mini' state
   */
  mini: {
    type: Boolean,
    default: false,
  },
})

const { result } = useQuery(CurrentUserDocument, undefined, {
  fetchPolicy: 'cache-only',
})

const routes = computed(() => {
  const menuList = [
    {
      icon: 'fa fa-map-marker-alt',
      label: 'Mapa',
      route: { name: 'cliente-mapa' },
      separator: false,
    },
    {
      icon: 'fa fa-car',
      label: 'Meus veículos',
      route: { name: 'cliente-veiculos' },
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

  if (result.value?.me.__typename === 'MasterUserModel') {
    menuList.unshift({
      icon: 'fa fa-globe-americas',
      label: 'Painel Geral',
      route: { name: 'rastreadora' },
      separator: true,
    })
  }

  return menuList
})
</script>

<template>
  <q-scroll-area style="height: calc(100% - 80px); margin-top: 80px">
    <q-list>
      <q-separator />

      <template v-for="(menuItem, index) in routes" :key="index">
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
