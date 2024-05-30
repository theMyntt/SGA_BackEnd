import { Body, Controller, Inject, Post } from '@nestjs/common'
import { LoginUseCase } from '../usecases/login.usecase'
import { TRegisterInput } from '../usecases/register.usecase'

@Controller('user')
export class LoginController {
  public constructor(
    @Inject('U_LOGIN_USECASE')
    private readonly usecase: LoginUseCase,
  ) {}

  @Post('v1/login')
  public async perform(@Body() dto: TRegisterInput) {
    try {
      return await this.usecase.run(dto)
    } catch (error) {
      console.error('Erro ao executar LoginController:', error)
      return error
    }
  }
}
