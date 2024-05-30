import { Body, Controller, Inject, Post } from '@nestjs/common'
import { RegisterUseCase, TRegisterInput } from '../usecases/register.usecase'

@Controller('user')
export class RegisterController {
  public constructor(
    @Inject('U_REGISTER_USECASE')
    private readonly usecase: RegisterUseCase,
  ) {}

  @Post('v1/register')
  public async perform(@Body() dto: TRegisterInput) {
    try {
      return await this.usecase.run(dto)
    } catch {
      return 'Ocorreu um erro inesperado.'
    }
  }
}
