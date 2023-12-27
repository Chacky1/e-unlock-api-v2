import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnAuthorizedException extends Exception {
  private static readonly unauthorizedStatusCode = 401

  constructor(message: string, code: string) {
    super(message, UnAuthorizedException.unauthorizedStatusCode, code)
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.send({
      errors: [
        {
          code: error.code,
          message: error.message,
        },
      ],
    })
  }
}
