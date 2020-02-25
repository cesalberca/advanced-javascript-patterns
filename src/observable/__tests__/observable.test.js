import { createObservable, observe } from '../observable'

describe('observable', () => {
  test('se ejecuta la función que observa nuevamente cuando el valor observado cambia', async () => {
    const person = createObservable({ name: 'John' })

    const stub = jest.fn()

    observe(stub)

    person.name = 'Sara'

    expect(stub).toHaveBeenCalled()
  })

  test('cambia el valor interno cuando se muta el objeto', async () => {
    const person = createObservable({ name: 'Summer' })

    const stub = jest.fn()

    observe(stub)

    person.name = 'Autumn'

    expect(person.name).toBe('Autumn')
  })

  test('se pueden observar con varias funciones', async () => {
    expect.assertions(2)
    const person = createObservable({ name: 'Marta' })

    const stub1 = jest.fn()
    const stub2 = jest.fn()

    observe(stub1)
    observe(stub2)

    person.name = 'Laura'

    expect(stub1).toHaveBeenCalled()
    expect(stub2).toHaveBeenCalled()
  })

  test('funciona cuando añadimos un elemento en un array', async () => {
    const jobs = createObservable(['developer', 'designer'])
    const stub = jest.fn()

    observe(stub)

    jobs.push('ninja')

    expect(stub).toHaveBeenCalled()
  })

  test('funciona cuando sobreescribimos un elemento en un array', async () => {
    const jobs = createObservable(['developer', 'designer'])
    const stub = jest.fn()

    observe(stub)

    jobs[0] = 'ninja'

    expect(stub).toHaveBeenCalled()
  })
})
