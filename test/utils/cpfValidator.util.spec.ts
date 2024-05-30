import { cpfValidator } from '@utils/cpfValidator.util'

describe('cpfValidator', () => {
  test('Should return true for a valid CPF', () => {
    const cpf = '529.982.247-25'
    expect(cpfValidator(cpf)).toBe(true)
  })

  test('Should return false for an invalid CPF', () => {
    const cpf = '111.111.111-11'
    expect(cpfValidator(cpf)).toBe(false)
  })

  test('Should return false for a CPF with less than 11 digits', () => {
    const cpf = '123456789'
    expect(cpfValidator(cpf)).toBe(false)
  })

  test('Should return false for a CPF with all digits equal', () => {
    const cpf = '000.000.000-00'
    expect(cpfValidator(cpf)).toBe(false)
  })
})
