<script setup lang="ts">
import { CurrentUserDocument } from 'src/graphql/generated/graphql-operations'
import TrackedProfileForm from './index/form/TrackedProfileForm.vue'
import TrackedProfileHeader from './index/TrackedProfileHeader.vue'
import TrackedProfile from './index/card/TrackedProfile.vue'
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'

const { result } = useQuery(CurrentUserDocument)

const isEditing = ref(false)
</script>

<template>
  <q-page padding class="row justify-center" style="background-color: #fafafa">
    <div class="column">
      <div class="row">
        <q-card
          v-if="result && result.me && result.me.__typename === 'UserModel'"
          style="width: 600px; margin-top: 80px"
          class="q-pa-sm"
        >
          <TrackedProfileHeader v-model:isEditing="isEditing" />

          <TrackedProfileForm v-if="isEditing" :user="result.me" />
          <TrackedProfile v-else :user="result.me" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>
