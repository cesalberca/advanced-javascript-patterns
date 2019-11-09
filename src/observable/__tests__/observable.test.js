import { observe, createObservable } from '../observable'
import { flushPromises } from '../../../tests/utils/flushPromises'

describe('observable', () => {
  test('se ejecuta la función que observa nuevamente cuando el valor observado cambia', async () => {
    expect.assertions(1)
    const person = createObservable({ name: 'John' })

    const stub = jest.fn()

    observe(person, stub)

    person.name = 'Sara'

    await flushPromises()
    expect(stub).toHaveBeenCalled()
  })

  test('cambia el valor interno cuando se muta el objeto', async () => {
    expect.assertions(1)
    const person = createObservable({ name: 'Summer' })

    const stub = jest.fn()

    observe(person, stub)

    person.name = 'Autumn'

    await flushPromises()
    expect(person.name).toBe('Autumn')
  })

  test('se pueden observar con varias funciones', async () => {
    expect.assertions(2)
    const person = createObservable({ name: 'Marta' })

    const stub1 = jest.fn()
    const stub2 = jest.fn()

    observe(person, stub1)
    observe(person, stub2)

    person.name = 'Laura'

    await flushPromises()
    expect(stub1).toHaveBeenCalled()
    expect(stub2).toHaveBeenCalled()
  })

  test('funciona cuando añadimos un elemento en un array', async () => {
    expect.assertions(1)
    const jobs = createObservable(['developer', 'designer'])
    const stub = jest.fn()

    observe(jobs, stub)

    jobs.push('ninja')

    await flushPromises()
    expect(stub).toHaveBeenCalled()
  })

  test('funciona cuando sobreescribimos un elemento en un array', async () => {
    expect.assertions(1)
    const jobs = createObservable(['developer', 'designer'])
    const stub = jest.fn()

    observe(jobs, stub)

    jobs[0] = 'ninja'

    await flushPromises()
    expect(stub).toHaveBeenCalled()
  })

  test('funciona con objetos anidados', async () => {
    expect.assertions(1)
    const person = createObservable({ name: 'César', company: { name: 'Autentia', people: 90 } })
    const stub = jest.fn(() => person.company.people)

    observe(person, stub)

    person.company.people++

    await flushPromises()
    expect(stub).toHaveBeenCalled()
  })

  test('no se ejecutan observadores que no tengan relación', async () => {
    expect.assertions(2)
    const person = createObservable({ name: 'Marta' })
    const person2 = createObservable({ name: 'Clark' })

    const stub1 = jest.fn()
    const stub2 = jest.fn()

    observe(person, stub1)
    observe(person2, stub2)

    person.name = 'Laura'

    await flushPromises()
    expect(stub1).toHaveBeenCalled()
    expect(stub2).not.toHaveBeenCalled()
  })
})
