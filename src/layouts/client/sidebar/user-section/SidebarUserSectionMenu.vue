<script setup lang="ts">
import { useAuth } from 'src/state/auth.state'
import { useRouter } from 'vue-router'

const router = useRouter()

const { LOGOUT } = useAuth()

const logout = () => {
  LOGOUT()
  router.push({ name: 'login' }).catch(() => null)
}
</script>

<template>
  <q-menu :offset="[-50, -10]">
    <q-list>
      <q-item v-close-popup to="/cliente/meu-perfil" clickable>
        <q-item-section avatar>
          <q-icon name="fa fa-user" style="font-size: 1.2em" />
        </q-item-section>

        <q-item-section>Meu Perfil</q-item-section>
      </q-item>

      <q-separator />

      <q-item v-close-popup clickable @click="logout">
        <q-item-section>
          <q-icon name="fa fa-door-open" />
        </q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
