import { createQuerystring } from '@/path'

it('normal', () => {

  expect(createQuerystring({
    name: 'zxp',
    age: 20,
    gender: false,
  })).toBe('name=zxp&age=20&gender=false')

})

it('object undefined', () => {
  expect(createQuerystring(undefined)).toBe('')
})

it('object null', () => {
  expect(createQuerystring(null)).toBe('')
})

it('not object', () => {
  expect(() => createQuerystring(1 as any)).toThrow()
})

it('object value is undefined', () => {
  expect(createQuerystring({ a: undefined, b: 1 })).toBe('b=1')
})

it('object value is null', () => {
  expect(createQuerystring({ a: null, b: 1 })).toBe('a=&b=1')
})

it('object value is base type', () => {
  expect(createQuerystring({
    a: 'hello',
    b: true,
    c: 2,
    d: Symbol('hello'),
    e: BigInt(100)
  })).toBe('a=hello&b=true&c=2&e=100')
})

it('object value is array', () => {
  expect(createQuerystring({
    a: [1, 2, 3, { aa: 4, ab: 5 }]
  })).toBe('a=1&a=2&a=3&a=[object Object]')
})

it('object value is Set', () => {
  expect(createQuerystring({
    a: new Set([1, 2, 3])
  })).toBe('a=1&a=2&a=3')
})

it('object value is object', () => {
  const date = new Date(2023, 9, 8, 10, 0, 0, 0)
  expect(createQuerystring({
    a: date
  })).toBe(`a=${date.toString()}`)
})
