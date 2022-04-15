import { GraphQLErrors } from '@apollo/client/errors'
import { onError } from '@apollo/client/link/error'

/**
 * The default interface for the rastecar API errors
 */
interface ApiErrorResponse {
  error: string
  message: string | string[]
  statusCode: number
}

export const isApiErrorResponse = (
  response: unknown
): response is ApiErrorResponse => {
  const cast = response as ApiErrorResponse
  return !!(cast && cast.statusCode && cast.message)
}

const logErrorMessage = (msg: string | unknown[] | Record<string, unknown>) => {
  if (typeof msg === 'string') {
    /* eslint-disable no-console */
    console.info('[API ERROR]', msg)
    return
  }

  if (Array.isArray(msg)) {
    /* eslint-disable no-console */
    msg.forEach((item, i) => console.info(`[API ERROR] (${i})`, item))
    return
  }
}

const getApiErrorsResponsesFromGraphqlErrors = (
  graphQLErrors: GraphQLErrors = []
): ApiErrorResponse[] => {
  return graphQLErrors
    .map((error) => error?.extensions?.response)
    .filter((response) => isApiErrorResponse(response)) as ApiErrorResponse[]
}

export const errorHandlerLink = onError(({ graphQLErrors, networkError }) => {
  /* eslint-disable no-console */
  if (networkError) console.info(`[NETWORK ERROR]: ${networkError.message}`)

  const notInProduction = process.env.NODE_ENV !== 'production'

  if (graphQLErrors && notInProduction) {
    const responses = getApiErrorsResponsesFromGraphqlErrors(graphQLErrors)
    responses.forEach((response) => logErrorMessage(response.message))
  }
})
