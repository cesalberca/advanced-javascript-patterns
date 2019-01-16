export class Subject {
  constructor() {
    this.observers = []
    this._counter = 0
  }

  set counter(value) {
    // https://github.com/tc39/proposal-private-fields
    this._counter = value
    this.notifyObservers()
  }

  get counter() {
    return this._counter
  }

  incrementCounter() {
    this.counter++
    this.notifyObservers()
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.notify(this))
  }
}
