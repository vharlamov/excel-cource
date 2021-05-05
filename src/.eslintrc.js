module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json'
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'quotes': 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'indent': 'off',
    'arrow-parens': 'off',
    'padded-blocks': 1,
    'operator-linebreak': 0,
    'no-trailing-spaces': 'off',
    'object-curly-spacing': 'off',
    'no-unused-vars': 'off',
    'no-array-constructor': 'off',
    'prefer-const': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'no-debugger': 'off',
    'no-case-declarations': 'off',
    'no-invalid-this': 'off',
    'no-fallthrough': 'off'
  }
}
