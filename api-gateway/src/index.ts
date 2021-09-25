import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import path from 'path'
import { BaseRedisCache } from 'apollo-server-cache-redis'
import Redis from 'ioredis'

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
    cache: new BaseRedisCache({
      client: new Redis({
        host: process.env.REDIS_URI,
      }),
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
