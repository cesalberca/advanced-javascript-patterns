import { createSafe, either } from '../safeAccess'

describe('safeAccess', () => {
  test('lanza una excepción cuando se acceden a propiedades no existentes de un objeto', () => {
    const person = {
      name: 'César',
      company: {
        name: 'Autentia'
      }
    }

    expect(() => {
      person.garage.tesla
    }).toThrowError()
  })

  test('no lanza excepción cuando se acceden a propiedades no existentes de un objeto', () => {
    const safePerson = createSafe({
      name: 'César',
      company: {
        name: 'Autentia'
      }
    })

    expect(() => {
      safePerson.garage.tesla
    }).not.toThrowError()
  })

  test('se puede acceder a propiedades existentes de un objeto', () => {
    const safePerson = createSafe({
      name: 'César',
      company: {
        name: 'Autentia'
      }
    })

    expect(safePerson.company.name).toEqual('Autentia')
  })

  test('no lanza excepción cuando se acceden a propiedades anidadas no existentes de un objeto', () => {
    const safePerson = createSafe({
      name: 'César',
      company: {
        name: 'Autentia'
      }
    })

    expect(() => {
      safePerson.garage.tesla.modelS
    }).not.toThrowError()
  })

  test('puede tener valores por defecto', () => {
    const safePerson = createSafe({
      name: 'César',
      company: {
        name: 'Autentia'
      }
    })

    expect(either(safePerson.company.foosball, 'ping-pong')).toBe('ping-pong')
  })
})
