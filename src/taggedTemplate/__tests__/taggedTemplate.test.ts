import { tag } from '../taggedTemplate'

describe('taggedTemplate', () => {
  test('retorna el string y un valor ya interpolado', () => {
    const string = 'World'
    const actual = tag`Hello ${string}`
    expect(actual).toEqual('Hello World')
  })

  test('tiene soporte para varios valores', () => {
    const value1 = 'World'
    const value2 = 'again'
    const actual = tag`Hello ${value1} ${value2}!`
    expect(actual).toEqual('Hello World again!')
  })

  test('admite expresiones', () => {
    const value1 = 1
    const value2 = 2
    const actual = tag`${value1} + ${value2} = ${value1 + value2}`
    expect(actual).toEqual('1 + 2 = 3')
  })
})
