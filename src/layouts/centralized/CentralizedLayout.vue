<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CentralizedLayout',
});
</script>

<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
