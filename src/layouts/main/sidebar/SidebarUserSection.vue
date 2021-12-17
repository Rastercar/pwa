<script lang="ts">
import { CurrentUserQueryDocument } from 'src/graphql/generated/graphql-operations';
import { useQuery } from '@vue/apollo-composable';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SidebarUserSection',

  setup() {
    const { result: user, loading } = useQuery(CurrentUserQueryDocument);
    return { user, loading };
  },
});
</script>

<template>
  <div>
    <div v-if="loading">loading</div>
    <div v-else-if="user">
      <div>SIDEBAR USER</div>
      <span>{{ user }}</span>
    </div>
  </div>
</template>
