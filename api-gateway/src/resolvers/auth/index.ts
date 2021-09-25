import {
  Ctx,
  Mutation,
  Arg,
  Field,
  InputType,
  Resolver,
  // UseMiddleware,
} from 'type-graphql'

// import { getAdmin } from '../../middlewares'
import { DTGContext } from '../../contexts'

@InputType()
class SignupInput {
  @Field()
  email: string
}

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  async signup(
    @Arg('input') input: SignupInput,
    @Ctx() context: DTGContext
  ): Promise<Boolean> {
    const { email } = input

    const result = await context.dataSources.authAPI.signup(email)

    console.log('Result: ', result)

    return true
  }
}
