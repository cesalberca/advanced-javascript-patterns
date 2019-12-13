module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  testMatch: ['<rootDir>/src/**/*.test.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}
