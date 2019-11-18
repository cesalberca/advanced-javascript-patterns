import { tag as html } from '../taggedTemplate/taggedTemplate'
import { createObservable, observe } from '../observable/observable'

export abstract class Component {
  data: { [key: string]: any }

  protected constructor() {
    const observable = createObservable(this)
    observe(() => renderTree(this))
    this.data = observable
  }

  abstract render(): string
}

function renderTree(component: Component) {
  document.body.innerHTML = component.render()
}

export function mount(component: Component) {
  renderTree(component)
}

export { html }
