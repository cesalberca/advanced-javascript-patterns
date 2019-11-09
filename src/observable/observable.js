const observers = new Map()

export function observe(observable, fn) {
  const id = getObservable(observable)
  const fns = observers.get(id)

  if (fns !== undefined) {
    observers.set(id, [...fns, fn])
  } else {
    observers.set(id, [fn])
  }
}

export function createObservable(observable) {
  return new Proxy(observable, {
    set() {
      const fns = observers.get(getObservable(observable))
      if (fns !== undefined) {
        fns.map(fn => fn())
      }
      return Reflect.set(...arguments)
    }
  })
}

function getObservable(observable) {
  return JSON.stringify(observable)
}
