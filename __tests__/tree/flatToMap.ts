import { flatToMap } from '@/tree'
import nodes from './_nodes'

it('base', () => {
  const map = flatToMap(nodes, 'id')
  expect(Object.values(map).map(o => o.name).sort()).toEqual([
    '1-1-2',
    '1-2-1',
    '1-1-1',
    '1',
    '1-2-2-2-1',
    '1-1',
    '1-2',
    '1-2-2-2-2',
    '3',
    '1-2-2-2',
    '2',
    '1-2-2',
    '2-1',
    '1-2-2-1',
    '2-2',
  ].sort())
})

it('id is nil', () => {
  const map = flatToMap(nodes, 'id2' as any)
  expect(Object.keys(map).length).toBe(0)
})

it('prop is a function', () => {
  const map = flatToMap(nodes, o => `Node-${o.id}`)
  const keys = Object.keys(map)
  expect(keys.length).toBe(15)
  expect(keys.every(o => o.startsWith('Node-'))).toBeTruthy()
})

it('exception: nodes is nil', () => {
  expect(() => flatToMap(undefined, 'id')).toThrow()
  expect(() => flatToMap(null, 'id')).toThrow()
})
