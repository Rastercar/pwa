/* eslint-env node */

// See https://www.apollographql.com/docs/devtools/apollo-config/
module.exports = {
  client: {
    service: {
      name: 'rastercar-graphql',
      url: 'http://localhost:3000/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.gql'],
  },
}
