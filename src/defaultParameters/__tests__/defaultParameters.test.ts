import { multiply, priceAfterTaxes } from '../defaultParameters'

describe('defaultParameters', () => {
  test('retorna la suma de dos valores cuando estos son pasados por parámetros', () => {
    expect(multiply(1, 2)).toBe(2)
  })

  test('por defecto el segundo parámetro debe tener valor 2', () => {
    expect(multiply(1)).toBe(1)
  })

  test('si el primer parámetro queremos que coja su valor por defecto podremos pasar undefined', () => {
    expect(multiply(undefined, 3)).toBe(3)
  })

  test('también se puede hacer uso de funciones', () => {
    expect(priceAfterTaxes(10)).toBe(12.1)
  })
})
