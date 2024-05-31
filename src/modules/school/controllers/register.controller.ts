import { IControllerContract } from '@shared/contracts/controller.contract'
import { TSchoolContract } from '../contracts/school.contract'
import { Inject } from '@nestjs/common'
import { RegisterUseCase } from '../usecases/register.usecase'

export class RegisterController
  implements IControllerContract<TSchoolContract>
{
  public constructor(
    @Inject('U_REGISTER_USECASE')
    private readonly usecase: RegisterUseCase,
  ) {}

  public async perform(dto: TSchoolContract) {
    return await this.usecase.run(dto)
  }
}
