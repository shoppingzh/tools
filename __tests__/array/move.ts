import { move } from '@/array'

describe('move', () => {

  it('base', () => {
    expect(move([1, 2, 3, 4, 5], 0, 1)).toEqual([2, 1, 3, 4, 5])
    expect(move([1, 2, 3, 4, 5], 1, 0)).toEqual([2, 1, 3, 4, 5])
  })

  it('move to end', () => {
    expect(move([1, 2, 3, 4, 5], 0, 4)).toEqual([2, 3, 4, 5, 1])
  })

  it('fromIndex = toIndex', () => {
    expect(move([1, 2, 3, 4, 5], 0, 0)).toEqual([1, 2, 3, 4, 5])
  })

  it('out of index', () => {
    expect(() => move([1, 2, 3], -1, 0)).toThrow()
    expect(() => move([1, 2, 3], 0, -1)).toThrow()
    expect(() => move([1, 2, 3], -1, -2)).toThrow()
    expect(() => move([1, 2, 3], 4, 5)).toThrow()
  })

  it('array is null', () => {
    expect(() => move(null, 1, -1)).toThrow()
    expect(() => move(undefined, 0, 1)).toThrow()
  })

  it('empty array', () => {
    expect(() => move([], 0, 0)).toThrow()
  })

})
