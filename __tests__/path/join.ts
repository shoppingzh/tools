import { join } from '@/path'

it('normal', () => {
  expect(join('a', 'b', 'c')).toBe('a/b/c')
})

it('one path', () => {
  expect(join('a')).toBe('a')
})

it('many', () => {
  expect(join('/a//', '///b', 'c/////')).toBe('/a/b/c/')
})

it('empty', () => {
  expect(join()).toBe('')
})

it('null', () => {
  expect(join(null, 'a', undefined, 'b')).toBe('a/b')
})

it('not string', () => {
  expect(join('a', 1 as any, true as any, null, {} as any)).toBe('a/1/true/[object Object]')
})

it('all /', () => {
  expect(join('/', '/', '/', '/')).toBe('/')
})

it('whitespace', () => {
  expect(join(' a ', 'b')).toBe(' a /b')
})

it('all null', () => {
  expect(join(undefined, null, null)).toBe('')
})
