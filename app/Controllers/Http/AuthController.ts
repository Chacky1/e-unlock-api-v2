import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthLoginValidator from 'App/Validators/AuthLoginValidator'
import AuthRegisterValidator from 'App/Validators/AuthRegisterValidator'
import UnAuthorizedException from '../../Exceptions/UnAuthorizedException'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    await request.validate(AuthRegisterValidator)

    const email = request.input('email')
    const password = request.input('password')

    const user = new User()
    user.email = email
    user.password = password

    await user.save()

    const token = await auth.use('web').attempt(email, password)

    return token.toJSON()
  }

  public async login({ request, auth }: HttpContextContract) {
    await request.validate(AuthLoginValidator)

    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)

      return {
        success: true,
      }
    } catch {
      throw new UnAuthorizedException('Invalid credentials', 'E_INVALID_AUTH_CREDENTIALS')
    }
  }

  public async logout({ auth }: HttpContextContract) {
    try {
      await auth.use('web').logout()

      return {
        revoked: true,
      }
    } catch (error) {
      console.log(error)
      throw new UnAuthorizedException('Invalid credentials', 'E_INVALID_AUTH_CREDENTIALS')
    }
  }
}
