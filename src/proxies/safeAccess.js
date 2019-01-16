export function createSafe(target) {
  const handler = {
    get(target, name) {
      if (hasKey(target, name)) {
        const targetElement = target[name]

        if (isObject(targetElement)) {
          return createSafe(targetElement)
        }

        return targetElement
      }

      return notDefined
    }
  }
  return new Proxy(target, handler)
}

export const notDefined = new Proxy(
  {},
  {
    get() {
      return notDefined
    }
  }
)

export const either = (value, fallback) => (value === notDefined ? fallback : value)

const isObject = obj => typeof obj === 'object'
const hasKey = (obj, key) => key in obj
