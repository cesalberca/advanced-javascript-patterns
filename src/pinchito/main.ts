import { Component, mount, html } from './pinchito'

class Counter extends Component {
  constructor() {
    super()
    this.data.counter = 0
    this.startCount()
  }

  startCount() {
    setInterval(() => {
      this.data.counter++
    }, 1000)
  }

  render() {
    return html`
      <h1>Counter: ${this.data.counter}</h1>
    `
  }
}

mount(new Counter())
