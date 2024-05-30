import { IUseCaseContract } from 'src/shared/contracts/usecase.contract'
import { IRgContract } from '../contracts/rg.contract'
import { IAddressContract } from '../contracts/address.contract'
import { TGenderContract } from '../contracts/gender.contract'
import { Inject } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { cpfValidator } from 'src/shared/utils/cpfValidator.util'
import {
  generateIntegerToken,
  generateStringToken,
} from 'src/shared/utils/generate.util'

export type TRegiserInput = {
  _id?: string
  schoolId: string
  name: string
  email: string
  password: string
  phone: string
  cpf: string
  rg: IRgContract
  address: IAddressContract
  birthDate: Date
  gender: TGenderContract
  class: string
  createdAt?: Date
  updatedAt?: Date
}

export class RegisterUseCase implements IUseCaseContract<TRegiserInput> {
  public constructor(
    @Inject('S_USER_SERVICE')
    private readonly repo: UserService<TRegiserInput>,
  ) {}

  public async run(dto: TRegiserInput) {
    const errorMessage: Array<string> = []

    for (const key of Object.keys(dto)) {
      if (dto[key] === null || dto[key] === undefined) {
        errorMessage.push(`O campo '${key}' não pode ser nulo`)
      }
    }

    if (errorMessage) return errorMessage

    dto.email = dto.email.toLowerCase()

    dto.cpf = dto.cpf.replaceAll('.', '')
    dto.cpf = dto.cpf.replace('-', '')

    dto.rg.state = dto.rg.state.toUpperCase()

    dto._id = `${generateStringToken()}-${generateIntegerToken()}`
    dto.createdAt = new Date()
    dto.updatedAt = new Date()

    if (!cpfValidator(dto.cpf)) return 'CPF Invalido'

    for (let element in dto) {
      if (typeof dto[element] === 'string') {
        dto[element] = dto[element].trimStart().trimEnd()
      }
    }

    return await this.repo.create(dto)
  }
}
