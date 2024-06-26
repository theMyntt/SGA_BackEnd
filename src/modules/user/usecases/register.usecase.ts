import { IUseCaseContract } from '@shared/contracts/usecase.contract'
import { IRgContract } from '../contracts/rg.contract'
import { IAddressContract } from '@shared/contracts/address.contract'
import { TGenderContract } from '../contracts/gender.contract'
import { Inject } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { cpfValidator } from '@utils/cpfValidator.util'
import { generateIntegerToken, generateStringToken } from '@utils/generate.util'
import { UserInformationDTO } from '../dto/user.dto'

export class RegisterUseCase implements IUseCaseContract<UserInformationDTO> {
  public constructor(
    @Inject('S_USER_SERVICE')
    private readonly repo: UserService<UserInformationDTO>,
  ) {}

  public async run(dto: UserInformationDTO) {
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

    for (const element in dto) {
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
