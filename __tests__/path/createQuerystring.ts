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
