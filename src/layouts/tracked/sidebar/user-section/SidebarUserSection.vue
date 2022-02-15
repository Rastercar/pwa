<script setup lang="ts">
import { CurrentUserDocument } from 'src/graphql/generated/graphql-operations'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import SidebarUserSectionSkeleton from './SidebarUserSectionSkeleton.vue'
import SidebarUserSectionMenu from './SidebarUserSectionMenu.vue'

const { result, loading } = useQuery(CurrentUserDocument)

const props = defineProps({
  /**
   * If the sidebar containing the user section is in the 'mini' state
   */
  mini: {
    type: Boolean,
    default: false,
  },
})

const orgName = computed(() =>
  result.value?.me.__typename === 'UserModel'
    ? result.value.me.organization.name
    : ''
)
</script>

<template>
  <SidebarUserSectionSkeleton v-if="loading" />

  <q-item
    v-else-if="result"
    v-ripple
    clickable
    class="absolute-top"
    style="height: 80px"
  >
    <q-item-section side>
      <q-avatar rounded size="48px">
        <img :src="require('../../../../assets/user.png')" />
      </q-avatar>
    </q-item-section>

    <q-item-section v-show="!props.mini">
      <q-item-label class="text-weight-bold">
        {{ result.me.username }}
      </q-item-label>

      <q-item-label caption>
        {{ orgName }}
      </q-item-label>
    </q-item-section>

    <SidebarUserSectionMenu />
  </q-item>
</template>
