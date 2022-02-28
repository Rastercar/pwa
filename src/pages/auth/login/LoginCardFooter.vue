<template>
  <q-card-section class="text-center q-pa-none q-mt-md">
    <p class="text-grey-6 q-mb-sm">
      Não é registrado?
      <a
        class="text-blue-6"
        :style="{ cursor: 'pointer' }"
        @click="$router.push('/register')"
      >
        crie uma conta
      </a>
    </p>

    <div class="q-mb-sm">
      <router-link
        to="/esqueceu-senha"
        class="text-blue"
        style="text-decoration: none"
      >
        Esqueceu sua senha ?
      </router-link>
    </div>
  </q-card-section>
</template>
