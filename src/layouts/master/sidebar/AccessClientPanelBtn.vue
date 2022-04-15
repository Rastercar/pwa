<script setup lang="ts">
import AccessClientPanelDialog from 'src/components/dialog/AccessClientPanelDialog.vue'
import { ref } from 'vue'

const showSelectOrgDialog = ref(false)
</script>

<template>
  <q-item
    v-ripple
    class="q-pa-none"
    clickable
    @click="showSelectOrgDialog = !showSelectOrgDialog"
  >
    <q-item-section avatar style="width: 80px" class="q-pr-none content-center">
      <q-icon name="fa fa-users" size="22px" />
    </q-item-section>

    <q-item-section>Painel do cliente</q-item-section>

    <AccessClientPanelDialog v-model="showSelectOrgDialog" />
  </q-item>
</template>
