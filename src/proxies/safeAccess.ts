export function createSafe<Target extends object>(target: Target): Target {
  const handler = {
    get(target: Target, name: string | number | symbol, receiver: any) {
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
const hasKey = <Object>(object: Object, key: string | number | symbol) => key in object
