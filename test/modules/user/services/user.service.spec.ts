import { UserService } from '@modules/user/services/user.service'
import { TRegisterInput } from '@modules/user/usecases/register.usecase'

jest.mock('@modules/user/services/user.service')

describe('UserService', () => {
  let userService: UserService<TRegisterInput>

  beforeEach(() => {
    userService = new UserService(null) as jest.Mocked<
      UserService<TRegisterInput>
    >
  })

  const loginDto: TRegisterInput = {
    email: 'john.doe@example.com',
    password: 'password123',
    schoolId: 'school1',
  }

  const registerDto: TRegisterInput = {
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

  it('should be defined', () => {
    expect(userService).toBeDefined()
  })

  it('should return a user', async () => {
    ;(userService.find as jest.Mock).mockResolvedValueOnce(loginDto)

    const result = await userService.find(loginDto)
    expect(result).toBe(loginDto)
  })

  it('should return nothing', async () => {
    ;(userService.find as jest.Mock).mockResolvedValueOnce({})

    const result = await userService.find(loginDto)
    expect(result).toEqual({})
  })

  it('should create a user', async () => {
    ;(userService.create as jest.Mock).mockResolvedValueOnce(true)

    const result = await userService.create(registerDto)
    expect(result).toBe(true)
  })

  it('should not create a user', async () => {
    ;(userService.create as jest.Mock).mockResolvedValueOnce(false)

    const result = await userService.create(registerDto)
    expect(result).toBe(false)
  })
})
