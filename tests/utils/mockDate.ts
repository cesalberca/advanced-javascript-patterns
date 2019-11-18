export const RealDate = Date

export function mockDate(isoDate: string) {
  ;(global as any).Date = class extends RealDate {
    constructor() {
      super()
      return new RealDate(isoDate)
    }
  }
}
