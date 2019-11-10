const observers = new Set()

export function observe(fn) {
  observers.add(fn)
}

export function createObservable(observable) {
  return new Proxy(observable, {
    set() {
      observers.forEach(observer => observer())
      return Reflect.set(...arguments)
    }
  })
}
