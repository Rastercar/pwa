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
