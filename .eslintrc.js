module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ['jest'],
  extends: ['eslint:recommended', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  }
}
