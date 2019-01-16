import { createLogger } from '../logger'
import { capitalize } from '../../defaultParameters/propValidator'
import { mockDate, RealDate } from '../../../tests/utils/mockDate'

describe('logger', () => {
  afterEach(() => {
    global.Date = RealDate
  })

  test('hace un log cuando se ejecuta una función', () => {
    mockDate('2018-10-10T12:34:56z')
    const loggerStub = {
      log: jest.fn()
    }

    const functionLogger = createLogger(capitalize, loggerStub)

    functionLogger('test')

    expect(loggerStub.log).toHaveBeenCalledWith(
      '2018-10-10T12:34:56.000Z [function] capitalize (Args: test) {Result: Test}'
    )
  })

  test('hace un log cuando se accede a una propiedad de un objeto', () => {
    mockDate('2018-10-10T12:34:56z')
    const loggerStub = {
      log: jest.fn()
    }

    const objectLogger = createLogger({ a: 1 }, loggerStub)

    objectLogger.a

    expect(loggerStub.log).toHaveBeenCalledWith('2018-10-10T12:34:56.000Z [object] (Prop: a) {Result: 1}')
  })

  test('hace un log cuando se accede a un elemento de un array', () => {
    mockDate('2018-10-10T12:34:56z')
    const loggerStub = {
      log: jest.fn()
    }

    const arrayLogger = createLogger([1, 2], loggerStub)

    arrayLogger[0]

    expect(loggerStub.log).toHaveBeenCalledWith('2018-10-10T12:34:56.000Z [object] (Prop: 0) {Result: 1}')
  })

  test('realiza un log cuando se ejecuta una función asíncrona', async () => {
    mockDate('2018-10-10T12:34:56z')
    const loggerStub = {
      log: jest.fn(),
      time: jest.fn(),
      timeEnd: jest.fn()
    }

    const asyncFunctionLogger = createLogger(() => Promise.resolve(), loggerStub)

    await asyncFunctionLogger()

    expect(loggerStub.time).toHaveBeenCalledWith('2018-10-10T12:34:56.000Z [function]')
    expect(loggerStub.timeEnd).toHaveBeenCalledWith('2018-10-10T12:34:56.000Z [function]')
  })
})
