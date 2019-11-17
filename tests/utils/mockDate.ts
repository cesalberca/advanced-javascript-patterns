export const RealDate = Date

export function mockDate(isoDate: string) {
  global.Date = class extends RealDate {
    constructor() {
      super()
      return new RealDate(isoDate)
    }
  }
}
