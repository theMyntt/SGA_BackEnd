import { UserInformationDTO } from '@modules/user/dto/user.dto'
import { UserService } from '@modules/user/services/user.service'
import { LoginUseCase } from '@modules/user/usecases/login.usecase'
import {
  generateIntegerToken,
  generateStringToken,
} from '@shared/utils/generate.util'

jest.mock('@modules/user/services/user.service')
jest.mock('@shared/utils/generate.util')

describe('LoginUseCase', () => {
  let userService: jest.Mocked<UserService<UserInformationDTO>>
  let loginUseCase: LoginUseCase

  const dto: UserInformationDTO = {
    schoolId: 'school1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone: '1234567890',
    cpf: '217.628.880-76',
    rg: { number: '12345678', state: 'sp' },
    address: {
      street: 'Street',
      city: 'City',
      state: 'State',
      zipCode: '00000-000',
      complement: 'Complement',
      country: 'Country',
      number: '123',
    },
    birthDate: new Date('2000-01-01'),
    gender: 'MASCULINE',
    class: 'class1',
    isAdmin: true,
  }

  beforeEach(() => {
    userService = new UserService(null) as jest.Mocked<
      UserService<UserInformationDTO>
    >
    loginUseCase = new LoginUseCase(userService)
  })

  it('should return tokens and userName', async () => {
    ;(userService.find as jest.Mock).mockResolvedValueOnce([dto])
    ;(generateStringToken as jest.Mock).mockReturnValue('token123')
    ;(generateIntegerToken as jest.Mock).mockReturnValue(456)

    const result = await loginUseCase.run(dto)
    expect(result).toEqual(
      JSON.stringify({
        tokens: [
          `${generateStringToken()}-${generateIntegerToken()}`,
          `${generateStringToken()}-${generateIntegerToken()}`,
          `${generateStringToken()}-${generateIntegerToken()}`,
          `${generateStringToken()}-${generateIntegerToken()}`,
        ],
        userName: dto.name,
      }),
    )
  })

  it('should return nothing', async () => {
    ;(userService.find as jest.Mock).mockResolvedValueOnce([])

    const result = await loginUseCase.run(dto)
    expect(result).toEqual(
      JSON.stringify({
        message: 'Usuário não encontrado.',
      }),
    )
  })
})
