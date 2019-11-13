export function createSafe(target: object): object {
  const handler = {
    get(target: object, name: string | number, receiver: any) {
      if (hasKey(target, name)) {
        const targetElement = Reflect.get(target, name, receiver)

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
const hasKey = <T>(obj: T, key: string | number | symbol) => key in obj
