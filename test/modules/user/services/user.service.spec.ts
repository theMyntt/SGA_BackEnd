import { UserService } from '@modules/user/services/user.service'
import { UserInformationDTO } from '@modules/user/dto/user.dto'

jest.mock('@modules/user/services/user.service')

describe('UserService', () => {
  let userService: UserService<UserInformationDTO>

  beforeEach(() => {
    userService = new UserService(null) as jest.Mocked<
      UserService<UserInformationDTO>
    >
  })

  const loginDto: UserInformationDTO = {
    email: 'john.doe@example.com',
    password: 'password123',
    schoolId: 'school1',
  }

  const registerDto: UserInformationDTO = {
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
