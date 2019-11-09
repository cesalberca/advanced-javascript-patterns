import { tag as html } from '../taggedTemplate/taggedTemplate.js'
import { createObservable, observe } from '../observable/observable.js'

export class Component {
  constructor() {
    const observable = createObservable(this)
    observe(() => renderTree(this))
    this.data = observable
  }
}

function renderTree(component) {
  document.body.innerHTML = component.render()
}

export function mount(component) {
  renderTree(component)
}

export { html }
