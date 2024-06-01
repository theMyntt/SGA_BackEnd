import { RegisterController } from '@modules/school/controllers/register.controller'

jest.mock('@modules/school/controllers/register.controller')

describe('RegisterController', () => {
  let controller: RegisterController

  beforeEach(() => {
    controller = new RegisterController(null)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return a error', async () => {
    ;(controller.perform as jest.Mock).mockResolvedValueOnce(
      Error('Erro interno.'),
    )

    const result = await controller.perform({})
    expect(result).toEqual(Error('Erro interno.'))
  })
})
