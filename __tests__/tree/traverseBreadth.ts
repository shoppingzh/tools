import { traverseBreadth } from '@/tree'
import nodes from './_nodes'

it('base', () => {
  const result: [string, string, number][] = []
  traverseBreadth(nodes, (node, parent, depth) => {
    result.push([node.name, parent?.name, depth])
  })
  expect(result).toEqual([
    ['1', undefined, 0],
    ['2', undefined, 0],
    ['3', undefined, 0],
    ['1-1', '1', 1],
    ['1-2', '1', 1],
    ['2-1', '2', 1],
    ['2-2', '2', 1],
    ['1-1-1', '1-1', 2],
    ['1-1-2', '1-1', 2],
    ['1-2-1', '1-2', 2],
    ['1-2-2', '1-2', 2],
    ['1-2-2-1', '1-2-2', 3],
    ['1-2-2-2', '1-2-2', 3],
    ['1-2-2-2-1', '1-2-2-2', 4],
    ['1-2-2-2-2', '1-2-2-2', 4],
  ])
})

it('break', () => {
  let times = 0
  traverseBreadth(nodes, (node, parent, depth) => {
    times++
    if (node.name === '1-2-2') return true
  })
  expect(times).toBe(11)
})
