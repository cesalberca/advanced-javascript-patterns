export const pipe = (...fns) => x => fns.reduce((g, f) => f(g), x)
