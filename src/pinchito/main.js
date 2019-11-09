import { tag as html } from '../taggedTemplate/taggedTemplate.js'
import { createObservable, observe } from '../observable/observable.js'

export class Component {
  constructor() {
    this.data = createObservable(this)
  }
}

export function mount(component, container) {
  renderTree(component, container)

  observe(() => {
    renderTree(component, container)
  })
}

function renderTree(component, container) {
  container.innerHTML = component.render()
}

export { html }
