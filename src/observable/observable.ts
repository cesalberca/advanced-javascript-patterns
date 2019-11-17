const observers = new Set<Function>()

export function observe(fn: Function) {
  observers.add(fn)
}

export function createObservable<Observable extends object>(observable: Observable) {
  return new Proxy(observable, {
    set(target: Observable, p: string | number | symbol, value: any, receiver: any) {
      observers.forEach(observer => observer())
      return Reflect.set(target, p, value, receiver)
    }
  })
}
