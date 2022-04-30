/**
 * Converts a masked phone number to the E164 format (wont validate if the number is complete)
 *
 * @see https://en.wikipedia.org/wiki/E.164
 */
export const maskedPhoneNumberToE164 = (phoneNumber: string) => {
  return `+${phoneNumber.replace(/\D/g, '')}`
}
