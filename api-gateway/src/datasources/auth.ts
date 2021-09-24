import { RESTDataSource } from 'apollo-datasource-rest'

// interface ISignup {
//   input: {
//     email: string
//   }
// }

export class AuthAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.AUTH_BASE_URI
  }

  // async signup(_input: ISignup) {
  async signup(email: string) {
    return this.post('auth/signup', { email })
  }

  async complete() {
    //
  }

  async login() {
    //
  }

  async logout() {
    //
  }

  async forgotPassord() {
    //
  }

  async resetPassword() {
    //
  }
}
