import { api } from './api.utils'

interface EmailAddressConfirmationRes {
  confirmation: {
    /**
     * The link to the PWA email confirmationPage
     */
    link: string
    /**
     * The short expiration token to be used to confirm the email
     */
    token: string
  }
}

/**
 * Requests for the api to send a email address confirmation
 * email to the currently logged user email address
 */
export async function apiRequestEmailAddressConfirmationEmail() {
  const { data } = await api().get<EmailAddressConfirmationRes>(
    '/auth/send-email-address-confirmation-email'
  )

  return data.confirmation
}

/**
 * Confirms the email address of the currently logged in user
 *
 * @param token A JWT sent by the api to validate the email address,
 * this token should contain the email itself as the subject
 */
export async function apiConfirmEmailAddress(token: string): Promise<string> {
  const { data: confirmationMessage } = await api({
    headers: { Authorization: `Bearer ${token}` },
  }).get<string>('/auth/confirm-email-address')

  return confirmationMessage
}
