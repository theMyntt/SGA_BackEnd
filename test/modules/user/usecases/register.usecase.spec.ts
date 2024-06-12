import { RegisterUseCase } from '@modules/user/usecases/register.usecase'
import { UserService } from '@modules/user/services/user.service'
import { generateIntegerToken, generateStringToken } from '@utils/generate.util'
import { UserInformationDTO } from '@modules/user/dto/user.dto'

jest.mock('@modules/user/services/user.service')
jest.mock('@utils/generate.util')

describe('RegisterUseCase', () => {
  let userService: jest.Mocked<UserService<UserInformationDTO>>
  let registerUseCase: RegisterUseCase

  beforeEach(() => {
    userService = new UserService(null) as jest.Mocked<
      UserService<UserInformationDTO>
    >
    registerUseCase = new RegisterUseCase(userService)
  })

  it('should register a new user successfully', async () => {
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
      isAdmin: false,
    }

    ;(userService.find as jest.Mock).mockResolvedValueOnce([])
    ;(userService.create as jest.Mock).mockResolvedValueOnce(true)

    const result = await registerUseCase.run(dto)

    expect(result).toEqual(
      JSON.stringify({ message: 'Usuário cadastrado com sucesso!' }),
    )
  })

  it('should not register a user if cpf is invalid', async () => {
    const dto: UserInformationDTO = {
      schoolId: 'school1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
      cpf: '12345678999',
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
      isAdmin: false,
    }

    ;(userService.find as jest.Mock).mockResolvedValueOnce([])

    const result = await registerUseCase.run(dto)
    expect(result).toEqual('CPF Invalido')
  })

  it('should not register a user if required fields are missing', async () => {
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
      isAdmin: false,
    }

    ;(userService.find as jest.Mock).mockResolvedValueOnce([])
    ;(generateStringToken as jest.Mock).mockReturnValue('token123')
    ;(generateIntegerToken as jest.Mock).mockReturnValue(456)

    const result = await registerUseCase.run(dto)
    expect(result).toEqual(
      JSON.stringify({
        message: 'Não foi possível cadastrar o usuário.',
      }),
    )
  })

  it('should not register a user if user already exists', async () => {
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
      isAdmin: false,
    }

    ;(userService.find as jest.Mock).mockResolvedValueOnce([dto])

    const result = await registerUseCase.run(dto)
    expect(result).toEqual(
      JSON.stringify({
        message: ['Usuário já cadastrado.'],
      }),
    )
  })
})
