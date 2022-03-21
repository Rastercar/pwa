<template>
  <!-- This cant be a QPage for some reason -->
  <div class="fullscreen bg-blue text-white text-center flex flex-center">
    <div>
      <div style="font-size: 25vh">404</div>

      <div class="text-h3" style="opacity: 0.5">Página não encontrada</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/login"
        label="Voltar"
        no-caps
      />
    </div>
  </div>
</template>
