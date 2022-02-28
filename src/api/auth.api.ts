import { api } from './api.utils'

interface RequestForEmailSendingResponse {
  meta: {
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

interface ResetPasswordDTO {
  /**
   * The new password
   */
  password: string
  /**
   * A token to validate the password reset, this token is obtained
   * by requesting reset password email to the user email address
   */
  passwordResetToken: string
}

/**
 * Requests for the api to send a email address confirmation
 * email to the currently logged user email address
 */
export async function apiRequestEmailAddressConfirmationEmail() {
  const { data } = await api().get<RequestForEmailSendingResponse>(
    '/auth/send-email-address-confirmation-email'
  )
  return data.meta
}

/**
 * Confirms the email address of the currently logged in user
 *
 * @param token A JWT sent by the api to validate the email address,
 * this token should contain the email itself as the subject
 */
export async function apiConfirmEmailAddress(token: string) {
  const { data: confirmationMessage } = await api({
    headers: { Authorization: `Bearer ${token}` },
  }).get<string>('/auth/confirm-email-address')

  return confirmationMessage
}

/**
 * Resets the password of a user with a password reset token
 */
export async function apiResetPasswordByToken(dto: ResetPasswordDTO) {
  const { data } = await api().post<string>('/auth/reset-password', dto)
  return data
}

/**
 * Requests for the api to send a forgot password email to the provided
 * email address, failing with 404 if a user is not found with said address
 */
export async function apiRequestForgotPasswordEmail(emailAddress: string) {
  const { data } = await api().post<RequestForEmailSendingResponse>(
    '/auth/send-forgot-password-email',
    { email: emailAddress }
  )
  return data.meta
}

/**
 * Verifies the password being sent is the same as the password for the
 * logged in user, this is usefull to act as a extra security measure
 *
 * @param password the logged in user password
 *
 * @returns boolean indicating the supplied password was valid
 */
export async function apiCheckCurrentUserPassword(password: string) {
  return api()
    .post<boolean>('/auth/check-password', { password })
    .then(({ data }) => data)
}
