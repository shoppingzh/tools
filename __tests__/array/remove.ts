import { remove } from '@/array'


it('single', () => {
  const arr = [1, 2, 3, 4, 5]
  const result = remove(arr, 0)
  expect(arr).toEqual([2, 3, 4, 5])
  expect(result).toEqual([1])
})

it('multiple', () => {
  const arr = [1, 2, 3, 4, 5]
  const result = remove(arr, [0, 2, 4])
  expect(arr).toEqual([2, 4])
  expect(result).toEqual([1, 3, 5])
})

it('array is null', () => {
  expect(() => remove(null, 1)).toThrow()
})

it('repeat', () => {
  const arr = [1, 2, 3, 4, 5]
  const result = remove(arr, [0, 0, 0])
  expect(arr).toEqual([2, 3, 4, 5])
  expect(result).toEqual([1])
})

it('unsort indexes', () => {
  const arr = [1, 2, 3, 4, 5]
  const result = remove(arr, [2, 0, 1])
  expect(arr).toEqual([4, 5])
  expect(result).toEqual([1, 2, 3])
})
