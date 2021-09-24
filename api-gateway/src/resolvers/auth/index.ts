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
import { EvalContext } from '../../contexts'

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
    @Ctx() context: EvalContext
  ): Promise<Boolean> {
    const { email } = input

    const result = await context.dataSources.authAPI.signup(email)

    console.log('Result: ', result)

    return true
  }

  // @Mutation(() => Boolean)
  // // @UseMiddleware(getAdmin)
  // async signup(
  //   @Arg('input') input: SignupInput
  //   // @Ctx() context: EvalContext
  // ): Promise<Boolean> {
  //   // const adminId = payload && payload.adminId ? payload.adminId : ''

  //   const { email } = input

  //   // console.log('Admin ID: ', adminId)
  //   console.log('Email: ', email)

  //   // const result = await context.dataSources.authAPI.signup()

  //   // console.log('Result: ', result)

  //   return true
  // }
}
