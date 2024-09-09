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

it('bfs: find first leaf node', () => {
  const node = find(nodes, node => !node.children || !node.children.length)
  expect(node?.name).toBe('3')
})

it('dfs-pre: find first leaf node', () => {
  const node = find(nodes, node => !node.children?.length, 'dfs-pre')
  expect(node?.name).toBe('1-1-1')
})

it('dfs-post: find first leaf node', () => {
  const node = find(nodes, node => !node.children?.length, 'dfs-pre')
  expect(node?.name).toBe('1-1-1')
})
