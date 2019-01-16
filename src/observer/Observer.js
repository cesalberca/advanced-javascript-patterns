export class Observer {
  constructor(subject) {
    this.subject = subject
    this.subject.addObserver(this)
    this.value = 0
  }

  display() {
    return `Observer counter: ${this.value}`
  }

  notify(subject) {
    this.value = subject.counter
  }
}
