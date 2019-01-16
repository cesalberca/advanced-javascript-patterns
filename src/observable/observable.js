// Based on https://github.com/nx-js/observer-util
const observers = new WeakMap()
const queuedObservers = new Set()
let currentObserver

export function observe(fn) {
  queueObserver(fn)
}

export function createObservable(observable) {
  observers.set(observable, new Map())

  return new Proxy(observable, {
    get(target, key, receiver) {
      const result = Reflect.get(...arguments)

      if (currentObserver) {
        registerObserver(target, key, currentObserver)
        if (typeof result === 'object') {
          const observableResult = createObservable(result)
          Reflect.set(target, key, observableResult, receiver)
          return observableResult
        }
      }
      return result
    },
    set(target, key) {
      const observersForKey = observers.get(target).get(key)
      if (observersForKey) {
        observersForKey.forEach(queueObserver)
      }
      return Reflect.set(...arguments)
    }
  })
}

function registerObserver(target, key, observer) {
  let observersForKey = observers.get(target).get(key)
  if (!observersForKey) {
    observersForKey = new Set()
    observers.get(target).set(key, observersForKey)
  }
  observersForKey.add(observer)
}

async function queueObserver(observer) {
  if (queuedObservers.size === 0) {
    Promise.resolve().then(runObservers)
  }
  queuedObservers.add(observer)
}

function runObservers() {
  try {
    queuedObservers.forEach(observer => {
      currentObserver = observer
      observer()
    })
  } finally {
    currentObserver = undefined
    queuedObservers.clear()
  }
}
