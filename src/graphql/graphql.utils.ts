import { isApiErrorResponse } from 'src/apollo/links/error-handler.link'
import { ERROR_CODES } from 'src/constants/rastercar-api-error-codes'
import { GraphQLErrors } from '@apollo/client/errors'

/**
 * Checks if any extensions of all graphql errors has a
 * response containing the errorCode
 */
export const checkGraphqlErrorsContainErrorCode = (
  errors: GraphQLErrors,
  errorCode: keyof typeof ERROR_CODES
): boolean => {
  return errors.some((gqlError) => {
    const errorResponse = gqlError?.extensions?.response

    if (!isApiErrorResponse(errorResponse)) return false
    return errorResponse.message === errorCode
  })
}

/**
 * Checks a list of graphql errors and for all of them wich
 * are unique violations returns a list of the violated columns
 */
export const getUniqueViolationsFromGraphqlErrors = (errors: GraphQLErrors) => {
  const notUniqueKey = 'NOT_UNIQUE__' as const

  const getUniqueViolatedKeyFromErrorMsg = (msg: string): string | null => {
    const idx = msg.indexOf(notUniqueKey)
    if (idx === -1) return null

    const startIdx = idx + notUniqueKey.length
    const endIdx = msg.indexOf(']', startIdx)

    if (endIdx === -1) return null

    return msg.substring(startIdx, endIdx)
  }

  const violations = errors
    .map((gqlError) => {
      const errorResponse = gqlError?.extensions?.response

      if (!isApiErrorResponse(errorResponse)) return null

      return typeof errorResponse.message === 'string'
        ? getUniqueViolatedKeyFromErrorMsg(errorResponse.message)
        : errorResponse.message.map(getUniqueViolatedKeyFromErrorMsg)
    })
    .filter((v) => v !== null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ([] as string[]).concat(...(violations as any))
}
