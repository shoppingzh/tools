/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    // '__tests__/number/formatChinese.ts',
    '__tests__/datetime',
    '__tests__/tree/_nodes.ts',
  ],
  watch: false,
}
