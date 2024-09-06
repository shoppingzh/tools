import { traverseDeep, } from '@/tree'
import nodes from './_nodes'

const allNames: string[] = [
  '1',
  '1-1',
  '1-1-1',
  '1-1-2',
  '1-2',
  '1-2-1',
  '1-2-2',
  '1-2-2-1',
  '1-2-2-2',
  '1-2-2-2-1',
  '1-2-2-2-2',
  '2',
  '2-1',
  '2-2',
  '3',
]

it('base', () => {

  const names: string[] = []
  traverseDeep(nodes, (node, parent, depth) => {
    names.push(node.name)
  })
  expect(names).toEqual(allNames)

})

it('parent', () => {
  const parentNames: string[] = []
  traverseDeep(nodes, (node, parent) => {
    parentNames.push(parent?.name)
  })
  expect(parentNames).toEqual([
    undefined,
    '1',
    '1-1',
    '1-1',
    '1',
    '1-2',
    '1-2',
    '1-2-2',
    '1-2-2',
    '1-2-2-2',
    '1-2-2-2',
    undefined,
    '2',
    '2',
    undefined,
  ])
})

it('depth', () => {
  const depths: number[] = []
  traverseDeep(nodes, (node, parent, depth) => {
    depths.push(depth)
  })
  expect(depths).toEqual([
    0,
    1,
    2,
    2,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    0,
    1,
    1,
    0,
  ])
})
