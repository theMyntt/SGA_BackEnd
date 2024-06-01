import { TSchoolContract } from '@modules/school/contracts/school.contract'
import { RegisterUseCase } from '@modules/school/usecases/register.usecase'

jest.mock('@modules/school/usecases/register.usecase')

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase

  beforeEach(() => {
    registerUseCase = new RegisterUseCase(null)
  })

  const dto: TSchoolContract = {
    _id: 'school1',
    name: 'School 1',
    address: {
      street: 'Street',
      number: '123',
      city: 'City',
      complement: null,
      state: 'State',
      country: 'Country',
      zipCode: '12345678',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  it('should be defined', () => {
    expect(registerUseCase).toBeDefined()
  })

  it('should return a error', async () => {
    ;(registerUseCase.run as jest.Mock).mockResolvedValueOnce(
      Error('Erro interno.'),
    )

    const result = await registerUseCase.run({})
    expect(result).toEqual(Error('Erro interno.'))
  })

  it('should register a new school', async () => {
    ;(registerUseCase.run as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({
        message: 'Escola cadastrado com sucesso.',
      }),
    )

    const result = await registerUseCase.run(dto)
    expect(result).toEqual(
      JSON.stringify({
        message: 'Escola cadastrado com sucesso.',
      }),
    )
  })

  it('should not register a new school', async () => {
    ;(registerUseCase.run as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({
        message: 'Não foi possível cadastrar a escola.',
      }),
    )

    const result = await registerUseCase.run(dto)
    expect(result).toEqual(
      JSON.stringify({
        message: 'Não foi possível cadastrar a escola.',
      }),
    )
  })
})
