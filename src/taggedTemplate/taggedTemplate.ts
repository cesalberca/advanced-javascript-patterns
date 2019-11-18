export const tag = <Value>(strings: TemplateStringsArray, ...values: Value[]): string =>
  strings.reduce((template, string, i) => template + string + (values[i] === undefined ? '' : values[i]), '')
