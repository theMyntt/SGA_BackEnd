import { IUseCaseContract } from 'src/shared/contracts/usecase.contract'
import { TRegisterInput } from './register.usecase'
import { UserService } from '../services/user.service'
import { Inject } from '@nestjs/common'
import {
  generateIntegerToken,
  generateStringToken,
} from 'src/shared/utils/generate.util'

export class LoginUseCase implements IUseCaseContract<TRegisterInput> {
  public constructor(
    @Inject('S_USER_SERVICE')
    private readonly repo: UserService<TRegisterInput>,
  ) {}

  public async run(dto: TRegisterInput) {
    const filters = {
      email: dto.email?.toLowerCase(),
      password: dto.password,
      schoolId: dto.schoolId,
    }

    try {
      let user = await this.repo.find(filters)
      user = user[0]
      if (user) {
        return JSON.stringify({
          tokens: [
            `${generateStringToken()}-${generateIntegerToken()}`,
            `${generateStringToken()}-${generateIntegerToken()}`,
            `${generateStringToken()}-${generateIntegerToken()}`,
          ],
          userName: user.name,
        })
      }
    } catch (error) {
      return error
    }
  }
}
