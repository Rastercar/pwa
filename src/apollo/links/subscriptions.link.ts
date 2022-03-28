import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { useAuth } from 'src/state/auth.state'

const url = process.env.GRAPHQL_WS_ENDPOINT
if (!url) throw new Error('[GRAPHQL_WS_ENDPOINT] not defined for current env')

const { state } = useAuth()

export const wsLink = new GraphQLWsLink(
  createClient({
    url,
    connectionParams: () => ({ authToken: state.apiToken }),
  })
)
