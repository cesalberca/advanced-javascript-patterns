import { tag as html } from '../taggedTemplate/taggedTemplate.js'
import { createObservable, observe } from '../observable/observable.js'

export class Component {
  constructor() {
    this.data = createObservable(this)
  }
}

export function mount(component, container) {
  const diffDom = new diffDOM()
  renderTree(diffDom, component, container)

  observe(() => {
    renderTree(diffDom, component, container)
  })
}

function renderTree(differ, component, container) {
  const element = document.createElement('body')
  element.innerHTML = component.render()
  differ.apply(container, differ.diff(container, element))
}

export { html }
