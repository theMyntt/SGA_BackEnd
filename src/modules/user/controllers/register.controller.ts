import { Body, Controller, Inject, Post } from '@nestjs/common'
import { RegisterUseCase } from '../usecases/register.usecase'
import { IControllerContract } from '@shared/contracts/controller.contract'
import { UserInformationDTO } from '../dto/user.dto'

@Controller('user')
export class RegisterController
  implements IControllerContract<UserInformationDTO>
{
  public constructor(
    @Inject('U_REGISTER_USECASE')
    private readonly usecase: RegisterUseCase,
  ) {}

  @Post('v1/register')
  public async perform(@Body() dto: UserInformationDTO) {
    try {
      return await this.usecase.run(dto)
    } catch {
      return 'Ocorreu um erro inesperado.'
    }
  }
}
