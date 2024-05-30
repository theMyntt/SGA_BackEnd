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

export type TRegisterInput = {
  _id?: string
  schoolId?: string
  name?: string
  email?: string
  password?: string
  phone?: string
  cpf?: string
  rg?: IRgContract
  address?: IAddressContract
  birthDate?: Date
  gender?: TGenderContract
  class?: string
  createdAt?: Date
  updatedAt?: Date
}

export class RegisterUseCase implements IUseCaseContract<TRegisterInput> {
  public constructor(
    @Inject('S_USER_SERVICE')
    private readonly repo: UserService<TRegisterInput>,
  ) {}

  public async run(dto: TRegisterInput) {
    const errorMessage: Array<string> = []

    const user = await this.repo.find({ cpf: dto.cpf })
    if (user[0]) errorMessage.push('Usuário já cadastrado.')

    const requiredKeys = [
      'schoolId',
      'name',
      'email',
      'password',
      'phone',
      'cpf',
      'rg',
      'address',
      'birthDate',
      'gender',
      'class',
    ]

    dto._id = `${generateStringToken()}-${generateIntegerToken()}`
    dto.createdAt = new Date()
    dto.updatedAt = new Date()

    for (const key of requiredKeys) {
      if (dto[key] === null || dto[key] === undefined || dto[key] === '') {
        errorMessage.push(`O campo '${key}' não pode ser nulo`)
      }
    }

    if (errorMessage[0]) return JSON.stringify({ message: errorMessage })

    dto.email = dto.email.toLowerCase()

    dto.cpf = dto.cpf.replaceAll('.', '')
    dto.cpf = dto.cpf.replace('-', '')

    dto.rg.state = dto.rg.state.toUpperCase()

    if (!cpfValidator(dto.cpf)) return 'CPF Invalido'

    for (let element in dto) {
      if (typeof dto[element] === 'string') {
        dto[element] = dto[element].trimStart().trimEnd()
      }
    }

    return (await this.repo.create(dto))
      ? JSON.stringify({
          message: 'Usuário cadastrado com sucesso!',
        })
      : JSON.stringify({
          message: 'Não foi possível cadastrar o usuário.',
        })
  }
}
