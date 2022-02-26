<script setup lang="ts">
import PasswordConfirmationDialog from 'src/components/dialog/PasswordConfirmationDialog.vue'
import GoogleButton from 'src/pages/auth/login/GoogleButton.vue'
import { useApolloClient, useMutation } from '@vue/apollo-composable'
import { PropType, ref } from 'vue'
import {
  UpdateMyProfileDocument,
  CurrentUserQuery,
  CurrentUserSimpleDocument,
} from 'src/graphql/generated/graphql-operations'

const showConfirmationDialog = ref(false)

defineProps({
  user: {
    type: Object as PropType<CurrentUserQuery['me']>,
    required: true,
  },
})

// prettier-ignore
const { mutate: removeGoogleIntegration, loading: isRemovingGoogleProfile } = useMutation(UpdateMyProfileDocument, {
  variables: { profileData: { removeGoogleProfileLink: true } },
})

const { client } = useApolloClient()

const checkUserGoogleProfileWasUpdated = () => {
  console.log('popclosed')
  client
    .query({ query: CurrentUserSimpleDocument, fetchPolicy: 'network-only' })
    .catch(() => null)
}
</script>

<template>
  <div class="text-h6">Integrações da conta com terceiros:</div>

  <div v-if="user.__typename === 'UserModel'" class="text-grey-7 q-mt-sm">
    <q-btn class="q-mr-sm" icon="fab fa-google" round flat>
      <q-badge floating style="background-color: transparent">
        <q-icon
          :name="user.googleProfileId ? 'fa fa-check' : 'fa fa-times'"
          :color="user.googleProfileId ? 'green' : 'red-4'"
        />
      </q-badge>
    </q-btn>

    <span v-if="user.googleProfileId" class="text-h6">
      associado com o google
    </span>
    <span v-else class="text-h6">não associado com o google</span>

    <template v-if="user.googleProfileId">
      <q-btn
        :loading="isRemovingGoogleProfile"
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

      <PasswordConfirmationDialog
        v-model="showConfirmationDialog"
        persistent
        @confirmation:success="removeGoogleIntegration"
      >
        <template #message>
          Ao dessasociar sua conta da rastercar com sua conta do google não sera
          mais possível realizar login com a mesma, certifique-se que se lembra
          de seu <b>email</b> e <b>senha</b>.
        </template>
      </PasswordConfirmationDialog>
    </template>

    <GoogleButton
      v-else
      icon="fa fa-plus"
      class="q-ml-md"
      round
      size="sm"
      color="green"
      open-as-popup
      @popup:closed="
        () => {
          showConfirmationDialog = false
          checkUserGoogleProfileWasUpdated()
        }
      "
    >
      <q-tooltip
        style="font-size: 15px"
        anchor="top middle"
        self="center middle"
      >
        Associar sua conta do rastercar com sua conta do google
      </q-tooltip>
    </GoogleButton>
  </div>
</template>
