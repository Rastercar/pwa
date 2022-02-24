<script setup lang="ts">
import { CurrentUserQuery } from 'src/graphql/generated/graphql-operations'
import { PropType, ref } from 'vue'

const showConfirmationDialog = ref(false)
const confirmation = ref('')

defineProps({
  user: {
    type: Object as PropType<CurrentUserQuery['me']>,
    required: true,
  },
})
</script>

<template>
  <div class="text-h6">Integrações da conta com terceiros:</div>

  <div
    v-if="user.__typename === 'UserModel' && user.googleProfileId"
    class="text-grey-7 q-mt-sm"
  >
    <q-btn class="q-mr-sm" icon="fab fa-google" round flat>
      <q-badge floating style="background-color: transparent">
        <q-icon name="fa fa-check" color="green" />
      </q-badge>
    </q-btn>

    <span class="text-h6">associado com o google</span>
    <q-btn
      icon="fa fa-trash"
      class="q-ml-md"
      round
      size="sm"
      color="red"
      @click="showConfirmationDialog = true"
    >
      <q-tooltip
        :offset="[225, 0]"
        style="font-size: 15px"
        anchor="center right"
        self="center middle"
      >
        Dessasociar sua conta do rastercar com sua conta do google
      </q-tooltip>
    </q-btn>

    <q-dialog v-model="showConfirmationDialog" persistent>
      <q-card style="width: 450px">
        <q-card-section>
          <div class="text-h6">
            <q-icon
              size="25px"
              class="q-mr-sm"
              color="red"
              name="fa fa-exclamation-circle"
            />
            Alerta
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none text-body1">
          Ao dessasociar sua conta da rastercar com sua conta do google não sera
          mais possível realizar login com a mesma, certifique-se que se lembra
          de seu <b>email</b> e <b>senha</b>.
        </q-card-section>

        <q-card-section class="q-pt-none text-subtitle1">
          Digite sua <b>senha</b> para continuar
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="confirmation"
            dense
            autofocus
            @keyup.enter="showConfirmationDialog = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            v-close-popup
            color="green"
            label="Cancelar"
            @click="confirmation = ''"
          />
          <q-btn
            color="red"
            :disable="confirmation.length < 4"
            label="Remover"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
