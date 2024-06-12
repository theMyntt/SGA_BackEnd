import { IControllerContract } from '@shared/contracts/controller.contract'
import { SchoolInformationDTO } from '../dto/school.dto'
import { Body, Controller, Inject, Post } from '@nestjs/common'
import { RegisterUseCase } from '../usecases/register.usecase'

@Controller('school')
export class RegisterController
  implements IControllerContract<SchoolInformationDTO>
{
  public constructor(
    @Inject('U_REGISTER_USECASE')
    private readonly usecase: RegisterUseCase,
  ) {}

  @Post('v1/register')
  public async perform(@Body() dto: SchoolInformationDTO) {
    return await this.usecase.run(dto)
  }
}
