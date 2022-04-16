<script setup lang="ts">
defineProps({
  errorCode: {
    type: String,
    default: '404',
  },
  errorMessage: {
    type: String,
    default: 'Entidade não encontrada',
  },
})
</script>

<template>
  <div class="text-blue text-center flex flex-center">
    <div>
      <div style="font-size: 25vh">{{ errorCode }}</div>
      <div class="text-h3" style="opacity: 0.7">{{ errorMessage }}</div>
    </div>
  </div>
</template>
