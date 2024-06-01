import { Controller, Get, Inject, Param, Query } from '@nestjs/common'
import { IControllerContract } from '@shared/contracts/controller.contract'
import { TSchoolContract } from '../contracts/school.contract'
import { PickUseCase } from '../usecases/pick.usecase'

@Controller('school')
export class PickController implements IControllerContract<string> {
  public constructor(
    @Inject('U_PICK_USECASE')
    private readonly usecase: PickUseCase,
  ) {}

  @Get('v1/pick/:id')
  public async perform(@Param('id') id: string) {
    return await this.usecase.run(id)
  }
}
