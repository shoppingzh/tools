import { traverseBreadth } from '@/tree'
import nodes from './_nodes'

it('base', () => {
  const names: string [] = []
  traverseBreadth(nodes, (node, parent, depth) => {
    names.push(node.name)
  })
  expect(names).toEqual([
    '1',
    '2',
    '3',
    '1-1',
    '1-2',
    '2-1',
    '2-2',
    '1-1-1',
    '1-1-2',
    '1-2-1',
    '1-2-2',
    '1-2-2-1',
    '1-2-2-2',
    '1-2-2-2-1',
    '1-2-2-2-2',
  ])
})

it('parent', () => {
  const parentNames: string[] = []
  traverseBreadth(nodes, (node, parent) => {
    parentNames.push(parent?.name)
  })
  expect(parentNames).toEqual([
    undefined,
    undefined,
    undefined,
    '1',
    '1',
    '2',
    '2',
    '1-1',
    '1-1',
    '1-2',
    '1-2',
    '1-2-2',
    '1-2-2',
    '1-2-2-2',
    '1-2-2-2',
  ])
})

it('depth', () => {
  const depths: number[] = []
  traverseBreadth(nodes, (node, parent, depth) => {
    depths.push(depth)
  })
  expect(depths).toEqual([
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    4,
    4,
  ])
})
