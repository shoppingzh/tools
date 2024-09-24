import { prune } from '@/tree'
import nodes from './_nodes'
import { cloneDeep } from 'lodash'

it('base', () => {
  const cloneNodes = cloneDeep(nodes)
  prune(cloneNodes, (node) => node.name === '1-1')
  expect(cloneNodes[0].children?.length).toBe(1)
})

it('leaf', () => {
  const cloneNodes = cloneDeep(nodes)
  prune(cloneNodes, (node) => node.name === '1-1-2')
  expect(cloneNodes[0].children?.[0]?.children?.length).toBe(1)
})

it('root', () => {
  const cloneNodes = cloneDeep(nodes)
  prune(cloneNodes, (node) => ['1', '2'].includes(node.name))
  expect(cloneNodes?.length).toBe(1)
})

it('exception: nodes is nil', () => {
  expect(() => prune(undefined, () => true)).toThrow()
  expect(() => prune(null, () => true)).toThrow()
})

it('exception: predicate is nil', () => {
  expect(() => prune(nodes, undefined)).toThrow()
  expect(() => prune(nodes, null)).toThrow()
})
