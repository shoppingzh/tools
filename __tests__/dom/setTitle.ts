import { setTitle } from '@/dom'

it('normal', () => {

  setTitle('hello')
  expect(document.title).toBe('hello')
})
