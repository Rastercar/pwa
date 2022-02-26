<script setup lang="ts">
import { useAuth } from 'src/state/auth.state'
import { onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  openAsPopup: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['popup:closed'])

const { state: authState } = useAuth()

const redirectingOrOpeningPopup = ref(false)

let timer: null | NodeJS.Timeout = null

let authEndpointUrl = `${process.env.API_BASE_URL}/auth/google/authenticate`

const openOauthPopup = () => {
  // see: https://javascript.info/popup-windows
  // prettier-ignore
  const popupParams = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100'

  const newWindow = window.open(authEndpointUrl, 'oauthPopoup', popupParams)

  if (!newWindow) throw new Error('failed to open oauth popup')

  newWindow.focus()

  const checkPopupWasClosed = () => {
    if (!newWindow.closed) return

    emit('popup:closed')

    if (timer) {
      clearInterval(timer)
    }
  }

  // unfortunately due to the multiple redirects in the opened windown
  // we dont "own" it anymore and cannot force it to close with windown.close()
  // nor listen to its events, so all we can do is check if the user closed
  // the popup with pooling
  timer = setInterval(checkPopupWasClosed, 1000)
}

/**
 * Starts the google oauth2 authentification process by opening a new window
 * or redirecting to the rastercar app google authentification endpoint
 */
const openGoogleAccountAuthWindow = () => {
  if (redirectingOrOpeningPopup.value) return

  redirectingOrOpeningPopup.value = true

  // If we are already logged in then we are not logging in using google,
  // rather we are linking the current user account with a google account
  // therefore we must inform the rastercar user doing so with his apiToken
  if (authState.apiToken) {
    authEndpointUrl += `?forExistingUser=${authState.apiToken}`
  }

  if (props.openAsPopup) {
    openOauthPopup()
  } else {
    window.location.href = authEndpointUrl
  }

  setTimeout(() => (redirectingOrOpeningPopup.value = false), 500)
}

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <q-btn
    v-bind="({ ...$props, ...$attrs } as any)"
    :loading="redirectingOrOpeningPopup"
    @click="openGoogleAccountAuthWindow"
  >
    <slot></slot>
  </q-btn>
</template>
