export function isRequired(): never {
  throw new TypeError('Argument is required')
}

export function capitalize(string: string = isRequired()) {
  return string.toUpperCase().slice(0, 1) + string.slice(1)
}
