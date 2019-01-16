import { Observer } from '../Observer'
import { Subject } from '../Subject'

describe('Observer', () => {
  let subject
  let observer

  beforeEach(() => {
    subject = new Subject()
    observer = new Observer(subject)
  })

  test('tiene un valor inicial', () => {
    expect(observer.display()).toBe('Observer counter: 0')
  })

  test('el valor del observador es actualizado cuando el contador del sujeto se incrementa', () => {
    subject.incrementCounter()
    expect(observer.display()).toBe('Observer counter: 1')
  })

  test('el valor del observador es actualizado cuando el sujeto cambia', () => {
    subject.counter = 15
    expect(observer.display()).toBe('Observer counter: 15')
  })
})
