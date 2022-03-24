import { WebSocketLink } from '@apollo/client/link/ws'

const uri = process.env.GRAPHQL_WS_ENDPOINT
if (!uri) throw new Error('[GRAPHQL_WS_ENDPOINT] not defined for current env')

export const wsLink = new WebSocketLink({ uri })
