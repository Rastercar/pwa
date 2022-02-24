<script setup lang="ts">
import { CurrentUserDocument } from 'src/graphql/generated/graphql-operations'
import TrackedProfileForm from './form/TrackedProfileForm.vue'
import TrackedProfileHeader from './TrackedProfileHeader.vue'
import { useQuery } from '@vue/apollo-composable'
import TrackedProfile from './card/TrackedProfile.vue'
import { ref } from 'vue'

const { result } = useQuery(CurrentUserDocument)

const isEditing = ref(false)
</script>

<template>
  <q-page padding class="row justify-center">
    <div class="column">
      <div class="row">
        <q-card
          v-if="result && result.me && result.me.__typename === 'UserModel'"
          style="width: 700px; margin-top: 80px"
        >
          <TrackedProfileHeader v-model:isEditing="isEditing" />

          <TrackedProfileForm v-if="isEditing" :user="result.me" />
          <TrackedProfile v-else :user="result.me" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>
