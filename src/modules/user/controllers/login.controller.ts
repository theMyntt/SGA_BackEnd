import { Body, Controller, Inject, Post } from '@nestjs/common'
import { LoginUseCase } from '../usecases/login.usecase'
import { IControllerContract } from '@shared/contracts/controller.contract'
import { UserInformationDTO } from '../dto/user.dto'

@Controller('user')
export class LoginController
  implements IControllerContract<UserInformationDTO>
{
  public constructor(
    @Inject('U_LOGIN_USECASE')
    private readonly usecase: LoginUseCase,
  ) {}

  @Post('v1/login')
  public async perform(@Body() dto: UserInformationDTO) {
    try {
      return await this.usecase.run(dto)
    } catch (error) {
      console.error('Erro ao executar LoginController:', error)
      return error
    }
  }
}
