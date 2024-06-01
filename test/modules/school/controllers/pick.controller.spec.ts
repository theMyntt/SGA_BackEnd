import { PickController } from '@modules/school/controllers/pick.controller'

jest.mock('@modules/school/controllers/pick.controller')

describe('PickController', () => {
  let controller: PickController

  beforeEach(() => {
    controller = new PickController(null)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return a error', async () => {
    ;(controller.perform as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({ message: 'Id é obrigatorio.' }),
    )
    const result = await controller.perform('')
    expect(result).toEqual(JSON.stringify({ message: 'Id é obrigatorio.' }))
  })

  it('should return a error', async () => {
    ;(controller.perform as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({ message: 'Não foi possível encontrar a escola.' }),
    )
    const result = await controller.perform('1234')
    expect(result).toEqual(
      JSON.stringify({ message: 'Não foi possível encontrar a escola.' }),
    )
  })
})
