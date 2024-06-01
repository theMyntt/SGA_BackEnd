import { PickUseCase } from '@modules/school/usecases/pick.usecase'

jest.mock('@modules/school/usecases/pick.usecase')

describe('PickUseCase', () => {
  let pickUseCase: PickUseCase

  beforeEach(() => {
    pickUseCase = new PickUseCase(null)
  })

  const dto = {
    _id: '8183',
    name: 'Etec Prof. Horácio Augusto da Silveira',
    address: {
      street: 'R. Alcântara',
      number: '112',
      complement: null,
      city: 'São Paulo',
      country: 'Brasil',
      zipCode: '02110-010',
    },
    createdAt: '2024-06-01T00:09:25.366Z',
    updatedAt: '2024-06-01T00:09:25.366Z',
    __v: 0,
  }

  it('should be defined', () => {
    expect(pickUseCase).toBeDefined()
  })

  it('should return a error', async () => {
    ;(pickUseCase.run as jest.Mock).mockResolvedValueOnce(
      Error('Erro interno.'),
    )

    const result = await pickUseCase.run('')
    expect(result).toEqual(Error('Erro interno.'))
  })

  it('should return a school', async () => {
    ;(pickUseCase.run as jest.Mock).mockResolvedValueOnce(dto)

    const result = await pickUseCase.run(dto._id)
    expect(result).toEqual(dto)
  })
})
