export const tag = (strings, ...values) =>
  strings.reduce((template, string, i) => template + string + (values[i] === undefined ? '' : values[i]), '')
