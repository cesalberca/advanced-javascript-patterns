import { Observer } from './Observer'

export class Subject {
  private _counter: number
  private readonly observers: Observer[]

  constructor() {
    this._counter = 0
    this.observers = []
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

  addObserver(observer: Observer) {
    this.observers.push(observer)
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.notify(this))
  }
}
