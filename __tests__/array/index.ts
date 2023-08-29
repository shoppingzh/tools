import { isArray, insert } from '@/array'

describe('isArray', () => {

  it('base', () => {
    expect(isArray([])).toBeTruthy()
  })

})

describe('insert', () => {

  it('single', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = insert(arr, -1, 0)
    expect(arr[0]).toBe(0)
    expect(result).toBe(0)
  })

  it('multiple', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = insert(arr, -1, [-2, -1, 0])
    expect(arr).toEqual([-2, -1, 0, 1, 2, 3, 4, 5])
    expect(result).toEqual([-2, -1, 0])
  })

})
