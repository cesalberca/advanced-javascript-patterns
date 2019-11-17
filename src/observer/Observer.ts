import { Subject } from './Subject'

export class Observer {
  value: number

  constructor(private readonly subject: Subject) {
    this.subject.addObserver(this)
    this.value = 0
  }

  display() {
    return `Observer counter: ${this.value}`
  }

  notify(subject: Subject) {
    this.value = subject.counter
  }
}
