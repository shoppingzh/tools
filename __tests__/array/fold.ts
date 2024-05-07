import { fold } from '@/array/fold'
import { source as target } from './unfold'

export const source = [
  { id: 1, name: '组1', subId: 1, subName: '组1-1', },
  { id: 1, name: '组1', subId: 2, subName: '组1-2', },
  { id: 1, name: '组1', subId: 3, subName: '组1-3', },
  { id: 2, name: '组2', subId: 1, subName: '组2-1', },
  { id: 3, name: '组3', subId: 1, subName: '组3-1', },
  { id: 3, name: '组3', subId: 2, subName: '组3-2', },
]

it('normal', () => {
  expect(fold(source, 'id', 'subList', ['subId', 'subName'])).toMatchObject(target)
})

it('source is empty', () => {
  expect(fold(null, 'id', 'subList', [])).toEqual([])
})

it('foldBy is empty', () => {
  expect(() => fold(source, undefined, 'subList', ['subId'])).toThrow()
  expect(() => fold(source, null, 'subList', ['subId'])).toThrow()
  expect(() => fold(source, '' as any, 'subList', ['subId'])).toThrow()
})

it('foldKey is empty', () => {
  expect(() => fold(source, 'id', undefined, ['subId'])).toThrow()
  expect(() => fold(source, 'id', null, ['subId'])).toThrow()
  expect(() => fold(source, 'id', '', ['subId'])).toThrow()
})

it('foldItemKeysOrMap is empty', () => {
  expect(fold(source, 'id', 'subList', [])).toMatchObject([
    { id: 1, subList: [{}, {}, {}] },
    { id: 2, subList: [{}] },
    { id: 3, subList: [{}, {}] },
  ])
})


it('foldItemKeysOrMap is function', () => {
  expect(fold(source, 'id', 'subList', o => ({ id: o.subId, name: o.subName }))).toMatchObject([
    {
      id: 1,
      subList: [{ id: 1 }, { id: 2 }, { id: 3 }]
    },
    {
      id: 2,
      subList: [{ id: 1 }]
    },
    {
      id: 3,
      subList: [{ id: 1 }, { id: 2 }]
    }
  ])
})

it('foldItemKeysOrMap return non object', () => {
  expect(fold(source, 'id', 'subList', o => o.subId)).toMatchObject([
    {
      id: 1,
      subList: [1, 2, 3]
    },
    {
      id: 2,
      subList: [1]
    },
    {
      id: 3,
      subList: [1, 2]
    }
  ])
})
