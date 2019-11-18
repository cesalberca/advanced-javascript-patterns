export function isRequired<T>(): T {
  throw new TypeError('Argument is required')
}

export function capitalize(string = isRequired<string>()) {
  return string.toUpperCase().slice(0, 1) + string.slice(1)
}
