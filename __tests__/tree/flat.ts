import { flat } from '@/tree'
import nodes from './_nodes'

const flatNames = [
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
].sort()

it('base', () => {
  const flatNodes = flat(nodes)
  expect(flatNodes.length).toBe(15)
  expect(flatNodes.map(o => o.name).sort()).toEqual(flatNames)
})


it('nodes is empty', () => {
  expect(flat([])).toEqual([])
})

it('exception: nodes is nil', () => {
  expect(() => flat(undefined)).toThrow()
  expect(() => flat(null)).toThrow()
})

it('dfs-pre traverse strategy', () => {
  expect(flat(nodes, 'dfs-pre').map(o => o.name).sort()).toEqual(flatNames)
})

it('dfs-post traverse strategy', () => {
  expect(flat(nodes, 'dfs-post').map(o => o.name).sort()).toEqual(flatNames)
})

it('bfs traverse strategy', () => {
  expect(flat(nodes, 'bfs').map(o => o.name).sort()).toEqual(flatNames)
})

it('exception: unknown traverse strategy', () => {
  expect(() => flat(nodes, 'unknown' as any)).toThrow()
})

it('exception: traverse strategy is nil', () => {
  expect(() => flat(nodes, null)).toThrow()
})

it('childrenProp', () => {
  expect(flat(nodes, 'bfs', 'childNodes' as any).map(o => o.name)).toEqual(['1', '2', '3'])
})
