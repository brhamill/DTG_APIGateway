import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import path from 'path'

import { app } from './app'
import { RootResolver, AuthResolver } from './resolvers'
import { AuthAPI } from './datasources'

const start = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RootResolver, AuthResolver],
      dateScalarMode: 'isoDate',
      emitSchemaFile: path.join(__dirname, '/documents/graphql.gql'),
    }),
    dataSources: () => {
      return {
        authAPI: new AuthAPI(),
      }
    },
    context: ({ req, res }) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(3000, () => {
    console.log('express server started')
  })
}

start()
