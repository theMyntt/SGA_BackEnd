import { IUseCaseContract } from '@shared/contracts/usecase.contract'
import { Inject } from '@nestjs/common'
import { SchoolService } from '../services/school.service'
import { SchoolInformationDTO } from '../dto/school.dto'

export class PickUseCase implements IUseCaseContract<string> {
  public constructor(
    @Inject('S_SCHOOL_SERVICE')
    private readonly repo: SchoolService<SchoolInformationDTO>,
  ) {}

  public async run(id: string) {
    if (!id) return JSON.stringify({ message: 'Id é obrigatorio.' })

    try {
      return (await this.repo.find({ _id: id }))[0]
    } catch {
      return JSON.stringify({ message: 'Não foi possível encontrar a escola.' })
    }
  }
}
