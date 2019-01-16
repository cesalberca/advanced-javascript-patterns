module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  testMatch: ['<rootDir>/src/(/**/*.spec.(js)|**/__tests__/*.(js))'],
}
