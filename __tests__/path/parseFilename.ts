import { parseFilename } from '@/path'

it('normal', () => {

  expect(parseFilename('README.md')).toEqual({
    basename: 'README',
    extname: 'md',
  })
})

it('filename is undefined', () => {
  expect(() => parseFilename(undefined)).toThrow()
})

it('filename is null', () => {
  expect(() => parseFilename(null)).toThrow()
})

it('no extension', () => {
  expect(parseFilename('README')).toEqual({
    basename: 'README',
    extname: null,
  })
})

it('filename start with .', () => {
  expect(parseFilename('.gitignore')).toEqual({
    basename: '.gitignore',
    extname: null,
  })
})

it('filename end with .', () => {
  expect(parseFilename('README.')).toEqual({
    basename: 'README.',
    extname: null,
  })
})

it('filename many .', () => {
  expect(parseFilename('xpzheng.20230911.README.md')).toEqual({
    basename: 'xpzheng.20230911.README',
    extname: 'md',
  })
})

it('with seperator', () => {
  expect(parseFilename('README.md', true)).toEqual({
    basename: 'README',
    extname: '.md',
  })
})
