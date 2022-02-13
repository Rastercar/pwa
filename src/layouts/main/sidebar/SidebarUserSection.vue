<script setup lang="ts">
import { CurrentUserQueryDocument } from 'src/graphql/generated/graphql-operations'
import { useQuery } from '@vue/apollo-composable'

const { result, loading } = useQuery(CurrentUserQueryDocument)
</script>

<template>
  <div class="bg-grey">
    <div v-if="loading">
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <q-item
      v-else-if="result"
      v-ripple
      clickable
      class="absolute-top"
      style="height: 100px"
    >
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img :src="require('../../../assets/user.png')" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-bold">{{
          result.me.username
        }}</q-item-label>
        <q-item-label caption>
          {{
            result.me.__typename === 'UserModel'
              ? result.me.organization.name
              : ''
          }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>
