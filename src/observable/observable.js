// @ts-check

const observables = new Set()
const observers = new Set()

export function observe(fn) {
  observers.add(fn)
}

export function createObservable(observable) {
  observables.add(observable)

  return new Proxy(observable, {
    get(target, key, receiver) {
      const result = Reflect.get(...arguments)

      if (typeof result === 'object') {
        const observableResult = createObservable(result)
        Reflect.set(target, key, observableResult, receiver)
        return observableResult
      }

      return result
    },
    set() {
      observers.forEach(cb => cb())
      return Reflect.set(...arguments)
    }
  })
}
