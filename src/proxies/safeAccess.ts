export function createSafe(target: object): object {
  type Target = {
    [key: string]: object
    [key: number]: object
  }

  const handler = {
    get(target: Target, name: string | number) {
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

export const notDefined: object = new Proxy(
  {},
  {
    get() {
      return notDefined
    }
  }
)

export const either = <T>(value: object, fallback: T) => (value === notDefined ? fallback : value)

const isObject = (obj: object) => typeof obj === 'object'
const hasKey = <T>(obj: object, key: string | number | symbol) => key in obj
