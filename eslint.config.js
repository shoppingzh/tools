const { javascript, stylistic, typescript, } = require('@shoppingzh/eslint-config')
const globals = require('globals')

module.exports = [
  {
    ignores: ['lib']
  },
  ...javascript({
    globals: {
      ...globals.jest,
    },
  }),
  ...stylistic(),
  ...typescript({
    overrides: {
      '@typescript-eslint/no-explicit-any': [0],
      '@typescript-eslint/no-unused-vars': [1],
    }
  }),
  {
    files: ['*.js', 'performance/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': [0],
    }
  }
]
