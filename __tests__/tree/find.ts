import { find } from '@/tree'
import nodes from './_nodes'

it('base', () => {
  const node = find(nodes, (node) => node.name === '2-1')
  expect(node?.name).toBe('2-1')
})

it('not found', () => {
  const node = find(nodes, node => node.name === '4')
  expect(node).toBeUndefined()
})

it('find first leaf node bfs strategy', () => {
  const node = find(nodes, node => !node.children || !node.children.length, 'bfs')
  expect(node?.name).toBe('3')
})

it('find first leaf node by dfs-pre strategy', () => {
  const node = find(nodes, node => !node.children?.length, 'dfs-pre')
  expect(node?.name).toBe('1-1-1')
})

it('find first leaf node by dfs-post strategy', () => {
  const node = find(nodes, node => !node.children?.length, 'dfs-pre')
  expect(node?.name).toBe('1-1-1')
})

it('nodes is empty', () => {
  expect(find([], node => node.name === '1')).toBeUndefined()
})

it('parent is nil', () => {
  expect(find(nodes, (node, parent) => parent == null)?.name).toBe('1')
})

it('depth is 2', () => {
  expect(find(nodes, (node, parent, depth) => depth === 2)?.name).toBe('1-1-1')
})

it('depth is 7', () => {
  expect(find(nodes, (node, parent, depth) => depth === 7)).toBeUndefined()
})

it('expection: nodes is nil', () => {
  expect(() => find(null, () => true)).toThrow()
})

it('exception: nodes is not array', () => {
  expect(() => find(1 as any, () => true)).toThrow()
  expect(() => find('1' as any, () => true)).toThrow()
  expect(() => find(true as any, () => true)).toThrow()
  expect(() => find({} as any, () => true)).toThrow()
  expect(() => find(Symbol.iterator as any, () => true)).toThrow()
  expect(() => find(Math as any, () => true)).toThrow()
})

it('exception: predicate is nil', () => {
  expect(() => find(nodes, null)).toThrow()
  expect(() => find(nodes, undefined)).toThrow()
})

it('exception: predicate is not function', () => {
  expect(() => find(nodes, 1 as any)).toThrow()
  expect(() => find(nodes, '1' as any)).toThrow()
  expect(() => find(nodes, true as any)).toThrow()
  expect(() => find(nodes, {} as any)).toThrow()
  expect(() => find(nodes, Symbol.iterator as any)).toThrow()
  expect(() => find(nodes, Math as any)).toThrow()
  expect(() => find(nodes, [] as any)).toThrow()
})

it('exception: unknown traverseStrategy', () => {
  expect(() => find(nodes, () => true, 'unknown' as any)).toThrow()
})

it('childrenProp', () => {
  expect(find(nodes, (node) => node.name === '1-1', 'bfs', 'childNodes' as any)).toBeUndefined()
})
