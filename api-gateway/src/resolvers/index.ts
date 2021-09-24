import { Mutation, Query, Resolver } from 'type-graphql'
import { AuthResolver } from './auth'

@Resolver()
class RootResolver {
  @Query(() => Boolean, { nullable: true })
  async rootQuery(): Promise<void> {}

  @Mutation(() => Boolean, { nullable: true })
  async rootMutation(): Promise<void> {}
}

export { RootResolver, AuthResolver }
