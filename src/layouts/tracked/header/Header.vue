<script lang="ts" setup>
defineEmits(['toggle:sidebar'])
</script>

<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="fa fa-bars"
        @click="$emit('toggle:sidebar')"
      />

      <q-toolbar-title class="flex">
        <q-space />

        Rastercar

        <q-space />

        <q-btn
          dense
          flat
          round
          icon="fa fa-arrow-left"
          @click="$router.go(-1)"
        />
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
