interface Logger {
  log(message: string): void
  time(label: string): void
  timeEnd(label: string): void
}

export function createLogger<Target extends object | Function>(target: Target, logger: Logger = console): Target {
  const message = `${new Date().toISOString()} [${typeof target}]`

  return new Proxy(target, {
    get(target: Target, name: string | number | symbol, receiver: any): Target {
      const result = Reflect.get(target, name, receiver)
      logger.log(`${message} (Prop: ${name.toString()}) {Result: ${result}}`)
      return result
    },
    apply(target: any, thisArg: any, argArray?: any): Target {
      const result = Reflect.apply(target as Function, thisArg, argArray)
      handleResult(result, target.name, message, logger)
      logger.log(`${message} ${target.name} (Args: ${argArray}) {Result: ${result}}`)
      return result
    }
  })
}

async function handleResult(result: any, name: string, label: string, logger: Logger = console) {
  const isResultAPromise = Promise.resolve(result) == result
  if (isResultAPromise) {
    logger.time(label)
    await result
    logger.timeEnd(label)
  }
}
