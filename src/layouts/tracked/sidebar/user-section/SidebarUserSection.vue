<script setup lang="ts">
import { CurrentUserDocument } from 'src/graphql/generated/graphql-operations'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
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

const userMenuVisible = ref(false)
</script>

<template>
  <SidebarUserSectionSkeleton v-if="loading" />

  <q-item
    v-else-if="result"
    v-ripple
    clickable
    class="absolute-top items-center"
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

    <q-icon
      v-show="!props.mini"
      :class="[{ down: !userMenuVisible }, 'q-align-center', 'rotate']"
      name="fa fa-angle-down"
      size="20px"
    />

    <SidebarUserSectionMenu v-model="userMenuVisible" />
  </q-item>
</template>

<style>
.rotate {
  -moz-transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.rotate.down {
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
