import { unfold } from '@/array'
import { source as target } from './fold'

export const source = [
  {
    id: 1,
    name: '组1',
    subList: [
      { subId: 1, subName: '组1-1', },
      { subId: 2, subName: '组1-2', },
      { subId: 3, subName: '组1-3', },
    ]
  },
  {
    id: 2,
    name: '组2',
    subList: [
      { subId: 1, subName: '组2-1', },
    ]
  },
  {
    id: 3,
    name: '组3',
    subList: [
      { subId: 1, subName: '组3-1', },
      { subId: 2, subName: '组3-2', },
    ]
  }
]

it('normal', () => {
  expect(unfold(source, 'subList', ['subId', 'subName'])).toEqual(target)
})

it('source is empty', () => {
  expect(unfold([], 'subList', ['subId', 'subName'])).toEqual([])
})

it('foldKey is empty', () => {
  expect(() => unfold(source, undefined, ['subId'])).toThrow()
  expect(() => unfold(source, null, ['subId'])).toThrow()
  expect(() => unfold(source, '' as any, ['subId'])).toThrow()
})

it('unfoldItemKeysOrMap is empty', () => {
  expect(unfold(source, 'subList', []).length).toBe(6)
})
