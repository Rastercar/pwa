<template>
  <q-card-section>
    <div class="text-h5 q-mb-lg">
      <q-icon
        name="fa fa-check-circle"
        color="green"
        size="md"
        class="q-mr-sm"
      />
      Senha redefinida com sucesso!
    </div>

    <q-btn
      style="max-width: 400px"
      class="full-width"
      color="green-5"
      label="Voltar"
      @click="$router.push('/')"
    />
  </q-card-section>
</template>
