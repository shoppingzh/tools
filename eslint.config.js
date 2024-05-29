/* eslint-disable @typescript-eslint/no-var-requires */
const js = require('@shoppingzh/eslint-config/javascript')
const ts = require('@shoppingzh/eslint-config/typescript')
const stylistic = require('@shoppingzh/eslint-config/stylistic')
const globals = require('globals')

module.exports = [
  {
    ignores: [
      'lib/**',
    ],
  },
  ...stylistic(),
  ...js({
    globals: {
      ...globals.jest,
    }
  }),
  ...ts({
    overrides: {
      '@typescript-eslint/no-explicit-any': [0],
      '@typescript-eslint/no-unused-vars': [1],
    }
  }),
]
