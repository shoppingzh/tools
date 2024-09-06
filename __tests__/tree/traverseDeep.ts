import { traverseDeep, } from '@/tree'
import nodes from './_nodes'

it('base', () => {

  const result: [string, string, number][] = []
  traverseDeep(nodes, (node, parent, depth) => {
    result.push([node.name, parent?.name, depth])
  })
  expect(result).toEqual([
    ['1', undefined, 0],
    ['1-1', '1', 1],
    ['1-1-1', '1-1', 2],
    ['1-1-2', '1-1', 2],
    ['1-2', '1', 1],
    ['1-2-1', '1-2', 2],
    ['1-2-2', '1-2', 2],
    ['1-2-2-1', '1-2-2', 3],
    ['1-2-2-2', '1-2-2', 3],
    ['1-2-2-2-1', '1-2-2-2', 4],
    ['1-2-2-2-2', '1-2-2-2', 4],
    ['2', undefined, 0],
    ['2-1', '2', 1],
    ['2-2', '2', 1],
    ['3', undefined, 0],
  ])
})

it('break', () => {
  let times = 0
  traverseDeep(nodes, (node, parent, depth) => {
    times++
    console.log(node.name)

    if (node.name === '1-2-2') return true
  })
  expect(times).toBe(7)
})
