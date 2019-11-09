const observers = new Set()

export function observe(fn) {
  observers.add(fn)
}

export function createObservable(observable) {
  return new Proxy(observable, {
    set() {
      observers.forEach(value => value())
      return Reflect.set(...arguments)
    }
  })
}
