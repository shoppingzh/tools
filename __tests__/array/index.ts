import { isArray, insert } from '@/array'

describe('isArray', () => {

  it('base', () => {
    expect(isArray([])).toBeTruthy()
  })

})

describe('insert', () => {

  it('single', () => {
    expect(insert([1, 2, 3, 4, 5], 0, 0)).toEqual([0, 1, 2, 3, 4, 5])
  })

  it('multiple', () => {
    expect(insert([1, 2, 3, 4, 5], 0, [-2, -1, 0])).toEqual([-2, -1, 0, 1, 2, 3, 4, 5])
  })

  it('index < 0', () => {
    expect(() => insert([1, 2, 3, 4, 5], -2, 1)).toThrow()
  })

  it('index >= length', () => {
    expect(insert([1, 2, 3, 4, 5], 10, 6)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('array is null', () => {
    expect(() => insert(null, 1, 0)).toThrow()
  })

  it('not array', () => {
    expect(() => insert(1 as any, 0, 1)).toThrow()
  })

  it('insert null', () => {
    expect(insert([1, 2, 3], 0, null)).toEqual([null, 1, 2, 3])
  })

  it('insert undefined', () => {
    expect(insert([1, 2, 3], 0, undefined)).toEqual([undefined, 1, 2, 3])
  })

})
