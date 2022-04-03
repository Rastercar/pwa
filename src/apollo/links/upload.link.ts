import { createUploadLink } from 'apollo-upload-client'

const uri = process.env.GRAPHQL_ENDPOINT
if (!uri) throw new Error('[GRAPHQL_ENDPOINT] not defined for current env')

export const uploadLink = createUploadLink({ uri })
