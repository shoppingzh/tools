import { isArray } from '@/array'

describe('isArray', () => {

  it('base', () => {
    expect(isArray([])).toBeTruthy()
  })
})
