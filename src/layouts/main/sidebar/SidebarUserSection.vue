<script setup lang="ts">
import { CurrentUserQueryDocument } from 'src/graphql/generated/graphql-operations'
import { useQuery } from '@vue/apollo-composable'

const { result: user, loading } = useQuery(CurrentUserQueryDocument)
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
