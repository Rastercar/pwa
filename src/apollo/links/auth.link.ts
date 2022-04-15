import { setContext } from '@apollo/client/link/context'
import { useAuth } from 'src/state/auth.state'
import { Context } from '@apollo/client'

/**
 * Tries to set the request as authenticated whenever the user is logged in
 */
export const authLink = setContext((_, previousContext: Context) => {
  const { headers: previousHeaders } = previousContext as {
    headers: Record<string, unknown>
  }

  const { state: authState } = useAuth()
  const headers = { ...previousHeaders }

  if (authState.apiToken) {
    headers.Authorization = `Bearer ${authState.apiToken}`
  }

  if (authState.organizationId) {
    headers.organizationId = authState.organizationId
  }

  return { headers }
})
