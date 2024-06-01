import { School } from '@modules/school/schemas/school.schema'
import { SchoolService } from '@modules/school/services/school.service'

jest.mock('@modules/school/services/school.service')

describe('SchoolService', () => {
  let schoolService: SchoolService<School>

  beforeEach(() => {
    schoolService = new SchoolService(null)
  })

  it('should be defined', () => {
    expect(schoolService).toBeDefined()
  })

  it('should return a error', async () => {
    ;(schoolService.create as jest.Mock).mockResolvedValueOnce(false)

    const result = await schoolService.create({
      _id: null,
      address: null,
      createdAt: null,
      updatedAt: null,
      name: null,
    })
    expect(result).toEqual(false)
  })

  it('should find something', async () => {
    const dto = [
      {
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
      },
    ]

    ;(schoolService.find as jest.Mock).mockResolvedValueOnce(dto)

    const result = await schoolService.find({ _id: '8183' })
    expect(result).toEqual(dto)
  })
})
